<script setup lang="ts">
import LogoAtom from '@/components/Atoms/LogoAtom.vue'
import InputAtom from '@/components/Atoms/InputAtom.vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '../../stores/books'

const router = useRouter()
const bookStore = useBookStore()

const onKeyPressed = ($event: any) => {
  bookStore.setQuery($event)
  router.push({ path: '/', query: { search: $event } })
}

const onClickLogo = () => {
  bookStore.setQuery(null)
  router.push({ path: '/' })
}
</script>

<template>
  <header class="bg-primary-500">
    <div class="max-w-desktop h-16 flex justify-between items-center mx-auto">
      <div class="cursor-pointer" @click="onClickLogo">
        <LogoAtom />
      </div>
      <div>
        <InputAtom
          type="text"
          placeholder="Search by author, title, isbn..."
          @on-key-pressed="onKeyPressed"
        />
      </div>
    </div>
  </header>
</template>
