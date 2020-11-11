<template>
  <v-app>
      <SearchCars/>
      <CarFeed/>
  </v-app>
</template>

<script>
import SearchCars from "~/components/find_car.vue";
import CarFeed from "~/components/car_feed.vue";

export default {
  layout: 'default',
  components: {
    SearchCars,
    CarFeed
  }
}
</script>

<style lang="css" scoped>

</style>
