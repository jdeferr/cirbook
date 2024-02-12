import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as service from '@/services/books'
import booksMock from '@/tests/mocks/books.json'
import { usePurchaseStore } from '@/stores/purchases'
import { createPinia, setActivePinia } from 'pinia'
import { MessageEnum } from '@/entities/message'

describe('Initialization of state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Test whether the component initializes with default state.', () => {
    const store = usePurchaseStore()
    expect(store.isLoading).toBe(false)
    expect(store.getMessage).toBeNull()
    expect(store.getMessage).toBeNull()
  })
})

describe('Book purchasing operations', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Test purchasing a book.', async () => {
    const bookMock = booksMock[0]
    const spy = vi.spyOn(service, 'purchaseBook')
    spy.mockResolvedValue({
      book: {
        ...bookMock,
        availableStock: bookMock.availableStock - 1
      },
      message: 'Success'
    })

    const store = usePurchaseStore()
    await store.purchaseBook(bookMock.id.toString())
    const message = store.getMessage

    expect(spy).toHaveBeenCalledOnce()
    expect(message).not.toBeNull()
    expect(message?.title).toBe('SUCCESS')
    expect(message?.message).not.toBe('')
    expect(message?.type).toBe(MessageEnum.SUCCESS)
  })
})

describe('Error handling in book purchasing', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('Test handling errors when the service returns null during book purchase.', async () => {
    const bookMock = booksMock[0]
    const spy = vi.spyOn(service, 'purchaseBook')
    spy.mockResolvedValue({
      book: null,
      message: 'Error'
    })

    const store = usePurchaseStore()
    await store.purchaseBook(bookMock.id.toString())
    const message = store.getMessage

    expect(spy).toHaveBeenCalledOnce()
    expect(message).not.toBeNull()
    expect(message?.title).toBe('ERROR')
    expect(message?.message).toBe('Error')
    expect(message?.type).toBe(MessageEnum.ERROR)
  })

  it('Test handling errors when the service returns an error during book purchase', async () => {
    const bookMock = booksMock[0]
    const spy = vi.spyOn(service, 'purchaseBook')
    spy.mockRejectedValue(new Error('Error'))

    const store = usePurchaseStore()
    await store.purchaseBook(bookMock.id.toString())
    const message = store.getMessage

    expect(spy).toHaveBeenCalledOnce()
    expect(message).not.toBeNull()
    expect(message?.title).toBe('ERROR')
    expect(message?.message).toBe('Error')
    expect(message?.type).toBe(MessageEnum.ERROR)
  })
})
