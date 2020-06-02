import listener from "./listener";
export default class AandroidBridge {
  constructor() {
    this.M = null;
    this.init();
  }
  init() {
    var me = this;
    this.connectJSBridge(bridge => {
      me.M = bridge;
      // android 不先 init，无法触发回调
      me.M.init();
      me.invokeReady();
    });
  }

  // H5 打开的时候,bridge没有初始化，则添加对应事件，初始化完成后执行对应的回调
  ready(fn) {
    if (this.isReady) fn(this);
    else listener.add("yunqiaoke.bridge.ready", fn);
  }
  // bridge 初始化完成，执行 ready 函数
  invokeReady() {
    this.isReady = true;
    console.log("bridge ready", this.M);
    listener.invoke("yunqiaoke.bridge.ready", this);
  }
  connectJSBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function() {
          callback(window.WebViewJavascriptBridge);
        },
        false
      );
    }
  }

  call(name, data) {
    if (!data) data = {};
    data = JSON.stringify(data);
    return new Promise(async (resolve, reject) => {
      this.ready(async () => {
        // 将this指向当前 iosBridge
        this.M.callHandler(name, data, res => {
          // console.log("response", res);
          if (typeof res === "string") {
            res = JSON.parse(res);
          }
          resolve(res);
        });
      });
    });
  }

  registerHandler(name, callback) {
    return new Promise((resolve, reject) => {
      this.ready(async () => {
        this.M.registerHandler(name, callback);
      });
    });
  }
}
