<template>
  <div style="display:flex; text-align: left; align-items: flex-start; margin-left: 1rem;">
    <div>
      <img :src="series.Poster" style="width: 100px; margin-right: 1rem;">
    </div>
    <div v-if="seriesIsSet">
      <h2>{{ series.Title }}</h2>
      <div>{{ series.Year }} ({{ series.totalSeasons }} Seasons) </div>
      <div>{{ series.Plot }}</div>
      <div>IMDB Rating: {{ series.imdbRating }}</div>
      <a
        v-if="series.imdbID"
        :href="`https://www.imdb.com/title/${series.imdbID}`"
        target="_blank"
      >
        imdb
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      series: {
        required: false,
        type: Object,
        default: undefined
      }
    },
    computed: {
      seriesIsSet() {
        return Object.keys(this.series).length
      }
    }
  }
</script>