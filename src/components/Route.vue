<template>
  <div>
    Get routes by <b>city</b>：
    <select v-model="city">
      <option v-for="(city, index) in cities" :value="city.value" :key="index">{{ city.text }}</option>
    </select>
    <button @click="searchRoute">search</button>

    <hr width="50%">

    <!--    <div>-->
    <!--        <div v-for="(route, index) in routes" :key="index">-->
    <!--          {{route.RouteUID}} / {{route.RouteID}}-->
    <!--          <button>star</button>-->
    <!--        </div>-->
    <!--    </div>-->

    <div>
      <span v-show="routesGo.length != 0">
        Go
        <table align="center">
          <tr>
            <th>RouteID</th>
            <th>Name</th>
            <th>star</th>
          </tr>
          <tr v-for="(route, index) in routesGo" :key="index">
            <td>{{ route.SubRouteID }}</td>
            <td>{{ route.SubRouteName.Zh_tw }}</td>
            <td>
              <button @click="addStar(route)">star</button>
            </td>
          </tr>
        </table>
      </span>

      <hr width="30%" v-show="routesBack.length != 0">

      <span v-show="routesBack.length != 0">
        Back
        <table align="center">
          <tr>
            <th>RouteID</th>
            <th>Name</th>
            <th>star</th>
          </tr>
          <tr v-for="(route, index) in routesGo" :key="index">
            <td>{{ route.SubRouteID }}</td>
            <td>{{ route.SubRouteName.Zh_tw }}</td>
            <td>
              <button @click="addStar(route)">star</button>
            </td>
          </tr>
        </table>
      </span>
    </div>

    <router-link to="/">back</router-link>
  </div>

</template>

<script>
import {CITIES} from "../constant/cities";
import {sendRequest} from "../utils/send-request";
import {BUS_REQUEST_PREFIX} from "../constant/url";
import {LOCALSTORAGE_STAR_BUS_KEY} from "../constant/common";

export default {
  name: "Route",
  data() {
    return {
      cities: [],
      city: '',
      routesGo: [],
      routesBack: [],
    }
  },
  created() {
    this.cities = CITIES;
  },
  methods: {
    searchRoute() {
      sendRequest('get', `${BUS_REQUEST_PREFIX}/Route/City/${this.city}`)
        .then(res => {
          this.routesGo = res.data.filter(route => route.SubRoutes[0] != null).map(route => route.SubRoutes[0]);
          this.routesBack = res.data.filter(route => route.SubRoutes[1] != null).map(route => route.SubRoutes[1]);
        })
    },
    addStar(route) {
      if(window.localStorage.getItem(LOCALSTORAGE_STAR_BUS_KEY) !== null) {
        let array = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_STAR_BUS_KEY));
        array.push(route);
        window.localStorage.setItem(LOCALSTORAGE_STAR_BUS_KEY, JSON.stringify(array));
      } else {
        let array = new Array();
        array.push(route);
        window.localStorage.setItem(LOCALSTORAGE_STAR_BUS_KEY, JSON.stringify(array));
      }

    }
  }
}
</script>

<style scoped>

</style>
