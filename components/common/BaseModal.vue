<template>
  <div v-if="isShow" class="modal show d-block fade" v-bind="$attrs" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: String
})

const isShow = computed(() => {
  return useModal().modalId.value === props.id
})
</script>

<style scoped lang="scss">
.modal {
  background: rgb(33, 37, 41, 0.5);
}
</style>
