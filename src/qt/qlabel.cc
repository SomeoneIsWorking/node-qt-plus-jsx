#include "qlabel.h"

Napi::Object QLabelWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "QLabel", {
        InstanceMethod("setText", &QLabelWrapper::SetText),
        InstanceMethod("show", &QLabelWrapper::Show),
        InstanceMethod("setParent", &QLabelWrapper::SetParent),
    });

    exports.Set("QLabel", func);
    return exports;
}

QLabelWrapper::QLabelWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QLabelWrapper>(info) {
    std::string text = info[0].As<Napi::String>().Utf8Value();
    label = new QLabel(QString::fromStdString(text));
    
    // If parent widget is provided, set it
    if (info.Length() > 1 && info[1].IsObject()) {
        QWidgetWrapper* parentWrapper = Napi::ObjectWrap<QWidgetWrapper>::Unwrap(info[1].As<Napi::Object>());
        if (parentWrapper) {
            label->setParent(parentWrapper->getWidget());
        }
    }
}

QLabelWrapper::~QLabelWrapper() {
    delete label;
}

QLabel* QLabelWrapper::getLabel() { 
    return label; 
}

Napi::Value QLabelWrapper::SetText(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    std::string text = info[0].As<Napi::String>().Utf8Value();
    label->setText(QString::fromStdString(text));
    return env.Undefined();
}

Napi::Value QLabelWrapper::Show(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    label->show();
    return env.Undefined();
}

Napi::Value QLabelWrapper::SetParent(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info[0].IsObject()) {
        QWidgetWrapper* parentWrapper = Napi::ObjectWrap<QWidgetWrapper>::Unwrap(info[0].As<Napi::Object>());
        if (parentWrapper) {
            label->setParent(parentWrapper->getWidget());
        }
    }
    return env.Undefined();
} 