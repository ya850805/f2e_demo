<template>
  <div>
    <table align="center" border="1" cellspacing="0">
      <tr>
        <th>RouteID</th>
        <th>Name</th>
      </tr>
      <tr v-for="(star, index) in stars" :key="index">
        <td>{{star.SubRouteID}}</td>
        <td>{{star.SubRouteName.Zh_tw}}</td>
      </tr>
    </table>
    <br>
    <router-link to="/">back</router-link>
  </div>
</template>

<script>
import {LOCALSTORAGE_STAR_BUS_KEY} from "../constant/common";

export default {
  name: "Star",
  data() {
    return {
      stars: []
    }
  },
  created() {
    this.stars = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_STAR_BUS_KEY));
  }
}
</script>

<style scoped>

</style>
