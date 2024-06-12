<script setup lang="ts">
import { useField } from 'vee-validate'
import { useAttrs } from 'vue'
import { REGEX_REMOVE_TRIM } from '@/constants/regex'
defineProps({
  icon: {
    type: String,
    default: ''
  },
  type: String,
  modelValue: String
})

const { errorMessage, value, handleChange } = useField(() => String(useAttrs().name), undefined, {
  syncVModel: true
})

const handleBlur = () => {
  if (value.value) {
    value.value = String(value.value).replace(REGEX_REMOVE_TRIM, '')
  }
}
</script>
<template>
  <div class="base-input">
    <div :class="['base-input__form', { 'base-input__form-error': errorMessage }]">
      <label v-if="$attrs.label">{{ $attrs.label }}</label>
      <div :class="['base-input__form-input']">
        <input :value="value" v-bind="$attrs" :type="type ?? 'text'" @input="handleChange" @blur="handleBlur" />
        <nuxt-icon v-if="icon" @click="$emit('onClickIcon')" class="base-input__icon" :name="String(icon)" filled />
      </div>
    </div>
    <div v-if="errorMessage" class="base-input__error">{{ errorMessage }}</div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
