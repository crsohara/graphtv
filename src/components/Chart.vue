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
          type: 'category'
        },
        yAxis: {
          max: 10
        },
        tooltip: {
          formatter: function() {
            return `
              ${this.point.name}<br/>
              ${this.point.label}
            `
          },
          snap: 0,
          style: {
            pointerEvents: 'auto'
          }
        },
        plotOptions: {
          series: {
            label: {
                connectorAllowed: false
            },
            point: {
              events: {
                click: function() {
                  this.series.chart.tooltip.options.stickOnContact = !this.series.chart.tooltip.options.stickOnContact
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
