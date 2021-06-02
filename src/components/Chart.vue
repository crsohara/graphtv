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
        plotOptions: {
          series: {
            label: {
                connectorAllowed: false
            },
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
