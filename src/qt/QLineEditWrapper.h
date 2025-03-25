#pragma once

#include <napi.h>
#include <QLineEdit>

class QLineEditWrapper : public Napi::ObjectWrap<QLineEditWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QLineEditWrapper(const Napi::CallbackInfo& info);
    ~QLineEditWrapper();

    ::QLineEdit* GetInstance() { return instance; }

private:
    static Napi::FunctionReference constructor;
    ::QLineEdit* instance;

    Napi::Value SetText(const Napi::CallbackInfo& info);
    Napi::Value Text(const Napi::CallbackInfo& info);
}; 