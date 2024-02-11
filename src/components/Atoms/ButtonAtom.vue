<script setup lang="ts">
import { ButtonTypeEnum } from '../../entities/ui'
const props = defineProps<{
  type?: ButtonTypeEnum
  class?: string
}>()

const emits = defineEmits(['click'])
const classes: any = {
  default: 'bg-complementary text-white',
  primary: 'bg-primary-500 text-complementary',
  secondary: 'bg-secondary-600 text-primary-100',
  disable: 'bg-gray-300 text-gray-500'
}

const handleClick = () => {
  emits('click')
}
</script>
<template>
  <button
    data-test="purchase-button"
    :class="`${props.class} ${props.type ? classes[props.type] : classes['default']} font-button shadow-xl rounded-full py-2 px-3 lg:py-3 lg:px-4 text-xs md:text-lg lg:text-xl text-body `"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
