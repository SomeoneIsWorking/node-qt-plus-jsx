#include "QVBoxLayoutWrapper.h"
#include "QWidgetWrapper.h"
#include <iostream>

Napi::FunctionReference QVBoxLayoutWrapper::constructor;

Napi::Object QVBoxLayoutWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "QVBoxLayout", {
        InstanceMethod("addWidget", &QVBoxLayoutWrapper::AddWidget),
        InstanceMethod("addLayout", &QVBoxLayoutWrapper::AddLayout),
        InstanceMethod("removeWidget", &QVBoxLayoutWrapper::RemoveWidget),
        InstanceMethod("removeItem", &QVBoxLayoutWrapper::RemoveItem),
        InstanceMethod("deleteLater", &QVBoxLayoutWrapper::DeleteLater),
        InstanceMethod("invalidate", &QVBoxLayoutWrapper::Invalidate),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();
    exports.Set("QVBoxLayout", func);
    return exports;
}

QVBoxLayoutWrapper::QVBoxLayoutWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QVBoxLayoutWrapper>(info), env_(info.Env()) {
    instance = new QVBoxLayout();
}

QVBoxLayoutWrapper::~QVBoxLayoutWrapper() {
    if (instance) {
        delete instance;
    }
}

Napi::Value QVBoxLayoutWrapper::AddWidget(const Napi::CallbackInfo& info) {
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

Napi::Value QVBoxLayoutWrapper::AddLayout(const Napi::CallbackInfo& info) {
    if (info.Length() < 1) {
        Napi::TypeError::New(env_, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env_.Null();
    }

    QVBoxLayoutWrapper* layoutWrapper = Napi::ObjectWrap<QVBoxLayoutWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (!layoutWrapper) {
        Napi::TypeError::New(env_, "Invalid layout argument").ThrowAsJavaScriptException();
        return env_.Null();
    }

    instance->addLayout(layoutWrapper->GetInstance());
    return info.This();
}

Napi::Value QVBoxLayoutWrapper::RemoveWidget(const Napi::CallbackInfo& info) {
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

Napi::Value QVBoxLayoutWrapper::RemoveItem(const Napi::CallbackInfo& info) {
    if (info.Length() < 1) {
        Napi::TypeError::New(env_, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env_.Null();
    }

    QVBoxLayoutWrapper* layoutWrapper = Napi::ObjectWrap<QVBoxLayoutWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (!layoutWrapper) {
        Napi::TypeError::New(env_, "Invalid layout argument").ThrowAsJavaScriptException();
        return env_.Null();
    }

    instance->removeItem(layoutWrapper->GetInstance());
    return info.This();
}

Napi::Value QVBoxLayoutWrapper::DeleteLater(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    std::cout << "Scheduling QVBoxLayout for deletion" << std::endl;
    
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

Napi::Value QVBoxLayoutWrapper::Invalidate(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    instance->invalidate();
    return env.Undefined();
} 