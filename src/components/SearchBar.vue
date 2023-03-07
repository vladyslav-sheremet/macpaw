<template>
    <div class="search-wrapper">
      <button class="menu-button" type="button" @click="$emit('mode', 'default')">
        <svg-component id="menu" width="30" height="30" />
      </button>

        <form @submit.prevent>
          <input type="text" placeholder="Search for breeds by name" v-model.trim="query">
          <button type="submit" @click="searchQuery">
            <svg-component id="search" width="20" height="20" />
          </button>
        </form>

      <div class="inner-wrapper">
        <button type="button" @click="$emit('mode', 'likes')">
          <svg-component id="smile" width="30" height="30" />
        </button>
        <button type="button" @click="$emit('mode', 'favourites')">
          <svg-component id="heart" width="30" height="26" />
        </button>
        <button type="button" @click="$emit('mode', 'dislikes')">
          <svg-component id="sad" width="30" height="30" />
        </button>
      </div>

    </div>
</template>

<script>
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