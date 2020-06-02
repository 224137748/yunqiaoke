import listener from "./listener";
export default class IosBridge {
  constructor() {
    // 存储 bridge
    this.M = null;
    this.init();
  }
  // 初始化 bridge
  init() {
    var me = this;
    this.setupWebViewJavascriptBridge(function(bridge) {
      me.M = bridge;
      me.invokeReady();
    });
  }
  // bridge 初始化完成，执行 ready 函数
  invokeReady() {
    this.isReady = true;
    console.log("bridge ready", this.M);
    listener.invoke("yunqiaoke.bridge.ready", this);
  }
  // H5 打开的时候,bridge没有初始化，则添加对应事件，初始化完成后执行对应的回调
  ready(fn) {
    if (this.isReady) fn(this);
    else listener.add("yunqiaoke.bridge.ready", fn);
  }
  setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    // 创建一个 WVJBCallbacks 全局属性数组，并将 callback 插入到数组中。
    window.WVJBCallbacks = [callback];
    // 创建一个 iframe 元素
    var WVJBIframe = document.createElement("iframe");
    // 不显示
    WVJBIframe.style.display = "none";
    // 设置 iframe 的 src 属性
    WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
    document.documentElement.appendChild(WVJBIframe);
    // 把 iframe 添加到当前文导航上。
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }
  /**
   * 和IOS直接桥接方法
   * @param {*} name
   * @param {*} data
   */
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
  //  这里主要是注册 OC 将要调用的 JS 方法。
  //     bridge.registerHandler('testJavaScriptFunction',function(data,responseCallback){
  //         // data 是 OC 传递过来的数据.
  //         // responseCallback 是 JS 调用完毕之后传递给 OC 的数据
  //         alert("JS 被 OC 调用了.");
  //         responseCallback({data: "js 的数据",from : "JS"});
  //     })
  // 1、testJavaScriptFunction 是注入到桥梁中 JS 函数的别名。以供 OC 端调用。
  // 回调函数的
  // 2、data。 既然 JS 函数由 OC 调用，所以 data 是 OC 端传递过来的数据。
  // responseCallback 。
  // 3、JS 调用在被 OC 调用完毕之后，向 OC 端传递的数据。

  registerHandler(name, callback) {
    return new Promise((resolve, reject) => {
      this.ready(async () => {
        this.M.registerHandler(name, callback);
      });
    });
  }
}
