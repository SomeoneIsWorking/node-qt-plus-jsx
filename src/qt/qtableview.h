#pragma once

#include <napi.h>
#include <QTableView>

class QTableView : public Napi::ObjectWrap<QTableView> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    QTableView(const Napi::CallbackInfo& info);
    ~QTableView();

private:
    static Napi::FunctionReference constructor;
    ::QTableView* _qTableView;
}; 