<template>
  <q-layout view="lHh Lpr lFf">
    <header class="header" data-header>
      <div class="container">
        <router-link to="" class="logo">
          <!-- <img
            src="../assets/logo.svg"
            width="148"
            height="38"
            alt="Fasteat home"
          /> -->
          <h2
            style="gap: 0.5rem"
            class="text-weight-bold text-black row items-center no-wrap"
          >
            <img style="max-width: 80px" src="/images/logo.png" alt="" />
            Ridersverse
          </h2>
        </router-link>

        <nav class="navbar" data-navbar>
          <button
            class="nav-close-btn"
            aria-label="close menu"
            data-nav-toggler
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <router-link to="" class="logo">
            <!-- <img
              src="../assets/logo.svg"
              width="148"
              height="38"
              alt="Fasteat home"
            /> -->
            <h2 class="text-weight-bold text-black">Ridersverse</h2>
          </router-link>

          <ul class="navbar-list">
            <li class="navbar-item">
              <p @click="scrollto('home')" class="navbar-link" data-nav-link>
                Home
              </p>
            </li>

            <li class="navbar-item">
              <p @click="scrollto('about')" class="navbar-link" data-nav-link>
                About Us
              </p>
            </li>

            <li class="navbar-item">
              <p @click="scrollto('home')" class="navbar-link" data-nav-link>
                Contact
              </p>
            </li>
            <li class="navbar-item">
              <router-link
                v-if="store.isAuthenticated"
                :to="{ name: 'dashboard' }"
                class="navbar-link bg-primary q-pa-md text-white rounded"
                data-nav-link
              >
                Dashboard
              </router-link>
              <router-link
                v-else
                :to="{ name: 'login' }"
                class="navbar-link bg-primary q-pa-md text-white rounded"
                data-nav-link
              >
                Login
              </router-link>
            </li>
          </ul>
        </nav>

        <button class="nav-open-btn" aria-label="open menu" data-nav-toggler>
          <i class="fa-solid fa-bars"></i>
        </button>

        <div class="overlay" data-overlay data-nav-toggler></div>
      </div>
    </header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

let routeData = useRoute();
let router = useRouter();
const leftDrawerOpen = ref(false);
let store = useMyAuthStore();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const scrollto = (section) => {
  document.getElementById(section).scrollIntoView({ behavior: "smooth" });
};
const routeIsReady = computed(() => {
  return router.currentRoute.value !== null;
});
const transitionName = computed(() => {
  if (routeData.name === "dashboard") {
    return "fade";
  } else if (routeData.name === "buy.policies") {
    return "slide-left";
  } else {
    return "slide-right";
  }
});
const scrollTo = (arg) => {
  document.getElementById(arg).scrollIntoView({ behavior: "smooth" });
};
onMounted(() => {
  "use strict";

  /**
   * add event on multiple elements
   */

  const addEventOnElements = function (elem, type, callback) {
    for (let i = 0, len = elem.length; i < len; i++) {
      elem[i].addEventListener(type, callback);
    }
  };

  /**
   * LOADING
   */

  const loadingElement = document.querySelector("[data-loading-container]");

  window.addEventListener("load", function () {
    loadingElement.classList.add("loaded");
    document.body.classList.add("loaded");
  });

  /**
   * MOBILE NAVBAR TOGGLE
   */

  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const navbarLinks = document.querySelectorAll("[data-nav-link]");
  const overlay = document.querySelector("[data-overlay]");

  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
  };

  addEventOnElements(navTogglers, "click", toggleNavbar);

  const closeNavbar = function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
  };

  addEventOnElements(navbarLinks, "click", closeNavbar);

  /**
   * HEADER
   */

  // header will be active after scroll 200px of window

  const header = document.querySelector("[data-header]");

  const headerActive = function () {
    window.scrollY > 200
      ? header.classList.add("active")
      : header.classList.remove("active");
  };

  window.addEventListener("scroll", headerActive);

  /**
   * SCROLL REVEAL
   */

  const revealElements = document.querySelectorAll("[data-reveal]");

  const scrollReveal = function () {
    for (let i = 0, len = revealElements.length; i < len; i++) {
      if (
        revealElements[i].getBoundingClientRect().top <
        window.innerHeight / 1.2
      ) {
        revealElements[i].classList.add("revealed");
      }
    }
  };

  window.addEventListener("scroll", scrollReveal);
  window.addEventListener("load", scrollReveal);
});
</script>
