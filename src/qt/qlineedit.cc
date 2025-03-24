#include "qlineedit.h"

Napi::FunctionReference QLineEditWrapper::constructor;

QLineEditWrapper::QLineEditWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QLineEditWrapper>(info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    lineEdit = new QLineEdit();
}

QLineEditWrapper::~QLineEditWrapper() {
    delete lineEdit;
}

Napi::Value QLineEditWrapper::setText(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() > 0 && info[0].IsString()) {
        lineEdit->setText(info[0].As<Napi::String>().Utf8Value().c_str());
    }
    return env.Undefined();
}

Napi::Value QLineEditWrapper::textChanged(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() > 0 && info[0].IsFunction()) {
        Napi::Function callback = info[0].As<Napi::Function>();
        QObject::connect(lineEdit, &QLineEdit::textChanged, [callback](const QString& text) {
            callback.Call({Napi::String::New(callback.Env(), text.toStdString())});
        });
    }

    return env.Undefined();
}

Napi::Object QLineEditWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);

    Napi::Function func = DefineClass(env, "QLineEdit", {
        InstanceMethod("textChanged", &QLineEditWrapper::textChanged),
        InstanceMethod("setText", &QLineEditWrapper::setText),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QLineEdit", func);
    return exports;
} 