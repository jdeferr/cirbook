<script setup lang="ts">
import CloseIcon from '@/components/Atoms/CloseIconAtom.vue'
import AlertIcon from '@/components/Atoms/AlertIconAtom.vue'
import SuccessIcon from '@/components/Atoms/SuccessIconAtom.vue'
import { MessageEnum, type Message } from '@/entities/message'
import Button from '@/components/Atoms/ButtonAtom.vue'
import { ButtonTypeEnum } from '@/entities/ui'
import ModalLayout from '@/components/Layouts/ModalLayout.vue'

interface Props {
  message: Message
  buttonLabel: string
}

const props = defineProps<Props>()
</script>

<template>
  <ModalLayout>
    <div
      class="absolute place-content-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full min-w-[300px]"
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
          <h3 data-test="modal-title" class="text-xl font-body text-gray-600">
            {{ message.title }}
          </h3>
          <p
            data-test="modal-message"
            class="mb-5 text-lg font-extralight font-body text-gray-500 dark:text-gray-400"
          >
            {{ message.message }}
          </p>
          <Button :type="ButtonTypeEnum.SECONDARY" @click="$emit('close')">
            {{ buttonLabel }}
          </Button>
        </div>
      </div>
    </div>
  </ModalLayout>
</template>

<style scoped></style>
