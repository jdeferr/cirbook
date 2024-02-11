<script setup lang="ts">
const props = defineProps<{
  title: string
  class?: string
}>()
</script>
<template>
  <h5
    class="`${class} font-body font-medium text-xl lg:leading-tight lg:text-[40px] truncate-2-lines overflow-hidden text-wrap`"
  >
    {{ props.title }}
  </h5>
</template>
