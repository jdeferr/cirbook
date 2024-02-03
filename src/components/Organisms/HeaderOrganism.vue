<script setup lang="ts"></script>

<template>
  <header class="bg-primary">
    <div class="max-w-desktop h-16 flex justify-between items-center mx-auto">
      <div>
        <h1 class="font-title text-3xl">CIRBOOK</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by author, title, isbn..."
          class="rounded-full w-[400px] py-2 px-5 font-extralight max-w-full"
        />
      </div>
      <div>
        <ul class="flex gap-x-5 text-lg font-light">
          <li>home</li>
          <li>books</li>
        </ul>
      </div>
    </div>
  </header>
</template>
