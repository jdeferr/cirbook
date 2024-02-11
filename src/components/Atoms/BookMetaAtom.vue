<script setup lang="ts">
const props = defineProps<{
  label: string
  value?: string
}>()
</script>
<template>
  <p :data-test="`book-${label}`" class="text-author text-[12px] font-body uppercase">
    {{ label }}: {{ value }}
  </p>
</template>
