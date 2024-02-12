import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import BookView from '@/views/BookView.vue'
import { mount } from '@vue/test-utils'
import BooksMock from '@/tests/mocks/books.json'
import router from '@/router'

window.scrollTo = () => {}

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

  it('Test whether the component renders properly', async () => {
    router.push(`/book/${book.id}`)
    await router.isReady()
    const wrapper = createWrapper({})
    expect(wrapper.exists()).toBe(true)
  })

  it('Test whether the book details are rendered correctly.', async () => {
    router.push(`/book/${book.id}`)
    await router.isReady()
    const wrapper = createWrapper({
      books: {
        books: [],
        book
      }
    })

    const title = wrapper.findComponent({ name: 'BookTitleAtom' })
    expect(title.exists()).toBeTruthy()
    expect(title.text()).toBe(book.title)
    const author = wrapper.find('[data-test="book-author"]')
    expect(author.text()).contain(book.author)
    const price = wrapper.find('[data-test="book-price"]')
    expect(price.text()).toBe(book.price.toString())
    const isbn = wrapper.find('[data-test="book-isbn"]')
    expect(isbn.text()).contain(book.isbn)
    const stock = wrapper.find('[data-test="book-stock"]')
    expect(stock.text()).toBe(book.availableStock.toString())
  })

  it('Test whether the modal is displayed when the purchase message contains information.', async () => {
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

  it('Test whether the out-of-stock button is displayed', async () => {
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

  it('Test whether the purchase button is displayed.', async () => {
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
