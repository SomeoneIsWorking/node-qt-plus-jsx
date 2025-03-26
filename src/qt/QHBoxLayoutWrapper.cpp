#include "QHBoxLayoutWrapper.h"
#include "QWidgetWrapper.h"
#include <iostream>

Napi::FunctionReference QHBoxLayoutWrapper::constructor;

Napi::Object QHBoxLayoutWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "QHBoxLayout", {
        InstanceMethod("addWidget", &QHBoxLayoutWrapper::AddWidget),
        InstanceMethod("addLayout", &QHBoxLayoutWrapper::AddLayout),
        InstanceMethod("removeWidget", &QHBoxLayoutWrapper::RemoveWidget),
        InstanceMethod("removeItem", &QHBoxLayoutWrapper::RemoveItem),
        InstanceMethod("deleteLater", &QHBoxLayoutWrapper::DeleteLater),
        InstanceMethod("invalidate", &QHBoxLayoutWrapper::Invalidate),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();
    exports.Set("QHBoxLayout", func);
    return exports;
}

QHBoxLayoutWrapper::QHBoxLayoutWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QHBoxLayoutWrapper>(info), env_(info.Env()) {
    instance = new QHBoxLayout();
}

QHBoxLayoutWrapper::~QHBoxLayoutWrapper() {
    if (instance) {
        delete instance;
    }
}

Napi::Value QHBoxLayoutWrapper::AddWidget(const Napi::CallbackInfo& info) {
    if (info.Length() < 1) {
        Napi::TypeError::New(env_, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env_.Null();
    }

    QWidgetWrapper* widgetWrapper = Napi::ObjectWrap<QWidgetWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (!widgetWrapper) {
        Napi::TypeError::New(env_, "Invalid widget argument").ThrowAsJavaScriptException();
        return env_.Null();
    }

    instance->addWidget(widgetWrapper->GetInstance());
    return info.This();
}

Napi::Value QHBoxLayoutWrapper::AddLayout(const Napi::CallbackInfo& info) {
    if (info.Length() < 1) {
        Napi::TypeError::New(env_, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env_.Null();
    }

    QHBoxLayoutWrapper* layoutWrapper = Napi::ObjectWrap<QHBoxLayoutWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (!layoutWrapper) {
        Napi::TypeError::New(env_, "Invalid layout argument").ThrowAsJavaScriptException();
        return env_.Null();
    }

    instance->addLayout(layoutWrapper->GetInstance());
    return info.This();
}

Napi::Value QHBoxLayoutWrapper::RemoveWidget(const Napi::CallbackInfo& info) {
    if (info.Length() < 1) {
        Napi::TypeError::New(env_, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env_.Null();
    }

    QWidgetWrapper* widgetWrapper = Napi::ObjectWrap<QWidgetWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (!widgetWrapper) {
        Napi::TypeError::New(env_, "Invalid widget argument").ThrowAsJavaScriptException();
        return env_.Null();
    }

    instance->removeWidget(widgetWrapper->GetInstance());
    return info.This();
}

Napi::Value QHBoxLayoutWrapper::RemoveItem(const Napi::CallbackInfo& info) {
    if (info.Length() < 1) {
        Napi::TypeError::New(env_, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env_.Null();
    }

    QHBoxLayoutWrapper* layoutWrapper = Napi::ObjectWrap<QHBoxLayoutWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (!layoutWrapper) {
        Napi::TypeError::New(env_, "Invalid layout argument").ThrowAsJavaScriptException();
        return env_.Null();
    }

    instance->removeItem(layoutWrapper->GetInstance());
    return info.This();
}

Napi::Value QHBoxLayoutWrapper::DeleteLater(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    std::cout << "Scheduling QHBoxLayout for deletion" << std::endl;
    
    // Hide all child widgets
    for (int i = 0; i < instance->count(); ++i) {
        QLayoutItem* item = instance->itemAt(i);
        if (QWidget* widget = item->widget()) {
            widget->hide();
            widget->deleteLater();
        }
    }
    
    instance->deleteLater();
    return env.Null();
}

Napi::Value QHBoxLayoutWrapper::Invalidate(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    instance->invalidate();
    return env.Undefined();
} 