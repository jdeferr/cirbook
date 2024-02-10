<script setup lang="ts">
import type { Link } from '@/entities/ui'
import ListLinkAtomVue from '@/components/Atoms/ListLinkAtom.vue'

const props = defineProps<{
  title: string
  links: Link[]
}>()
</script>

<template>
  <div>
    <h3 class="font-title text-xl font-light">{{ props.title }}</h3>
    <hr class="my-2 w-[300px] max-w-full" />
    <ul class="font-extralight">
      <ListLinkAtomVue
        v-for="(link, key) in props.links"
        :key="key"
        :url="link.url"
        :name="link.name"
        :type="link.type"
      />
    </ul>
  </div>
</template>
