import components from "src/boot/components";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/HomePage.vue"),
        name: "home",
      },
      // {
      //   path: "/home",
      //   component: () => import("pages/IndexPage.vue"),
      //   name: "homepage",
      // },
    ],
  },
  {
    path: "/user/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/DashboardPage.vue"),
        name: "dashboard",
      },

      // {
      //   path: "/buy/insurance",
      //   component: () => import("pages/user/UtilityBills.vue"),
      //   name: "buy.insurance",
      // },

      {
        path: "/buy/policies",
        component: () => import("src/pages/user/PendingDeliveries.vue"),
        name: "buy.policies",
      },
      {
        path: "/policy/details",
        component: () => import("pages/user/PolicyDetails.vue"),
        name: "policy.details",
      },
      {
        path: "/assets",
        component: () => import("pages/user/AssetsPage.vue"),
        name: "assets",
      },
      {
        path: "/add-assets",
        component: () => import("pages/user/AddAssets.vue"),
        name: "add.assets",
      },
      {
        path: "/payment/success",
        component: () => import("pages/user/PaymentSuccess.vue"),
        name: "pay.success",
      },
      {
        path: "/order-detail",
        component: () => import("pages/user/OrderDetails.vue"),
        name: "order-detail",
      },
      {
        path: "/vendor/order-detail",
        component: () => import("pages/user/OrderDetailsRider.vue"),
        name: "rider.order-detail",
      },
      {
        path: "/user/manage-order",
        component: () => import("pages/user/ManageOrders.vue"),
        name: "manage.order",
      },
      {
        path: "/pay",
        component: () => import("pages/user/PayPremium.vue"),
        name: "pay",
      },
      {
        path: "/order/history",
        component: () => import("src/pages/user/HistoryPage.vue"),
        name: "order.history",
      },
      {
        path: "/manage-areas",
        component: () => import("src/pages/user/ManageAreas.vue"),
        name: "manage.areas",
      },
      {
        path: "/user/create-delivery",
        component: () => import("src/pages/user/CreateDeliveryPage.vue"),
        name: "create.delivery",
      },
      {
        path: "/profile",
        component: () => import("pages/user/ProfileArea.vue"),
        name: "profile",
      },
      {
        path: "/account-pages",
        component: () => import("pages/user/profile/AccountPages.vue"),
        name: "account.pages",
      },
      {
        path: "/my-account",
        component: () => import("pages/user/profile/MyAccount.vue"),
        name: "my.account",
      },
      {
        path: "/my-profile",
        component: () => import("pages/user/profile/MyProfile.vue"),
        name: "my.profile",
      },

      {
        path: "/verifications",
        component: () => import("pages/user/profile/VerificationPages.vue"),
        name: "verifications",
      },
      {
        path: "/email-verification",
        component: () => import("pages/user/profile/EmailVerification.vue"),
        name: "email.verification",
      },

      {
        path: "/update/account-details",
        component: () => import("pages/user/profile/UpdateAccountDetails.vue"),
        name: "update.account.details",
      },
      {
        path: "/profile/account-detail",
        component: () => import("pages/user/profile/AccountDetail.vue"),
        name: "view.account.detail",
      },
      {
        path: "/security",
        component: () => import("pages/user/profile/SecurityPages.vue"),
        name: "security.pages",
      },
      {
        path: "/forgot-pin-page",
        component: () => import("pages/user/profile/ForgotPinPage.vue"),
        name: "forgot.pin",
      },
      {
        path: "/forgot-password",
        component: () => import("pages/user/profile/ChangePassword.vue"),
        name: "forgot.password",
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminDashboardLayout.vue"),
    children: [
      {
        path: "/admin/dashboard",
        component: () => import("src/pages/admin/AllVendors.vue"),
        name: "admin.dashboard",
      },
      {
        path: "/admin/vendors",
        component: () => import("src/pages/admin/AllVendors.vue"),
        name: "admin.vendors",
      },
      {
        path: "/admin/operating-areas",
        component: () => import("src/pages/admin/CreateOperatingAreas.vue"),
        name: "admin.operating.areas",
      },
      {
        path: "/admin/users",
        component: () => import("src/pages/admin/AllUsers.vue"),
        name: "admin.users",
      },
      {
        path: "/admin/deliveries",
        component: () => import("src/pages/admin/Alldelivery.vue"),
        name: "admin.deliveries",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/welcome",
    component: () => import("src/pages/auth/WelcomeScreen.vue"),
    name: "auth.screen",
  },
  {
    path: "/login",
    component: () => import("pages/auth/LoginPage.vue"),
    name: "login",
  },
  {
    path: "/confirm-delivery",
    component: () => import("src/pages/ConfirmPage.vue"),
    name: "confirm-delivery",
  },
  {
    path: "/admin/login",
    component: () => import("pages/admin/LoginPage.vue"),
    name: "admin.login",
  },
  {
    path: "/login",
    component: () => import("pages/auth/LoginPage.vue"),
    name: "logout",
  },
  {
    path: "/register",
    component: () => import("pages/auth/RegisterPage.vue"),
    name: "register",
  },
  {
    path: "/vendor/register",
    component: () => import("pages/auth/RegisterVendorPage.vue"),
    name: "vendor.register",
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
