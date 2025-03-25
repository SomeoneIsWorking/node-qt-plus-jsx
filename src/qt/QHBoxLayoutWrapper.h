#pragma once

#include <napi.h>
#include <QHBoxLayout>

class QHBoxLayoutWrapper : public Napi::ObjectWrap<QHBoxLayoutWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QHBoxLayoutWrapper(const Napi::CallbackInfo& info);
    ~QHBoxLayoutWrapper();

    ::QHBoxLayout* GetInstance() { return instance; }
    Napi::Value AddWidget(const Napi::CallbackInfo& info);
    Napi::Value AddLayout(const Napi::CallbackInfo& info);
    Napi::Value RemoveWidget(const Napi::CallbackInfo& info);
    Napi::Value RemoveLayout(const Napi::CallbackInfo& info);
    Napi::Value DeleteLater(const Napi::CallbackInfo& info);

private:
    static Napi::FunctionReference constructor;
    ::QHBoxLayout* instance;
    Napi::Env env_;
}; 