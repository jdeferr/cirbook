<script setup lang="ts">
import cover from '@/assets/cover.png'
import Modal from '@/components/Molecules/ModalMolecule.vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/books'
import { usePurchaseStore } from '@/stores/purchases'

const route = useRoute()
const idSlug = route.params.id as string
const id = idSlug.split('-')[0]

const bookStore = useBookStore()
bookStore.clearBook()
bookStore.getBook(id)

const purchaseStore = usePurchaseStore()

const purchaseBook = () => {
  purchaseStore.purchaseBook(id)
}
</script>

<template>
  <section class="bg-primary-500 mb-10" v-if="bookStore && bookStore.book">
    <div class="max-w-desktop gap-x-10 mx-auto grid grid-cols-12 pt-10 translate-y-10">
      <div class="col-start-3 col-span-3">
        <img
          :src="cover"
          :alt="bookStore.book.title"
          class="w-full overflow-hidden rounded-xl shadow-xl"
        />
      </div>
      <div class="col-span-4 flex flex-col justify-around">
        <div class="flex flex-col gap-y-10">
          <div>
            <h5
              data-test="book-title"
              class="font-body font-medium text-[40px] truncate-2-lines overflow-hidden"
            >
              {{ bookStore.book.title }}
            </h5>
            <p data-test="book-author" class="text-author text-[12px] font-body">
              {{ bookStore.book.author }}
            </p>
            <p data-test="book-isbn" class="text-author text-[12px] font-body">
              {{ bookStore.book.isbn }}
            </p>
          </div>
          <div class="flex flex-col text-secondary-500 font-medium font-price">
            <span class="text-3xl text-nowrap rounded-3xl"
              ><span data-test="book-price">{{ bookStore.book.price }}</span> NZD</span
            >
            <span
              ><span data-test="book-stock">{{ bookStore.book.availableStock }}</span> Books
              left</span
            >
          </div>
        </div>
        <div>
          <button
            v-if="bookStore.book.availableStock > 0"
            data-test="purchase-button"
            class="font-button shadow-xl bg-complementary text-white rounded-full py-3 px-4 text-body"
            @click="purchaseBook"
          >
            PURCHASE A COPY
          </button>
          <button
            v-else
            data-test="out-of-stock-button"
            class="font-button shadow-xl bg-gray-300 text-gray-500 rounded-full py-3 px-4 text-body"
            disabled
          >
            OUT OF STOCK
          </button>
        </div>
      </div>
    </div>
  </section>
  <section class="my-32 max-w-desktop mx-auto">
    <h4 class="font-title text-3xl text-center mb-10">Synopsis</h4>
    <p class="font-title text-lg font-extralight text-center">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, temporibus exercitationem.
      Sed, repellat iure. Corporis totam nulla ut error aliquam laudantium cumque ducimus,
      voluptates dolore. Ad dignissimos ex numquam deleniti! Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Libero voluptatem numquam nobis minima et, consequuntur animi, quis, illo
      earum consequatur illum! Soluta, hic sunt tenetur reiciendis veniam harum adipisci quo.
    </p>
  </section>
  <Modal
    v-if="purchaseStore.message != null"
    @close="purchaseStore.message = null"
    :message="purchaseStore.message"
    button-label="Close"
  />
</template>
