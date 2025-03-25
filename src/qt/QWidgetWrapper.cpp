#include "QWidgetWrapper.h"
#include "QHBoxLayoutWrapper.h"
#include "QVBoxLayoutWrapper.h"
#include <iostream>

Napi::FunctionReference QWidgetWrapper::constructor;

Napi::Object QWidgetWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);
    std::cout << "Initializing QWidget wrapper" << std::endl;

    Napi::Function func = DefineClass(env, "QWidget", {
        InstanceMethod("setWindowTitle", &QWidgetWrapper::SetWindowTitle),
        InstanceMethod("show", &QWidgetWrapper::Show),
        InstanceMethod("setLayout", &QWidgetWrapper::SetLayout),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QWidget", func);
    return exports;
}

QWidgetWrapper::QWidgetWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<QWidgetWrapper>(info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    std::cout << "Creating QWidget instance" << std::endl;
    instance = new ::QWidget();
    std::cout << "QWidget instance created successfully" << std::endl;
}

QWidgetWrapper::~QWidgetWrapper() {
    std::cout << "Destroying QWidget instance" << std::endl;
    delete instance;
}

Napi::Value QWidgetWrapper::SetWindowTitle(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string title = info[0].As<Napi::String>().Utf8Value();
    std::cout << "Setting window title: " << title << std::endl;
    instance->setWindowTitle(QString::fromStdString(title));
    return env.Null();
}

Napi::Value QWidgetWrapper::Show(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    std::cout << "Showing QWidget" << std::endl;
    instance->show();
    std::cout << "QWidget shown successfully" << std::endl;
    return env.Null();
}

Napi::Value QWidgetWrapper::SetLayout(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::cout << "Setting layout on QWidget" << std::endl;
    
    // Try to unwrap as QHBoxLayout
    QHBoxLayoutWrapper* hboxLayout = Napi::ObjectWrap<QHBoxLayoutWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (hboxLayout) {
        instance->setLayout(hboxLayout->GetInstance());
        std::cout << "HBoxLayout set successfully on QWidget" << std::endl;
        return env.Null();
    }
    
    // Try to unwrap as QVBoxLayout
    QVBoxLayoutWrapper* vboxLayout = Napi::ObjectWrap<QVBoxLayoutWrapper>::Unwrap(info[0].As<Napi::Object>());
    if (vboxLayout) {
        instance->setLayout(vboxLayout->GetInstance());
        std::cout << "VBoxLayout set successfully on QWidget" << std::endl;
        return env.Null();
    }
    
    Napi::TypeError::New(env, "Invalid layout type").ThrowAsJavaScriptException();
    return env.Null();
} 