<script setup lang="ts">
import CloseIcon from '@/components/Atoms/CloseIconAtom.vue'
import AlertIcon from '@/components/Atoms/AlertIconAtom.vue'
import SuccessIcon from '@/components/Atoms/AlertIconAtom.vue'
import { MessageEnum, type Message } from '@/entities/message'

interface Props {
  message: Message
  buttonLabel: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="w-full h-full absolute top-0 left-0 bg-black opacity-50"></div>
    <div
      class="absolute place-content-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full"
    >
      <div class="relative bg-white rounded-lg shadow">
        <button
          @click="$emit('close')"
          type="button"
          class="absolute top-3 end-2.5 hover:bg-secondary-500 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        >
          <CloseIcon />
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <AlertIcon v-if="message.type == MessageEnum.ERROR" />
          <SuccessIcon v-else-if="message.type == MessageEnum.SUCCESS" />
          <h3 class="text-xl font-body text-gray-600">{{ message.title }}</h3>
          <p class="mb-5 text-lg font-body text-gray-500 dark:text-gray-400">
            {{ message.message }}
          </p>
          <button
            @click="$emit('close')"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
          >
            {{ buttonLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
