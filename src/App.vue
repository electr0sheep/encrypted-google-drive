<template>
  <drive-view
    v-if="loggedIn && logInCheckComplete"
    :logged-in.sync="loggedIn"
    :gapi.sync="gapi"
  />
  <log-in-view
    v-else-if="!loggedIn && logInCheckComplete"
    :logged-in.sync="loggedIn"
    :gapi.sync="gapi"
  />
</template>

<script>
import DriveView from './components/DriveView';
import LogInView from './components/LogInView';

export default {
  name: 'App',

  components: {
    DriveView,
    LogInView,
  },

  data: () => ({
    gapi: {},
    loggedIn: false,
    logInCheckComplete: false,
  }),

  mounted() {
    this.$gapi.getGapiClient()
        .then((gapi) => {
          this.gapi = gapi;
          this.checkIfAlreadyLoggedIn();
        });
  },

  methods: {
    checkIfAlreadyLoggedIn() {
      if (this.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        this.loggedIn = true;
      }
      this.logInCheckComplete = true;
    },
  },
};
</script>

<style scoped>
.custom-toolbar-title {
  color: #5f6368 !important;
}
</style>
