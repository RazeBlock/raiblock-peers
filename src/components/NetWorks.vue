<template>
    <div>
      <div class="map-wrapper">
        <v-map :zoom="zoom" :center="center">
          <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
          <v-marker v-for="item in markers" :key="item.ip" :lat-lng="item.marker" :title="item.ip" :draggable="false">
            <v-popup :content="renderPopup(item)"></v-popup>
          </v-marker>
        </v-map>
      </div>
    </div>
</template>

<script type="text/babel">
    import fetch from '../utils/fetch.js'

    export default {
      data () {
        return {
          zoom: 2,
          center: [47.413220, -1.219482],
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          markers: []
        }
      },
      created () {
        this.getPeers()
      },
      methods: {
        renderPopup (item) {
          return `<div>IP: ${item.ip}</div>
                    <div>Port: ${item.port}</div>
                    <div>Version: ${item.version}</div>
                    <div>Country: ${item.country_long}</div>
                    <div>City: ${item.city}</div>`
        },
        getPeers () {
          fetch('/api/peers')
            .then(data => {
              this.markers = data.map(item => {
                return {
                  ...item,
                  marker: window.L.latLng(item.latitude, item.longitude)
                }
              })
              // setTimeout(() => {
              //   this.markers = this.markers.map(item => {
              //     return {
              //       ...item,
              //       show: true
              //     }
              //   })
              // }, 2000)
            })
            .catch(err => {
              console.warn(err)
            })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .map-wrapper {
    height: 500px;
    width: 100%;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
