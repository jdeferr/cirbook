<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="`${props.class} bg-secondary-300 place-content-center w-full overflow-hidden rounded-xl shadow-lg aspect-[2/3] flex items-center text-center font-title text-slate-100 text-3xl`"
  >
    <p>CIRBOOK<br />COVER</p>
  </div>
</template>
