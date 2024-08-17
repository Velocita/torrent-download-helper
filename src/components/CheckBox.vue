<script setup lang="ts">
import { computed } from "vue";
import { store } from "../store";

const { index, magnet } = defineProps<{ index: number; magnet: string }>();

const checked = computed(() => store.selected.includes(magnet));
</script>

<template>
  <input type="checkbox" :checked="checked" />
</template>

<style lang="scss"></style>
