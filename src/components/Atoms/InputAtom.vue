<script setup lang="ts">
const props = defineProps<{
  type: string
  placeholder: string
  class?: string
}>()

const emits = defineEmits(['onKeyPressed', 'onChange'])

const onKeyPressed = ($event: any) => {
  if ($event.key === 'Enter') {
    emits('onKeyPressed', $event.target.value)
  }
}

const onChange = ($event: any) => {
  emits('onChange', $event.target.value)
}
</script>

<template>
  <input
    :type="props.type"
    :placeholder="props.placeholder"
    :class="`${props.class ? props.class : ''} rounded-full w-[400px] py-2 px-5 font-extralight max-w-full`"
    @keypress="onKeyPressed"
    @change="onChange"
  />
</template>
