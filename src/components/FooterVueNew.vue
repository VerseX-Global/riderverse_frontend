<template>
  <footer class="footer">
    <div class="container">
      <div class="section footer-top grid-list">
        <div class="footer-brand">
          <router-link to="" class="logo">
            <!-- <img
              src="../assets/logo-footer.svg"
              width="148"
              height="38"
              alt="fasteat home"
            /> -->
            <h2 class="text-weight-bold text-white">Ridersverse</h2>
          </router-link>

          <h2 class="text-h4 q-my-md text-weight-medium">
            Delivery at its finest
          </h2>

          <p class="section-text">
            Riders Delivery is a reliable and efficient delivery service
            designed to simplify logistics for individuals and businesses. We
            offer fast pick-ups, timely drop-offs, and specialized solutions to
            meet your unique needs. With a focus on innovation and customer
            satisfaction, we ensure seamless, secure, and hassle-free deliveries
            every time.
          </p>
        </div>

        <ul class="footer-list">
          <li>
            <p class="footer-list-title h5">Menu</p>
          </li>

          <li>
            <a href="#" class="footer-link">
              <span class="span">Home</span>

              <i class="fa-solid fa-bell"></i>
            </a>
          </li>

          <li>
            <a href="#" class="footer-link">
              <span class="span">About Us</span>

              <i class="fa-solid fa-bell"></i>
            </a>
          </li>

          <li>
            <a href="#" class="footer-link">
              <span class="span">Restaurants</span>

              <i class="fa-solid fa-bell"></i>
            </a>
          </li>

          <li>
            <a href="#" class="footer-link">
              <span class="span">Contacts</span>

              <i class="fa-solid fa-bell"></i>
            </a>
          </li>
        </ul>

        <ul class="footer-list">
          <li>
            <p class="footer-list-title h5">Contacts</p>
          </li>

          <li>
            <address class="address">
              <i class="fa-solid fa-location-dot"></i>

              <span class="span">56 Coal City Garden Estate, Enugu.</span>
            </address>
          </li>

          <li>
            <a href="mailto:support@ridersverse.net" class="footer-link">
              <i class="fa-solid fa-envelope"></i>

              <span class="span">support@ridersverse.net</span>
            </a>
            <a href="mailto:info@ridersverse.net" class="footer-link">
              <i class="fa-solid fa-envelope"></i>

              <span class="span">info@ridersverse.net</span>
            </a>
          </li>

          <li>
            <a href="tel:+2347044914032" class="footer-link">
              <i class="fa-solid fa-phone"></i>
              <span class="span">07044914032</span>
            </a>
          </li>

          <li>
            <ul class="social-list">
              <li>
                <a href="#" class="social-link">
                  <i class="fa-brands fa-facebook"></i>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <i class="fa-brands fa-x-twitter"></i>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          Copyright {{ new Date().getFullYear() }} Ridersverse. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Badge1 from "src/assets/badge1.svg";
import Badge2 from "src/assets/badge2.svg";
</script>

<style lang="scss" scoped></style>
