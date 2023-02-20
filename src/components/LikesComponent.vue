<template>
  <common-vote :text="'LIKES'" :isLoading="isLoading" :items="voteItems" />
</template>

<!--[] 3. Проблема в том, что с сервера приходят 10 картинок, и если они все были дизлайкнуты, то в лайкнутых ничего не показывается-->

<script>
import { getVotes } from "@/api";
import CommonVote from "@/components/CommonVote.vue";

export default {
  name: 'LikesComponent',
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
      this.voteItems = data.filter(item => item.value === 1).slice(0, 10)
      this.isLoading = false
    } catch (err) {
      console.error(err)
    }
  }
}
</script>