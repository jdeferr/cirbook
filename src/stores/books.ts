import type { Book } from '@/entities/book'
import { getBook, getBooks } from '@/services/books'
import { defineStore } from 'pinia'

interface BooksState {
  books: Book[]
  lastBooksFetch: Date | null
  minFetchInterval: number
  book: Book | null
  query: string | null
  loading: boolean
  error: Error | any
}

export const useBookStore = defineStore('books', {
  state: (): BooksState => ({
    books: [],
    query: null,
    lastBooksFetch: null,
    minFetchInterval: 10 * 60 * 1000,
    book: null,
    loading: false,
    error: null
  }),

  getters: {
    allBooks: (state): Book[] => {
      if (state.query)
        return state.books.filter((book: Book) => {
          const query = state.query || ''
          return (
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            book.isbn.toLowerCase().includes(query.toLowerCase())
          )
        })
      return state.books
    },
    currentBook: (state): Book | null => state.book,
    isLoading: (state): boolean => state.loading,
    getError: (state): Error | any => state.error,
    shouldFetchBooks: (state) => {
      const timeSinceLastFetch = state.lastBooksFetch
        ? Date.now() - state.lastBooksFetch.getTime()
        : Number.MAX_VALUE

      return timeSinceLastFetch > state.minFetchInterval
    }
  },

  actions: {
    setQuery(query: string | null) {
      this.query = query
    },
    clearBook() {
      this.book = null
    },
    updateFetchInterval(interval: number) {
      this.minFetchInterval = interval
    },
    async getBooks() {
      this.loading = true
      try {
        this.books = await getBooks()
        this.lastBooksFetch = new Date()
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async getBook(id: string) {
      this.loading = true
      const book = this.books.find((book) => book.id === parseInt(id))
      if (book && !this.shouldFetchBooks) {
        this.book = book
        this.loading = false
        return
      }

      try {
        const response = await getBook(id)
        if (response === null) {
          this.error = 'Book not found'
          return
        }
        this.book = response
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
