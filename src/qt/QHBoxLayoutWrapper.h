#pragma once

#include "QLayoutWrapper.h"
#include <QHBoxLayout>

class QHBoxLayoutWrapper : public QLayoutWrapper {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QHBoxLayoutWrapper(const Napi::CallbackInfo& info);
    ~QHBoxLayoutWrapper();

    using QLayoutWrapper::AddWidget;
    using QLayoutWrapper::AddLayout;

private:
    static Napi::FunctionReference constructor;
}; 