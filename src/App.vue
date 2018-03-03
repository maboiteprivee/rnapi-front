<template>
    <div class="d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="masthead">
        <div class="inner">
          <h3 class="masthead-brand">RNA Explorer</h3>
        </div>
      </header>

      <main role="main">
        <b-form-input size="lg" type="text" placeholder="Nom de l'association" @input="search" v-model="q"></b-form-input>
        <div class="searching mt-2 mb-3">
            <span v-show="searching">Recherche en cours...</span>
        </div>
        <b-table small v-show="results.length" :items="results" :fields="fields"></b-table>
      </main>

      <footer class="mastfoot mt-auto">
        <div class="inner">
          <p>Proposé par <a href="https://twitter.com/cq94">@cq94</a> et <a href="https://twitter.com/abulte">@abulte</a> - données disponible sur <a href="https://www.data.gouv.fr/fr/datasets/repertoire-national-des-associations-rna/">data.gouv.fr</a>.</p>
        </div>
      </footer>
    </div>
</template>

<script>
import API from './api'
import _ from 'lodash'

export default {
    name: 'app',
    data () {
        return {
            results: [],
            q: '',
            searching: false,
            fields: [{
                key: 'id',
                label: 'n° RNA',
            }, {
                key: 'titre',
                label: 'Nom',
            }, {
                key: 'adrs_libcommune',
                label: 'Commune',
            }, {
                key: 'date_creat',
                label: 'Création',
            }],
        }
    },
    methods: {
        search () {
            if (!this.q.length) return this.results = []
            if (this.q.length <= 3) return
            this._search(this.q)
        },
        _search: _.debounce(function (q) {
            this.searching = true
            API.query(q).then(data => {
                this.results = data.map(el => {
                    return el[0]
                })
                this.searching = false
            })
        }, 500)
    },
}
</script>

<style>
/*
 * Globals
 */

/* Links */
a,
a:focus,
a:hover {
  color: #fff;
}

/*
 * Base structure
 */

html,
body {
  height: 100%;
  background-color: #333;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  /* box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5); */
}

/*
 * Header
 */
.masthead {
  margin-bottom: 2rem;
}

.masthead-brand {
  margin-bottom: 0;
}

.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}

@media (min-width: 48em) {
  .masthead-brand {
    float: left;
  }
  .nav-masthead {
    float: right;
  }
}

.searching {
    height: 10px;
    font-size: 12px;
    font-style: italic;
}

/*
 * Footer
 */
.mastfoot {
  color: rgba(255, 255, 255, .5);
}
</style>
