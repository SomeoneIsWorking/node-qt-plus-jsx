#pragma once

#include <napi.h>
#include <QApplication>

class QApplicationWrapper : public Napi::ObjectWrap<QApplicationWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QApplicationWrapper(const Napi::CallbackInfo& info);
    ~QApplicationWrapper();

private:
    static Napi::FunctionReference constructor;
    ::QApplication* instance;
    
    Napi::Value Exec(const Napi::CallbackInfo& info);
}; 