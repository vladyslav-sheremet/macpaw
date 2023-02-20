<template>
  <common-vote :text="'DISLIKES'" :isLoading="isLoading" :items="voteItems" />
</template>

<!--[] 1. Можно ли писать логику сразу в created компоненте или нужно создавать для этого отдельный метод?-->

<script>
import { getVotes } from "@/api";
import CommonVote from "@/components/CommonVote.vue";

export default {
  name: 'DislikesComponent',
  components: { CommonVote },
  data() {
    return {
      voteItems: [],
      isLoading: true
    }
  },
  async created() {
    try {
      const data = await getVotes()
      this.voteItems = data.filter(item => item.value === -1).slice(0, 10)
      this.isLoading = false
    } catch (err) {
      console.error(err)
    }
  }
}
</script>