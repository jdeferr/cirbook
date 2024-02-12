import { describe, expect, it, vi } from 'vitest'
import * as service from '@/services/books'
import booksMock from '@/tests/mocks/books.json'

const createFetchResponse = (data: any, status: number = 200) => {
  return { json: () => new Promise((resolve) => resolve(data)), status }
}

describe('Fetching books', () => {
  it('Test fetching books.', async () => {
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ books: booksMock }))
    const books = await service.getBooks()
    expect(books).toEqual(booksMock)
  })
})

describe('Error handling when fetching books', () => {
  it('Test throwing an error when fetching books and receiving status 500', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse({ message: 'Internal server error' }, 500))

    expect(() => service.getBooks()).rejects.toThrowError(
      'An error occurred while fetching the books. Please try again later.'
    )
  })
})

describe('Fetching a book', () => {
  it('Test fetching a single book', async () => {
    const book = booksMock[0]
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ book }))
    const response = await service.getBook(book.id.toString())
    expect(response).toEqual(book)
  })
})

describe('Error handling when fetching a book', () => {
  it('Test throwing an error when fetching a book and receiving status 500', async () => {
    const book = booksMock[0]
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse({ message: 'Internal server error' }, 500))

    expect(() => service.getBook(book.id.toString())).rejects.toThrowError(
      'An error occurred while fetching the book. Please try again later.'
    )
  })

  it('Test returning null when fetching an invalid ID', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse({ message: 'Book not found' }, 404))

    const response = await service.getBook('100')
    expect(response).toBeNull()
  })
})

describe('Handling purchase responses', () => {
  it('Test returning a message with a new instance of a book when the purchase is successful', async () => {
    const book = booksMock[0]
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ book, message: 'Success' }, 200))
    const response = await service.purchaseBook(book.id.toString())
    expect(response).toEqual({ book, message: 'Success' })
  })

  it('Test returning null when the purchase fails due to a 404 error', async () => {
    const book = booksMock[0]
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ message: 'Error' }, 404))
    const response = await service.purchaseBook(book.id.toString())
    expect(response).toEqual({ book: null, message: 'Error' })
  })

  it('Test returning null when the purchase fails due to a 500 error', async () => {
    const book = booksMock[0]
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ message: 'Error' }, 500))
    expect(() => service.purchaseBook(book.id.toString())).rejects.toThrowError(
      'An error occurred, please try again later.'
    )
  })

  it('Test returning null when there are other errors during purchase', async () => {
    const book = booksMock[0]
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse({ message: 'Internal server error' }, 400))

    expect(() => service.purchaseBook(book.id.toString())).rejects.toThrowError(
      'An error occurred, please try again later.'
    )
  })
})
