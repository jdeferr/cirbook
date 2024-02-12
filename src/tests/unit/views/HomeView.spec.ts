import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import HomeView from '@/views/HomeView.vue'
import { mount } from '@vue/test-utils'
import booksMock from '@/tests/mocks/books.json'
import router from '@/router'

window.scrollTo = () => {}

describe('Home view', () => {
  const createWrapper = (initialState: any) => {
    return mount(HomeView, {
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

  beforeEach(() => {
    router.push(`/`)
  })

  it('Test whether the component renders properly', () => {
    const wrapper = createWrapper({})
    expect(wrapper.exists()).toBe(true)
  })

  it('Test whether the Loading message is rendered when loading is true', () => {
    const wrapper = createWrapper({
      books: {
        books: [],
        book: null,
        loading: true,
        error: null
      }
    })

    const message = wrapper.find('[data-test="loading-skeleton"]')
    expect(message.exists()).toBeTruthy()
  })

  it('Test whether the "No book found" message is rendered when loading is false and the books array is empty.', () => {
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

  it('Test whether the book list component is rendered when loading is false and the books array contains items.', () => {
    const wrapper = createWrapper({
      books: {
        books: booksMock,
        book: null,
        loading: false,
        error: null
      }
    })
    const bookListComponents = wrapper.findAllComponents({ name: 'BookListMolecule' })
    expect(bookListComponents.length).toBe(3)
  })
})
