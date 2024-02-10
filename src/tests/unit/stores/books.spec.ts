import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as service from '@/services/books'
import booksMock from '@/tests/mocks/books.json'
import { useBookStore } from '@/stores/books'
import { createPinia, setActivePinia } from 'pinia'

describe('Book Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default state', () => {
    const store = useBookStore()
    expect(store.allBooks).toEqual([])
    expect(store.currentBook).toBeNull()
    expect(store.isLoading).toBe(false)
    expect(store.getError).toBeNull()
    expect(store.shouldFetchBooks).toBe(true)
  })

  it('should clear the current book', () => {
    const store = useBookStore()
    store.$patch({ book: booksMock[0] })
    expect(store.currentBook).toEqual(booksMock[0])
    store.clearBook()
    expect(store.currentBook).toBeNull()
  })

  it('should fetch books', async () => {
    const spy = vi.spyOn(service, 'getBooks')
    spy.mockResolvedValue(booksMock)

    const store = useBookStore()
    await store.getBooks()

    expect(spy).toHaveBeenCalledOnce()
    expect(store.allBooks).toEqual(booksMock)
    expect(store.lastBooksFetch).toBeInstanceOf(Date)
  })

  it('should handle error when fetching books', async () => {
    const spy = vi.spyOn(service, 'getBooks')
    const messageError = 'An error occurred while fetching the books. Please try again later.'
    spy.mockRejectedValue(new Error(messageError))

    const store = useBookStore()
    await store.getBooks()

    expect(spy).toHaveBeenCalledOnce()
    expect(store.getError).toEqual(messageError)
  })

  it('should fetch book by id', async () => {
    const bookMock = booksMock[0]
    const spy = vi.spyOn(service, 'getBook')
    spy.mockResolvedValue(bookMock)

    const store = useBookStore()
    await store.getBook(bookMock.id.toString())

    expect(spy).toHaveBeenCalledOnce()
    expect(store.currentBook).toEqual(bookMock)
  })

  it('should fetch book', async () => {
    const store = useBookStore()
    store.$patch({ lastBooksFetch: new Date() })
    expect(store.shouldFetchBooks).toBe(false)
    store.$patch({ lastBooksFetch: new Date(Date.now() - store.minFetchInterval - 1000) })
    expect(store.shouldFetchBooks).toBe(true)
  })

  it('should fetch book by cache books', async () => {
    const bookMock = booksMock[0]
    const spyBook = vi.spyOn(service, 'getBook')
    const spyBooks = vi.spyOn(service, 'getBooks')
    spyBooks.mockResolvedValue(booksMock)
    spyBook.mockResolvedValue(bookMock)

    const store = useBookStore()
    await store.getBooks()
    await store.getBook(bookMock.id.toString())

    expect(spyBooks).toHaveBeenCalledOnce()
    expect(spyBook).not.toHaveBeenCalled()
    expect(store.currentBook).toEqual(bookMock)

    await store.clearBook()
    await store.getBook(bookMock.id.toString())

    expect(spyBooks).toHaveBeenCalled()
    expect(spyBook).not.toHaveBeenCalled()
    expect(store.currentBook).toEqual(bookMock)

    await store.clearBook()
    await store.getBook(bookMock.id.toString())

    store.$patch({ lastBooksFetch: new Date(Date.now() - store.minFetchInterval - 1000) })

    await store.getBook(bookMock.id.toString())
    expect(spyBook).toHaveBeenCalledOnce()
    expect(store.currentBook).toEqual(bookMock)
  })

  it('should handle error when fetching book', async () => {
    const bookMock = booksMock[0]
    const spy = vi.spyOn(service, 'getBook')
    const messageError = 'An error occurred while fetching the books. Please try again later.'
    spy.mockRejectedValue(new Error(messageError))

    const store = useBookStore()
    await store.getBook(bookMock.id.toString())

    expect(spy).toHaveBeenCalledOnce()
    expect(store.getError).toEqual(messageError)
  })

  it('should handle null when fetching book', async () => {
    const bookMock = booksMock[0]
    const spy = vi.spyOn(service, 'getBook')
    spy.mockResolvedValue(null)

    const store = useBookStore()
    await store.getBook(bookMock.id.toString())

    expect(spy).toHaveBeenCalledOnce()
    expect(store.getError).toEqual('Book not found')
  })
})
