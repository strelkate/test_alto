<template>
  <div id="app" class="app">
    <div class="container">
      <div class="app__cards">
        <CardProduct
            v-for="(product, index) in GET_PRODUCTS"
            :key="index"
            :product="product"
            class="app__card"
        />
      </div>
      <div class="app__pagination">
        <Pagination/>
      </div>
    </div>
  </div>
</template>

<script>
import CardProduct from "@/components/CardProduct";
import Pagination from "./components/Pagination";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  data: () => {
    return {
      windowInnerWidth: 0,
    }
  },
  components: {Pagination, CardProduct},
  computed: {
    ...mapGetters(['GET_PRODUCTS', 'GET_TOTAL_COUNT']),
    productsCount() {
      return this.GET_TOTAL_COUNT
    },
  },
  methods: {
    ...mapActions(['SELECT_PAGE', 'SET_PRODUCTS_IN_ROW', 'SET_PAGES_IN_ROW']),
    onResize() {
      if (this.windowInnerWidth === window.innerWidth) {
        return;
      }
      this.windowInnerWidth = window.innerWidth;
      if (this.windowInnerWidth <= 1300 && this.windowInnerWidth > 992) {
        this.SET_PRODUCTS_IN_ROW(3)
        this.SET_PAGES_IN_ROW(4)
      } else if (this.windowInnerWidth <= 992 && this.windowInnerWidth > 768) {
        this.SET_PRODUCTS_IN_ROW(2)
        this.SET_PAGES_IN_ROW(2)
      } else if (this.windowInnerWidth <= 768) {
        this.SET_PRODUCTS_IN_ROW(1)
        this.SET_PAGES_IN_ROW(2)
      } else {
        this.SET_PRODUCTS_IN_ROW(4)
        this.SET_PAGES_IN_ROW(4)
      }
    },
  },
  mounted() {
    this.SELECT_PAGE(1);
  },
  created() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 40px 0;
  background: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: #4F545F;
}

.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &__cards {
    width: 100%;
    height: 640px;
    display: flex;
    align-items: start;
  }

  &__card {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.container {
  max-width: 1280px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 1300px) {
  .container {
    width: 88%;
  }
}

</style>
