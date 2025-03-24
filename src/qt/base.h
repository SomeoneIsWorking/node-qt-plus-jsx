#pragma once

#include <napi.h>
#include <QtWidgets/QApplication>
#include <QtWidgets/QWidget>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtCore/QObject>

// Forward declarations
class QWidgetWrapper;
class QLabelWrapper;
class QPushButtonWrapper;
class QLineEditWrapper;
class QVBoxLayoutWrapper;
class QHBoxLayoutWrapper;
class QApplicationWrapper;

// Base wrapper class for layouts
class QLayoutWrapper {
public:
    virtual QLayout* getLayout() = 0;
    virtual ~QLayoutWrapper() {}
}; 