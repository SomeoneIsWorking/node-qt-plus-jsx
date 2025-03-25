#pragma once

#include <napi.h>
#include <QLabel>

class QLabelWrapper : public Napi::ObjectWrap<QLabelWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QLabelWrapper(const Napi::CallbackInfo& info);
    ~QLabelWrapper();

    ::QLabel* GetInstance() { return instance; }

private:
    static Napi::FunctionReference constructor;
    ::QLabel* instance;

    Napi::Value SetText(const Napi::CallbackInfo& info);
    Napi::Value Text(const Napi::CallbackInfo& info);
}; 