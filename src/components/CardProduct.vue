<template>
  <div class="card-product" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
    <div class="card-product__top">
      <img class="card-product__image" :src="product.image_url" alt="Photo product">
    </div>
    <div class="card-product__info">
      <span class="card-product__label card-product__label--stock" v-if="isAvailable">В наличии</span>
      <span class="card-product__label card-product__label--order" v-else>Под заказ</span>
      <h1 class="card-product__name">{{ product.name }}</h1>
      <span class="card-product__price">{{ product.price + ' ₽' }}</span>

      <div class="card-product__hidden" :class="cardHoveredClass">
        <p class="card-product__text card-product__text--color">Цвет - {{ product.color }}</p>
        <p class="card-product__text card-product__text--description">{{ product.short_desc }}</p>
        <button class="card-product__button">
          <img src="../assets/cart.svg" alt="Icon cart" class="card-product__button--icon">
          <span>В корзину</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "CardProduct",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      isCardHovered: false,
      isCardHovered2: false,
      timeout: null,
    }
  },
  computed: {
    isAvailable() {
      return this.product.availability > 0;
    },
    cardHoveredClass() {
      let s = ''
      s += this.isCardHovered ? ' card-product__hidden--active' : ''
      s += this.isCardHovered2 ? ' card-product__hidden--delayed-active' : ''
      return s
    }
  },
  methods: {
    onMouseOver() {
      this.isCardHovered = true
      this.isCardHovered2 = true
      clearTimeout(this.timeout)
    },
    onMouseLeave() {
      this.isCardHovered = false
      this.timeout = setTimeout(() => {
        this.isCardHovered2 = false
      }, 400)
    }
  }
}
</script>

<style lang="scss">
.card-product {
  width: 305px;
  box-shadow: 0 6px 12px #D5E0EF;
  border: 1px solid #E4ECF9;
  background: #FFFFFF;
  cursor: pointer;

  &__top {
    padding: 20px;
    height: 305px;
    width: 100%;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #E4ECF9;
  }

  &__image {
    object-fit: cover;
    width: 265px;
    height: 265px;
  }

  &__info {
    padding: 20px;
    position: relative;
  }

  &__label {
    color: #FFFFFF;
    font-size: 12px;
    line-height: 20px;
    padding: 6px 8px;

    &--stock {
      background: #76CB22;
      font-weight: 700;
    }

    &--order {
      background: #A6C3EE;
    }
  }

  &__name {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    text-decoration-line: underline;
    margin: 18px 0;
  }

  &__price {
    font-weight: 700;
    line-height: 30px;
  }

  &__hidden {
    position: absolute;
    opacity: 0;
    transition: 0.5s linear;
    animation-name: show;

    &--active {
      opacity: 1;
    }

    &--delayed-active {
      position: relative;
    }
  }

  &__text {
    font-size: 12px;
    line-height: 20px;
    color: #6C7683;

    &--color {
      margin: 11px 0;
    }

    &--description {
      margin: 0 0 20px 0;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #FFFFFF;
    text-transform: uppercase;
    padding: 15px 25px;
    background: #336EC6;
    border: none;
    box-shadow: 0 4px 8px #A9C2E9;
    border-radius: 6px;
    cursor: pointer;

    &--icon {
      margin-right: 9px;
    }
  }
}
</style>