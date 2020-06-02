<template>
  <div v-show="show">
    <div class="drawer-shadow" @touchend.prevent="hide"></div>
    <div class="drawer-content"><slot name="slot"></slot></div>
  </div>
</template>

<script>
export default {
  name: "drawer",
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      show: this.visible
    };
  },
  methods: {
    hide () {
      this.show = false;
      this.$emit('close');
    }
  },
  watch: {
    visible(val) {
      this.show = val;
    }
  }
};
</script>
<style>
.drawer-shadow { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000; opacity: 0; animation: light .3s; animation-fill-mode: forwards; }
.drawer-content { position: fixed; height: 100%; right: -7.466667rem; top: 0; background-color: #fff; width: 7.466667rem; z-index: 2; animation: rtld .3s; animation-fill-mode: forwards; }
@keyframes light {
  from { opacity: 0; }
  to { opacity: .3; }
}
@keyframes rtld {
  from { right: -7.466667rem; }
  to { right: 0; }
}
</style>
