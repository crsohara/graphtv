<template>
  <div class="results" v-if="isVisible">
    <div class="wrap">
      <ul>
        <li
          v-for="result in results"
          :key="result.imdbID"
        >
          <button
            @click="() => {correctSearch(result)}"
          >
            {{ result.Title }} - ({{ result.Year }})
          </button>
        </li>
      </ul>
      <button
        @click="clearResults"
        class="button-close"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    results: Array
  },
  methods: {
    correctSearch(item) {
      this.$emit('getSeries', item.imdbID)
    },
    clearResults() {
      this.$emit('clearResults')
    }
  },
  computed: {
    isVisible() {
      return this.results.length
    }
  }
}
</script>

<style scoped>
  .results {
    position: relative;
  }
  .wrap {
    background: white;
    border: 1px solid grey;
    border-radius: 2px;
    position: absolute;
    z-index: 99;
  }
  ul {
    text-align: left;
    list-style: none;
    padding: 0.5rem;
  }
  li {
    margin-top: 0.25rem;
  }
  button {
    cursor: pointer;
  }
  .button-close {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>