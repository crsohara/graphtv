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

  search(searchval) {
    return this.get(`type=series&s=${searchval}`)
  }

  getById(id) {
    return this.get(`i=${id}`)
  }

  getSeason(id, season) {
    return this.get(`i=${id}&season=${season}`)
  }

  handleErrors(err) {
    // Note: here you may want to add your errors handling
    console.log({ message: "Errors is handled here", err });
  }

}

export default new QueryService()