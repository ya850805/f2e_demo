<template>
  <div>
    Get version information by <b>city</b>：
    <select v-model="city">
      <option v-for="(city, index) in cities" :value="city.value" :key="index">{{ city.text }}</option>
      <!--      <option value="Taipei">台北市</option>-->
    </select>
    <button @click="searchVersionByCity">search</button>

    <hr width="50%">

    <div v-show="responseCode!=''">Response code：<b>{{ responseCode }}</b></div>
    <div v-show="versionId!=''">Version ID：<b>{{ versionId }}</b></div>
    <div v-show="updateCheckTime!=''">Update check time：<b>{{ updateCheckTime }}</b></div>
    <div v-show="updateTime!=''">Update time：<b>{{ updateTime }}</b></div>

    <router-link to="/">back</router-link>
  </div>
</template>

<script>
import {CITIES} from '../constant/cities'
import {BUS_REQUEST_PREFIX} from '../constant/url'

import {sendRequest} from "../utils/send-request";

export default {
  name: 'Main',
  data() {
    return {
      cities: [],
      city: '',
      responseCode: '',
      versionId: '',
      updateCheckTime: '',
      updateTime: ''
    }
  },
  created() {
    this.cities = CITIES;
  },
  methods: {
    searchVersionByCity() {
      if (this.city !== '') {
        sendRequest('get', `${BUS_REQUEST_PREFIX}/DataVersion/City/${this.city}?$format=JSON`)
          .then(res => {
            this.responseCode = res.status
            this.versionId = res.data.VersionID
            this.updateCheckTime = res.data.UpdateCheckTime
            this.updateTime = res.data.UpdateTime
          })
      }
    }
  }

}
</script>

<style scoped>

</style>
