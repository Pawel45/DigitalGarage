<template>
  <v-app>
    <v-container id="main_container">
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">
          Výsledky vyhledávání - {{ this.$route.params.manu }} {{ this.$route.params.model }}
        </h1>
        <v-spacer></v-spacer>
      </v-layout>
      
      <v-layout row justify-center>
          <v-flex lg3 mb-3>
            <v-card class="mx-auto" max-width="280">
              <v-img
                src="https://www.audi.homeradiatorsreview.com/assets/images/audi-a3-8p-retrofit-1008x624.jpg"
                height="200px"
              ></v-img>
              <v-card-title>{{ this.$route.params.manu }} {{ this.$route.params.model }}</v-card-title>
              <v-card-subtitle>2.0TDi 103kW</v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#1f3e74" text>Prohlédnout</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex lg3 mb-3>
            <v-card class="mx-auto" max-width="280">
              <v-img
                src="https://www.audi.homeradiatorsreview.com/assets/images/audi-a3-8p-retrofit-1008x624.jpg"
                height="200px"
              ></v-img>
              <v-card-title>{{ this.$route.params.manu }} {{ this.$route.params.model }}</v-card-title>
              <v-card-subtitle>2.0TDi 103kW</v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#1f3e74" text>Prohlédnout</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex lg3 mb-3>
            <v-card class="mx-auto" max-width="280">
              <v-img
                src="https://www.audi.homeradiatorsreview.com/assets/images/audi-a3-8p-retrofit-1008x624.jpg"
                height="200px"
              ></v-img>
              <v-card-title>{{ this.$route.params.manu }} {{ this.$route.params.model }}</v-card-title>
              <v-card-subtitle>2.0TDi 103kW</v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#1f3e74" text>Prohlédnout</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex lg3 mb-3>
            <v-card class="mx-auto" max-width="280">
              <v-img
                src="https://www.audi.homeradiatorsreview.com/assets/images/audi-a3-8p-retrofit-1008x624.jpg"
                height="200px"
              ></v-img>
              <v-card-title>{{ this.$route.params.manu }} {{ this.$route.params.model }}</v-card-title>
              <v-card-subtitle>2.0TDi 103kW</v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#1f3e74" text>Prohlédnout</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
  </v-app>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  methods: {
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");

#main_container {
  max-width: 70%;
}

@media only screen and (min-width: 0px) and (max-width: 1000px) {
  #main_container {
    max-width: 90% !important;
  }
}

@media only screen and (min-width: 1001px) and (max-width: 1600px) {
  #main_container {
    max-width: 80% !important;
  }
}

.head_title {
  font-family: "Montserrat", sans-serif !important;
  font-size: 48px;
  font-weight: 800;
}

@media (max-width: 600px) {
  .head_title {
    font-size: 24px;
    text-align: center;
  }
  .fl1 {
    justify-content: center;
  }
}
</style>
