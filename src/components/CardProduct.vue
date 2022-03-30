<template>
  <div class="card-product">
    <div class="card-product__image">
      <img src="../assets/test-product.png" alt="Photo product">
    </div>
    <div class="card-product__info">
      <span class="card-product__label">В наличии</span>
      <h1 class="card-product__name">Наименование товара 1</h1>
      <span class="card-product__price">1 000 ₽</span>
      <div class="card-product__hover">
        <p class="card-product__description">Цвет - Тифани Краткое описание товара</p>
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
    card: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.card-product {
  width: 305px;
  //height: 560px;
  box-shadow: 0 6px 12px #D5E0EF;
  border: 1px solid #E4ECF9;
  background: #FFFFFF;

  &__image {
    object-fit: cover;
    padding: 20px;
    height: 305px;
    width: 100%;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #E4ECF9;
  }

  &__info {
    padding: 20px;
  }

  &__label {
    background: #76CB22;
    color: #FFFFFF;
    font-size: 12px;
    line-height: 20px;
    font-weight: 700;
    padding: 6px 8px;
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
  &__hover {
    display: none;
  }
  &__description {
    font-size: 12px;
    line-height: 20px;
    color: #6C7683;
    margin: 11px 0 20px 0;
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

    &--icon {
      margin-right: 9px;
    }
  }
}
</style>