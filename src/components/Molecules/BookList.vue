<script setup lang="ts">
import cover from '@/assets/cover.png'
</script>

<template>
  <router-link to="/book/1-harry-potter-and-phiolofo">
    <article class="flex flex-col gap-y-2">
      <div class="book-bg p-12 aspect-square">
        <img
          :src="cover"
          alt="Harry Potter and the Philosopher’s Stone"
          class="w-full overflow-hidden rounded-xl shadow-lg"
        />
      </div>
      <div class="flex justify-between w-full">
        <div>
          <h5 class="font-body font-medium text-lg truncate-2-lines overflow-hidden">
            Harry Potter and the Philosopher’s Stone
          </h5>
          <p class="text-author text-[10px] font-body">J.K. ROWLING</p>
        </div>
        <div>
          <span
            class="block font-price bg-secondary-100 text-complementary font-light text-sm text-nowrap rounded-3xl px-2 py-1"
            >99,10 NZD</span
          >
        </div>
      </div>
    </article>
  </router-link>
</template>

<style scoped>
.book-bg {
  background: var(--bg-book-color);
  background: radial-gradient(circle, #ffffff 0%, #dedede 100%);
}

.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
