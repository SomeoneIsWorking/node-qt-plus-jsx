#include "qvboxlayout.h"
#include "qwidget.h"
#include <napi.h>

Napi::Object QVBoxLayoutWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "QVBoxLayout", {
        InstanceMethod("addWidget", &QVBoxLayoutWrapper::AddWidget),
        InstanceMethod("addLayout", &QVBoxLayoutWrapper::AddLayout),
    });

    exports.Set("QVBoxLayout", func);
    return exports;
}

QVBoxLayoutWrapper::QVBoxLayoutWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QVBoxLayoutWrapper>(info) {
    QWidget* parent = nullptr;
    if (info.Length() > 0 && info[0].IsObject()) {
        QWidgetWrapper* parentWrapper = Napi::ObjectWrap<QWidgetWrapper>::Unwrap(info[0].As<Napi::Object>());
        if (parentWrapper) {
            parent = parentWrapper->getWidget();
        }
    }
    
    layout = new QVBoxLayout(parent);
}

QVBoxLayoutWrapper::~QVBoxLayoutWrapper() {
    delete layout;
}

QLayout* QVBoxLayoutWrapper::getLayout() { 
    return layout; 
}

Napi::Value QVBoxLayoutWrapper::AddWidget(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info[0].IsObject()) {
        QWidgetWrapper* widgetWrapper = Napi::ObjectWrap<QWidgetWrapper>::Unwrap(info[0].As<Napi::Object>());
        if (widgetWrapper) {
            layout->addWidget(widgetWrapper->getWidget());
        }
    }
    return env.Undefined();
}

Napi::Value QVBoxLayoutWrapper::AddLayout(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info[0].IsObject()) {
        QLayoutWrapper* layoutWrapper = Napi::ObjectWrap<QLayoutWrapper>::Unwrap(info[0].As<Napi::Object>());
        if (layoutWrapper) {
            layout->addLayout(layoutWrapper->getLayout());
        }
    }
    return env.Undefined();
} 