<template>
  <header>
    <div>
      <input
        type="search"
        id="search"
        name="search"
        v-model="searchval"
      >
      <button @click="onSubmit">Search</button>
    </div>
    <ul v-if="searchResults">
      <li v-for="item in searchResults" :key="item.imdbID">
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
  name: 'Search',
  props: {
  },
  data() {
    return {
      searchval: '',
      searchResults: [],
      apiBase: 'https://www.omdbapi.com/?apikey=d0d85a24&'
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.search()
      if (result) {
        this.getByID(result.imdbID)
      }
    },
    async correctSearch(item) {
      this.searchval = item.Title
      this.searchResults = []
      this.getByID(item.imdbID)
    },
    async search() {
      if (!this.searchval) {
        return
      }
      const query = `s=${this.searchval}`
      const response = await fetch(this.apiBase + query)
      const {Search, totalResults} = await response.json()

      if (totalResults === 1) {
        return Search[0]
      }
      if (totalResults > 1) {
        this.searchResults = Search
      }
      return false
    },
    async getByID(imdbID) {
      if (imdbID === undefined) {
        return
      }
      const query = `i=${imdbID}`
      const json = await fetch(this.apiBase + query).then(response => response.json())

      if (json.Type === 'series') {
        this.getSeasonData(imdbID, json.totalSeasons)
      }
    },
    async getSeasonData(id, seasonCount) {
      const arr = [...Array(parseInt(seasonCount) + 1).keys()]
      arr.splice(0,1)
      const seasonData = await Promise.all(arr.map(season => {
        return fetch(this.apiBase + `i=${id}&season=${season}`).then(response => response.json())
      }))

      this.$emit('heresyourdata', seasonData)
    },
  }

}
</script>
