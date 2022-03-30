<template>
  <div class="item-pagination">
    <button
        class="item-pagination__button"
        :class="buttonClass"
        @click="onSelectPage"
    >
      {{ page === -1 ? "..." : page }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemPagination",
  props: {
    page: {
      type: Number,
      required: true,
    },
    isPageSelected: {
      type: Boolean,
      required: false,
    }
  },
  computed: {
    buttonClass() {
      let c = ''
      if (this.isPageSelected) {
        c += ' item-pagination__button--active'
      }
      if (this.page !== -1) {
        c += ' item-pagination__button--hover'
      }
      return c
    }
  },
  methods: {
    onSelectPage() {
      if (this.page === -1) {
        return
      }
      this.$emit('onSelectPage', this.page)
    }
  },
}
</script>

<style lang="scss">
.item-pagination {
  &__button {
    background: #EFF5FE;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    width: 32px;
    height: 32px;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;

    &--active {
      color: #FFFFFF;
      background: #336EC6;
    }

    &--hover {
      &:hover {
        color: #FFFFFF;
        background: #336EC6;
      }
    }
  }


}
</style>