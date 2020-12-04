<template>
  <div>
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
          hover
          max-height="48"
          min-height="48"
          @contextmenu.prevent.stop="showContextMenu"
        >
          <v-card-text
            class="mt-n1 text-truncate"
            style="font-size: 13px;"
          >
            <v-icon
              v-if="mimeTypeIconMap.get(file.mimeType) !== undefined"
              :color="mimeTypeIconMap.get(file.mimeType).color"
            >
              {{ mimeTypeIconMap.get(file.mimeType).icon }}
            </v-icon>
            <v-icon v-else>
              mdi-folder
            </v-icon>
            {{ file.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mimeTypeIconMap} from './../scripts/mimeTypeIconMap';

export default {
  name: 'FilesList',

  props: {
    files: {
      type: Array,
      required: true,
    },
    showFileContextMenu: {
      type: Function,
      required: true,
    },
  },

  data: () => ({
    mimeTypeIconMap: mimeTypeIconMap,
  }),

  methods: {
    showContextMenu(e) {
      this.showFileContextMenu(e);
    },
  },
};
</script>
