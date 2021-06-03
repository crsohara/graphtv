<template>
  <header style="display: flex; flex-flow: row nowrap; justify-content: flex-start; align-items: flex-start">
    <div>
      <input
        type="search"
        id="search"
        name="search"
        v-model="searchval"
        @keyup.enter="onSubmit"
      >
      <button @click="onSubmit">Search</button>
    </div>

    <ul v-if="resultList">
      <li v-for="item in resultList" :key="item.imdbID">
        <button
          @click="() => {correctSearch(item)}"
        >
          {{ item.Title }} - {{ item.Type }} ({{ item.Year }})
        </button>
      </li>
    </ul>
  </header>
</template>


<script>

export default {
  props: {},
  data() {
    return {
      searchval: '',
      resultList: [],
      result: {},
    }
  },
  methods: {
    async onSubmit() {
      await this.search()
    },
    async setResult(item) {
      this.searchval = item.Title
      this.resultList = []
    },
    async correctSearch(item) {
      this.setResult(item)
      this.getByID(item.imdbID)
    },
    async search() {
      if (!this.searchval) {
        return
      }

      const response = await this.$query.search(this.searchval)
      const { Search, totalResults } = response

      if (totalResults === '1') {
        this.setResult(Search[0])
        this.getByID(Search[0].imdbID)
        return
      }
      if (totalResults > 1) {
        this.resultList = Search
        return
      }
      console.error('Error', response)
      return false
    },
    async getByID(imdbID) {
      this.result = await this.$query.getById(imdbID)
      this.$emit('resultUpdate', this.result)

      if (this.result.Type === 'series') {
        this.getSeasonData(imdbID, this.result.totalSeasons)
      }
    },
    async getSeasonData(id, seasonCount) {
      const seasons = [...Array(parseInt(seasonCount) + 1).keys()]
      seasons.splice(0,1)
      const seasonData = await Promise.all(seasons.map(season => {
        return this.$query.getSeason(id, season)
      }))

      this.$emit('dataUpdate', seasonData)
    },
  },

}
</script>
