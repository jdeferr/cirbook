import type { Book, PurchaseResponse } from '@/entities/book'

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:8000'
const API_BOOK_URL = `${API_BASE_URL}/books`

export const getBooks = async () => {
  try {
    const response = await fetch(API_BOOK_URL)
    if (response.status !== 200) throw new Error('Internal server error')

    return (await response.json()).books
  } catch (error) {
    // console.error(error)
    throw new Error('An error occurred while fetching the books. Please try again later.')
  }
}

export const getBook = async (id: string) => {
  try {
    const response = await fetch(`${API_BOOK_URL}/${id}`)
    if (response.status === 404) return null
    if (response.status !== 200) throw new Error('Internal server error')
    return (await response.json()).book
  } catch (error) {
    // console.error(error)
    throw new Error('An error occurred while fetching the book. Please try again later.')
  }
}

export const purchaseBook = async (id: string): Promise<PurchaseResponse> => {
  try {
    const response = await fetch(`${API_BOOK_URL}/${id}/purchase`, {
      method: 'POST'
    })
    const data = await response.json()
    if (response.status === 200) {
      return data
    } else if (response.status === 404 || response.status === 500) {
      return {
        book: null,
        message: data.message
      }
    } else {
      throw new Error('An error occurred, please try again later.')
    }
  } catch (error) {
    // console.error(error)
    throw new Error('An error occurred, please try again later.')
  }
}
