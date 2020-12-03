<template>
  <v-app>
    <v-app-bar
      app
      elevate-on-scroll
      color="white"
    >
      <v-img
        alt="Google Drive Logo"
        class="shrink mr-2"
        contain
        src="https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png"
        transition="scale-transition"
        width="40"
      />
      <v-toolbar-title class="custom-toolbar-title">
        Encrypted Drive
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        color="primary"
        @click="signIn()"
      >
        Login
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row class="text-center">
          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">
              Welcome to Encrypted Google Drive
            </h1>

            <p class="subheading font-weight-regular">
              For help and collaboration with other Vuetify developers,
              <br>please join our online
              <a
                href="https://community.vuetifyjs.com"
                target="_blank"
              >Discord Community</a>
            </p>
          </v-col>

          <v-col
            class="mb-5"
            cols="12"
          >
            <h2 class="headline font-weight-bold mb-3">
              What's next?
            </h2>

            <v-row justify="center" />
          </v-col>

          <v-col
            class="mb-5"
            cols="12"
          >
            <h2 class="headline font-weight-bold mb-3">
              Important Links
            </h2>

            <v-row justify="center" />
          </v-col>

          <v-col
            class="mb-5"
            cols="12"
          >
            <h2 class="headline font-weight-bold mb-3">
              Ecosystem
            </h2>

            <v-row justify="center" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LogInView',

  props: {
    loggedIn: {
      type: Boolean,
      required: true,
    },
    gapi: {
      type: Object,
      required: true,
    },
  },

  data: () => ({}),

  methods: {
    signIn() {
      if (this.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        this.$emit('update:loggedIn', true);
      } else {
        this.gapi.auth2.getAuthInstance().signIn()
            .then(() => {
              this.$emit('update:loggedIn', true);
            });
      }
    },
  },
};
</script>
