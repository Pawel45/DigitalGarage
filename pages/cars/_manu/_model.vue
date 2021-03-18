<template>
  <v-app>
    <v-container id="main_container">
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">
          Výsledky vyhledávání - {{ this.$route.params.manu }} {{ this.$route.params.model }}
        </h1>
        <v-spacer></v-spacer>
      </v-layout>
      
      <v-layout row>
          <v-flex lg3 mb-8 v-for="car in resultSliced"
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
                  <v-btn :to="'/car/' + car.id" color="#1f3e74" text aria-label="Inspect">Prohlédnout</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>

        <v-layout row justify-center mb-5>
          <div class="text-center">
          <v-pagination
            v-model="page"
            :length="getPaginationLenght()"
          ></v-pagination>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  created(){
    // Připojení databáze
    if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: process.env.VUE_APP_API_KEY,
          authDomain: 'carrate.firebaseapp.com',
          projectId: 'carrate',
          storageBucket: "carrate.appspot.com",
        });
      }else { firebase.app();}
    var db = firebase.firestore(); 
    
    if(this.$route.params.manu == "Všechny značky"){
      db.collection("cars")
      .orderBy("created", "asc")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              this.result.push({
              id: doc.id,
              manu: doc.data().manu,
              model: doc.data().model,
              info: doc.data().info,
              created: doc.data().created,
              myImage: doc.data().files[0],
            });
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }

    else if(this.$route.params.model == null){
      db.collection("cars").where("manu", "==", this.$route.params.manu)
      .orderBy("created", "asc")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              this.result.push({
              id: doc.id,
              manu: doc.data().manu,
              model: doc.data().model,
              info: doc.data().info,
              created: doc.data().created,
              myImage: doc.data().files[0],
            });
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }
    else{
      db.collection("cars").where("manu", "==", this.$route.params.manu).where("model", "==", this.$route.params.model)
      .orderBy("created", "asc")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              this.result.push({
              id: doc.id,
              manu: doc.data().manu,
              model: doc.data().model,
              info: doc.data().info,
              created: doc.data().created,
              myImage: doc.data().files[0],
            });
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }
    this.getResultSliced();
    console.log(this.result);
  },
  data() {
    return {
      result: [],
      resultSliced: [],
      page: 1,
    };
  },
  methods: {
    getPaginationLenght(){
      var lenght = Math.ceil(this.result.length/4);
      console.log(lenght);
      return lenght;
    },
    getResultSliced(){
      for (let i = 0; i <= this.result.length; i++) {
        var temp = [];
        for (let index = 4 * i; index <= (4 * (i+1)); index++) {
          temp.push(this.result[index]);
          
          console.log(temp + "DEBILE");
        }
        this.resultSliced.push(temp);
      }
      this.resultSliced = this.result;
    }
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

.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.9;
 }
</style>
