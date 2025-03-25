#pragma once

#include <napi.h>
#include <QTableView>
#include <QAbstractItemModel>

class QTableViewWrapper : public Napi::ObjectWrap<QTableViewWrapper> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QTableViewWrapper(const Napi::CallbackInfo& info);
    ~QTableViewWrapper();

    ::QTableView* GetInstance() { return instance; }

private:
    static Napi::FunctionReference constructor;
    ::QTableView* instance;

    Napi::Value SetModel(const Napi::CallbackInfo& info);
}; 