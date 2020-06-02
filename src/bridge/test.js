// 注册
const native = {};
native.JSBridge = callback => {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback]; // 创建一个 WVJBCallbacks 全局属性数组，并将 callback 插入到数组中。
  var WVJBIframe = document.createElement("iframe"); // 创建一个 iframe 元素
  WVJBIframe.style.display = "none"; // 不显示
  WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__"; // 设置 iframe 的 src 属性
  document.documentElement.appendChild(WVJBIframe); // 把 iframe 添加到当前文导航上。
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};
// 普通返回按钮
native.back_btn = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler(
        "back",
        JSON.stringify({
          // token: obj.token
        }),
        dataFromOC => {
          resolve(JSON.parse(dataFromOC));
        }
      );
    });
  });
};
// 照相机
native.camera = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler(
        "get_image",
        JSON.stringify({
          count: obj.count,
          type: obj.type,
          crop: obj.crop,
          isCamera: obj.isCamera
        }),
        dataFromOC => {
          resolve(JSON.parse(dataFromOC));
        }
      );
    });
  });
};
export default native;
