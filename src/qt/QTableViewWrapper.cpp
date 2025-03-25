#include "QTableViewWrapper.h"

Napi::FunctionReference QTableViewWrapper::constructor;

Napi::Object QTableViewWrapper::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "QTableView", {
        InstanceMethod("setModel", &QTableViewWrapper::SetModel),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("QTableView", func);
    return exports;
}

QTableViewWrapper::QTableViewWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<QTableViewWrapper>(info) {
    instance = new ::QTableView();
}

QTableViewWrapper::~QTableViewWrapper() {
    delete instance;
}

Napi::Value QTableViewWrapper::SetModel(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::Object obj = info[0].As<Napi::Object>();
    if (!obj.Has("_instance")) {
        Napi::TypeError::New(env, "Invalid model").ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::External<::QAbstractItemModel> model = obj.Get("_instance").As<Napi::External<::QAbstractItemModel>>();
    instance->setModel(model.Data());
    
    return env.Null();
} 