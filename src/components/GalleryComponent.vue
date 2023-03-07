<template>
    <div class="content-wrapper">
      <div class="top-bar">
<!--        <button type="button">-->
<!--          <svg width="20" height="20">-->
<!--            <use xlink:href="@/assets/sprite.svg#arrow"></use>-->
<!--          </svg>-->
<!--        </button>-->
        <p>GALLERY</p>
<!--        <button type="button">-->
<!--          <svg width="16" height="16">-->
<!--            <use xlink:href="@/assets/sprite.svg#download"></use>-->
<!--          </svg>-->
<!--          UPLOAD-->
<!--        </button>-->
      </div>
      <div class="filter">

        <div class="select-item">
          <label for="order">ORDER</label>
          <select id="order" @change="selectOrder($event)">
            <option value="random">Random</option>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>

        <div class="select-item">
          <label for="order">TYPE</label>
          <select id="order" @change="selectType($event)">
            <option value="all">All</option>
            <option value="static">Static</option>
            <option value="animated">Animated</option>
          </select>
        </div>

        <div class="select-item">
          <label for="order">BREED</label>
          <select id="order" @change="selectBreed($event)">
            <option value="none">None</option>
            <option v-for="breed in breeds" :value="breed.id" :key="breed.name">{{breed.name}}</option>
          </select>
        </div>

        <div class="reload-item">
          <div class="select-item">
            <label for="order">LIMIT</label>
            <select id="order" @change="selectLimit($event)">
              <option value="5">5 items</option>
              <option value="10">10 items</option>
              <option value="15">15 items</option>
              <option value="20">20 items</option>
            </select>
          </div>
          <button type="button" @click="reloadImages">
            <svg-component id="reload" width="16" height="16" />
          </button>
        </div>

      </div>
      <loader-component v-if="isLoading" />
      <div v-else>
        <div class="no-item" v-if="filteredImages.length === 0">
          No item found
        </div>
        <div class="images-wrapper" v-else>
          <div v-for="image in filteredImages" :key="image">
            <img :src="image.url" alt="cat">
          </div>
        </div>
      </div>

    </div>
</template>

<!--[] 1. Переименовать filterFunction-->

<script>
import { getBreeds, getFilteredImages } from "@/api";

export default {
  name: 'GalleryComponent',
  data() {
    return {
      breeds: [],
      order: 'random',
      type: 'all',
      breed: 'none',
      limit: 5,
      images: [],
      filteredImages: [],
      isLoading: true
    }
  },
  created() {
    this.fetchBreeds()
    this.getImages()
  },
  methods: {
    async fetchBreeds() {
      try {
        const data = await getBreeds()
        this.breeds = data
      } catch (err) {
        console.error(err)
      }
    },
    async getImages() {
      try {
        const data = await getFilteredImages(this.order, this.breed)
        this.images = data
        this.filterFunction()
        this.isLoading = false
      } catch (err) {
        console.error(err)
      }
    },
    selectOrder(event) {
      this.order = event.target.value
    },
    selectType(event) {
      this.type = event.target.value
    },
    selectBreed(event) {
      this.breed = event.target.value
    },
    selectLimit(event) {
      this.limit = event.target.value
    },
    reloadImages() {
      this.isLoading = true
      this.getImages()
    },
    filterFunction() {
      if (this.type === 'animated') {
        this.filteredImages = this.images.filter(item => item.url.includes('gif')).slice(0, this.limit)
      } else if (this.type === 'static') {
        this.filteredImages = this.images.filter(item => !item.url.includes('gif')).slice(0, this.limit)
      } else {
        this.filteredImages = this.images.slice(0, this.limit)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  button:first-child {
    width: 40px;
    height: 40px;
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

  button:last-child {
    width: 143px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: $background-pink;
    border-radius: $medium;
    color: $main;
    transition: .3s all ease-in-out; // попробовать заменить на конкретные свойства
    margin-left: auto;

    & svg {
      fill: $main;
      transition: .3s fill ease-in-out;
    }

    &:hover {
      background-color: $main;
      color: $white-default;

      & svg {
        fill: $white-default;
      }
    }
  }
}

.filter {
  background-color: $background-grey;
  border-radius: $large;
  padding: 10px 20px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
  margin-bottom: 20px;

  @media (max-width: 630px) {
    grid-template-columns: 1fr;
  }

  .select-item {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: 500;
    font-size: $extra-small;
    line-height: 18px;
    color: $grey;
    margin-left: 10px;
  }

  select {
    background-color: $white-default;
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

  .reload-item {
    display: flex;
    gap: 10px;

    @media (max-width: 630px) {
      flex-direction: column;
    }

    div {
      flex-grow: 1;
    }

    button {
      @media (max-width: 630px) {
        width: 100%;
      }
    }
  }

  button {
    background-color: $white-default;
    border-radius: $medium;
    transition: .3s background-color ease-in-out;
    width: 40px;
    height: 40px;
    align-self: flex-end;

    svg {
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
}
</style>