#include <napi.h>
#include "QApplicationWrapper.h"
#include "QWidgetWrapper.h"
#include "QLabelWrapper.h"
#include "QLineEditWrapper.h"
#include "QTableViewWrapper.h"
#include "QHBoxLayoutWrapper.h"
#include "QVBoxLayoutWrapper.h"
#include "QPushButtonWrapper.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    QApplicationWrapper::Init(env, exports);
    QWidgetWrapper::Init(env, exports);
    QLabelWrapper::Init(env, exports);
    QLineEditWrapper::Init(env, exports);
    QTableViewWrapper::Init(env, exports);
    QHBoxLayoutWrapper::Init(env, exports);
    QVBoxLayoutWrapper::Init(env, exports);
    QPushButtonWrapper::Init(env, exports);
    
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init) 