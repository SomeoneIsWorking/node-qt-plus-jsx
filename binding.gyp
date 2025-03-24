{
  "targets": [{
    "target_name": "node-qt",
    "sources": [
      "src/qt/module.cc",
      "src/qt/qwidget.cc",
      "src/qt/qlabel.cc",
      "src/qt/qvboxlayout.cc",
      "src/qt/qapplication.cc",
      "src/qt/qpushbutton.cc",
      "src/qt/qlineedit.cc"
    ],
    "include_dirs": [
      "<!@(node -p \"require('node-addon-api').include\")",
      "/usr/local/include",
      "/opt/homebrew/include",
      "/opt/homebrew/opt/qt@6/include",
      "/opt/homebrew/opt/qt@6/include/QtCore",
      "/opt/homebrew/opt/qt@6/include/QtGui",
      "/opt/homebrew/opt/qt@6/include/QtWidgets"
    ],
    "libraries": [
      "-L/opt/homebrew/lib",
      "-L/opt/homebrew/opt/qt@6/lib",
      "-F/opt/homebrew/opt/qt@6/lib",
      "-framework QtWidgets",
      "-framework QtGui",
      "-framework QtCore"
    ],
    "dependencies": [
      "<!(node -p \"require('node-addon-api').gyp\")"
    ],
    "defines": [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    "cflags!": [ '-fno-exceptions', '-fno-rtti' ],
    "cflags_cc!": [ '-fno-exceptions', '-fno-rtti' ],
    "xcode_settings": {
      "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
      "GCC_ENABLE_CPP_RTTI": "YES",
      "CLANG_CXX_LIBRARY": "libc++",
      "MACOSX_DEPLOYMENT_TARGET": "10.7",
      "OTHER_CFLAGS": [ '-std=c++17', '-frtti' ]
    },
    "msvs_settings": {
      "VCCLCompilerTool": {
        "ExceptionHandling": 1,
        "RuntimeTypeInfo": "true"
      }
    },
    "conditions": [
      ['OS=="mac"', {
        "xcode_settings": {
          "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
          "CLANG_CXX_LIBRARY": "libc++",
          "MACOSX_DEPLOYMENT_TARGET": "10.7",
          "OTHER_CFLAGS": [ "-std=c++17" ]
        }
      }]
    ]
  },
  {
    "target_name": "nothing",
    "sources": []
  }]
} 