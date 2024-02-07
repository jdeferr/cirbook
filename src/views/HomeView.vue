<script setup lang="ts">
import BookList from '@components/Molecules/BookListMolecule.vue'
import { useBookStore } from '@/stores/books'

const bookStore = useBookStore()
bookStore.getBooks()
</script>

<template>
  <main class="py-10">
    <section class="max-w-desktop mx-auto">
      <h4 class="font-title text-3xl text-center mb-10">Books</h4>
      <div v-if="bookStore.isLoading">Loading books</div>
      <div
        class="grid grid-cols-4 gap-x-24 gap-y-10"
        v-else-if="!bookStore.isLoading && bookStore.allBooks.length > 0"
      >
        <template v-for="book in bookStore.allBooks" :key="book.id">
          <BookList :title="book.title" :author="book.author" :price="book.price" :id="book.id" />
        </template>
      </div>
      <div v-else>
        <p>No books found: {{ bookStore.getError }}</p>
      </div>
    </section>
  </main>
</template>
