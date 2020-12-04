<template>
  <v-menu
    :value="showMenu"
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
  >
    <v-list>
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
          link
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </template>
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

  watch: {
    showMenu: function(val) {
      this.$emit('update:showMenu', val);
    },
  },
};
</script>
