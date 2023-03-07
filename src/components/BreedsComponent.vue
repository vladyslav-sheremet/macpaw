<template>
    <div class="content-wrapper">
      <div class="filter">
        <div>
<!--          <button type="button">-->
<!--            <svg width="12" height="20">-->
<!--              <use xlink:href="@/assets/sprite.svg#arrow"></use>-->
<!--            </svg>-->
<!--          </button>-->
          <p>BREEDS</p>
        </div>

        <select>
          <option v-for="breed in breeds" :key="breed.name">{{breed.name}}</option>
        </select>

        <div>
          <select @change="changeLimit($event)">
<!--            временное ограничение на 20 котов-->
            <option value="20">Limit: all</option>
            <option value="5">Limit: 5</option>
            <option value="10">Limit: 10</option>
          </select>
          <button type="button" @click="isSortDown = false">
            <svg-component id="sort-up" width="12" height="20" />
          </button>
          <button type="button" @click="isSortDown = true">
            <svg-component id="sort-down" width="12" height="20" />
          </button>
        </div>

      </div>
      <loader-component v-if="isLoading" />
      <div v-else class="images-wrapper">
        <div v-for="breed in filteredBreeds" :key="breed.name" @click="selectBreed(breed.id)">
          <img :src="`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`" alt="cat" @error="imageLoadOnError">
          <a href="#"><span>{{breed.name}}</span></a>
        </div>

      </div>
    </div>
</template>

<!--[] 2. Правильно поставить картинки, чтобы их не растягивало-->
<!--!!!Временно показываю только 20 картинок!!!-->

<script>
import { getBreeds, getImageById } from "@/api";

export default {
  name: 'BreedsComponent',
  emits: {
    mode: {
      type: String,
      required: true
    },
    breedId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      imagesUrl: [],
      breeds: [],
      filteredBreeds: [],
      testImage: '',
      limit: 10,
      isSortDown: true,
      isLoading: true
    }
  },
  async created() {
    await this.fetchBreeds()

    this.isLoading = false
  },
  watch: {
    limit: function () {
      this.filteredBreeds = this.breeds.slice(0, this.limit)
    },
    isSortDown: function () {
      if (this.isSortDown === true) {
        this.filteredBreeds = this.filteredBreeds.reverse()
      } else {
        this.filteredBreeds = this.filteredBreeds.reverse()
      }
    }
  },
  methods: {
    async fetchBreeds() {
      try {
        const data = await getBreeds()
        this.breeds = data
        this.filteredBreeds = this.breeds.slice(0, 20) // временное ограничение на 20 котов
      } catch (err) {
        console.error(err)
      }
    },
    async getImage(imageId) {
      try {
        const data = await getImageById(imageId)
        return data.url
      } catch (err) {
        console.error(err)
      }
    },
    changeLimit(event) {
      this.limit = event.target.value
    },
    selectBreed(id) {
      this.$emit('mode', 'selectedBreed')
      this.$emit('breedId', id)
    },
    imageLoadOnError(e) {
      e.target.src = require('@/assets/cat.jpeg')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 630px) {
    flex-direction: column;
  }

  & > div {
    display: flex;
    gap: 10px;
  }

  button:first-child {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    background-color: $background-pink;
    border-radius: $medium;
    transition: .3s background-color ease-in-out;

    & svg {
      fill: $main;
      transition: .3s fill ease-in-out;
    }

    &:hover {
      background-color: $main;

      & svg {
        fill: $white-default;
      }
    }
  }

  button:not(:first-child) {
    width: 40px;
    height: 40px;
    background-color: $background-grey;
    border-radius: $medium;
    transition: .3s ease-in-out;
    transition-property: border-color, background-color;
    border: 2px solid transparent;

    & svg {
      fill: $grey;
      transition: .3s fill ease-in-out;
    }

    &:hover {
      background-color: $background-grey;
      border-color: $background-pink;

      & svg {
        fill: $main;
      }
    }
  }

  p {
    width: 146px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $main;
    border-radius: $medium;
    font-weight: 500;
    font-size: $default;
    letter-spacing: 2px;
    color: $white-default;
  }

  select {
    background-color: $background-grey;
    border-radius: $medium;
    cursor: pointer;
    color: $grey;
    padding: 8px 10px;
    border: 2px solid transparent;
    transition: .3s border-color ease-in-out;
    flex-grow: 1;

    &:focus-visible {
      outline: none;
    }

    &:hover {
      border-color: $background-pink;
    }
  }
}
</style>