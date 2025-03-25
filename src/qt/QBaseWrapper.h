#pragma once

#include <napi.h>

template<typename T>
class QBaseWrapper : public Napi::ObjectWrap<QBaseWrapper<T>> {
public:
    QBaseWrapper(const Napi::CallbackInfo& info) 
        : Napi::ObjectWrap<QBaseWrapper<T>>(info), instance(nullptr) {}
    
    virtual ~QBaseWrapper() {
        if (instance) {
            // Don't delete the instance here as it's owned by the parent widget
            instance = nullptr;
        }
    }

    T* GetInstance() { return instance; }

protected:
    static Napi::FunctionReference constructor;
    T* instance;
}; 