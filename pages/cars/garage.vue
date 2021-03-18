<template>
  <v-app>
    <v-container id="main_container">
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">Moje Garáž</h1>
      </v-layout>
      <v-layout column text-center align-center>
        <v-flex>
          <h3 class="otherText">Zadejte e-mail, se kterým jste si své vozidlo spojili.</h3>
          <v-text-field
            :rules="[rules.email]"
            v-model="email"
            label="e-mail:"
            style="min-width: 200px"
          >
          </v-text-field>
        </v-flex>
        <v-flex>
          <v-btn color="#1f3e74 !important" dark @click="find()" aria-label="Show"
            >Ukázat vozidla</v-btn
          >
        </v-flex>
      </v-layout>

      <div v-if="cars != ''" grid-list-md class="width: 100%">
        <v-layout row wrap class="pa-2 my-6 fl1">
          <v-spacer></v-spacer>
          <h3 v-if="email" class="head_title">{{ emailText }}'s garage</h3>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row justify-center>
          <v-flex lg3 mb-3 v-for="car in cars"
            :key="car.id">
            <v-hover v-slot="{ hover }">
              <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto" 
              max-width="280"
              @click="$router.push('/car/' + car.id)"
              style="cursor: pointer;"
              >
                <v-img
                  :src="car.myImage"
                  max-height="210px"
                  contain
                  style="hover"
                ></v-img>
                <v-card-title>{{car.manu}} {{car.model}}</v-card-title>
                <v-card-subtitle>{{car.info.slice(0, 30)}} ...</v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="$router.push('/car/' + car.id)" color="#1f3e74" text aria-label="Inspect">Prohlédnout</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      cars: [],
      emailText: '',
      email: "",
      rules: {
        required: (value) => !!value || "Nutné vyplnit.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Neplatný e-mail.";
        },
      },
    };
  },
  methods: {
    find(){
      this.cars = [];
      this.emailText = this.email.toLowerCase();
      //Připojení databáze
      if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: process.env.VUE_APP_API_KEY,
            authDomain: 'carrate.firebaseapp.com',
            projectId: 'carrate',
            storageBucket: "carrate.appspot.com",
          });
        }else { firebase.app();}
      var db = firebase.firestore();

      db.collection("cars").where("email", "==", this.email.toLowerCase())
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              this.cars.push({
                id: doc.id,
                manu: doc.data().manu,
                model: doc.data().model,
                info: doc.data().info,
                myImage: doc.data().files[0],
              });

          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500&display=swap');

#app {
  background-color: #f2f2f2;
}

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

.otherText{
  font-family: 'Poppins', sans-serif !important;
  font-size: 18px;
  font-weight: 400;
}

.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.9;
 }

</style>
