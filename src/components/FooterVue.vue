<template>
  <footer>
    <div class="container">
      <div class="row items-center justify-between">
        <div class="left">
          <div class="image">
            <h1 class="text-h4 text-weight-bold">Lyt24</h1>
          </div>
          <ul style="gap: 1rem" class="row items-center no-wrap">
            <li><a class="section_paraText" href="">Download Now</a></li>
            <li><a class="section_paraText" href="">License</a></li>
          </ul>
          <ul style="gap: 1rem" class="row items-center no-wrap">
            <li><a class="section_paraText" href="">About</a></li>
            <li><a class="section_paraText" href="">Features</a></li>
            <li><a class="section_paraText" href="">Pricing</a></li>
            <li><a class="section_paraText" href="">News</a></li>
            <li><a class="section_paraText" href="">Help</a></li>
            <li><a class="section_paraText" href="">Contact</a></li>
          </ul>
          <ul style="gap: 1rem" class="row items-center no-wrap">
            <li>
              <a class="section_paraText" href=""
                ><i class="fa-brands fa-facebook"></i
              ></a>
            </li>
            <li>
              <a class="section_paraText" href=""
                ><i class="fa-brands fa-x-twitter"></i
              ></a>
            </li>
            <li>
              <a class="section_paraText" href=""
                ><i class="fa-brands fa-instagram"></i
              ></a>
            </li>
          </ul>

          <p class="review_small">
            © {{ new Date().getFullYear() }} Insuresweet. All rights reserved
          </p>
        </div>
        <div class="right">
          <p class="p_sub_text mid">Get the App</p>
          <div style="gap: 1rem" class="column items-center">
            <a href=""><img :src="Badge1" alt="" /></a>
            <a href=""><img :src="Badge2" alt="" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Badge1 from "src/assets/badge1.svg";
import Badge2 from "src/assets/badge2.svg";
</script>

<style lang="scss" scoped></style>
