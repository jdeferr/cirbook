import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import HomeView from '@/views/HomeView.vue'
import { mount, shallowMount } from '@vue/test-utils'
import booksMock from '@/tests/mocks/books.json'

describe('Home view', () => {
  const createWrapper = (initialState: any) => {
    return shallowMount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState
          })
        ]
      }
    })
  }

  it('should render the component', () => {
    const wrapper = createWrapper({})
    expect(wrapper.exists()).toBe(true)
  })

  it('should render Loading message when loading is true', () => {
    const wrapper = createWrapper({
      books: {
        books: [],
        book: null,
        loading: true,
        error: null
      }
    })

    const message = wrapper.find('[data-test="loading-message"]')
    expect(message.exists()).toBeTruthy()
  })

  it('should render No book found when loading is false and books is empty', () => {
    const wrapper = createWrapper({
      books: {
        books: [],
        book: null,
        loading: false,
        error: null
      }
    })

    const message = wrapper.find('[data-test="no-books-found-message"]')
    expect(message.exists()).toBeTruthy()
  })

  it('should render book list component when loading is false and books have items', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              books: {
                books: booksMock,
                book: null,
                loading: false,
                error: null
              }
            }
          })
        ]
      }
    })
    const bookListComponents = wrapper.findAll('book-list-stub')
    expect(bookListComponents.length).toBe(3)
  })
})
