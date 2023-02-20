<template>
  <div class="content-wrapper">
    <div class="arrow-wrapper">
<!--      <button type="button">-->
<!--        <svg width="12" height="20">-->
<!--          <use xlink:href="@/assets/sprite.svg#arrow"></use>-->
<!--        </svg>-->
<!--      </button>-->
      <p>SEARCH</p>
    </div>
    <p>Search results for: <b>{{searchQuery}}</b></p>
    <loader-component v-if="isLoading" />
    <div v-else>
      <div class="no-item" v-if="searchItems.length === 0">
        No item found
      </div>
      <div v-else class="images-wrapper">
        <div v-for="item in searchItems" :key="item">
          <img :src="item.url" alt="cat">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBreeds, getImagesByBreed } from "@/api";

export default {
  name: 'SearchComponent',
  props: {
    searchQuery: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      searchItems: [],
      breedID: ''
    }
  },
  created() {
    this.getBreedsFromApi()
    this.getImages()
  },
  methods: {
    async getBreedsFromApi() {
      try {
        const data = await getBreeds()
        this.breedID = data.filter(item => item.name === this.searchQuery)[0].id
      } catch (err) {
        console.error(err)
      }
    },
    async getImages() {
      try {
        const data = await getImagesByBreed(this.breedID)
        this.searchItems = data
        this.isLoading = false
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: $default;
  line-height: 29px;
  color: $grey;
  margin-bottom: 20px;

  b {
    color: $black-default;
  }
}
</style>