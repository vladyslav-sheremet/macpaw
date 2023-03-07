<template>
  <svg v-bind="$attrs">
    <use :xlink:href="require(`@/assets/sprite.svg`) + `#${id}`" />
  </svg>
</template>

<script>


export default {
  name: 'SvgComponent',
  props: {
    id: {
      required: true,
      type: String
    }
  }
}
</script>