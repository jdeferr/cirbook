export interface Book {
  id: number
  title: string
  author: string
  isbn: string
  price: number
  availableStock: number
}

export interface PurchaseResponse {
  book: Book | null
  message: string
}

export type BookWidget = Omit<Book, 'isbn' | 'availableStock'>
