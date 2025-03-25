#pragma once

#include <napi.h>
#include <QHBoxLayout>

class QHBoxLayout : public Napi::ObjectWrap<QHBoxLayout> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QHBoxLayout(const Napi::CallbackInfo& info);
    ~QHBoxLayout();

private:
    static Napi::FunctionReference constructor;
    ::QHBoxLayout* _qHBoxLayout;
    
    Napi::Value AddWidget(const Napi::CallbackInfo& info);
}; 