{
  "targets": [{
    "target_name": "node-qt",
    "sources": [
      "src/qt/binding.cpp",
      "src/qt/QApplicationWrapper.cpp",
      "src/qt/QWidgetWrapper.cpp",
      "src/qt/QLabelWrapper.cpp",
      "src/qt/QLineEditWrapper.cpp",
      "src/qt/QTableViewWrapper.cpp",
      "src/qt/QHBoxLayoutWrapper.cpp",
      "src/qt/QVBoxLayoutWrapper.cpp",
      "src/qt/QPushButtonWrapper.cpp"
    ],
    "include_dirs": [
      "<!@(node -p \"require('node-addon-api').include\")"
    ],
    "libraries": [],
    "dependencies": [
      "<!(node -p \"require('node-addon-api').gyp\")"
    ],
    "cflags!": [ "-fno-exceptions" ],
    "cflags_cc!": [ "-fno-exceptions" ],
    "xcode_settings": {
      "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
      "CLANG_CXX_LIBRARY": "libc++",
      "MACOSX_DEPLOYMENT_TARGET": "14.0"
    },
    "msvs_settings": {
      "VCCLCompilerTool": { "ExceptionHandling": 1 }
    },
    "conditions": [
      ['OS=="mac"', {
        "variables": {
          "qt_prefix": "<!(brew --prefix qt)"
        },
        "include_dirs": [
          "/opt/homebrew/include",
          "<(qt_prefix)/lib/QtCore.framework/Headers",
          "<(qt_prefix)/lib/QtGui.framework/Headers",
          "<(qt_prefix)/lib/QtWidgets.framework/Headers"
        ],
        "libraries": [
          "-F<(qt_prefix)/lib",
          "-framework QtWidgets",
          "-framework QtGui",
          "-framework QtCore"
        ],
        "cflags+": ["-fvisibility=hidden"]
      }],
      ['OS=="linux"', {
        "include_dirs": [
          "<!@(pkg-config --cflags-only-I Qt6Core Qt6Gui Qt6Widgets | sed 's/-I//g')"
        ],
        "libraries": [
          "<!@(pkg-config --libs Qt6Core Qt6Gui Qt6Widgets)"
        ]
      }],
      ['OS=="win"', {
        "variables": {
          "qt_headers": "<!(qmake -query QT_INSTALL_HEADERS)",
          "qt_libs": "<!(qmake -query QT_INSTALL_LIBS)"
        },
        "include_dirs": [
          "<(qt_headers)/QtCore",
          "<(qt_headers)/QtGui",
          "<(qt_headers)/QtWidgets"
        ],
        "libraries": [
          "-L<(qt_libs)",
          "-lQt6Core",
          "-lQt6Gui",
          "-lQt6Widgets"
        ]
      }]
    ]
  },
  {
    "target_name": "nothing",
    "sources": []
  }]
} 