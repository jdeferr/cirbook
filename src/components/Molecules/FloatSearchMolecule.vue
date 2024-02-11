<script setup lang="ts">
import InputAtom from '@/components/Atoms/InputAtom.vue'
import ModalLayout from '@/components/Layouts/ModalLayout.vue'
</script>
<template>
  <ModalLayout>
    <div
      class="absolute top-20 left-1/2 transform -translate-x-1/2 max-w-3.5 max-h-full min-w-[300px]"
    >
      <div class="relative">
        <InputAtom
          type="text"
          placeholder="Search by author, title, isbn..."
          @on-key-pressed="($event) => $emit('submit', $event)"
        />
      </div>
    </div>
  </ModalLayout>
</template>
