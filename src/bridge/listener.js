/**
 * 事件监听器
 * Icerain
 */
export default {
  fns: {},
  already: {},
  /**
   * 注册事件
   * @param {*} name
   * @param {*} fn
   */
  add(name, fn) {
    if (!this.fns[name]) this.fns[name] = [];
    this.fns[name].push(fn);
  },
  // 监听事件
  on(name, fn) {
    var ready = this.already[name];
    if (ready) {
      fn(ready.data);
    } else {
      this.add(name, fn);
    }
  },
  invoke(name, data) {
    let events = this.fns[name];
    if (!events) {
      this.already[name] = { data: data };
      return;
    }

    for (var k in events) {
      if (events[k]) {
        try {
          events[k](data);
        } catch (e) {
          console.log("回调函数[" + name + "]有异常,请排查:", e);
        }
      }
    }
  },
  off(name, fn) {
    if (!this.fns[name]) {
      return;
    }
    let fns = this.fns[name];
    for (let i = fns.length - 1; i >= 0; i--) {
      if (fns[i] === fn) {
        delete fns[i];
      }
    }
  },
  offAll(name) {
    this.fns[name] = [];
  }
};
