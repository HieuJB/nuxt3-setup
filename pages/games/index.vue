<script setup lang="ts">
/*
- example
- todo
*/
import Desktop from '@/components/desktop/index.vue'
import Mobile from '@/components/mobile/index.vue'
const { isMobileOrTablet } = useDevice()
</script>
<template>
  <component :is="isMobileOrTablet ? Mobile : Desktop" />
</template>
