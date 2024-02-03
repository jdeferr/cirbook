<script setup lang="ts">
import BookList from '@components/Molecules/BookList.vue'
</script>

<template>
  <main class="py-10">
    <section class="max-w-desktop mx-auto">
      <h4 class="font-title text-3xl text-center mb-10">Books</h4>
      <div class="grid grid-cols-4 gap-x-24 gap-y-10">
        <BookList />
        <BookList />
        <BookList />
        <BookList />
        <BookList />
        <BookList />
        <BookList />
        <BookList />
        <BookList />
        <BookList />
        <BookList />
        <BookList />
      </div>
    </section>
  </main>
</template>
