<script setup lang="ts">
import Paginate from 'vuejs-paginate-next'
const props = defineProps({
  pageRange: {
    type: Number,
    default: 3
  },
  totalItem: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['on-change-page'])

const totalPage = computed(() => {
  return Math.ceil(props.totalItem / props.pageRange)
})

const onChangePage = (pageNum: number) => {
  emit('on-change-page', pageNum)
}
</script>
<template>
  <Paginate
    v-if="totalPage > 1"
    v-bind="$attrs"
    :page-count="totalPage"
    :page-range="3"
    :initial-page="currentPage"
    :force-page="currentPage"
    :prev-text="``"
    :next-text="``"
    :click-handler="onChangePage"
    :container-class="'pagination base-pagination'"
    :page-class="'page-item'">
  </Paginate>
</template>

<style scoped lang="scss"></style>
