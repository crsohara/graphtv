<template>
  <div v-if="isVisible">

    <Loading v-if="isLoading" />

    <div class="episode" v-if="!isLoading">
      <div class="column">
        <img :src="episode.Poster" alt="">
      </div>
      <div class="column">
        <div class="detail">
          <strong>Title:</strong> {{ episode.Title }}
        </div>
        <div class="detail">
          <strong>Rating:</strong> {{ episode.Ratings[0].Value }}
        </div>
        <div class="detail">
          <strong>Season:</strong> {{ episode.Season}}
        </div>
        <div class="detail">
          <strong>Episode:</strong> {{ episode.Episode }}
        </div>
        <div class="detail">
          <strong>Plot:</strong> {{ episode.Plot }}
        </div>
        <div class="detail">
          <strong>Actors:</strong> {{ episode.Actors }}
        </div>
        <div class="detail">
          <strong>Released:</strong> {{ episode.Released }}
        </div>
        <div class="detail">
          <strong>Language:</strong> {{ episode.Language }}
        </div>
        <div class="detail">
          <a :href="`https://www.imdb.com/title/${episode.imdbID}`" target="_blank">Episode IMDB</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from './Loading.vue'

export default {
  components: { Loading },
  props: {
    episodeID: String
  },
  data(){
    return {
      isLoading: false,
      episode: {}
    }
  },
  methods: {
    async getEpisodeDetail(id) {
      this.isLoading = true
      await this.$query.getSeries(id).then(response => {
        this.isLoading = false
        this.episode = response
      })
    }
  },
  computed: {
    isVisible() {
      return this.episodeID
    },
  },
  watch: {
    episodeID (val, oldVal) {
      if (val === '') {
        this.episode = {}
        return
      }
      if (val !== oldVal) {
        this.getEpisodeDetail(val)
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.episode {
  max-width: 768px;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.column + .column {
  margin-left: 1rem;
}
.detail + .detail {
  margin-top: 0.25rem
}
@media screen and (min-width: 1200px) {
  .episode {
    flex-direction: row;
  }
}
</style>