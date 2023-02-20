<template>
  <div class="main">
    <div class="container" :style="this.dynamicComponent == '' ? 'align-items: center' : 'align-items: flex-start'">

      <div class="features-desktop">
        <main-features @mode="selectMode" />
      </div>

      <div class="addition-wrapper">
        <search-bar v-if="dynamicComponent !== ''" @mode="selectMode" @searchQuery="assignSearchQuery"/>

        <div class="features-tablet" v-if="dynamicComponent == ''">
          <main-features @mode="selectMode" />
        </div>

        <KeepAlive include="VotingComponent">
          <component v-if="dynamicComponent !== ''" :is="dynamicComponent" v-bind="currentProperties" v-on="currentEvent"  />
        </KeepAlive>

      </div>
    </div>
    <img class="main-image" src="@/assets/girl-and-pet.png" alt="girl and pet" v-if="dynamicComponent === ''">
  </div>
</template>

<!--[] 1. Сделать svg картинки через отдельный компонент-->
<!--[] 9. Левая сторона с выбором мода должна быть всегда на одном месте при скролинге-->
<!--[] 12. Переделать methods на watch and computed-->
<!--[] 16. Нужен ли try catch и в файле апи и в файле, где я обращаюсь к апи?-->
<!--[] 18. Как правильно называть функции в файле апи и функции которые вызывают эти функции уже в самих компонентах?-->
<!--[] 20. Правильно ли я прописал поля emits и props?-->
<!--[] 21. Можно сделать transition компонент для логов например-->
<!--[] 24. Нужно ли мне переделывать конструкции с display: none?-->
<!--[] 25. Можно ли как-то сделать определение стилей контейнера через v-bind() в css?-->
<!--[] 26. Написать все шрифты, гепы и медиа размеры в отдельные файлы-->

<script>
import MainFeatures from "@/components/MainFeatures.vue";
import VotingComponent from "@/components/VotingComponent.vue";
import BreedsComponent from "@/components/BreedsComponent.vue";
import GalleryComponent from "@/components/GalleryComponent.vue";
import SearchBar from "@/components/SearchBar.vue";
import LikesComponent from "@/components/LikesComponent.vue";
import DislikesComponent from "@/components/DislikesComponent.vue";
import FavouritesComponent from "@/components/FavouritesComponent.vue";
import SelectedBreed from "@/components/SelectedBreed.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  name: 'App',
  components: {
    SearchComponent,
    SelectedBreed,
    FavouritesComponent,
    DislikesComponent,
    LikesComponent,
    SearchBar,
    GalleryComponent,
    BreedsComponent,
    VotingComponent,
    MainFeatures
  },
  data() {
    return {
      dynamicComponent: '',
      breedId: '',
      searchQuery: ''
    }
  },
  computed: {
    currentProperties() {
      if (this.dynamicComponent === 'search-component') {
        return { searchQuery: this.searchQuery }
      } else if (this.dynamicComponent === 'selected-breed') {
        return { breedId: this.breedId }
      } else {
        return null
      }
    },
    currentEvent() {
      if (this.dynamicComponent === 'breeds-component') {
        return { mode: this.selectMode,  breedId: this.assignBreedId}
      } else {
        return null
      }
    }
  },
  methods: {
    selectMode(mode) {
      if (mode === 'voting') {
        this.dynamicComponent = 'voting-component'
      } else if (mode === 'breeds') {
        this.dynamicComponent = 'breeds-component'
      } else if (mode === 'likes') {
        this.dynamicComponent = 'likes-component'
      } else if (mode === 'dislikes') {
        this.dynamicComponent = 'dislikes-component'
      } else if (mode === 'favourites') {
        this.dynamicComponent = 'favourites-component'
      } else if (mode === 'selectedBreed') {
        this.dynamicComponent = 'selected-breed'
      } else if (mode === 'search') {
        this.dynamicComponent = 'search-component'
      } else if (mode === 'default') {
        this.dynamicComponent = ''
      } else {
        this.dynamicComponent = 'gallery-component'
      }
    },
    assignBreedId(id) {
      this.breedId = id
    },
    assignSearchQuery(query) {
      this.searchQuery = query
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

p, h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

button {
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
}

#app {
  font-family: 'Jost', sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
}

body {
  margin: 0;
  font-weight: 400;
  background-color: $background-grey;
}

.main {
  position: relative;
  width: 100%;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 150px;
  margin: 0 auto;
  max-width: 1290px;
  padding: 0 15px;
  height: 100vh;

  @media (max-width: 1200px) {
    gap: 20px;
  }

  @media (max-width: 1019px) {
    display: block;
  }
}

.main-image {
  max-width: 775px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  @media (max-width: 1019px) {
    display: none;
  }
}

.features-desktop {
  @media (max-width: 1019px) {
    display: none;
  }
}

.features-tablet{
  @media (min-width: 1020px) {
    display: none;
  }
}

.addition-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.content-wrapper {
  padding: 20px;
  margin-top: 10px;
  border-radius: $large;
  background-color: rgba($white-default, .4);
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 2000px) {
    min-height: calc(100vh - 130px);
  }
}
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

.images-wrapper {
  display: grid;
  gap: 20px;
  //grid-template-columns: repeat(3, 1fr);
  //grid-template-rows: repeat(6, 140px);
  // краткая запись
  grid-template: repeat(3, 140px) / repeat(3, 1fr);
  //здесь может быть каждый раз как-то менять число ровов или же каждый раз менять класс
  //может быть здесь можно как-то короче записать свойства через n

  @media (max-width: 630px) {
    display: block;
  }

  div {
    position: relative;
    cursor: pointer;

    &:nth-child(1) {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    &:nth-child(4) {
      grid-column: 2 / 4;
      grid-row: 2 / 4;
    }

    &:nth-child(8) {
      grid-column: 3 / 4;
      grid-row: 4 / 6;
    }

    &:nth-child(10) {
      grid-column: 1 / 3;
      grid-row: 5 / 7;
    }

    &:nth-child(11) {
      grid-column: 1 / 2;
      grid-row: 7 / 9;
    }

    &:nth-child(14) {
      grid-column: 2 / 4;
      grid-row: 8 / 10;
    }

    &:nth-child(18) {
      grid-column: 3 / 4;
      grid-row: 10 / 12;
    }

    &:nth-child(20) {
      grid-column: 1 / 3;
      grid-row: 11 / 13;
    }

    &:hover a{
      opacity: 1;
    }

    @media (max-width: 630px) {
      margin-bottom: 10px;
      height: 140px; // плохой вариант, потому что картинки растягиваются
    }

    a {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba($main, .6);
      opacity: 0;
      border-radius: $large;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      text-decoration: none;
      transition: .3s opacity ease-in-out;
      padding: 0 10px;

      span {
        padding: 5px;
        text-align: center;
        max-width: 180px;
        width: 100%;
        background-color: $white-default;
        border-radius: $medium;
        margin-bottom: 10px;
        font-size: $md;
        line-height: 24px;
        color: $main;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: $large;
  }
}

.no-item {
  padding: 18px 20px;
  background-color: $background-grey;
  border-radius: $medium;
  font-size: $md;
  line-height: 24px;
  color: $grey;
}

@media (min-width: 2000px) {
  .main {
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
    max-height: 1200px;
    display: flex;
    align-items: center;
  }
}
</style>
