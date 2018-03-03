import Vue from 'vue'

const API_ENDPOINT = 'http://stmaur.cquest.org:1901/rna?nom='

export default {
    query (q) {
        const url = API_ENDPOINT + q
        return Vue.http.get(url).then(res => {
            console.log('res', res)
            return res.body
        }).catch(err => {
            console.error('Error querying:', err)
        })
  },
}
