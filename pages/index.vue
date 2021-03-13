<template>
  <v-app>
    <SearchCar />
    <CarFeed />
  </v-app>
</template>

<script>
import SearchCar from "~/components/SearchCar.vue";
import CarFeed from "~/components/CarFeed.vue";

export default {
  components: {
    SearchCar,
    CarFeed,
  },
};
</script>

<style lang="css" scoped>
</style>
