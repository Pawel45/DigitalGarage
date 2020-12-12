<template>
  <v-app>
    <v-container id="main_container">
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">Moje Garáž</h1>
      </v-layout>
      <v-layout column text-center align-center>
        <v-flex>
          <h3>Zadejte e-mail, se kterým jste si své vozidlo spojili.</h3>
          <v-text-field
            :rules="[rules.email]"
            label="e-mail:"
            style="min-width: 200px"
          >
          </v-text-field>
        </v-flex>
        <v-flex>
          <v-btn color="#1f3e74 !important" dark @click="results = !results"
            >Ukázat vozidla</v-btn
          >
        </v-flex>
      </v-layout>

      <div v-if="results" grid-list-md class="width: 100%">
        <v-layout row wrap class="pa-2 my-6 fl1">
          <v-spacer></v-spacer>
          <h3 v-if="email" class="head_title">{{ email }}'s garage</h3>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row>
          <v-flex lg3 mb-3>
            <v-card class="mx-auto" max-width="280">
              <v-img
                src="https://www.audi.homeradiatorsreview.com/assets/images/audi-a3-8p-retrofit-1008x624.jpg"
                height="200px"
              ></v-img>
              <v-card-title>Audi A3</v-card-title>
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
              <v-card-title>Audi A3</v-card-title>
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
              <v-card-title>Audi A3</v-card-title>
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
              <v-card-title>Audi A3</v-card-title>
              <v-card-subtitle>2.0TDi 103kW</v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#1f3e74" text>Prohlédnout</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      results: false,
      rules: {
        required: (value) => !!value || "Nutné vyplnit.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Neplatný e-mail.";
        },
      },
    };
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
  font-size: 34px;
  font-weight: 800;
}

@media (max-width: 600px) {
  .head_title {
    font-size: 14px;
    text-align: center;
  }
  .fl1 {
    justify-content: center;
  }
}
</style>
