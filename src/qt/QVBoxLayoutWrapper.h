#pragma once

#include <napi.h>
#include <QVBoxLayout>

class QVBoxLayoutWrapper : public Napi::ObjectWrap<QVBoxLayoutWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QVBoxLayoutWrapper(const Napi::CallbackInfo& info);
    ~QVBoxLayoutWrapper();

    ::QVBoxLayout* GetInstance() { return instance; }
    Napi::Value AddWidget(const Napi::CallbackInfo& info);
    Napi::Value AddLayout(const Napi::CallbackInfo& info);

private:
    static Napi::FunctionReference constructor;
    ::QVBoxLayout* instance;
    Napi::Env env_;
}; 