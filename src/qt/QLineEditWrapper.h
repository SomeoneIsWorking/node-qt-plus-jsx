#pragma once

#include <napi.h>
#include <QLineEdit>

class QLineEditWrapper : public Napi::ObjectWrap<QLineEditWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QLineEditWrapper(const Napi::CallbackInfo& info);
    ~QLineEditWrapper();

    ::QLineEdit* GetInstance() { return instance; }
    Napi::Value SetText(const Napi::CallbackInfo& info);
    Napi::Value TextChanged(const Napi::CallbackInfo& info);

private:
    static Napi::FunctionReference constructor;
    ::QLineEdit* instance;
    Napi::Env env_;

    Napi::Value Text(const Napi::CallbackInfo& info);
    Napi::Value DeleteLater(const Napi::CallbackInfo& info);
}; 