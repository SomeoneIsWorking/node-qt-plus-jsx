#pragma once

#include <napi.h>
#include <QLayout>

class QLayoutWrapper : public Napi::ObjectWrap<QLayoutWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QLayoutWrapper(const Napi::CallbackInfo& info);
    ~QLayoutWrapper();

    ::QLayout* GetInstance() { return instance; }

protected:
    ::QLayout* instance;
    Napi::Value AddWidget(const Napi::CallbackInfo& info);
    Napi::Value AddLayout(const Napi::CallbackInfo& info);

private:
    static Napi::FunctionReference constructor;
}; 