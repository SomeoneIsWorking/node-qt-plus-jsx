#pragma once

#include <napi.h>
#include <QLineEdit>

class QLineEditWrapper : public Napi::ObjectWrap<QLineEditWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QLineEditWrapper(const Napi::CallbackInfo& info);
    ~QLineEditWrapper();
    QWidget* getWidget() { return lineEdit; }

private:
    static Napi::FunctionReference constructor;
    QLineEdit* lineEdit;
    Napi::Value textChanged(const Napi::CallbackInfo& info);
    Napi::Value setText(const Napi::CallbackInfo& info);
}; 