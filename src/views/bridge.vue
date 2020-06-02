<template>
  <div class="bridge-page">
    <h1>bridge</h1>
    <hr />
    <section>
      <h2>转换JSON</h2>
      <p class="line">
        <span>输入</span>
        <input type="text" placeholder="常规对象" v-model.trim="objInput" />
      </p>
      <p class="line">
        <span>输出</span>
        <input ref="copy" type="text" placeholder="JSON" v-model="JSONString" />
      </p>
    </section>
    <section>
      <h2>自定义桥接方法</h2>
      <p class="line">
        <span>key:</span>
        <input type="text" v-model.trim="fnType" placeholder="请输入桥接key" />
      </p>
      <p class="line">
        <span>H5参数:</span>
        <textarea v-model.trim="fnData" placeholder="注意为json格式，默认为null"></textarea>
      </p>
      <p class="line">
        <span>APP返回:</span>
        <textarea v-model.trim="fnRes"></textarea>
      </p>
      <button @click="callJsBridge">callHandle 测试</button>
    </section>
    <hr />
    <section>
      <h2>监听App方法</h2>
      <p class="line">
        <span>key:</span>
        <input type="text" v-model.trim="registerType" placeholder="请输入桥接key" />
      </p>
      <p class="line">
        <span>H5参数:</span>
        <textarea v-model.trim="registerData" placeholder="注意为json格式，默认为null"></textarea>
      </p>
      <p class="line">
        <span>APP返回:</span>
        <textarea v-model.trim="registerRes"></textarea>
      </p>
      <button @click="resgiterJsBridge">registerHandle 测试</button>
    </section>
    <hr />
    <section>
      <h2>H5打开APP本地页面</h2>
      <p class="line">
        <span>url</span>
        <input type="text" v-model.trim="app_url" />
      </p>
      <br />
      <button @click="goAppPath">跳转</button>
    </section>
    <hr />
  </div>
</template>

<script>
export default {
  name: "bridge-page",
  data() {
    return {
      objInput: "",
      viewWillAppear: "",
      fnType: "",
      fnData: "",
      fnRes: "",
      registerType: "",
      registerData: "",
      registerRes: "",
      // H5打开APP本地页面
      app_url: ""
    };
  },
  computed: {
    JSONString() {
      try {
        return JSON.stringify(this.objInput);
      } catch (err) {
        return err;
      }
    }
  },
  created() {
    this.bindViewAppear();
  },
  methods: {
    bindViewAppear() {
      this.$bridge.registerHandler("viewWillAppear", function(data) {
        this.viewWillAppear = data;
      });
    },
    async callJsBridge() {
      if (!this.fnType) {
        return this.$Toast("请输入key");
      }
      let params = null;
      if (this.fnData) {
        params = JSON.parse(this.fnData);
      }
      let res = await this.$bridge.call(this.fnType, params);
      console.log(res);
      if (res) {
        this.fnRes = JSON.stringify(res);
      }
    },
    async resgiterJsBridge() {
      if (!this.registerType) {
        return this.$Toast("请输入监听type");
      }
      this.$bridge.registerHandler(this.registerType, function(data) {
        this.registerRes = data;
        alert(data);
      });
    },
    goAppPath() {
      this.$bridge.call("router_app", {
        type: this.app_url
      });
    }
  }
};
</script>

<style lang="less" scoped>
section {
  margin: 30px 0;
  font-size: 32px;
  h2 {
    margin-bottom: 30px;
  }
  .line {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    span {
      width: 200px;
      min-width: 200px;
      text-align: center;
      margin-right: 30px;
    }
  }
}
textarea,
input[type*="text"] {
  border: 2px solid #000;
  width: 800px;
  border-radius: 16px;
  font-size: 40px;
  padding: 20px;
}
textarea {
  min-height: 200px;
}
h2,
button {
  margin-left: 30px;
  padding: 20px;
  border-radius: 10px;
}
</style>
