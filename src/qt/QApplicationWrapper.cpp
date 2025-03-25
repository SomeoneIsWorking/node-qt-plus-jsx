#include "QApplicationWrapper.h"
#include <iostream>

Napi::FunctionReference QApplicationWrapper::constructor;

Napi::Object QApplicationWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);
    std::cout << "Initializing QApplication wrapper" << std::endl;

    Napi::Function func = DefineClass(env, "QApplication", {
        InstanceMethod("exec", &QApplicationWrapper::Exec),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QApplication", func);
    return exports;
}

QApplicationWrapper::QApplicationWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<QApplicationWrapper>(info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    std::cout << "Creating QApplication instance" << std::endl;
    static int argc = 1;
    static char* argv[] = { (char*)"node-qt" };
    instance = new ::QApplication(argc, argv);
    std::cout << "QApplication instance created successfully" << std::endl;
}

QApplicationWrapper::~QApplicationWrapper() {
    std::cout << "Destroying QApplication instance" << std::endl;
    if (instance) {
        instance->quit();  // Ensure the event loop is stopped
        delete instance;
        instance = nullptr;
    }
}

Napi::Value QApplicationWrapper::Exec(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (!instance) {
        std::cout << "ERROR: QApplication instance is null" << std::endl;
        Napi::Error::New(env, "QApplication instance is null").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::cout << "Starting QApplication event loop" << std::endl;
    int result = instance->exec();
    std::cout << "QApplication event loop ended with result: " << result << std::endl;
    return Napi::Number::New(env, result);
} 