import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import BookView from '@/views/BookView.vue'
import { mount } from '@vue/test-utils'
import BooksMock from '../mocks/books.json'
import router from '@/router'

describe('Book view', () => {
  const book = BooksMock[0]

  const createWrapper = (initialState: any) => {
    return mount(BookView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
            initialState
          })
        ]
      }
    })
  }

  it('should render the component', async () => {
    router.push(`/book/${book.id}`)
    await router.isReady()
    const wrapper = createWrapper({})
    expect(wrapper.exists()).toBe(true)
  })

  it('renders book details', async () => {
    router.push(`/book/${book.id}`)
    await router.isReady()
    const wrapper = createWrapper({
      books: {
        books: [],
        book
      }
    })

    const title = wrapper.find('[data-test="book-title"]')
    expect(title.text()).toBe(book.title)
    const author = wrapper.find('[data-test="book-author"]')
    expect(author.text()).toBe(book.author)
    const price = wrapper.find('[data-test="book-price"]')
    expect(price.text()).toBe(book.price.toString())
    const isbn = wrapper.find('[data-test="book-isbn"]')
    expect(isbn.text()).toBe(book.isbn)
    const stock = wrapper.find('[data-test="book-stock"]')
    expect(stock.text()).toBe(book.availableStock.toString())
  })

  it('show modal when pruchases message have information', async () => {
    router.push(`/book/${book.id}`)
    await router.isReady()
    const wrapper = createWrapper({
      books: {
        book
      },
      purchases: {
        message: {
          title: 'ERROR',
          message: 'An error occurred, please try again later.',
          type: 'error'
        }
      }
    })

    const modalComponent = await wrapper.findComponent({ name: 'ModalMolecule' })
    expect(modalComponent.exists()).toBe(true)

    const modalTitle = modalComponent.find('[data-test="modal-title"]')
    expect(modalTitle.text()).toBe('ERROR')

    const modalMessage = modalComponent.find('[data-test="modal-message"]')
    expect(modalMessage.text()).toBe('An error occurred, please try again later.')
  })

  it('show out of stock button', async () => {
    router.push(`/book/${book.id}`)
    await router.isReady()
    const wrapper = createWrapper({
      books: {
        book: {
          ...book,
          availableStock: 0
        }
      }
    })

    const purchaseButton = wrapper.find('[data-test="purchase-button"]')
    expect(purchaseButton.exists()).toBeFalsy()

    const outOfStock = wrapper.find('[data-test="out-of-stock-button"]')
    expect(outOfStock.exists()).toBeTruthy()
  })

  it('show purchase button', async () => {
    router.push(`/book/${book.id}`)
    await router.isReady()
    const wrapper = createWrapper({
      books: {
        book: {
          ...book,
          availableStock: 1
        }
      }
    })

    const purchaseButton = wrapper.find('[data-test="purchase-button"]')
    expect(purchaseButton.exists()).toBeTruthy()

    const outOfStock = wrapper.find('[data-test="out-of-stock-button"]')
    expect(outOfStock.exists()).toBeFalsy()
  })
})
