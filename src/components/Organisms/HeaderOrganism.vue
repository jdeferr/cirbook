<script setup lang="ts">
import LogoAtom from '@/components/Atoms/LogoAtom.vue'
import InputAtom from '@/components/Atoms/InputAtom.vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '../../stores/books'
import SearchIcon from '../Atoms/SearchIconAtom.vue'
import { ref } from 'vue'

const router = useRouter()
const bookStore = useBookStore()
const showSearchMobileInput = ref(false)

const onKeyPressed = ($event: any) => {
  showSearchMobileInput.value = false
  bookStore.setQuery($event)
  router.push({ path: '/', query: { search: $event } })
}

const onClickLogo = () => {
  bookStore.setQuery(null)
  router.push({ path: '/' })
}

const onClickSearchIcon = () => {
  toggleSearchMobileInput()
}

const toggleSearchMobileInput = () => {
  showSearchMobileInput.value = !showSearchMobileInput.value
}
</script>

<template>
  <header class="bg-primary-500 z-10 relative">
    <div
      class="px-2 md:max-w-[90%] lg:max-w-desktop h-16 flex justify-between items-center mx-auto"
    >
      <div class="cursor-pointer" @click="onClickLogo">
        <LogoAtom />
      </div>
      <div class="hidden md:block">
        <InputAtom
          type="text"
          placeholder="Search by author, title, isbn..."
          @on-key-pressed="onKeyPressed"
        />
      </div>
      <div class="block md:hidden">
        <SearchIcon @on-click="onClickSearchIcon" class="w-8 -translate-y-[1px] cursor-pointer" />
      </div>
    </div>
  </header>
  <div
    v-if="showSearchMobileInput"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div
      @click="toggleSearchMobileInput"
      class="w-full h-full absolute top-0 left-0 bg-black opacity-50"
    ></div>
    <div
      class="absolute top-20 left-1/2 transform -translate-x-1/2 max-w-3.5 max-h-full min-w-[300px]"
    >
      <div class="relative">
        <InputAtom
          type="text"
          placeholder="Search by author, title, isbn..."
          @on-key-pressed="onKeyPressed"
        />
      </div>
    </div>
  </div>
</template>
