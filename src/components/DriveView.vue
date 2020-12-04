<template>
  <v-app>
    <v-app-bar
      app
      flat
      color="white"
      @contextmenu.prevent.stop
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
        v-if="loading === false"
        fluid
        @contextmenu.prevent.stop="showRootContextMenu"
      >
        <folders-list
          v-if="folders.length > 0"
          :folders="folders"
          :get-folder-contents="getFolderContents"
          :show-folder-context-menu="showFolderContextMenu"
        />
        <files-list
          v-if="files.length > 0"
          :files="files"
          :show-file-context-menu="showFileContextMenu"
        />
      </v-container>
      <v-container
        fill-height
        fluid
        @contextmenu.prevent.stop="showRootContextMenu"
      />
      <context-menu
        :menu-items="menuItems"
        :show-menu.sync="showMenu"
        :x="x"
        :y="y"
        @selected-item="setcontextMenuSelection"
      />
    </v-main>
  </v-app>
</template>

<script>
import FilesList from './FilesList';
import FoldersList from './FoldersList';
import ContextMenu from './ContextMenu';

export default {
  name: 'DriveView',

  components: {
    FilesList,
    FoldersList,
    ContextMenu,
  },

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
    loading: true,
    showMenu: false,
    x: 0,
    y: 0,
    menuItems: [[]],
    contextMenuSelection: null,
    selectedItem: null,
  }),

  watch: {
    contextMenuSelection: function() {
      switch (this.contextMenuSelection) {
        case 'new-folder':
          alert('Create a new folder');
          break;
        default:
          // eslint-disable-next-line max-len
          alert(`You selected ${this.contextMenuSelection}, but we're not doing anything with that yet!`);
          break;
      }
    },
  },

  mounted() {
    this.getFolderContents('root');
  },

  methods: {
    setcontextMenuSelection(value) {
      this.contextMenuSelection = value;
    },

    folderDoubleClick(folderId) {
      this.getFolderContents(folderId);
    },

    showRootContextMenu(e) {
      this.selectedItem = null;
      this.menuItems = [
        [
          {
            title: 'New Folder',
            icon: 'mdi-folder-plus-outline',
            value: 'new-folder',
          },
        ],
        [
          {
            title: 'Upload files',
            icon: 'mdi-file-upload-outline',
            value: 'upload-files',
          },
          {
            title: 'Upload folder',
            icon: 'mdi-folder-upload-outline',
            value: 'upload-folder',
          },
        ],
      ];
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },

    showFolderContextMenu(e) {
      this.selectedItem = e.target.offsetParent.id;
      this.menuItems = [
        [
          {
            title: 'Download',
            icon: 'mdi-download-outline',
            value: 'download-folder',
          },
        ],
        [
          {
            title: 'Remove',
            icon: 'mdi-trash-can-outline',
            value: 'remove-folder',
          },
        ],
      ];
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },

    showFileContextMenu(e) {
      this.selectedItem = e.target.offsetParent.id;
      this.menuItems = [
        [
          {
            title: 'Download',
            icon: 'mdi-download-outline',
            value: 'download-file',
          },
        ],
        [
          {
            title: 'Remove',
            icon: 'mdi-trash-can-outline',
            value: 'remove-file',
          },
        ],
      ];
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },

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
            this.loading = false;
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
