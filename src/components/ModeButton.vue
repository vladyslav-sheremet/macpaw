<template>
    <button @click="$emit('open')">
      <img :style="{background: bgColor}" :src="require(`@/assets/${imgSrc}`)" alt="mode">
      <p>{{text}}</p>
    </button>
</template>

<script>
export default {
  name: 'ModeButton',
  props: {
    imgSrc: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    },
    bgColor: {
      required: true,
      type: String
    }
  },
  emits: {
    open: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 138px;
  background-color: transparent;

  &:hover img {
    border-color: $white-default;
  }

  &:hover p {
    background-color: $background-pink;
  }

  &:focus img {
    border-color: $background-pink;
  }

  &:focus p {
    background-color: $main;
    color: $white-default;
  }

  @media (max-width: 630px) {
    width: 100%;
  }
}

img {
  border: 4px solid rgba($white-default, .6);
  border-radius: $large;
  width: 100%;
  margin-bottom: 10px;
  transition: .3s border-color ease-in-out;

  @media (max-width: 630px) {
    display: none;
  }
}

p {
  background-color: $white-default;
  border-radius: $medium;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $main;
  width: 100%;
  height: 36px;
  letter-spacing: 2px;
  font-weight: 500;
  font-size: $small;
  line-height: 16px;
  transition: .3s background-color, color ease-in-out;
}
</style>