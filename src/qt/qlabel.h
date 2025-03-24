#pragma once
#include "base.h"
#include "qwidget.h"

class QLabelWrapper : public Napi::ObjectWrap<QLabelWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QLabelWrapper(const Napi::CallbackInfo& info);
    ~QLabelWrapper();
    QLabel* getLabel();

private:
    Napi::Value SetText(const Napi::CallbackInfo& info);
    Napi::Value Show(const Napi::CallbackInfo& info);
    Napi::Value SetParent(const Napi::CallbackInfo& info);
    QLabel* label;
}; 