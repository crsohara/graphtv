<template>
  <div class="wrap">
    <Search
      @heresyourdata="heresyourdata"
    />
    <Chart
      v-if="showChart"
      :series="chartData"
    />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Chart from './components/Chart.vue'

export default {
  name: 'App',
  components: {
    Search,
    Chart
  },
  data() {
    return {
      chartData: {},
      showChart: false,
    }
  },
  methods: {
    formatNumber(item) {
      return parseInt(item) > 9 ? item : '0' + item
    },
    formatPointName(item, episode) {
      return `S${this.formatNumber(item.Season)}E${this.formatNumber(episode.Episode)}`
    },
    heresyourdata(data) {
      const chartData = data.map(item => {
        const data = item.Episodes.map(episode => {
          return {
            name: this.formatPointName(item, episode),
            y: parseFloat(episode.imdbRating)
          }
        })
        const result = {
          name: `Season ${item.Season}`,
          data
        }
        return result
      })
      this.chartData = chartData

      this.showChart = true
    }
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

</style>
