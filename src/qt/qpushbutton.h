#pragma once

#include <napi.h>
#include <QPushButton>

class QPushButtonWrapper : public Napi::ObjectWrap<QPushButtonWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QPushButtonWrapper(const Napi::CallbackInfo& info);
    ~QPushButtonWrapper();
    QWidget* getWidget() { return button; }

private:
    static Napi::FunctionReference constructor;
    QPushButton* button;
    Napi::Value clicked(const Napi::CallbackInfo& info);
    Napi::Value setText(const Napi::CallbackInfo& info);
}; 