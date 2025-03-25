#include "QLayoutWrapper.h"
#include "QWidgetWrapper.h"
#include <QHBoxLayout>
#include <iostream>

Napi::FunctionReference QLayoutWrapper::constructor;

Napi::Object QLayoutWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);
    std::cout << "Initializing QLayout wrapper" << std::endl;

    Napi::Function func = DefineClass(env, "QLayout", {
        InstanceMethod("addWidget", &QLayoutWrapper::AddWidget),
        InstanceMethod("addLayout", &QLayoutWrapper::AddLayout),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QLayout", func);
    return exports;
}

QLayoutWrapper::QLayoutWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<QLayoutWrapper>(info) {
    std::cout << "Creating QLayout instance" << std::endl;
    instance = new QHBoxLayout();
    std::cout << "QLayout instance created successfully" << std::endl;
}

QLayoutWrapper::~QLayoutWrapper() {
    std::cout << "Destroying QLayout instance" << std::endl;
    // Don't delete the instance here as it's owned by the parent widget
    instance = nullptr;
}

Napi::Value QLayoutWrapper::AddWidget(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::cout << "Adding widget to layout" << std::endl;
    QWidgetWrapper* widgetWrapper = Napi::ObjectWrap<QWidgetWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (!widgetWrapper) {
        Napi::TypeError::New(env, "Invalid widget").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    if (!instance) {
        std::cout << "ERROR: Layout instance is null" << std::endl;
        Napi::TypeError::New(env, "Layout instance is null").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    instance->addWidget(widgetWrapper->GetInstance());
    std::cout << "Widget added successfully to layout" << std::endl;
    return env.Null();
}

Napi::Value QLayoutWrapper::AddLayout(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::cout << "Adding layout to layout" << std::endl;
    QLayoutWrapper* layoutWrapper = Napi::ObjectWrap<QLayoutWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (!layoutWrapper) {
        Napi::TypeError::New(env, "Invalid layout").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    if (!instance) {
        std::cout << "ERROR: Layout instance is null" << std::endl;
        Napi::TypeError::New(env, "Layout instance is null").ThrowAsJavaScriptException();
        return env.Null();
    }
    
    instance->addItem(layoutWrapper->GetInstance());
    std::cout << "Layout added successfully to layout" << std::endl;
    return env.Null();
} 