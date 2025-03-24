#include "qwidget.h"
#include "qlabel.h"
#include "qvboxlayout.h"
#include "qapplication.h"
#include "qpushbutton.h"
#include "qlineedit.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    QWidgetWrapper::Init(env, exports);
    QVBoxLayoutWrapper::Init(env, exports);
    QLabelWrapper::Init(env, exports);
    QApplicationWrapper::Init(env, exports);
    QPushButtonWrapper::Init(env, exports);
    QLineEditWrapper::Init(env, exports);
    return exports;
}

NODE_API_MODULE(node_qt, Init) 