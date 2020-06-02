<template>
  <li>
    <div v-if="showType === 1">
      <mt-cell-swipe
        class="content-item"
        title="text"
        :right="[
    {
      content: '删除',
      style: { background: 'red', color: '#fff' },
      handler: () => editContentItem()
    }
  ]"
      >
        <slot slot="title" name="title"></slot>
        <slot></slot>
      </mt-cell-swipe>
    </div>
    <div v-if="showType === 2">
      <mt-cell-swipe class="content-item" title="text" :right="[]">
        <slot slot="title" name="title"></slot>
        <slot></slot>
      </mt-cell-swipe>
    </div>
    <div v-if="showType === 3">
      <mt-cell-swipe class="content-item" title="text" :right="[]">
        <slot slot="title" name="title"></slot>
        <slot></slot>
      </mt-cell-swipe>
    </div>
  </li>
</template>

<script>
export default {
  name: "content-item",
  props: {
    showType: {
      type: Number,
      default: 2
    },
    itemInfo: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  methods: {
    // 编辑内容
    editContentItem() {
      console.log("editContentItem");
    },
    // 上架内容
    async putOnlineContentItem() {
      console.log("putOnlineContentItem");
    },
    // 下架内容
    async putDownContentItem() {
      console.log("putDownContentItem");
    }
  }
};
</script>

<style></style>
