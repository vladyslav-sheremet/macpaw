<template>
  <div class="content-wrapper">
    <div class="arrow-wrapper">
<!--      <button type="button">-->
<!--        <svg width="12" height="20">-->
<!--          <use xlink:href="@/assets/sprite.svg#arrow"></use>-->
<!--        </svg>-->
<!--      </button>-->
      <p>{{ text }}</p>
    </div>
    <loader-component v-if="isLoading" />
    <div v-else>
      <div class="no-item" v-if="items.length === 0">
        No item found
      </div>
      <div v-else class="images-wrapper">
        <div v-for="item in items" :key="item.image.url">
          <img :src="item.image.url ? item.image.url : require('@/assets/cat.jpeg')" alt="cat">
        </div>
      </div>
    </div>
  </div>
</template>

<!--[] 1. Может можно выставить тип массив объектов или конекретно прописать из чего состоит каждый объект?-->

<script>
export default {
  name: 'CommonVote',
  props: {
    text: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
}
</script>