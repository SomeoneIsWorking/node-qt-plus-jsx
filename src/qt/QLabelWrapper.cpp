#include "QLabelWrapper.h"
#include <iostream>

Napi::FunctionReference QLabelWrapper::constructor;

Napi::Object QLabelWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "QLabel", {
        InstanceMethod("setText", &QLabelWrapper::SetText),
        InstanceMethod("text", &QLabelWrapper::Text),
        InstanceMethod("deleteLater", &QLabelWrapper::DeleteLater),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QLabel", func);
    return exports;
}

QLabelWrapper::QLabelWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<QLabelWrapper>(info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return;
    }

    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return;
    }

    std::string text = info[0].As<Napi::String>().Utf8Value();
    instance = new ::QLabel(QString::fromStdString(text));
}

QLabelWrapper::~QLabelWrapper() {
    delete instance;
}

Napi::Value QLabelWrapper::SetText(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string text = info[0].As<Napi::String>().Utf8Value();
    instance->setText(QString::fromStdString(text));
    
    return env.Null();
}

Napi::Value QLabelWrapper::Text(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    QString text = instance->text();
    return Napi::String::New(env, text.toStdString());
}

Napi::Value QLabelWrapper::DeleteLater(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    std::cout << "Scheduling QLabel for deletion" << std::endl;
    instance->deleteLater();
    return env.Null();
} 