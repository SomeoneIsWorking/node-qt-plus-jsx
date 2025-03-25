#pragma once

#include "QLayoutWrapper.h"
#include <QVBoxLayout>

class QVBoxLayoutWrapper : public QLayoutWrapper {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QVBoxLayoutWrapper(const Napi::CallbackInfo& info);
    ~QVBoxLayoutWrapper();

    using QLayoutWrapper::AddWidget;
    using QLayoutWrapper::AddLayout;

private:
    static Napi::FunctionReference constructor;
}; 