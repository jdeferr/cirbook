<script setup lang="ts">
import BookList from '@components/Molecules/BookListMolecule.vue'
import { useBookStore } from '@/stores/books'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = route.params.query as string
const bookStore = useBookStore()

if (query && query != '') bookStore.setQuery(query)
else bookStore.setQuery(null)

bookStore.getBooks()
</script>

<template>
  <main class="py-10">
    <section class="max-w-desktop mx-auto">
      <h4 class="font-title text-3xl text-center mb-10">Books</h4>
      <div data-test="loading-message" v-if="bookStore.isLoading">Loading books</div>
      <div
        class="grid grid-cols-4 gap-x-24 gap-y-10"
        v-else-if="!bookStore.isLoading && bookStore.allBooks.length > 0"
      >
        <template v-for="book in bookStore.allBooks" :key="book.id">
          <BookList :title="book.title" :author="book.author" :price="book.price" :id="book.id" />
        </template>
      </div>
      <div v-else>
        <p data-test="no-books-found-message">
          No books found:{{ bookStore.isLoading ? 'hol' : 'chau' }} {{ bookStore.getError }}
        </p>
      </div>
    </section>
  </main>
</template>
