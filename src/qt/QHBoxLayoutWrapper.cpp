#include "QHBoxLayoutWrapper.h"
#include "QWidgetWrapper.h"

Napi::FunctionReference QHBoxLayoutWrapper::constructor;

Napi::Object QHBoxLayoutWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);

    Napi::Function func = DefineClass(env, "QHBoxLayout", {
        InstanceMethod("addWidget", &QHBoxLayoutWrapper::AddWidget),
        InstanceMethod("addLayout", &QHBoxLayoutWrapper::AddLayout),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QHBoxLayout", func);
    return exports;
}

QHBoxLayoutWrapper::QHBoxLayoutWrapper(const Napi::CallbackInfo& info) : QLayoutWrapper(info) {
    Napi::Env env = info.Env();
    Napi::HandleScope scope(env);

    QWidget* parent = nullptr;
    if (info.Length() > 0 && info[0].IsObject()) {
        QWidgetWrapper* parentWrapper = Napi::ObjectWrap<QWidgetWrapper>::Unwrap(info[0].As<Napi::Object>());
        if (parentWrapper) {
            parent = parentWrapper->GetInstance();
        }
    }

    instance = new ::QHBoxLayout(parent);
}

QHBoxLayoutWrapper::~QHBoxLayoutWrapper() {
    // Base class destructor will handle cleanup
} 