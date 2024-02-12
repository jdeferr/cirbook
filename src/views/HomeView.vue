<script setup lang="ts">
import BookList from '@components/Molecules/BookListMolecule.vue'
import BookListSkeleton from '@components/Molecules/BookListSkeletonMolecule.vue'
import { useBookStore } from '@/stores/books'
import { useRoute } from 'vue-router'
import GridBooksLayout from '@/components/Layouts/GridBooksLayout.vue'
import SectionTitle from '@/components/Atoms/SectionTitleAtom.vue'

const route = useRoute()
const query = route.query.search as string
const bookStore = useBookStore()

if (query && query != '') bookStore.setQuery(query)
else bookStore.setQuery(null)

bookStore.getBooks()
</script>

<template>
  <main class="py-10" v-if="bookStore">
    <section class="px-2 md:max-w-[90%] lg:max-w-desktop mx-auto">
      <SectionTitle> Books </SectionTitle>
      <GridBooksLayout>
        <template v-if="bookStore.isLoading">
          <BookListSkeleton data-test="loading-skeleton" v-for="i in 12" :key="i" />
        </template>
        <template v-else-if="!bookStore.isLoading && bookStore.allBooks.length > 0">
          <BookList
            v-for="book in bookStore.allBooks"
            :key="book.id"
            :title="book.title"
            :author="book.author"
            :price="book.price"
            :id="book.id"
          />
        </template>
        <div v-else>
          <p data-test="no-books-found-message">
            <template v-if="bookStore.getError">
              {{ bookStore.getError }}
            </template>
            <template v-else> No books found </template>
          </p>
        </div>
      </GridBooksLayout>
    </section>
  </main>
</template>
