<template>
  <v-app>
    <v-app-bar
      app
      flat
      color="white"
    >
      <v-img
        alt="Google Drive Logo"
        class="shrink mr-2"
        contain
        src="https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png"
        transition="scale-transition"
        width="40"
        elevate-on-scroll
      />
      <v-toolbar-title class="custom-toolbar-title">
        Encrypted Drive
      </v-toolbar-title>
      <v-container mt-6>
        <v-layout>
          <v-flex xs7>
            <v-text-field
              v-model="searchInput"
              label="Search in Encrypted Drive"
              solo
              flat
              background-color="#f1f3f4"
            >
              <template #prepend-inner>
                <v-tooltip
                  bottom
                  transition="none"
                >
                  <template #activator="{ on }">
                    <v-btn
                      icon
                      v-on="on"
                      @click="search"
                    >
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </template>
                  Search
                </v-tooltip>
              </template>
              <template
                v-if="searchInput.length > 0"
                #append
              >
                <v-tooltip
                  bottom
                  transition="none"
                >
                  <template #activator="{ on }">
                    <v-btn
                      icon
                      v-on="on"
                      @click="clearSearch"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </template>
                  Clear search
                </v-tooltip>
              </template>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-spacer />
      <v-btn
        @click="signOut"
      >
        Sign Out
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        fluid
      >
        <v-row>
          <v-col>
            Folders
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="folder in folders"
            :key="folder.id"
            cols="6"
            sm="4"
            md="4"
            lg="2"
            xl="2"
          >
            <v-card
              outlined
              max-height="48"
              min-height="48"
            >
              <v-card-text
                class="mt-n1 text-truncate"
                style="font-size: 13px;"
              >
                <v-icon
                  v-if="folder.shared"
                  color="#5f6367"
                >
                  mdi-folder-account
                </v-icon>
                <v-icon
                  v-else
                  color="#5f6367"
                >
                  mdi-folder
                </v-icon>
                {{ folder.name }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            Files
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="file in files"
            :key="file.id"
            cols="6"
            sm="4"
            md="4"
            lg="2"
            xl="2"
          >
            <v-card
              outlined
              max-height="48"
              min-height="48"
            >
              <v-card-text
                class="mt-n1 text-truncate"
                style="font-size: 13px;"
              >
                <!-- eslint-disable max-len -->
                <v-icon
                  v-if="file.mimeType == 'application/vnd.google-apps.document'"
                  color="#4285f3"
                >
                  mdi-text-box
                </v-icon>
                <v-icon
                  v-else-if="file.mimeType == 'application/pdf'"
                  color="#ea4435"
                >
                  mdi-pdf-box
                </v-icon>
                <v-icon
                  v-else-if="file.mimeType == 'image/png'"
                  color="#da3025"
                >
                  mdi-image
                </v-icon>
                <v-icon
                  v-else-if="file.mimeType == 'text/plain'"
                  color="#1b73e7"
                >
                  mdi-file-document
                </v-icon>
                <v-icon v-else>
                  mdi-folder
                </v-icon>
                {{ file.name }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DriveView',

  props: {
    gapi: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    searchInput: '',
    folders: [],
    files: [],
  }),

  mounted() {
    this.getFolderContents('root');
  },

  methods: {
    signOut() {
      this.gapi.auth2.getAuthInstance().signOut();
      this.$emit('update:loggedIn', false);
    },

    search() {
      alert('You clicked search!');
    },

    clearSearch() {
      this.searchInput = '';
    },

    getFolderContents(folder) {
      this.gapi.client.drive.files
          .list({
            q: `'${folder}' in parents and trashed = false`,
            fields: '*',
          })
          .then((response) => {
            console.log(response);
            this.getFiles(response.result.files.filter((file) => {
              return file.mimeType !== 'application/vnd.google-apps.folder';
            }));
            this.getFolders(response.result.files.filter((file) => {
              return file.mimeType === 'application/vnd.google-apps.folder';
            }));
          });
    },

    getFiles(files) {
      this.files = files.sort((file1, file2) => {
        if (file1.name.toLowerCase() < file2.name.toLowerCase()) {
          return -1;
        } else {
          return 1;
        }
      });
    },

    getFolders(folders) {
      this.folders = folders.sort((file1, file2) => {
        if (file1.name.toLowerCase() < file2.name.toLowerCase()) {
          return -1;
        } else {
          return 1;
        }
      });
    },
  },
};
</script>
