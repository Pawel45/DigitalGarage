<template>
  <div id="app">
    <v-container id="main_container">
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">Vyhledat Auto</h1>
      </v-layout>
      <v-layout row class="search" style="border-radius: 5px">
        <v-flex sm6 class="search_car">
          <v-layout column wrap>
            <v-flex class="pa-3 pt-0">
              <h2 class="title">Vyberte Auto</h2>
            </v-flex>
            <v-flex class="pa-3">
              <p class="description">
                Podívejte se na již udělané auta a nechte se inspirovat.
              </p>
            </v-flex>
            <v-flex class="pa-3">
              <v-select
                :items="manufacturers"
                label="Značka"
                v-model="selectedManufacturer"
                return-object
                single-line
                dense
                solo
                v-on:change="getModels()"
              >
              </v-select>
              <v-select
                :items="models"
                label="Model"
                dense
                solo
                v-model="selectedModel"
                v-if="selectedManufacturer != ''"
              ></v-select>
              <v-btn @click="find()" style="width: 100%">Vyhledat</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-img class="search_img" sm6 :src="require('@/images/carrate-hero-img.png')" width="200" position="center center" contain max-height="330px"></v-img>
      </v-layout>
    </v-container>
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

    db.collection("znackyTest").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.manufacturers.push(doc.id);
    });
  });
  },
  data() {
    return {
      selectedManufacturer: "Alfa Romeo",
      selectedModel: "",

      manufacturers: [],
      models: [],
    };
  },
  methods: {
    getModels() {
      var db = firebase.firestore();

      var docRef = db.collection("znacky").doc(this.selectedManufacturer);

      docRef.get().then((doc) => {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              this.models = doc.data().models;
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    },
    find(){
      if(this.selectedModel != '') {
        // this.$store.dispatch("changeFilter", {manu: this.selectedManufacturer.manu, model: this.selectedModel.name});
        this.$router.push("cars/" + this.selectedManufacturer + "/" + this.selectedModel);
      }
      else this.$router.push("/");
    }
  },
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500&display=swap');

#app {
  background-image: url("https://file.kbb.com/kbb/images/PageBackground/SVG/cityscape-2a.svg");
  background-position: bottom;
  background-repeat: repeat-x;
  background-size: 1800px;
  min-height: 400px;
}

#main_container {
  max-width: 70%;
  margin: auto;
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
    font-size: 36px;
    text-align: center;
  }
  .fl1 {
    justify-content: center;
  }
}

.search {
  background-color: #2b5195;
  border-radius: 4px;
  min-height: 300px;
  color: white;
}

.search_car {
  max-width: 472px;
  padding: 20px;
}

.description {
  font-family: 'Poppins', sans-serif !important;
  font-size: 14px;
  font-weight: 200;
}

.title {
  font-family: 'Poppins', sans-serif !important;
  font-size: 24px;
  font-weight: 400;
}

.search_img {
  flex-grow: 1 !important;
}
@media (max-width: 600px) {
  .search_img {
    display: none;
  }
  .search_car {
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 1;
    max-width: 100%;
  }
}

.select_image {
  border-radius: 4px !important;
}
</style>
