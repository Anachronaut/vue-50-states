<template>
  <div id="state-list">

    <Summary
      v-bind:total="totalVisited"
      v-bind:visitedAll="visitedAll">
    </Summary>

    <div class="d-flex flex-wrap justify-content-around">
      <div class="p-2" v-for="state in states" v-bind:key="state.name">
        <State
          v-bind:state="state"
          v-on:isVisited="updateVisited"
          ></State>
        </div>
    </div>
  </div>
</template>

<script>
  import State from '@/components/State'
  import Summary from '@/components/Summary'

  export default {
    name: 'StateList',
    components: {
      State, Summary
    },
    data() {
      return {
        states: [],
      }
    },
    mounted() {
      this.getAll()
    },
    methods: {
      //Import state list as a child component
      getAll() {
        this.$stateService.getAll().then(data => {
          this.states = data
        })
      },
      //Calls setVisited (src/services/stateService.js), then updates states array (getAll)
      updateVisited(stateName, stateVisited) {
        this.$stateService.setVisited(stateName, stateVisited).then(data => {
          this.getAll()
        })
      }
    },
        computed: {
          //Returns total number of states visited
          totalVisited() {
            let visited = this.states.filter(function(state) {
              return state.visited
            })
            return visited.length
          },
          //Returns if all states have been visited
          visitedAll() {
            let visited = this.states.filter(function(state) {
              return state.visited
            })
            return visited.length == this.states.length
          }
      }
  }
</script>

<style>
</style>
