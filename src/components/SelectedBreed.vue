<template>
  <div class="content-wrapper">
    <div class="arrow-wrapper">
<!--      <button type="button">-->
<!--        <svg width="12" height="20">-->
<!--          <use xlink:href="@/assets/sprite.svg#arrow"></use>-->
<!--        </svg>-->
<!--      </button>-->
      <p>BREEDS</p>
      <div class="breed-id">
        {{ breedId }}
      </div>
    </div>
    <loader-component v-if="isLoading"/>
    <template v-else>
      <Splide :options="{ rewind: true, arrows: false, pagination: true, autoplay: true, rewindSpeed: 5000 }"
              aria-labelledby="autoplay-example-heading">
        <SplideSlide v-for="image in images" :key="image.url">
          <img :src="image.url" alt="cat">
        </SplideSlide>
      </Splide>

      <div class="info-wrapper">
        <h1>{{ name }}</h1>
        <h4>Family companion cat</h4>
        <div class="inner-wrapper">
          <div class="left-column">
            <h5>Temperament:</h5>
            <p>{{ temperament }}</p>
          </div>
          <div class="right-column">
            <div>
              <h5>Origin:</h5>
              <p>{{ origin }}</p>
            </div>
            <div>
              <h5>Weight:</h5>
              <p>{{ weight }} kgs</p>
            </div>
            <div>
              <h5>Life span:</h5>
              <p>{{ lifeSpan }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<!--[] 1. Соотношение картинок не правильное -->

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css/core';
import { getImagesByBreed } from "@/api";

export default {
  name: 'SelectedBreed',
  components: {
    Splide,
    SplideSlide,
  },
  props: {
    breedId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      images: [],
      name: '',
      temperament: '',
      origin: '',
      weight: '',
      lifeSpan: '',
      isLoading: true
    }
  },
  async created() {
    try {
      const data = await getImagesByBreed(this.breedId)
      this.images = data
      this.name = data[0].breeds[0].name
      this.temperament = data[0].breeds[0].temperament
      this.origin = data[0].breeds[0].origin
      this.weight = data[0].breeds[0].weight.metric
      this.lifeSpan = data[0].breeds[0].life_span
      this.isLoading = false
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="scss">
.content-wrapper .splide__pagination {
  gap: 5px;
  padding: 10px;
  background-color: $white-default;
  border-radius: $large;
  width: fit-content;
  margin: -15px auto 10px;
  position: absolute;
  z-index: 2;
  bottom: 19px;
  left: 50%;
  transform: translateX(-50%);

  &__page {
    background-color: $background-pink;
    width: 10px;
    height: 10px;
    border-radius: 50%;

    &.is-active {
      background-color: $main;

    }
  }
}
</style>

<style lang="scss" scoped>


.arrow-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  button {
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
}

.breed-id {
  background-color: $main;
  width: 90px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $medium;
  color: $white-default;
  font-weight: 500;
}

img {
  border-radius: $large;
  margin-bottom: 50px;
  width: 100%;
  height: 360px;
}

.info-wrapper {
  border: 2px solid $background-pink;
  border-radius: $large;
  padding: 26px 40px 40px;
  position: relative;
  margin-top: 20px;

  h1 {
    font-weight: 500;
    font-size: 36px;
    line-height: 52px;
    color: $black-default;
    position: absolute;
    left: 50%;
    top: -31px;
    padding: 5px 20px;
    z-index: 1;
    transform: translateX(-50%);
    background-color: $white-default;
    border-radius: $large;
  }

  h4 {
    font-weight: 500;
    font-size: $default;
    line-height: 29px;
    color: $grey;
    text-align: center;
  }

  .inner-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media (max-width: 630px) {
      grid-template-columns: 1fr;
      gap: 10px;
      margin-top: 20px;
    }

    h5, p {
      font-weight: 500;
      font-size: $md;
      line-height: 23px;
    }

    h5 {
      color: $black-default;
    }

    p {
      color: $grey;
    }

    .right-column {
      div {
        display: flex;
        gap: 5px;
      }
    }
  }
}

</style>