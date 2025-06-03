import { defineStore } from "pinia";

export const useMyAuthStore = defineStore("ridersVerse", {
  state: () => ({
    token: localStorage.getItem("token") || "", // Ensure persistence
    userdetails: {},
    formData: {},
    previousRoute: "",
    typeOfPersonnel: "",
  }),
  persist: {
    key: "ridersVerseKey",
    storage: localStorage,
  },
  getters: {
    registrationForm: (state) => state.userdetails,
    isAuthenticated: (state) => !!state.token, // Check if token exists
  },
  actions: {
    setUserDetails(data) {
      const token = data.token;
      console.log(data);
      if (data.user) {
        this.userdetails = data.user;
      } else if (data.newUser) {
        this.userdetails = data.newUser;
      } else if (data.newRider) {
        this.userdetails = data.newRider;
      } else if (data.newvendor) {
        console.log("first");
        this.userdetails = data.newvendor;
      } else if (data.vendor) {
        this.userdetails = data.vendor;
      } else {
        this.userdetails = data.rider;
      }
      localStorage.setItem("token", token);
      this.token = token;
    },
    setAdminDetails(data) {
      console.log(data);
      this.userdetails = data.admin;
      this.token = data.token;
      console.log("here");
    },
    logOut() {
      this.token = "";
      this.userdetails = {};
      localStorage.removeItem("token");
      localStorage.removeItem("userdet");
    },
  },
});
