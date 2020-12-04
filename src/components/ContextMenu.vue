<template>
  <v-menu
    :value="showMenu"
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
  >
    <v-list>
      <v-list-item-group
        v-model="selectedItem"
      >
        <template
          v-for="(itemGroup, itemGroupIndex) in menuItems"
        >
          <v-divider
            v-if="itemGroupIndex > 0"
            :key="`divider-${itemGroupIndex}`"
          />
          <v-list-item
            v-for="(item, itemIndex) in itemGroup"
            :key="`${itemGroupIndex}-${itemIndex}`"
            :value="item.value ? item.value : ''"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ContextMenu',

  props: {
    menuItems: {
      type: Array,
      required: true,
    },
    showMenu: {
      type: Boolean,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    selectedItem: null,
    // For whatever reason, selectedItem will go to undefined if the same index
    //  is selected, so previouslySelectedItem helps us know what to emit
    previouslySelectedItem: null,
  }),

  watch: {
    showMenu: function(val) {
      this.$emit('update:showMenu', val);
    },

    selectedItem: function(val) {
      // see comment in data for an explanation of why previouslySelectedItem
      //  seems to be neccessary
      if (val === undefined) {
        this.$emit('selected-item', this.previouslySelectedItem);
      } else {
        this.previouslySelectedItem = val;
        this.$emit('selected-item', val);
      }
    },
  },
};
</script>
