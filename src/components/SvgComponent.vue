<!--<template>-->
<!--  <svg :width="width" :height="height">-->
<!--    <use :xlink:href="require(`@/assets/sprite.svg#${id}`)" />-->
<!--  </svg>-->
<!--</template>-->

<script>
import { h } from 'vue'

export default {
  name: 'SvgComponent',
  props: {
    id: {
      required: true,
      type: String
    },
    width: {
      required: true,
      type: Number
    },
    height: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      src: ''
    }
  },
  render() {
    return h('svg', {
      role: 'presentation',
      width: this.width,
      height: this.height,
    },
    h('use', {
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      // href: `@/assets/sprite.svg#${this.id}`,
      'xlink-href': this.id ? `/assets/sprite.svg#${this.id}` : '/assets/sprite.svg#sad',
    })
    )
  }
}
</script>