<script setup lang="ts">
import type { BookWidget } from '@/entities/book'
import BookCoverAtom from '@/components/Atoms/BookCoverAtom.vue'

const props = defineProps<BookWidget>()

const formatTitle = (title: string) => title.toLowerCase().replace(/\s+/g, '-')

const bookLink = `/book/${props.id}-${formatTitle(props.title)}`
</script>

<template>
  <router-link :to="bookLink">
    <article class="flex flex-col gap-y-3 fade">
      <div class="book-bg w-full flex items-center p-8 md:p-10 lg:p-12 aspect-square">
        <BookCoverAtom class="text-sm lg:text-sm" />
      </div>
      <div class="flex justify-between w-full">
        <div>
          <h5 class="font-body font-medium text-lg truncate-2-lines overflow-hidden">
            {{ props.title }}
          </h5>
          <p class="text-author text-[10px] font-body">{{ props.author }}</p>
        </div>
        <div class="w-auto">
          <span
            class="block font-price bg-secondary-100 text-complementary font-light text-sm text-nowrap rounded-3xl px-2 py-1"
            >{{ props.price }} NZD</span
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
