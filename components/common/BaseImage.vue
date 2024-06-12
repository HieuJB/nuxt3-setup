<template>
  <img v-bind="$attrs" :src="imageUrl" :alt="altText" @error="handleImageError" />
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Image'
  },
  defaultSrc: {
    type: String,
    default: '/default-image.jpg' // Đường dẫn đến ảnh mặc định
  }
})

const handleImageError = () => {
  imageUrl.value = props.defaultSrc
}

const imageUrl = ref(props.src)
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
