<script setup lang="ts">
import { store } from "../store";

const { name } = defineProps<{ name: string }>();
</script>

<template>
  <div>
    <span class="toolbar-btn" @click="store.selectAll">全选</span>
    <span class="toolbar-btn" @click="store.inverse">反选</span>
    <span class="toolbar-btn" @click="store.clear">清空</span>
    <span class="toolbar-btn" @click="store.copy">复制</span>
  </div>
</template>

<style scoped>
.toolbar-btn {
  cursor: pointer;
}

.toolbar-btn + .toolbar-btn {
  margin-left: 8px;
}
</style>
