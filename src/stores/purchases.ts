import { defineStore } from 'pinia'

import type { Customer } from '@/entities/customer'
import { MessageEnum, type Message } from '@/entities/message'

import { useBookStore } from './books'
import { purchaseBook } from '@/services/books'

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
    getMessage: (state): Message | null => state.message
  },

  actions: {
    async purchaseBook(id: string) {
      this.loading = true
      const bookStore = useBookStore()
      try {
        const response = await purchaseBook(id)

        if (response.book === null) throw new Error(response.message)
        bookStore.$patch({
          book: response.book
        })

        this.message = {
          title: 'SUCCESS',
          message: response.message,
          type: MessageEnum.SUCCESS
        }
      } catch (error: any) {
        this.message = {
          title: 'ERROR',
          message: error.message,
          type: MessageEnum.ERROR
        }
      } finally {
        this.loading = false
      }
    }
  }
})
