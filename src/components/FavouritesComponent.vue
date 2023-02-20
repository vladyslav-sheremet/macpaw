<template>
  <common-vote :text="'FAVOURITES'" :isLoading="isLoading" :items="favouritesItems" />
</template>

<script>
import { getFavourites } from "@/api";
import CommonVote from "@/components/CommonVote.vue";

export default {
  name: 'FavouritesComponent',
  components: { CommonVote },
  data() {
    return {
      favouritesItems: [],
      isLoading: true
    }
  },
  async created() {
    try {
      const data = await getFavourites()
      this.favouritesItems = data
      this.isLoading = false
    } catch (err) {
      console.error(err)
    }
  }
}
</script>