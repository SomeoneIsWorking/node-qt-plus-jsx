#pragma once
#include "base.h"
#include "qwidget.h"
#include "qlabel.h"

class QVBoxLayoutWrapper : public Napi::ObjectWrap<QVBoxLayoutWrapper>, public QLayoutWrapper {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QVBoxLayoutWrapper(const Napi::CallbackInfo& info);
    ~QVBoxLayoutWrapper();
    QLayout* getLayout() override;

private:
    Napi::Value AddWidget(const Napi::CallbackInfo& info);
    Napi::Value AddLayout(const Napi::CallbackInfo& info);
    QVBoxLayout* layout;
}; 