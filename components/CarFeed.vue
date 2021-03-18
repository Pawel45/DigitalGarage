<template>
  <div>
    <div style="width: 100%; background-color: #f2f2f2; padding-bottom: 30px">
      <v-container id="main_container" grid-list-md>
        <v-layout row wrap class="pa-2 my-6 fl1">
          <v-spacer></v-spacer>
          <h1 class="head_title">Lidem se líbí</h1>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row>
          <v-flex lg3 mb-3 v-for="car in featured"
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
                  height="210px"
                  contain
                  style="hover"
                ></v-img>
                <v-card-title>{{car.manu}} {{car.model}}</v-card-title>
                <v-card-subtitle>{{car.info.slice(0, 30)}} ...</v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :to="'/car/' + car.id" color="#1f3e74" text aria-label="Inspect">Prohlédnout</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
        <v-layout row justify-center mt-4>
          <v-btn color="#1f3e74 !important" dark to="cars/add" aria-label="Add"
            >Přidej si své</v-btn
          >
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  created(){
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

    db.collection("cars").limit(4).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          this.featured.push({
            id: doc.id,
            manu: doc.data().manu,
            model: doc.data().model,
            info: doc.data().info,
            myImage: doc.data().files[0],
          });
      });
    });
  },
  data(){
    return{
      featured: [],
    }
  },
  methods: {
  },
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500&display=swap');


.head_title {
  font-family: "Montserrat", sans-serif !important;
}

@media (max-width: 600px) {
  .head_title {
    font-size: 36px;
    text-align: center;
  }
}

#main_container {
  max-width: 70%;
  margin: auto;
}

@media only screen and (max-width: 1600px) {
  #main_container {
    max-width: 80% !important;
  }
}

@media only screen and (max-width: 1000px) {
  #main_container {
    max-width: 90% !important;
  }
}

.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.9;
 }
</style>
