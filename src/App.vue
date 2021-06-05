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

    <div class="flex">
      <div class="column">
        <Details
          :series="series"
        />
      </div>

      <div class="column">
        <Episode-detail
          :episodeID="episode"
        />
      </div>
    </div>

    <Loading v-if="loading" />
    <Chart
      :title="`${series.Title} (${series.Year})`"
      :series="chartData"
      @clickEpisode="setEpisode"
    />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Details from './components/Details.vue'
import Chart from './components/Chart.vue'
import Loading from './components/Loading.vue'
import ResultList from './components/ResultList.vue'
import EpisodeDetail from './components/EpisodeDetail.vue'

export default {
  name: 'App',
  components: {
    Search,
    Details,
    Chart,
    Loading,
    ResultList,
    EpisodeDetail
  },
  data() {
    return {
      loading: false,
      chartData: [],
      results: [],
      seasons: [],
      series: {},
      episode: ''
    }
  },
  methods: {
    setEpisode(episodeID) {
      this.episode = episodeID
    },
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
      `
    },
    async getSeries(imdbID) {
      this.results = []
      this.chartData = []
      this.episode = ''
      this.loading = true
      this.pushUrlParams([`id=${imdbID}`])
      this.series = await this.$query.getSeries(imdbID)

      if (this.series.totalSeasons === 'N/A') {
        this.loading = false
        this.chartData = []
        return
      }

      this.getSeasons(imdbID, this.series.totalSeasons)
    },
    async getSeasons(id, seasonCount) {
      const seasonNumbers = [...Array(parseInt(seasonCount) + 1).keys()]
      seasonNumbers.splice(0,1)
      this.seasons = await Promise.all(seasonNumbers.map(season => {
        return this.$query.getSeason(id, season)
      })).then((results) => {
        this.loading = false
        return results
      })

      this.setChartData(this.seasons)
    },
    setChartData(data) {
      this.chartData = data.map(item => {
        if (!item.Episodes) {
          return {}
        }
        const data = item.Episodes.map(episode => {
          return {
            name: this.formatPointName(item, episode),
            label: this.formatPointLabel(episode),
            y: parseFloat(episode.imdbRating),
            id: episode.imdbID
          }
        })
        return {
          name: `Season ${item.Season}`,
          data
        }
      })
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

<style scoped>
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
.flex {
  display: flex;
  flex-direction: column;
}
@media screen and (min-width: 768px) {
  .flex {
    flex-direction: row;
  }
}
.column + .column {
  margin-top: 1rem;
}
@media screen and (min-width: 768px) {
  .column + .column {
    margin-top: 0;
    margin-left: 1rem;
  }
}
/*
https://jsfiddle.net/highcharts/vstf68b3/
:root {
	--background-color: #ffffff;
	--text-color: #292b2c;
	--hilight-color: #0275d8;
}

@media (prefers-color-scheme: dark) {
    :root {
        --background-color: #1F2227;
        --text-color: #c0c0c0;
        --hilight-color: #8db4d6;
    }

    .highcharts-color-0 {
        fill: #0460ba;
        stroke: #0460ba;
    }
    .highcharts-color-1 {
        fill: #9696ab;
        stroke: #9696ab;
    }
}

body {
    background-color: var(--background-color);
}
.highcharts-background {
    fill: var(--background-color);
}
.highcharts-container text {
    fill: var(--text-color);
}
.highcharts-subtitle,
.highcharts-credits,
.highcharts-axis-title {
    fill-opacity: 0.7;
}
.highcharts-grid-line {
    stroke: var(--text-color);
    stroke-opacity: 0.2;
}
.highcharts-tooltip-box {
    fill: var(--background-color);
}
.highcharts-column-series rect.highcharts-point {
    stroke: var(--background-color);
} */

</style>
