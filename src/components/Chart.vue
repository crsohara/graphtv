<template>
  <div>
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
    series: [],
  },
  data() {
    return {
      chartOptions: {}
    }
  },
  methods: {
    renderChart() {
      this.chartOptions = {
        series: this.series,
        xAxis: {
          type: 'category'
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
