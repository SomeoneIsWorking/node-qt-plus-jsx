#pragma once

#include <napi.h>
#include <QHBoxLayout>

class QHBoxLayoutWrapper : public Napi::ObjectWrap<QHBoxLayoutWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    static Napi::Object New(Napi::Env env, QHBoxLayout* layout);
    QHBoxLayoutWrapper(const Napi::CallbackInfo& info);
    ~QHBoxLayoutWrapper();

    ::QHBoxLayout* GetInstance() { return instance; }
    Napi::Value AddWidget(const Napi::CallbackInfo& info);
    Napi::Value AddLayout(const Napi::CallbackInfo& info);
    Napi::Value RemoveWidget(const Napi::CallbackInfo& info);
    Napi::Value RemoveItem(const Napi::CallbackInfo& info);
    Napi::Value DeleteLater(const Napi::CallbackInfo& info);
    Napi::Value Invalidate(const Napi::CallbackInfo& info);

private:
    static Napi::FunctionReference constructor;
    ::QHBoxLayout* instance;
    Napi::Env env_;
}; 