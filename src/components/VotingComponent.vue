<template>
    <div class="content-wrapper">
      <div class="arrow-wrapper">
<!--        <button type="button">-->
<!--          <svg width="12" height="20">-->
<!--            <use xlink:href="@/assets/sprite.svg#arrow"></use>-->
<!--          </svg>-->
<!--        </button>-->
        <p>VOTING</p>
      </div>
      <loader-component v-if="isLoading" />
      <img v-else :src="imageUrl" alt="cat">
      <div class="buttons-wrapper">
        <button type="button" @click="vote(1)">
          <svg-component id="smile" width="30" height="30" />
        </button>
        <button type="button" @click="addToFavourites()">
          <svg-component id="heart" width="30" height="26" />
        </button>
        <button type="button" @click="vote(-1)">
          <svg-component id="sad" width="30" height="30" />
        </button>
      </div>
      <div class="action-log" v-for="log in actionLogs" :key="log.id">

        <div class="top">
          <div>
            <p>{{log.time}}</p>
            <p class="text-desktop">Image ID: <span>{{log.id}}</span> was added to {{log.text}}</p>
          </div>
          <svg-component class="like" v-if="log.text === 'Likes'" id="smile" width="20" height="17" />
          <svg-component class="dislike" v-else-if="log.text === 'Dislikes'" id="sad" width="20" height="17" />
          <svg-component class="favourite" v-else id="heart" width="20" height="17" />
        </div>

        <p class="text-mobile">Image ID: <span>{{log.id}}</span> was added to {{log.text}}</p>
      </div>
    </div>
</template>

<!--[] 5. Переделать выбор картинки в логах-->
<!--[] 6. Может быть ещё получение времени нужно сделать в одном месте, а не в двух-->
<!--[] 7. Нужно поправить появление картинки после лоадера, картинка появляется не сразу, а с задержкой-->

<script>
import { getRandomImage, setFavourite, setVote } from "@/api";

export default {
  name: 'VotingComponent',
  data() {
    return {
      imageUrl: '',
      imageId: '',
      actionLogs: [],
      isLoading: true
    }
  },
  created() {
    this.getImage()
  },
  methods: {
    async getImage() {
      try {
        this.isLoading = true
        const data = await getRandomImage()
        this.imageUrl = data[0].url
        this.imageId = data[0].id
        this.isLoading = false
      } catch(err) {
        console.error(err)
      }
    },
    async addToFavourites() {
      await setFavourite(this.imageId)

      const date = new Date()

      const actionLog = {
        time: `${date.getHours()}:${date.getMinutes()}`,
        id: this.imageId,
        text: 'Favourites'
      }
      this.actionLogs.push(actionLog)

      await this.getImage()
    },
    async vote(value) {
      await setVote(this.imageId, value)

      const date = new Date()

      const actionLog = {
        time: `${date.getHours()}:${date.getMinutes()}`,
        id: this.imageId,
        text: value === 1 ? 'Likes' : 'Dislikes'
      }
      this.actionLogs.push(actionLog)

      await this.getImage()
    }
  }
}
</script>

<style lang="scss" scoped>
.text-desktop {
  @media (max-width: 629px) {
    display: none;
  }
}
.text-mobile {
  color: $grey;

  span {
    color: $black-default;
  }

  @media (min-width: 630px) {
    display: none;
  }
}
.top {
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 100%;
  border-radius: $large;
  max-height: 500px;
}

.buttons-wrapper {
  display: flex;
  gap: 4px;
  background-color: $white-default;
  padding: 4px;
  border-radius: $large;
  width: fit-content;
  margin: -50px 0 14px 50%;
  transform: translateX(-50%);

  button {
    width: 80px;
    height: 80px;
    transition: .3s background-color ease-in-out;

    &:first-child {
      background-color: $accent-1;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;

      &:hover {
        background-color: rgba($accent-1, .3);

        & svg {
          fill: $accent-1;
        }
      }
    }

    &:nth-child(2) {
      background-color: $main;

      &:hover {
        background-color: rgba($main, .3);

        & svg {
          fill: $main;
        }
      }
    }

    &:last-child {
      background-color: $accent-2;
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;

      &:hover {
        background-color: rgba($accent-2, .3);

        & svg {
          fill: $accent-2;
        }
      }
    }

    & svg {
      fill: $white-default;
      transition: .3s fill ease-in-out;
    }
  }
}

.action-log {
  background-color: $background-grey;
  border-radius: $medium;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  @media (max-width: 629px) {
    flex-direction: column;
  }

  div {
    display: flex;
    align-items: center;
    gap: 20px;

    p:first-child {
      padding: 3px 10px;
      background-color: $white-default;
      color: $black-default;
    }

    p:nth-child(2) {
      color: $grey;

      span {
        color: $black-default;
      }
    }
  }

  .like {
    fill: $accent-1;
  }

  .dislike {
    fill: $accent-2;
  }

  .favourite {
    fill: $main;
  }
}
</style>