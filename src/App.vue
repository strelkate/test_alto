<template>
  <div id="app" class="app">
    <div class="container">
      <div class="app__cards">
        <CardProduct
            v-for="(card, index) in cards"
            :key="index"
            :card="card"
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

export default {
  name: 'App',
  components: {Pagination, CardProduct},
  data: () => {
    return {
      cards: [{}, {}]
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: #4F545F;
  height: 45em;
  position: relative;
}

.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &__cards {
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
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
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 1300px) {
  .container {
    width: 88%;
  }
}

</style>
