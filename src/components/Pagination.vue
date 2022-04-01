<template>
  <div class="pagination">
    <button
        class="pagination__button pagination__button--prev"
        :class="isNotActivePrev?'pagination__button--not-active':''"
        @click="onBackClick"
    >
      Назад
    </button>
    <div class="pagination__number">
      <ItemPagination
          class="pagination__item"
          v-for="(page, index) in paginations"
          :key="index"
          :page="page"
          :isPageSelected="selectedPage===page"
          @onSelectPage="onSelectPage"
      />
      <ItemPagination v-if="!isNotActiveNext" :page="-1" class="pagination__item"/>
    </div>
    <button
        class="pagination__button pagination__button--next"
        :class="isNotActiveNext?'pagination__button--not-active':''"
        @click="onNextClick"
    >
      Вперед
    </button>
  </div>
</template>

<script>
import ItemPagination from "./ItemPagination";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Pagination",
  components: {ItemPagination},
  data: () => {
    return {
      pagesFrom: 1,
    }
  },
  computed: {
    ...mapGetters(['GET_TOTAL_COUNT', 'GET_SELECTED_PAGE', 'GET_PRODUCTS_IN_ROW', 'GET_PAGES_IN_ROW']),
    selectedPage() {
      return this.GET_SELECTED_PAGE
    },
    pagesTotalCount() {
      let count = Math.ceil(this.GET_TOTAL_COUNT / this.GET_PRODUCTS_IN_ROW)
      if (count < 1) {
        count = 1
      }
      return count
    },
    paginations() {
      // decrease window case
      if (this.selectedPage > this.pagesTotalCount) {
        let pagesFrom = this.pagesTotalCount - this.GET_PAGES_IN_ROW + 1
        if (pagesFrom <= 0) {
          pagesFrom = 1
        }
        this.pagesFrom = pagesFrom
        this.onSelectPage(this.pagesTotalCount)
      }
      // increase window case
      if (this.selectedPage >= this.pagesFrom + this.GET_PAGES_IN_ROW) {
        this.pagesFrom = this.selectedPage
        this.onSelectPage(this.selectedPage)
      }
      let len = this.GET_PAGES_IN_ROW
      if (len > this.pagesTotalCount) {
        len = this.pagesTotalCount
      }
      return Array(len).fill(0).map((el, index) => (this.pagesFrom + index))
    },
    isNotActiveNext() {
      return this.pagesFrom >= this.pagesTotalCount - this.GET_PAGES_IN_ROW + 1
    },
    isNotActivePrev() {
      return this.pagesFrom === 1
    },
  },
  methods: {
    ...mapActions(['SELECT_PAGE', 'PAGE_IN_ROW']),
    onSelectPage(page) {
      if (page > this.pagesTotalCount) {
        page = this.pagesTotalCount
      }
      this.SELECT_PAGE(page)
    },
    onNextClick() {
      const pagesInRow = this.GET_PAGES_IN_ROW
      this.pagesFrom += pagesInRow
      if (this.pagesFrom + pagesInRow > this.pagesTotalCount) {
        this.pagesFrom = this.pagesTotalCount - pagesInRow + 1
        if (pagesInRow > this.pagesTotalCount) {
          this.pagesFrom = 1
        }
      }
      if (this.selectedPage < this.pagesFrom) {
        this.SELECT_PAGE(this.pagesFrom)
      }
    },
    onBackClick() {
      const pagesInRow = this.GET_PAGES_IN_ROW
      this.pagesFrom -= pagesInRow
      if (this.pagesFrom <= 0) {
        this.pagesFrom = 1
      }

      if (this.selectedPage >= this.pagesFrom + pagesInRow) {
        this.SELECT_PAGE(this.pagesFrom)
      }
    },
  },
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__button {
    background: #EFF5FE;
    border-radius: 100px;
    border: none;
    cursor: pointer;

    &--not-active {
      color: #9FAABA;
    }

    &--prev, &--next {
      font-size: 13px;
      line-height: 21px;
      padding: 9px 18px;
    }

    &--prev {
      margin-right: 18px;
    }

    &--next {
      margin-left: 18px;
    }
  }

  &__number {
    display: flex;
    align-items: center;
  }

  &__item {
    margin-right: 6px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>