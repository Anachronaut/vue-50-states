<template>
  <div class="state-detail p-2">
      <h2>The State of {{state.name}}</h2>

      <p v-if="state.visited">You have visited this state</p>
      <p v-else>You have not visited this state</p>

      <!--Map-->
      <div id="map-container">
        <l-map
          ref="stateMap"
          style="height: 100%; width: 100%"
          v-bind:zoom="zoom"
          v-bind:center="center">
          <l-tile-layer :url="url"></l-tile-layer>
        </l-map>
      </div>
  </div>
</template>

<script>

  import { LMap, LTileLayer } from 'vue2-leaflet'

  export default {
    name: 'StateDetail',
    components: {
      LMap, LTileLayer
    },
    data () {
      return {
        state: {
          name: ''
        },
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 2,
        center: [44, -103], //Initialize at the geographic center of the US
        bounds: null
      }
    },
    mounted() {
      this.state.name = this.$route.params.state
      //Not required, prevents user dragging map away from state.
      //User can still zoom in and out
      this.$refs.stateMap.mapObject.dragging.disable()
      this.fetchStateData()
    },
    methods: {
      fetchStateData() {
        //Fetches state name & map data
        this.$stateService.getOne( this.state.name ).then( data => {
        this.state = data
        this.zoom = data.zoom
        this.center = [data.lat, data.lon]
        //fly to new center coordinates to center on states
        this.$refs.stateMap.mapObject.flyTo(this.center, this.zoom)
        }).catch( err => console.error(err))
      }
    }
  }
</script>

<style scoped>

  #map-container {
    height: 30em;
  }

</style>
