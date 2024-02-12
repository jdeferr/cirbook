<script setup lang="ts">
import BookCoverAtom from '@/components/Atoms/BookCoverAtom.vue'
import Modal from '@/components/Molecules/ModalMolecule.vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/books'
import { usePurchaseStore } from '@/stores/purchases'
import Loading from '@/components/Organisms/LoadingOrganism.vue'
import BookTitle from '@/components/Atoms/BookTitleAtom.vue'
import BookMeta from '@/components/Atoms/BookMetaAtom.vue'
import Button from '@/components/Atoms/ButtonAtom.vue'
import SectionTitle from '@/components/Atoms/SectionTitleAtom.vue'
import { ButtonTypeEnum } from '@/entities/ui'

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

const areAvaiableStock = () => {
  return bookStore.book && bookStore.book.availableStock > 0
}

const bookDescription = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, temporibus exercitationem. Sed, repellat iure. Corporis totam nulla ut error aliquam laudantium cumque ducimus, voluptates dolore. Ad dignissimos ex numquam deleniti! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero voluptatem numquam nobis minima et, consequuntur animi, quis, illo earum consequatur illum! Soluta, hic sunt tenetur reiciendis veniam harum adipisci quo.`
</script>

<template>
  <Transition name="fade">
    <Loading v-if="bookStore && bookStore.isLoading" />
  </Transition>
  <template v-if="bookStore && bookStore.book">
    <section class="bg-primary-500 mb-10">
      <div
        class="px-5 md:max-w-[90%] lg:max-w-desktop gap-x-10 md:gap-x-5 lg:gap-x-10 mx-auto grid grid-cols-12 pt-2 md:pt-5 lg:pt-10 translate-y-2 md:translate-y-5 lg:translate-y-10"
      >
        <div class="col-span-4 md:col-start-3 md:col-span-3">
          <BookCoverAtom />
        </div>
        <div class="col-span-7 md:col-span-4 flex flex-col justify-around">
          <div class="flex flex-col gap-y-1 md:gap-y-5 lg:gap-y-10">
            <div>
              <BookTitle :title="bookStore.book.title" />
              <BookMeta data-test="book-author" label="author" :value="bookStore.book.author" />
              <BookMeta data-test="book-isbn" label="isbn" :value="bookStore.book.isbn" />
            </div>
            <div class="flex flex-col text-secondary-500 font-medium font-price">
              <span class="text-xl md:text-3xl text-nowrap rounded-3xl"
                ><span data-test="book-price">{{ bookStore.book.price }}</span> NZD</span
              >
              <span
                ><span data-test="book-stock">{{ bookStore.book.availableStock }}</span> Books
                left</span
              >
            </div>
          </div>
          <div>
            <Button data-test="purchase-button" @click="purchaseBook" v-if="areAvaiableStock()">
              PURCHASE A COPY
            </Button>
            <Button data-test="out-of-stock-button" :type="ButtonTypeEnum.DISABLE" v-else>
              OUT OF STOCK
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section class="my-20 lg:my-32 px-5 md:max-w-[90%] lg:max-w-desktop mx-auto">
      <SectionTitle> Synopsis </SectionTitle>
      <p class="text-md md:text-lg font-extralight md:text-center">
        {{ bookDescription }}
      </p>
    </section>
  </template>
  <Modal
    v-if="purchaseStore.message != null"
    @close="purchaseStore.message = null"
    :message="purchaseStore.message"
    button-label="Close"
  />
</template>
