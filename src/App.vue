<template>
  <div class="wrap">
    <Search
      @setSearchResults="setSearchResults"
    />

    <ResultList
      :results="results"
      @getSeries="getSeries"
      @clearResults="clearResults"
    />

    <Details
      :series="series"
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
import ResultList from './components/ResultList.vue'

export default {
  name: 'App',
  components: {
    Search,
    Details,
    Chart,
    ResultList
  },
  data() {
    return {
      chartData: {},
      showChart: false,
      results: [],
      series: {}
    }
  },
  methods: {
    clearResults() {
      this.results = []
    },
    setSearchResults(results) {
      this.results = results
    },
    formatNumber(item) {
      return parseInt(item) > 9 ? item : '0' + item
    },
    formatPointName({Season}, {Episode}) {
      return `S${this.formatNumber(Season)}E${this.formatNumber(Episode)}`
    },
    formatPointLabel(item) {
      return `
        ${item.Title}<br/>
        <b>Rating</b>: ${item.imdbRating}<br/>
        <a href="https://www.imdb.com/title/${item.imdbID}" target="_blank">imdb</a>
      `
    },
    async getSeries(imdbID) {
      this.results = []
      this.pushUrlParams([`id=${imdbID}`])
      this.series = await this.$query.getSeries(imdbID)

      if (this.series.Type === 'series') {
        this.getSeasons(imdbID, this.series.totalSeasons)
      }
    },
    async getSeasons(id, seasonCount) {
      const seasons = [...Array(parseInt(seasonCount) + 1).keys()]
      seasons.splice(0,1)
      const seasonData = await Promise.all(seasons.map(season => {
        return this.$query.getSeason(id, season)
      }))

      this.setChartData(seasonData)
    },
    setChartData(data) {
      this.chartData = data.map(item => {
        const data = item.Episodes.map(episode => {
          return {
            name: this.formatPointName(item, episode),
            label: this.formatPointLabel(episode),
            y: parseFloat(episode.imdbRating)
          }
        })
        return {
          name: `Season ${item.Season}`,
          data
        }
      })

      this.showChart = true
    },
    pushUrlParams(params) {
      history.pushState({}, null, `${location.pathname}?${params.join('&')}`);
    },
    init() {
      const search = window.location.search
      if (!search) {
        return
      }
      const params = new URLSearchParams(search)
      if (params.has('id')) {
        this.getSeries(params.get('id'))
      }
    }
  },
  created() {
    this.init()
  }
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
