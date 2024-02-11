<script setup lang="ts">
import FooterColumnMolecule from '@/components/Molecules/FooterColumnMolecule.vue'
import LogoAtom from '@/components/Atoms/LogoAtom.vue'
import { LinkTypeEnum } from '@/entities/ui'

const LinkedinUrl = import.meta.env.AUTHOR_LINKEDIN || 'https://www.linkedin.com/in/jdeferr'

const footerColumns = [
  {
    title: 'Useful links',
    links: [{ name: 'Home', url: '/', type: LinkTypeEnum.INTERNAL }]
  },
  {
    title: 'Developer links',
    links: [
      { name: 'Linkedin', url: LinkedinUrl, type: LinkTypeEnum.EXTERNAL },
      { name: 'Resume', url: '#', type: LinkTypeEnum.EXTERNAL }
    ]
  }
]
</script>

<template>
  <footer class="bg-complementary text-white">
    <div
      class="px-2 md:max-w-[90%] lg:max-w-desktop py-10 pb-56 flex flex-col gap-y-10 lg:flex-row justify-between items-start mx-auto"
    >
      <FooterColumnMolecule
        v-for="(column, key) in footerColumns"
        :key="key"
        :title="column.title"
        :links="column.links"
      />
      <div>
        <LogoAtom />
      </div>
    </div>
  </footer>
</template>
