#pragma once
#include "base.h"

class QWidgetWrapper : public Napi::ObjectWrap<QWidgetWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QWidgetWrapper(const Napi::CallbackInfo& info);
    ~QWidgetWrapper();
    QWidget* getWidget();

protected:
    QWidget* widget;

private:
    Napi::Value SetLayout(const Napi::CallbackInfo& info);
    Napi::Value Show(const Napi::CallbackInfo& info);
    Napi::Value SetWindowTitle(const Napi::CallbackInfo& info);
    Napi::Value Resize(const Napi::CallbackInfo& info);
}; 