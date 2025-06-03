<template>
  <div class="container auth_screen">
    <q-carousel
      animated
      v-model="slide"
      navigation
      swipeable
      infinite
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        v-for="(slide, index) in slides"
        :key="index"
        :name="index + 1"
      >
        <img
          style="height: 200px; object-fit: cover"
          :src="slide.image"
          alt=""
        />
        <h4 class="text-h4 q-mt-lg">{{ slide.heading }}</h4>
        <p class="text-body1 q-mt-sm q-mb-md">
          {{ slide.description }}
        </p>

        <div class="row items-center justify-between q-mb-lg q-mt-sm">
          <q-btn
            v-if="index < 2"
            no-caps
            :to="{ name: 'login' }"
            no-wrap
            outline
            class=""
          >
            Skip
          </q-btn>
          <q-btn
            v-if="index === 2"
            no-caps
            :to="{ name: 'login' }"
            no-wrap
            class="bg-secondary text-white"
          >
            Continue
          </q-btn>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";

let slide = ref(1);
let autoplay = ref(true);

let slides = [
  {
    image: "/images/rider1.png",
    heading: "Welcome to Ridersverse",
    description:
      "Efficient and reliable delivery service at your fingertips. Find the best riders for your deliveries.",
  },
  {
    image: "/images/rider2.jpeg",
    heading: "Choose Your Delivery Location",
    description:
      "Select from a wide range of delivery locations and see the available riders and logistics companies that serve your area",
  },
  {
    image: "/images/rider3.webp",
    heading: "Fast and Secure Deliveries",
    description:
      "Once your delivery is created and payment is made, sit back and relax while our riders ensure your package gets to its destination safely and on time.",
  },
];
</script>

<style lang="scss" scoped></style>
