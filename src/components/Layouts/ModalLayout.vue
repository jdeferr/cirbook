<template>
  <div
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div
      @click="() => $emit('close')"
      class="w-full h-full absolute top-0 left-0 bg-black opacity-50"
    ></div>

    <slot />
  </div>
</template>
