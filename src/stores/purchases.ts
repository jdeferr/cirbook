import { defineStore } from 'pinia'

import type { Book } from '@/entities/book'
import type { Customer } from '@/entities/customer'
import { MessageEnum, type Message } from '@/entities/message'

import { useBookStore } from './books'

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:8000'
const API_BOOK_URL = `${API_BASE_URL}/books`

interface PurchasesState {
  customer: Customer | null
  loading: boolean
  message: Message | null
}

export const usePurchaseStore = defineStore('purchases', {
  state: (): PurchasesState => ({
    customer: null,
    loading: false,
    message: null
  }),

  getters: {
    isLoading: (state): boolean => state.loading,
    getError: (state): Message | any => state.message
  },

  actions: {
    async purchaseBook(id: string) {
      const bookStore = useBookStore()

      const response = await fetch(`${API_BOOK_URL}/${id}/purchase`, {
        method: 'POST'
      })
      const data = await response.json()

      if (response.status === 200) {
        bookStore.$patch({
          book: data.book
        })

        this.message = null
      } else if (response.status === 404 || response.status === 500) {
        this.message = {
          title: 'ERROR',
          message: data.message,
          type: MessageEnum.ERROR
        }
      } else {
        this.message = {
          title: 'ERROR',
          message: 'An error occurred, please try again later.',
          type: MessageEnum.ERROR
        }
      }
    }
  }
})
