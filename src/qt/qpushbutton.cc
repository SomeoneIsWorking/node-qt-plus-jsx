#include "qpushbutton.h"

Napi::FunctionReference QPushButtonWrapper::constructor;

QPushButtonWrapper::QPushButtonWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QPushButtonWrapper>(info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() > 0 && info[0].IsString()) {
        button = new QPushButton(info[0].As<Napi::String>().Utf8Value().c_str());
    } else {
        button = new QPushButton();
    }
}

QPushButtonWrapper::~QPushButtonWrapper() {
    delete button;
}

Napi::Value QPushButtonWrapper::setText(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() > 0 && info[0].IsString()) {
        button->setText(info[0].As<Napi::String>().Utf8Value().c_str());
    }
    return env.Undefined();
}

Napi::Value QPushButtonWrapper::clicked(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() > 0 && info[0].IsFunction()) {
        Napi::Function callback = info[0].As<Napi::Function>();
        QObject::connect(button, &QPushButton::clicked, [callback]() {
            callback.Call({});
        });
    }

    return env.Undefined();
}

Napi::Object QPushButtonWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);

    Napi::Function func = DefineClass(env, "QPushButton", {
        InstanceMethod("clicked", &QPushButtonWrapper::clicked),
        InstanceMethod("setText", &QPushButtonWrapper::setText),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QPushButton", func);
    return exports;
} 