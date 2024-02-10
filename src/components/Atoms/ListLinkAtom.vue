<script setup lang="ts">
import { LinkTypeEnum, type Link } from '@/entities/ui'

const props = defineProps<Link>()
</script>

<template>
  <li>
    <a target="_blank" v-if="props.type == LinkTypeEnum.EXTERNAL" :href="props.url">{{
      props.name
    }}</a>
    <router-link v-else :to="props.url">{{ props.name }}</router-link>
  </li>
</template>
