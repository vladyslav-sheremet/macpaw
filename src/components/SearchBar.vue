<template>
    <div class="search-wrapper">
      <button class="menu-button" type="button" @click="$emit('mode', 'default')">
        <svg width="30" height="30">
          <use xlink:href="@/assets/sprite.svg#menu"></use>
        </svg>
      </button>

        <form @submit.prevent>
          <input type="text" placeholder="Search for breeds by name" v-model.trim="query">
          <button type="submit" @click="searchQuery">
            <svg width="20" height="20">
              <use xlink:href="@/assets/sprite.svg#search"></use>
            </svg>
          </button>
        </form>

      <div class="inner-wrapper">
        <button type="button" @click="$emit('mode', 'likes')">
          <svg width="30" height="30">
            <use xlink:href="@/assets/sprite.svg#smile"></use>
          </svg>
<!--                <svg-component id="smile" height="30" width="30" />-->
        </button>
        <button type="button" @click="$emit('mode', 'favourites')">
          <svg width="30" height="26">
            <use xlink:href="@/assets/sprite.svg#heart"></use>
          </svg>
        </button>
        <button type="button" @click="$emit('mode', 'dislikes')">
          <svg width="30" height="30">
            <use xlink:href="@/assets/sprite.svg#sad"></use>
          </svg>
        </button>
      </div>

    </div>
</template>

<script>
// import SvgComponent from "@/components/SvgComponent.vue";

export default {
  name: 'SearchBar',
  emits: {
    mode: {
      type: String,
      required: true
    },
    searchQuery: {
      type: String,
      required: true
    }
  },
  // components: {SvgComponent},
  data() {
    return {
      query: ''
    }
  },
  methods: {
    searchQuery() {
      this.$emit('mode', 'search')
      this.$emit('searchQuery', this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.inner-wrapper {
  display: flex;
  gap: 10px;
  grid-area: buttons;
}

.search-wrapper {
  gap: 10px;
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template: 'menu form buttons' 1fr / 60px 1fr;

  @media (min-width: 1020px) {
    grid-template: 'form buttons' 1fr / 1fr;
  }

  @media (max-width: 630px) {
    margin-top: 20px;
    grid-template:
        'menu buttons'
        'form form'  1fr / 1fr;
  }

  .menu-button {
    margin-right: auto;
    grid-area: menu;

    @media (min-width: 1020px) {
      display: none;
    }
  }
}

form {
  position: relative;
  height: 60px;
  grid-area: form;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    fill: $main;
  }
}

button[type="submit"] {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background-color: $background-pink;
  border-radius: $medium;
}

input {
  flex: 1;
  border: none;
  background-color: $white-default;
  border-radius: $large;
  padding-left: 20px;
  font-size: $default;
  color: $black-default;
  width: 100%;
  height: 100%;

  &::placeholder {
    color: $grey;
  }

  &:hover {
    outline: 2px solid $background-pink;
  }

  &:focus-visible {
    outline: 2px solid $main;
  }

  @media (max-width: 375px) {
    font-size: $md;
  }
}

button[type="button"] {
  width: 60px;
  height: 60px;
  background-color: $white-default;
  border-radius: $large;
  transition: .3s background-color ease-in-out;

  & svg {
    transition: .3s fill ease-in-out;
  }

  &:hover {
    background-color: $background-pink;
  }

  &:focus {
    background-color: $main;

    & svg {
      fill: $white-default;
    }
  }
}
</style>