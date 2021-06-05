<template>
  <div v-if="isVisible">
    <highcharts
      class="hc"
      :options="chartOptions"
      ref="chart"
    />
  </div>
</template>

<script>
export default {
  props: {
    series: Array,
    title: String
  },
  data() {
    return {
      chartOptions: {}
    }
  },
  computed: {
    isVisible() {
      return this.series.length
    }
  },
  methods: {
    formatPointLabel(item) {
      return `
        ${item.Title}<br/>
        <b>Rating</b>: ${item.imdbRating}<br/>
        <a href="https://www.imdb.com/title/${item.imdbID}" target="_blank">imdb</a>
      `
    },
    renderChart() {
      this.chartOptions = {
        series: this.series,
        title: {
          text: this.title
        },
        xAxis: {
          type: 'category',
          title: {
            text: 'Episode'
          }
        },
        yAxis: {
          max: 10,
          title: {
            text: 'Rating'
          }
        },
        tooltip: {
          formatter: function() {
            return `
              ${this.point.name}<br/>
              ${this.point.label}
            `
          },
          snap: 0,
        },
        plotOptions: {
          series: {
            label: {
                connectorAllowed: false
            },
            point: {
              events: {
                click: (event) => {
                  this.$emit('clickEpisode', event.point.options.id)
                }
              }
            }
          }
        },
      }
    }
  },
  mounted() {
    this.renderChart()
  },
  watch: {
    series() {
      this.renderChart()
    }
  }
}
</script>

<style scoped>
.highcharts-point {
  cursor: pointer;
}
</style>
