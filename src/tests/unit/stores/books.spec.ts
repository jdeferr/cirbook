import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as service from '@/services/books'
import booksMock from '@/tests/mocks/books.json'
import { useBookStore } from '@/stores/books'
import { createPinia, setActivePinia } from 'pinia'

describe('Initialization of state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Test whether the component initializes with default state.', () => {
    const store = useBookStore()
    expect(store.allBooks).toEqual([])
    expect(store.currentBook).toBeNull()
    expect(store.isLoading).toBe(false)
    expect(store.getError).toBeNull()
    expect(store.shouldFetchBooks).toBe(true)
  })
})

describe('Book cleaning and manipulation operations', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Test clearing the current book', () => {
    const store = useBookStore()
    store.$patch({ book: booksMock[0] })
    expect(store.currentBook).toEqual(booksMock[0])
    store.clearBook()
    expect(store.currentBook).toBeNull()
  })
})

describe('Book search and retrieval operations', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Test fetching books.', async () => {
    const spy = vi.spyOn(service, 'getBooks')
    spy.mockResolvedValue(booksMock)

    const store = useBookStore()
    await store.getBooks()

    expect(spy).toHaveBeenCalledOnce()
    expect(store.allBooks).toEqual(booksMock)
    expect(store.lastBooksFetch).toBeInstanceOf(Date)
  })

  it('Test fetching a book by its ID.', async () => {
    const bookMock = booksMock[0]
    const spy = vi.spyOn(service, 'getBook')
    spy.mockResolvedValue(bookMock)

    const store = useBookStore()
    await store.getBook(bookMock.id.toString())

    expect(spy).toHaveBeenCalledOnce()
    expect(store.currentBook).toEqual(bookMock)
  })

  it('Test fetching a book.', async () => {
    const store = useBookStore()
    store.$patch({ lastBooksFetch: new Date() })
    expect(store.shouldFetchBooks).toBe(false)
    store.$patch({ lastBooksFetch: new Date(Date.now() - store.minFetchInterval - 1000) })
    expect(store.shouldFetchBooks).toBe(true)
  })

  it('Test fetching a book using cached books.', async () => {
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
})

describe('Error handling in book search and retrieval', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('Test handling errors when fetching books.', async () => {
    const spy = vi.spyOn(service, 'getBooks')
    const messageError = 'An error occurred while fetching the books. Please try again later.'
    spy.mockRejectedValue(new Error(messageError))

    const store = useBookStore()
    await store.getBooks()

    expect(spy).toHaveBeenCalledOnce()
    expect(store.getError).toEqual(messageError)
  })

  it('Test handling errors when fetching a book.', async () => {
    const bookMock = booksMock[0]
    const spy = vi.spyOn(service, 'getBook')
    const messageError = 'An error occurred while fetching the books. Please try again later.'
    spy.mockRejectedValue(new Error(messageError))

    const store = useBookStore()
    await store.getBook(bookMock.id.toString())

    expect(spy).toHaveBeenCalledOnce()
    expect(store.getError).toEqual(messageError)
  })

  it('Test handling null when fetching a book.', async () => {
    const bookMock = booksMock[0]
    const spy = vi.spyOn(service, 'getBook')
    spy.mockResolvedValue(null)

    const store = useBookStore()
    await store.getBook(bookMock.id.toString())

    expect(spy).toHaveBeenCalledOnce()
    expect(store.getError).toEqual('Book not found')
  })
})
