#include "QVBoxLayoutWrapper.h"
#include "QWidgetWrapper.h"

Napi::FunctionReference QVBoxLayoutWrapper::constructor;

Napi::Object QVBoxLayoutWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);

    Napi::Function func = DefineClass(env, "QVBoxLayout", {
        InstanceMethod("addWidget", &QVBoxLayoutWrapper::AddWidget),
        InstanceMethod("addLayout", &QVBoxLayoutWrapper::AddLayout),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QVBoxLayout", func);
    return exports;
}

QVBoxLayoutWrapper::QVBoxLayoutWrapper(const Napi::CallbackInfo& info) : QLayoutWrapper(info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    QWidget* parent = nullptr;
    if (info.Length() > 0 && info[0].IsObject()) {
        QWidgetWrapper* parentWrapper = Napi::ObjectWrap<QWidgetWrapper>::Unwrap(info[0].As<Napi::Object>());
        if (parentWrapper) {
            parent = parentWrapper->GetInstance();
        }
    }

    instance = new ::QVBoxLayout(parent);
}

QVBoxLayoutWrapper::~QVBoxLayoutWrapper() {
    // Base class destructor will handle cleanup
} 