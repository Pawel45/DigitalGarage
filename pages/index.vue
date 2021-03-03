<template>
  <v-app>
    <FindCar />
    <CarFeed />
  </v-app>
</template>

<script>
import FindCar from "~/components/FindCar.vue";
import CarFeed from "~/components/CarFeed.vue";

export default {
  components: {
    FindCar,
    CarFeed,
  },
};
</script>

<style lang="css" scoped>
</style>
