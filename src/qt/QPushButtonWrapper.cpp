#include "QPushButtonWrapper.h"
#include <iostream>

Napi::FunctionReference QPushButtonWrapper::constructor;

Napi::Object QPushButtonWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);
    std::cout << "Initializing QPushButton wrapper" << std::endl;

    Napi::Function func = DefineClass(env, "QPushButton", {
        InstanceMethod("setText", &QPushButtonWrapper::SetText),
        InstanceMethod("clicked", &QPushButtonWrapper::Clicked),
        InstanceMethod("deleteLater", &QPushButtonWrapper::DeleteLater),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QPushButton", func);
    return exports;
}

QPushButtonWrapper::QPushButtonWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QPushButtonWrapper>(info), env_(info.Env()) {
    std::string text = "";
    if (info.Length() > 0 && info[0].IsString()) {
        text = info[0].As<Napi::String>().Utf8Value();
    }
    std::cout << "Creating QPushButton with text: " << text << std::endl;
    instance = new QPushButton(QString::fromStdString(text));
}

QPushButtonWrapper::~QPushButtonWrapper() {
    if (instance) {
        delete instance;
    }
}

Napi::Value QPushButtonWrapper::SetText(const Napi::CallbackInfo& info) {
    if (info.Length() < 1 || !info[0].IsString()) {
        Napi::TypeError::New(env_, "String argument expected").ThrowAsJavaScriptException();
        return env_.Null();
    }

    std::string text = info[0].As<Napi::String>().Utf8Value();
    std::cout << "Setting QPushButton text to: " << text << std::endl;
    instance->setText(QString::fromStdString(text));
    return env_.Null();
}

Napi::Value QPushButtonWrapper::Clicked(const Napi::CallbackInfo& info) {
    std::cout << "Setting up clicked handler for QPushButton" << std::endl;
    if (info.Length() < 1 || !info[0].IsFunction()) {
        Napi::TypeError::New(env_, "Function argument expected").ThrowAsJavaScriptException();
        return env_.Null();
    }

    Napi::Function callback = info[0].As<Napi::Function>();
    Napi::FunctionReference* callbackRef = new Napi::FunctionReference();
    *callbackRef = Napi::Persistent(callback);
    callbackRef->SuppressDestruct();

    std::cout << "Connecting clicked signal" << std::endl;
    QObject::connect(instance, &QPushButton::clicked, [callbackRef]() {
        std::cout << "Button clicked, executing callback" << std::endl;
        try {
            Napi::HandleScope scope(callbackRef->Env());
            callbackRef->Call({});
            std::cout << "Callback executed successfully" << std::endl;
        } catch (const std::exception& e) {
            std::cerr << "Exception in button callback: " << e.what() << std::endl;
        } catch (...) {
            std::cerr << "Unknown exception in button callback" << std::endl;
        }
    });
    std::cout << "Click handler setup complete" << std::endl;

    return env_.Null();
}

Napi::Value QPushButtonWrapper::DeleteLater(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    std::cout << "Scheduling QPushButton for deletion" << std::endl;
    instance->deleteLater();
    return env.Null();
} 