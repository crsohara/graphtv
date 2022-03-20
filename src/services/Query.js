class QueryService {
  // baseUrl = 'https://www.omdbapi.com/?apikey=d0d85a24&'
  baseUrl = 'http://127.0.0.1:3000/'

  constructor() {
  }

  getUrl(query = "") {
    return `${this.baseUrl}${query}`;
  }

  get(query, search = false) {
    if (search) {
      return fetch('https://www.omdbapi.com/?apikey=d0d85a24&' + query)
        .then((response) => response.json())
        .then(response => {
          if (response.Error) {
            console.error(`Error: query:${query} - ${response.Error}`)
          }
          return response
        })
    }
    return fetch(this.getUrl(query))
      .then((response) => response.json())
      .then(response => {
        if (response.Error) {
          console.error(`Error: query:${query} - ${response.Error}`)
        }
        return response
      })
  }

  search(searchName, searchYear = false) {
    let params = [`s=${searchName}`]

    if (searchYear) {
      params.push(`y=${searchYear}`)
    }

    return this.get(`type=series&${params.join('&')}`, true)
  }

  getSeriesInfo(id) {
    return this.get(`i=${id}`, true)
  }

  getSeries(id) {
    return this.get(`${id}`)
  }

  getSeason(id, season) {
    return this.get(`i=${id}&season=${season}`).catch(() => {
      console.log('caught')
    })
  }

}

export default new QueryService()
