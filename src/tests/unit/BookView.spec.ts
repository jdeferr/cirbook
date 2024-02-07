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
  it('displays error', () => {})
  it('message after failed purchase', () => {})
  it('clears success message', () => {})
  it('after 5 seconds', () => {})
  it('enders book details', () => {})
})
