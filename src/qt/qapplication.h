#pragma once
#include "base.h"

class QApplicationWrapper : public Napi::ObjectWrap<QApplicationWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QApplicationWrapper(const Napi::CallbackInfo& info);
    ~QApplicationWrapper();

private:
    Napi::Value Exec(const Napi::CallbackInfo& info);
    QApplication* app;
}; 