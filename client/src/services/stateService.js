import axios from 'axios'

export default {

  //gets all state data
  getAll() {
    return axios.get('/api/states/').then( response => {
      return response.data
      })
    },

    //patches visited/unvisited data
    setVisited(stateName, visited) {
      return axios.patch('/api/state/'+ stateName, { visited: visited }).then(response => {
        return response.data
      })
    },

    //returns selected statename
    getOne(stateName) {
      return axios.get('/api/states/'+ stateName).then( response => {
        return response.data
      })
    },
}
