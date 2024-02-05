<script setup lang="ts">
import cover from '@/assets/cover.png'
</script>

<template>
  <section class="bg-primary mb-10">
    <div class="max-w-desktop gap-x-10 mx-auto grid grid-cols-12 pt-10 translate-y-10">
      <div class="col-start-3 col-span-3">
        <img
          :src="cover"
          alt="Harry Potter and the Philosopher’s Stone"
          class="w-full overflow-hidden rounded-xl shadow-xl"
        />
      </div>
      <div class="col-span-4 flex flex-col justify-around">
        <div class="flex flex-col gap-y-10">
          <div>
            <h5 class="font-body font-medium text-[40px] truncate-2-lines overflow-hidden">
              Harry Potter and the Philosopher’s Stone
            </h5>
            <p class="text-author text-[12px] font-body">J.K. ROWLING</p>
          </div>
          <div class="flex flex-col text-secondary font-medium font-price">
            <span class="text-3xl text-nowrap rounded-3xl">99,10 NZD</span>
            <span>8 Books left</span>
          </div>
        </div>
        <div>
          <button
            class="font-button shadow-xl bg-complementary text-white rounded-full py-3 px-4 text-body"
          >
            PURCHASE A COPY
          </button>
        </div>
      </div>
    </div>
  </section>
  <section class="my-32 max-w-desktop mx-auto">
    <h4 class="font-title text-3xl text-center mb-10">Synopsis</h4>
    <p class="font-title text-lg font-extralight text-center">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, temporibus exercitationem.
      Sed, repellat iure. Corporis totam nulla ut error aliquam laudantium cumque ducimus,
      voluptates dolore. Ad dignissimos ex numquam deleniti! Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Libero voluptatem numquam nobis minima et, consequuntur animi, quis, illo
      earum consequatur illum! Soluta, hic sunt tenetur reiciendis veniam harum adipisci quo.
    </p>
  </section>
</template>
