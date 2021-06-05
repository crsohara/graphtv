class QueryService {
  baseUrl = 'https://www.omdbapi.com/?apikey=d0d85a24&'

  constructor() {
  }

  getUrl(query = "") {
    return `${this.baseUrl}${query}`;
  }

  get(query) {
    return fetch(this.getUrl(query)).then((response) => response.json())
  }

  search(searchName, searchYear = false) {
    let params = [`s=${searchName}`]

    if (searchYear) {
      params.push(`y=${searchYear}`)
    }

    return this.get(`type=series&${params.join('&')}`)
  }

  getSeries(id) {
    return this.get(`i=${id}`)
  }

  getSeason(id, season) {
    return this.get(`i=${id}&season=${season}`)
  }

}

export default new QueryService()