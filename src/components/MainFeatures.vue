<template>
  <div class="wrapper">
    <a href="#">
      <svg width="106" height="24">
        <use xlink:href="@/assets/sprite.svg#logo"></use>
      </svg>
    </a>
    <div>
      <p>Hi intern!</p>
      <h3>Welcome to MI 2022 Front-end test</h3>
      <h2>Lets start using The Cat API</h2>
      <div class="buttons-wrapper">
        <mode-button imgSrc="vote-table.png" text="VOTING" bgColor="#B4B7FF" @open="$emit('mode', 'voting')" />
        <mode-button imgSrc="pet-breeds.png" text="BREEDS" bgColor="#97EAB9" @open="$emit('mode', 'breeds')" />
        <mode-button imgSrc="images-search.png" text="GALLERY" bgColor="#FFD280" @open="$emit('mode', 'gallery')" />
      </div>
    </div>
  </div>
</template>

<script>
import ModeButton from "@/components/ModeButton.vue";

export default {
  name: 'MainFeatures',
  components: {
    ModeButton
  },
  data() {
    return {
      isOpen: false
    }
  },
  emits: {
    mode: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 2000px) {
    height: auto;
  }
}

a {
  //justify-self: flex-start;
  margin-top: 30px;
  margin-bottom: 150px;
}

p {
  font-weight: 500;
  font-size: $extra-large;
  line-height: 58px;
  color: #1D1D1D;
  margin-bottom: 10px;
}

h3 {
  font-size: $default;
  line-height: 29px;
  color: #8C8C8C;
  margin-bottom: 60px;
}

h2 {
  font-weight: 500;
  font-size: $default;
  line-height: 29px;
  color: #1D1D1D;
  margin-bottom: 20px;
}

.buttons-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 446px;

  @media (max-width: 630px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>