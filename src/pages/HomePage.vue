<template>
  <q-page class="newHomePage">
    <main>
      <article>
        <!--
        - #HERO
      -->

        <section id="home" class="section hero has-bg-image" aria-label="home">
          <div class="container">
            <div class="hero-content">
              <h1 class="h1 hero-title">
                Delivering Excellence, Every Mile. Your Package, Our Priority.
                <!-- Delivery at the highest level of professionalism and expertise -->
              </h1>

              <p class="hero-text">
                Riders Delivery App is your reliable partner for fast and secure
                delivery services. From small packages to bulky shipments, we
                connect you with a network of trusted couriers to ensure your
                items reach their destination on time. Whether for personal or
                business needs, Riders Delivery App is here to make deliveries
                seamless and stress-free.
              </p>

              <router-link
                :to="{ name: 'login' }"
                class="btn btn-secondary has-after"
                >Order Now</router-link
              >
            </div>

            <figure class="hero-banner">
              <img
                src="/images/hero-banner.png"
                width="680"
                height="720"
                alt="hero banner"
                class="w-100"
              />

              <!-- <img
                src="/images/hero-shape-1.svg"
                width="338"
                height="138"
                alt="shape"
                class="shape shape-1"
              /> -->

              <!-- <img
                src="/images/hero-shape-2.svg"
                width="237"
                height="80"
                alt="shape"
                class="shape shape-2"
              /> -->
            </figure>
          </div>
        </section>

        <!--
        - #INSTRUCTION
      -->

        <section id="about" class="section instruction" aria-labelledby="">
          <div class="container">
            <h2 class="h2 section-title" id="instruction-label" data-reveal>
              How It Works
            </h2>

            <p class="section-text" data-reveal>
              Book deliveries instantly or plan ahead with scheduled pickups.
            </p>

            <ul class="grid-list">
              <li data-reveal="left">
                <div class="instruction-card">
                  <figure class="card-banner">
                    <img
                      src="../assets/instructuion-1.png"
                      width="300"
                      height="154"
                      loading="lazy"
                      alt="Select Restaurant"
                      class="w-100"
                    />
                  </figure>

                  <div class="card-content">
                    <h3 class="h5 card-title">
                      <span class="span">01</span>
                      Create Delivery
                    </h3>

                    <p class="card-text">
                      Once your request is confirmed, a trusted rider is
                      assigned to pick up your package. Our team ensures fast
                      and secure delivery to the destination.
                      <strong> Verified Riders</strong> – Reliable professionals
                      handling your package,
                      <strong>Safe & Secure Handling</strong> – Your items are
                      in good hands.
                    </p>
                  </div>
                </div>
              </li>

              <li data-reveal>
                <div class="instruction-card">
                  <figure class="card-banner">
                    <img
                      src="../assets/instructuion-2.png"
                      width="300"
                      height="154"
                      loading="lazy"
                      alt="Select menu"
                      class="w-100"
                    />
                  </figure>

                  <div class="card-content">
                    <h3 class="h5 card-title">
                      <span class="span">02</span>
                      Make Payment
                    </h3>

                    <p class="card-text">
                      Pay conveniently through our secure payment gateway.
                      Choose from multiple payment options to complete your
                      transaction. <strong>Multiple Payment Methods</strong> –
                      Card, mobile wallet, or cash.
                      <strong>Instant Payment Confirmation</strong> – Get
                      notified once payment is received.
                    </p>
                  </div>
                </div>
              </li>

              <li data-reveal="right">
                <div class="instruction-card">
                  <figure class="card-banner">
                    <img
                      src="../assets/instructuion-3.png"
                      width="300"
                      height="154"
                      loading="lazy"
                      alt="Wait for delivery"
                      class="w-100"
                    />
                  </figure>

                  <div class="card-content">
                    <h3 class="h5 card-title">
                      <span class="span">03</span>
                      Wait for Your Delivery 🚲
                    </h3>

                    <p class="card-text">
                      Sit back and relax while we handle the rest! Our riders
                      ensure timely deliveries, and you can track your package
                      in real time. <strong>Easy Contact</strong> – Need to
                      reach the rider? Chat or call directly,
                      <strong>Delivery Confirmation</strong> – Receive proof of
                      delivery once completed.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!--
        - #TOP RESTAURANT
      -->

        <section
          class="section top-restaurant"
          aria-labelledby="top-restaurent-label"
        >
          <div class="container">
            <ul class="grid-list">
              <li data-reveal="left">
                <h2 class="h2 section-title" id="top-restaurent-label">
                  Category of Services
                </h2>

                <p class="section-text">
                  Fast, reliable delivery solutions tailored for your needs,
                  with on-time service and real-time tracking.
                </p>
              </li>

              <li data-reveal="right">
                <div class="restaurant-card">
                  <div class="card-icon">
                    <img
                      src="../assets/rest-1.jpg"
                      width="100"
                      height="100"
                      loading="lazy"
                      alt="Kennington Lane Cafe"
                      class="w-100"
                    />
                  </div>

                  <h3 class="h5 card-title">Pick-Up and Delivery Services</h3>

                  <div class="rating-wrapper">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                  </div>

                  <!-- <div class="card-meta-wrapper">
                    <a href="#" class="card-meta">american</a>
                    <a href="#" class="card-meta">steakhouse</a>
                  </div> -->

                  <p class="card-text q-mt-sm">
                    Reliable pick-up and drop-off for packages, parcels, and
                    goods of all sizes.
                  </p>
                </div>
              </li>

              <li data-reveal="left">
                <div class="restaurant-card">
                  <div class="card-icon">
                    <img
                      src="../assets/rest-2.jpg"
                      width="100"
                      height="100"
                      loading="lazy"
                      alt="The Wilmington"
                      class="w-100"
                    />
                  </div>

                  <h3 class="h5 card-title">Vendor Management</h3>

                  <div class="rating-wrapper">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                  </div>

                  <!-- <div class="card-meta-wrapper">
                    <a href="#" class="card-meta">american</a>
                    <a href="#" class="card-meta">steakhouse</a>
                  </div> -->

                  <p class="card-text q-mt-sm">
                    Seamless coordination with vendors to streamline product
                    deliveries and manage supply chains efficiently.
                  </p>
                </div>
              </li>

              <li data-reveal="right">
                <div class="restaurant-card">
                  <div class="card-icon">
                    <img
                      src="../assets/rest-3.jpg"
                      width="100"
                      height="100"
                      loading="lazy"
                      alt="Kings Arms"
                      class="w-100"
                    />
                  </div>

                  <h3 class="h5 card-title">Express and Same-Day Delivery</h3>

                  <div class="rating-wrapper">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                  </div>

                  <!-- <div class="card-meta-wrapper">
                    <a href="#" class="card-meta">american</a>
                    <a href="#" class="card-meta">healthy</a>
                  </div> -->

                  <p class="card-text q-mt-sm">
                    Urgent delivery options designed for time-sensitive
                    shipments, ensuring your items arrive when you need them
                    most.
                  </p>
                </div>
              </li>
              <li data-reveal="right">
                <div class="restaurant-card">
                  <div class="card-icon">
                    <img
                      src="../assets/rest-3.jpg"
                      width="100"
                      height="100"
                      loading="lazy"
                      alt="Kings Arms"
                      class="w-100"
                    />
                  </div>

                  <h3 class="h5 card-title">Insurance for Deliveries</h3>

                  <div class="rating-wrapper">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                  </div>

                  <!-- <div class="card-meta-wrapper">
                    <a href="#" class="card-meta">american</a>
                    <a href="#" class="card-meta">healthy</a>
                  </div> -->

                  <p class="card-text q-mt-sm">
                    Comprehensive coverage to protect your valuable shipments
                    against
                  </p>
                </div>
              </li>
            </ul>

            <!-- <a href="#" class="btn btn-secondary has-after">
              <span class="span">See All</span>

              <i class="fa-solid fa-arrow-right"></i>
            </a> -->
          </div>
        </section>

        <!--
        - #CTA
      -->

        <section class="section cta has-bg-image" aria-labelledby="cta-label">
          <div class="container">
            <figure class="cta-banner" data-reveal="left">
              <img
                src="../assets/cta-banner.png"
                width="680"
                height="704"
                loading="lazy"
                alt="cta banner"
                class="w-100"
              />
            </figure>

            <div class="cta-content" data-reveal="right">
              <h2 class="h3 section-title" id="cta-label">
                🚀 Start Delivering with Ease Today!
              </h2>

              <p class="section-text">
                Sign Up Now to experience seamless, secure, and fast deliveries!
              </p>

              <router-link
                :to="{ name: 'register' }"
                class="btn btn-primary has-after"
                >Register</router-link
              >
            </div>
          </div>
        </section>

        <!--
        - #STATS
      -->

        <section class="stats" aria-label="statistics" data-reveal>
          <div class="container">
            <ul class="grid-list">
              <li>
                <h2 class="h3 section-title">Service shows good taste.</h2>
              </li>

              <li class="stats-item">
                <span class="span">976</span>

                <p class="stats-text">
                  Satisfied <br />
                  Customer
                </p>
              </li>

              <li class="stats-item">
                <span class="span">12</span>

                <p class="stats-text">
                  Best <br />
                  Restaurants
                </p>
              </li>

              <li class="stats-item">
                <span class="span">1K+</span>

                <p class="stats-text">
                  Food <br />
                  Delivered
                </p>
              </li>
            </ul>
          </div>
        </section>

        <!--
        - #TESTIMONIALS
      -->

        <section class="section testi" aria-labelledby="testi-label">
          <div class="container">
            <div class="testi-content" data-reveal="left">
              <h2 class="h2 section-title" id="testi-label">
                What customers say about us
              </h2>

              <blockquote class="testi-text">
                "I needed a package delivered across town urgently, and this
                platform came through! The rider was professional, and I could
                track my order in real time. Definitely using this service
                again!".
              </blockquote>

              <div class="wrapper">
                <img
                  src="../assets/testi-avatar.jpg"
                  width="70"
                  height="70"
                  loading="lazy"
                  alt="Thomas Adamson"
                  class="author-img"
                />

                <div>
                  <p class="author-title">Michael O, Lagos</p>

                  <div class="rating-wrapper">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                  </div>
                </div>
              </div>
            </div>

            <figure class="testi-banner" data-reveal="right">
              <img
                src="../assets/testimonial-banner.png"
                width="680"
                height="588"
                alt="testimonial banner"
                class="w-100"
              />
            </figure>
          </div>
        </section>

        <!--
        - #PARTNERSHIP
      -->

        <section class="section partnership" aria-label="partnership">
          <div class="container">
            <h2 class="h2 section-title" data-reveal>
              Want to Join Partnership?
            </h2>

            <ul class="grid-list">
              <li data-reveal="left">
                <div class="partnership-card">
                  <figure
                    class="card-banner img-holder"
                    style="--width: 640; --height: 402"
                  >
                    <img
                      src="../assets/partner-1.jpg"
                      width="640"
                      height="402"
                      loading="lazy"
                      alt="Join Courier"
                      class="img-cover"
                    />
                  </figure>

                  <div class="card-content">
                    <h3 class="h5 card-title">Sign up as user</h3>

                    <router-link
                      :to="{ name: 'register' }"
                      class="btn btn-primary has-after"
                    >
                      <span class="span">Register</span>

                      <i class="fa-solid fa-arrow-right"></i>
                    </router-link>
                  </div>
                </div>
              </li>

              <li data-reveal="right">
                <div class="partnership-card">
                  <figure
                    class="card-banner img-holder"
                    style="--width: 640; --height: 402"
                  >
                    <img
                      src="../assets/partner-2.jpg"
                      width="640"
                      height="402"
                      loading="lazy"
                      alt="Join Merchant"
                      class="img-cover"
                    />
                  </figure>

                  <div class="card-content">
                    <h3 class="h5 card-title">Join as Vendor</h3>

                    <router-link
                      :to="{ name: 'vendor.register' }"
                      class="btn btn-primary has-after"
                    >
                      <span class="span">Register</span>

                      <i class="fa-solid fa-arrow-right"></i>
                    </router-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!--
        - #NEWSLETTER
      -->

        <section id="faq" class="section instruction" aria-labelledby="">
          <div class="container">
            <h2 class="h2 section-title" id="instruction-label" data-reveal>
              Frequently asked questions
            </h2>

            <p class="section-text" data-reveal>Lets answer your questions</p>

            <div
              style="max-width: 600px; margin: 0 auto"
              class="row justify-center"
            >
              <q-list bordered class="rounded-borders full-width">
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section>
                      What types of items can I send using Riders Delivery?
                    </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      You can send documents, parcels, groceries, furniture, and
                      even fragile or perishable goods. However, certain
                      prohibited items, such as hazardous materials or illegal
                      substances, are not allowed.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section> How do I book a delivery? </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      Visit our website, enter the pickup and drop-off
                      locations, select the delivery type, and confirm your
                      booking with just a few clicks.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section>
                      What are your delivery charges?
                    </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      Delivery charges depend on the distance, package size, and
                      delivery speed. You can view an instant quote directly on
                      the website before confirming your booking.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section>
                      Is same-day delivery available?
                    </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      Absolutely! We offer same-day delivery for urgent
                      shipments. Choose the "Same-Day Delivery" option during
                      booking.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section>
                      What if my package gets lost or damaged?
                    </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      Your package is insured for added peace of mind. In the
                      rare case of loss or damage, contact our support team via
                      the website to initiate a claim.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section>
                      Do you offer business delivery solutions?
                    </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      Yes, we provide customized logistics solutions for
                      businesses, including bulk shipping and subscription
                      plans.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section>
                      What payment methods do you accept?
                    </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      We accept credit/debit cards, online payment gateways, and
                      invoicing options for businesses.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <!-- <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section>
                      Express and Same-Day Delivery
                    </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      Urgent delivery options designed for time-sensitive
                      shipments, ensuring your items arrive when you need them
                      most.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section> Insurance for Deliveries </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      Comprehensive coverage to protect your valuable shipments
                      against loss or damage during transit, ensuring peace of
                      mind for all deliveries.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section> Vendor Management </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section>
                      Comprehensive coverage to protect your valuable shipments
                      against loss or damage during transit, ensuring peace of
                      mind for all deliveries.
                    </q-card-section>
                  </q-card>
                </q-expansion-item> -->
              </q-list>
            </div>
          </div>
        </section>

        <section class="section newsletter" aria-label="newsletter">
          <div class="container">
            <figure class="newsletter-banner" data-reveal="left">
              <img
                src="../assets/newsletter-banenr.png"
                width="680"
                height="405"
                loading="lazy"
                alt="Illustration"
                class="w-100"
              />
            </figure>

            <div class="newsletter-content" data-reveal="right">
              <h2 class="h4 section-title">
                Get the menu of your favorite restaurants every day
              </h2>

              <div class="input-wrapper">
                <input
                  type="email"
                  name="email_address"
                  placeholder="Enter email address"
                  required
                  class="input-field"
                />

                <button type="submit" class="btn btn-primary has-after">
                  <i class="fa-solid fa-bell"></i>

                  <span class="span">Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
    <FooterVueNew id="contact" />
  </q-page>
</template>

<script setup>
import FooterVueNew from "src/components/FooterVueNew.vue";
import { ref } from "vue";

let slide = ref(1);
</script>

<style lang="scss" scoped></style>
