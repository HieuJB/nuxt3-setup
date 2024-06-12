<template>
  <button class="base-button" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@import 'assetStyle/common/BaseButton.scss';
</style>
