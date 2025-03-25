#pragma once

#include <napi.h>
#include <QPushButton>

class QPushButtonWrapper : public Napi::ObjectWrap<QPushButtonWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QPushButtonWrapper(const Napi::CallbackInfo& info);
    ~QPushButtonWrapper();

    ::QPushButton* GetInstance() { return instance; }
    Napi::Value SetText(const Napi::CallbackInfo& info);
    Napi::Value Clicked(const Napi::CallbackInfo& info);

private:
    static Napi::FunctionReference constructor;
    ::QPushButton* instance;
    Napi::Env env_;

    Napi::Value DeleteLater(const Napi::CallbackInfo& info);
}; 