import type { Book } from '@/entities/book'
import { defineStore } from 'pinia'

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:8000'
const API_BOOK_URL = `${API_BASE_URL}/books`

interface BooksState {
  books: Book[]
  book: Book | null
  loading: boolean
  error: Error | any
}

export const useBookStore = defineStore('books', {
  state: (): BooksState => ({
    books: [],
    book: null,
    loading: false,
    error: null
  }),

  getters: {
    allBooks: (state): Book[] => state.books,
    currentBook: (state): Book | null => state.book,
    isLoading: (state): boolean => state.loading,
    getError: (state): Error | any => state.error
  },

  actions: {
    async getBooks() {
      this.loading = true
      try {
        const response = await fetch(API_BOOK_URL)
        this.books = (await response.json()).books
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async getBook(id: string) {
      this.loading = true
      try {
        const response = await fetch(`${API_BOOK_URL}/${id}`)
        this.book = await response.json()
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
