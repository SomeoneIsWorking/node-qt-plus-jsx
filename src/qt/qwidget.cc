#include "qwidget.h"

Napi::Object QWidgetWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "QWidget", {
        InstanceMethod("setLayout", &QWidgetWrapper::SetLayout),
        InstanceMethod("show", &QWidgetWrapper::Show),
        InstanceMethod("setWindowTitle", &QWidgetWrapper::SetWindowTitle),
        InstanceMethod("resize", &QWidgetWrapper::Resize),
    });

    exports.Set("QWidget", func);
    return exports;
}

QWidgetWrapper::QWidgetWrapper(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<QWidgetWrapper>(info) {
    widget = new QWidget();
}

QWidgetWrapper::~QWidgetWrapper() {
    delete widget;
}

QWidget* QWidgetWrapper::getWidget() { 
    return widget; 
}

Napi::Value QWidgetWrapper::SetLayout(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info[0].IsObject()) {
        QLayoutWrapper* layoutWrapper = dynamic_cast<QLayoutWrapper*>(
            Napi::ObjectWrap<Napi::ObjectWrap<QLayoutWrapper>>::Unwrap(info[0].As<Napi::Object>())
        );
        if (layoutWrapper) {
            widget->setLayout(layoutWrapper->getLayout());
        }
    }
    return env.Undefined();
}

Napi::Value QWidgetWrapper::Show(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    widget->show();
    return env.Undefined();
}

Napi::Value QWidgetWrapper::SetWindowTitle(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    std::string title = info[0].As<Napi::String>().Utf8Value();
    widget->setWindowTitle(QString::fromStdString(title));
    return env.Undefined();
}

Napi::Value QWidgetWrapper::Resize(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    int width = info[0].As<Napi::Number>().Int32Value();
    int height = info[1].As<Napi::Number>().Int32Value();
    widget->resize(width, height);
    return env.Undefined();
} 