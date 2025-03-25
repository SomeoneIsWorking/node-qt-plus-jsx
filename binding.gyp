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
      "src/qt/QLayoutWrapper.cpp",
      "src/qt/QHBoxLayoutWrapper.cpp",
      "src/qt/QVBoxLayoutWrapper.cpp"
    ],
    "include_dirs": [
      "<!@(node -p \"require('node-addon-api').include\")",
      "/opt/homebrew/include",
      "/opt/homebrew/Cellar/qt/6.8.2_1/lib/QtCore.framework/Headers",
      "/opt/homebrew/Cellar/qt/6.8.2_1/lib/QtGui.framework/Headers",
      "/opt/homebrew/Cellar/qt/6.8.2_1/lib/QtWidgets.framework/Headers"
    ],
    "libraries": [
      "-F/opt/homebrew/Cellar/qt/6.8.2_1/lib",
      "-framework QtWidgets",
      "-framework QtGui",
      "-framework QtCore"
    ],
    "dependencies": [
      "<!(node -p \"require('node-addon-api').gyp\")"
    ],
    "cflags!": [ "-fno-exceptions" ],
    "cflags_cc!": [ "-fno-exceptions" ],
    "xcode_settings": {
      "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
      "CLANG_CXX_LIBRARY": "libc++",
      "MACOSX_DEPLOYMENT_TARGET": "10.7"
    },
    "msvs_settings": {
      "VCCLCompilerTool": { "ExceptionHandling": 1 }
    },
    "conditions": [
      ['OS=="mac"', {
        "cflags+": ["-fvisibility=hidden"]
      }]
    ]
  },
  {
    "target_name": "nothing",
    "sources": []
  }]
} 