<template>
    <div>
      <div class="map-wrapper">
        <v-map :zoom="zoom" :center="center">
          <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
          <v-marker v-for="item in markers" :key="item.id" :lat-lng="item.marker" :title="item.ip" :draggable="false">
            <v-popup :key="item.id" :content="renderPopup(item)"></v-popup>
          </v-marker>
        </v-map>
        <div class="map-loading">
          <div v-loading="getPeersPending" element-loading-background="transparent" element-loading-spinner="el-icon-loading"></div>
        </div>
        <div class="peer-count-marker">
          Peers: {{markers.length}}
        </div>
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
          markers: [],
          getPeersPending: false
        }
      },
      created () {
        this.getPeers()
        this.startInterval()
      },
      destroyed () {
        clearInterval(this._interval)
      },
      methods: {
        renderPopup (item) {
          return `<div>IP: ${item.ip}</div>
                    <div>Port: ${item.port}</div>
                    <div>Version: ${item.version}</div>
                    <div>Country: ${item.country_long}</div>
                    <div>City: ${item.city}</div>`
        },
        startInterval () {
          this._interval = setInterval(() => {
            this.getPeers()
          }, 1000 * 10)
        },
        getPeers () {
          if (this.getPeersPending) return
          this.getPeersPending = true
          fetch('/api/peers')
            .then(data => {
              this.markers = data.map(item => {
                return {
                  ...item,
                  marker: window.L.latLng(item.latitude, item.longitude)
                }
              })
              this.getPeersPending = false
            })
            .catch(err => {
              console.warn(err)
              this.getPeersPending = false
            })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .map-wrapper {
    height: 500px;
    width: 100%;
    .map-loading {
      line-height: 30px;
      position: absolute;
      top: 80px;
      right: 20px;
      z-index: 111111;
      color: #303030;
      border-radius: 4px;
    }
    .peer-count-marker {
      line-height: 30px;
      position: absolute;
      padding: 0px 15px;
      top: 500px + 20px;
      left: 10px;
      z-index: 111111;
      background: #303030;
      color: #ffeb3b;
      border-radius: 4px;
    }
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
