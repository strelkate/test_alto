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

export default {
  name: "Pagination",
  components: {ItemPagination},
  data: () => {
    return {
      productsCount: 38,
      selectedPage: 1,
      pagesCount: 1,
      pagesFrom: 1,
      pagesInRow: 4,
    }
  },
  computed: {
    paginations() {
      let len = this.pagesInRow
      if (len > this.pagesCount) {
        len = this.pagesCount
      }
      return Array(len).fill(0).map((el, index) => (this.pagesFrom + index))
    },
    isNotActiveNext() {
      return this.pagesFrom === this.pagesCount - this.pagesInRow + 1
    },
    isNotActivePrev() {
      return this.pagesFrom === 1
    },
  },
  methods: {
    onSelectPage(page) {
      this.selectedPage = page
      console.log("selectedPage", this.selectedPage)
    },
    onNextClick() {
      this.pagesFrom += this.pagesInRow
      if (this.pagesFrom + this.pagesInRow > this.pagesCount) {
        this.pagesFrom = this.pagesCount - this.pagesInRow + 1
        if (this.pagesInRow > this.pagesCount) {
          this.pagesFrom = 1
        }
      }

      if (this.selectedPage < this.pagesFrom) {
        this.selectedPage = this.pagesFrom
      }
    },
    onBackClick() {
      this.pagesFrom -= this.pagesInRow
      if (this.pagesFrom <= 0) {
        this.pagesFrom = 1
      }

      if (this.selectedPage >= this.pagesFrom + this.pagesInRow) {
        this.selectedPage = this.pagesFrom
      }
    },
    computePagesCount() {
      let count, width = window.innerWidth;
      if (width <= 1300 && width > 992) {
        count = Math.ceil(this.productsCount / 3)
      } else if (width <= 992 && width > 768) {
        count = Math.ceil(this.productsCount / 2)
      } else if (width <= 768) {
        count = Math.ceil(this.productsCount)
      } else {
        count = Math.ceil(this.productsCount / 4)
      }
      if (count < 1) {
        count = 1
      }
      console.log("width", width, "pages count", count)
      return count
    },
    onResize() {
      this.pagesCount = this.computePagesCount()
    }
  },
  created() {
    this.pagesCount = this.computePagesCount()
    window.addEventListener('resize', this.onResize);
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