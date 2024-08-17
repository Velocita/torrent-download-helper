<script setup lang="ts">
import { computed } from "vue";
import { store } from "../store";

const total = computed(() => store.all.length);

const isChecked = computed(
  () => total.value !== 0 && total.value === store.selected.length
);

const isIndeterminate = computed(
  () =>
    total.value !== 0 &&
    store.selected.length > 0 &&
    store.selected.length < total.value
);

function onClick() {
  if (isChecked.value) {
    store.clear();
  } else {
    store.selectAll();
  }
}
</script>

<template>
  <input
    type="checkbox"
    :checked="isChecked"
    :indeterminate="isIndeterminate"
    @click="onClick"
  />
</template>

<style lang="scss"></style>
