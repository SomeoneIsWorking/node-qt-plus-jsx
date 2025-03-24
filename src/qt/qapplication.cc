#include "qapplication.h"

Napi::Object QApplicationWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "QApplication", {
        InstanceMethod("exec", &QApplicationWrapper::Exec),
    });

    exports.Set("QApplication", func);
    return exports;
}

QApplicationWrapper::QApplicationWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QApplicationWrapper>(info) {
    int argc = 1;
    char* argv[] = {(char*)"node"};
    app = new QApplication(argc, argv);
}

QApplicationWrapper::~QApplicationWrapper() {
    delete app;
}

Napi::Value QApplicationWrapper::Exec(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    return Napi::Number::New(env, app->exec());
} 