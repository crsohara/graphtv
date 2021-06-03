<template>
  <div class="wrap">
    <Search
      @dataUpdate="dataUpdate"
      @resultUpdate="resultUpdate"
    />

    <Details
      :series="result"
    />

    <Chart
      v-if="showChart"
      :series="chartData"
    />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Details from './components/Details.vue'
import Chart from './components/Chart.vue'

export default {
  name: 'App',
  components: {
    Search,
    Details,
    Chart
  },
  data() {
    return {
      chartData: {},
      showChart: false,
      result: {}
    }
  },
  methods: {
    formatNumber(item) {
      return parseInt(item) > 9 ? item : '0' + item
    },
    formatPointName(item, episode) {
      return `S${this.formatNumber(item.Season)}E${this.formatNumber(episode.Episode)}`
    },
    formatPointLabel(item) {
      return `
        ${item.Title}<br/>
        <b>Rating</b>: ${item.imdbRating}<br/>
        <a href="https://www.imdb.com/title/${item.imdbID}" target="_blank">imdb</a>
      `
    },
    resultUpdate(data) {
      this.result = data
    },
    dataUpdate(data) {
      this.chartData = data.map(item => {
        const data = item.Episodes.map(episode => {
          return {
            name: this.formatPointName(item, episode),
            label: this.formatPointLabel(episode),
            y: parseFloat(episode.imdbRating)
          }
        })
        const result = {
          name: `Season ${item.Season}`,
          data
        }
        return result
      })

      this.showChart = true
    }
  },
}
</script>

<style>
.wrap {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration: underline;
}
</style>
