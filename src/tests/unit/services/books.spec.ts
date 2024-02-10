import { describe, expect, it, vi } from 'vitest'
import * as service from '@/services/books'
import booksMock from '@/tests/mocks/books.json'

const createFetchResponse = (data: any, status: number = 200) => {
  return { json: () => new Promise((resolve) => resolve(data)), status }
}

describe('Book Service', () => {
  it('should fetch books', async () => {
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ books: booksMock }))
    const books = await service.getBooks()
    expect(books).toEqual(booksMock)
  })

  it('should throw and error when fetching books and retreiving status 500', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse({ message: 'Internal server error' }, 500))

    expect(() => service.getBooks()).rejects.toThrowError(
      'An error occurred while fetching the books. Please try again later.'
    )
  })

  it('should fetch a book', async () => {
    const book = booksMock[0]
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ book }))
    const response = await service.getBook(book.id.toString())
    expect(response).toEqual(book)
  })

  it('should throw and error when fetching a book and retreiving status 500', async () => {
    const book = booksMock[0]
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse({ message: 'Internal server error' }, 500))

    expect(() => service.getBook(book.id.toString())).rejects.toThrowError(
      'An error occurred while fetching the book. Please try again later.'
    )
  })

  it('should return null when fetching a invalid id', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse({ message: 'Book not found' }, 404))

    const response = await service.getBook('100')
    expect(response).toBeNull()
  })

  it('should return message with new instance of book when purchase is success', async () => {
    const book = booksMock[0]
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ book, message: 'Success' }, 200))
    const response = await service.purchaseBook(book.id.toString())
    expect(response).toEqual({ book, message: 'Success' })
  })

  it('should return null when purchase is failed by 404', async () => {
    const book = booksMock[0]
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ message: 'Error' }, 404))
    const response = await service.purchaseBook(book.id.toString())
    expect(response).toEqual({ book: null, message: 'Error' })
  })

  it('should return null when purchase is failed by 500', async () => {
    const book = booksMock[0]
    global.fetch = vi.fn().mockResolvedValue(createFetchResponse({ message: 'Error' }, 500))
    const response = await service.purchaseBook(book.id.toString())
    expect(response).toEqual({ book: null, message: 'Error' })
  })

  it('should return null when there are other error', async () => {
    const book = booksMock[0]
    global.fetch = vi
      .fn()
      .mockResolvedValue(createFetchResponse({ message: 'Internal server error' }, 400))

    expect(() => service.purchaseBook(book.id.toString())).rejects.toThrowError(
      'An error occurred, please try again later.'
    )
  })
})
