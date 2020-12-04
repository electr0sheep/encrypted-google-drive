<template>
  <div>
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
          :id="folder.id"
          outlined
          hover
          max-height="48"
          min-height="48"
          @contextmenu.prevent.stop="showContextMenu"
          @dblclick="folderDoubleClick(folder.id)"
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
  </div>
</template>

<script>
export default {
  name: 'FoldersList',

  props: {
    folders: {
      type: Array,
      required: true,
    },
    getFolderContents: {
      type: Function,
      required: true,
    },
    showFolderContextMenu: {
      type: Function,
      required: true,
    },
  },

  methods: {
    folderDoubleClick(folderId) {
      this.getFolderContents(folderId);
    },

    showContextMenu(e) {
      this.showFolderContextMenu(e);
    },
  },
};
</script>
