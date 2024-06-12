<template>
  <i @click="model = !model" :class="['fa', model ? 'fa-star' : 'fa-star-o']" aria-hidden="true"></i>
</template>

<script setup lang="ts">
const model = defineModel()
</script>

<style lang="scss" scoped></style>
