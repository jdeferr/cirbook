import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as service from '@/services/books'
import booksMock from '@/tests/mocks/books.json'
import { usePurchaseStore } from '@/stores/purchases'
import { createPinia, setActivePinia } from 'pinia'
import { MessageEnum } from '@/entities/message'

describe('Purchases Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default state', () => {
    const store = usePurchaseStore()
    expect(store.isLoading).toBe(false)
    expect(store.getMessage).toBeNull()
    expect(store.getMessage).toBeNull()
  })

  it('should purchase book', async () => {
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

  it('should handle error on purchase book when service return null', async () => {
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

  it('should handle error on purchase book when service return error', async () => {
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
