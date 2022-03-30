<template>
  <div id="app">
    <div class="container">
      <CardProduct v-for="(card, index) in cards" :key="index" :card="card"/>
    </div>
  </div>
</template>

<script>
import CardProduct from "@/components/CardProduct";

export default {
  name: 'App',
  components: {CardProduct},
  data: () => {
    return {
      cards: [{}]
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
  height: 40em;
  position: relative;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1280px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  //margin-right: -50%;
  transform: translate(-50%, -50%)
}

</style>
