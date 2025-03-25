#pragma once

#include <napi.h>
#include <QWidget>

class QWidgetWrapper : public Napi::ObjectWrap<QWidgetWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QWidgetWrapper(const Napi::CallbackInfo& info);
    ~QWidgetWrapper();

    ::QWidget* GetInstance() { return instance; }

private:
    static Napi::FunctionReference constructor;
    ::QWidget* instance;
    
    Napi::Value SetWindowTitle(const Napi::CallbackInfo& info);
    Napi::Value Show(const Napi::CallbackInfo& info);
    Napi::Value SetLayout(const Napi::CallbackInfo& info);
    Napi::Value Resize(const Napi::CallbackInfo& info);
}; 