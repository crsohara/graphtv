<template>
  <div class="search">
    <div>
      <input
        type="search"
        id="search"
        name="search"
        placeholder="Series name"
        v-model="searchName"
        @keyup.enter="onSubmit"
      >
      <input
        type="year"
        id="year"
        name="year"
        placeholder="Year (optional)"
        v-model="searchYear"
        @keyup.enter="onSubmit"
      >
      <button @click="onSubmit">Search</button>
    </div>

    <div class="error" v-if="error">
      Error: {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: '',
      searchName: '',
      searchYear: '',
      result: {},
    }
  },
  methods: {
    async onSubmit() {
      this.error = undefined

      if (!this.searchName) {
        return
      }

      await this.search()
    },
    async search() {
      if (!this.searchName) {
        return
      }

      const { Search, totalResults, Error } = await this.$query.search(this.searchName, this.searchYear)

      if (Error) {
        this.error = Error
        return
      }

      if (totalResults === '1') {
        this.setResult(Search[0])
      }

      this.$emit('setSearchResults', Search)
    },
    async setResult(item) {
      this.searchName = item.Title
      this.searchYear = item.Year
    },
  },

}
</script>

<style scoped>
  .search {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  input + button,
  input + input {
    margin-left: 0.5rem;
  }
  button {
    cursor: pointer;
  }
</style>