#include "QLineEditWrapper.h"

Napi::FunctionReference QLineEditWrapper::constructor;

Napi::Object QLineEditWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "QLineEdit", {
        InstanceMethod("setText", &QLineEditWrapper::SetText),
        InstanceMethod("text", &QLineEditWrapper::Text),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QLineEdit", func);
    return exports;
}

QLineEditWrapper::QLineEditWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<QLineEditWrapper>(info) {
    instance = new ::QLineEdit();
}

QLineEditWrapper::~QLineEditWrapper() {
    delete instance;
}

Napi::Value QLineEditWrapper::SetText(const Napi::CallbackInfo& info) {
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

Napi::Value QLineEditWrapper::Text(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    QString text = instance->text();
    return Napi::String::New(env, text.toStdString());
} 