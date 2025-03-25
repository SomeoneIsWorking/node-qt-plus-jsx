#include "QLineEditWrapper.h"
#include <iostream>

Napi::FunctionReference QLineEditWrapper::constructor;

Napi::Object QLineEditWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);
    std::cout << "Initializing QLineEdit wrapper" << std::endl;

    Napi::Function func = DefineClass(env, "QLineEdit", {
        InstanceMethod("setText", &QLineEditWrapper::SetText),
        InstanceMethod("textChanged", &QLineEditWrapper::TextChanged),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QLineEdit", func);
    return exports;
}

QLineEditWrapper::QLineEditWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QLineEditWrapper>(info), env_(info.Env()) {
    instance = new QLineEdit();
}

QLineEditWrapper::~QLineEditWrapper() {
    if (instance) {
        delete instance;
    }
}

Napi::Value QLineEditWrapper::SetText(const Napi::CallbackInfo& info) {
    if (info.Length() < 1 || !info[0].IsString()) {
        Napi::TypeError::New(env_, "String argument expected").ThrowAsJavaScriptException();
        return env_.Null();
    }

    std::string text = info[0].As<Napi::String>().Utf8Value();
    instance->setText(QString::fromStdString(text));
    return env_.Null();
}

Napi::Value QLineEditWrapper::TextChanged(const Napi::CallbackInfo& info) {
    if (info.Length() < 1 || !info[0].IsFunction()) {
        Napi::TypeError::New(env_, "Function argument expected").ThrowAsJavaScriptException();
        return env_.Null();
    }

    Napi::Function callback = info[0].As<Napi::Function>();
    Napi::FunctionReference* callbackRef = new Napi::FunctionReference();
    *callbackRef = Napi::Persistent(callback);
    callbackRef->SuppressDestruct();

    QObject::connect(instance, &QLineEdit::textChanged, [callbackRef](const QString& text) {
        Napi::HandleScope scope(callbackRef->Env());
        callbackRef->Call({Napi::String::New(callbackRef->Env(), text.toStdString())});
    });

    return env_.Null();
} 