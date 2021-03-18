<template>
  <v-app>
    <v-container id="main_container" grid-list-md>
      <v-layout row wrap class="pa-2 my-4 fl1">
        <h1 class="head_title">{{this.manu}} {{this.model}}</h1>
        <v-spacer></v-spacer>
        <!-- <h4>ID: {{ this.$route.params.id }}</h4> -->
      </v-layout>
      <v-layout row>
        <!-- MOBILE VERSION -->
        <v-flex hidden-lg-and-up lg7>
          <!-- Could be parameter "cycle" to cicling between images" -->
          <v-carousel hide-delimiters lg7 height="100%">
            <v-carousel-item
              v-for="(item, i) in files"
              :key="i"
              :src="item"
              :href="item"
              style="height: 100%; max-height: 70vh;"
              contain
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
        <!-- WEB VERSION -->
        <v-flex lg7 hidden-md-and-down text-center class="mainImageContainer">
          <v-icon size="30" @click="previousImage" color="black" class="arrow_left">mdi-arrow-left</v-icon>
          <img style="max-height: 50vh; max-width: 100%; border: 1px black solid;" :src="myImage" alt="" />
          <v-icon size="30" @click="nextImage" color="black" class="arrow_right">mdi-arrow-right</v-icon>
        </v-flex>
        <v-flex lg5 hidden-md-and-down>
          <v-layout column wrap text-center>
            <v-flex align-center>
              <img
                v-for="(item, i) in files"
                :key="i"
                style="width: 150px; margin: 0 5px; border: 1px black solid;"
                @mouseover="() => {
                  myImage = item;
                  counter = i;
                }"
                :src="item"
                alt=""
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout column>
        <v-flex my-3>
          <p class="infoText">
            {{this.info}}
          </p>
        </v-flex>
        <v-flex class="basicText">
          <p v-if="this.owner != ''">Majitel: {{this.owner}}</p>
        </v-flex>
        <v-flex mb-5 align-self-center text-center>
          <h2 class="basicText">VAŠE HODNOCENÍ</h2>
          <v-rating
          color="yellow"
          background-color="grey"
            empty-icon="mdi-star-outline"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            hover
            length="5"
            size="32"
            value=3
          ></v-rating>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  mounted() {
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

    var docRef = db.collection("cars").doc(this.$route.params.id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            this.manu = doc.data().manu;
            this.model = doc.data().model;
            this.info = doc.data().info;
            this.files = doc.data().files;
            this.myImage = doc.data().files[0];
            this.owner = doc.data().owner;

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            this.$router.push("/");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  },
  data() {
    return {
      manu: '',
      model: '',
      info: '',
      files: null,
      myImage: '',
      owner: '',
      value: 3,
      counter: 0,

    }
  },
  methods: {
    nextImage(){
      if(this.files[this.counter+1] != null){
      this.myImage = this.files[this.counter+1];
      this.counter++;
      }
      else {
        this.myImage = this.files[0];
        this.counter = 0;
      }
    },
    previousImage(){
      if(this.files[this.counter-1] != null){
      this.myImage = this.files[this.counter-1];
      this.counter--;
      }
      else {
        this.myImage = this.files[this.files.length-1];
        this.counter = this.files.length-1;
      }
    }
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
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

.infoText{
  font-family: 'Poppins', sans-serif !important;
  font-size: 24px;
  font-weight: 400;
}
.basicText{
  font-family: 'Poppins', sans-serif !important;
  font-size: 24px;
  font-weight: 500;
}

.mainImageContainer{
  position: relative;
}

.arrow_left{
  position: absolute;
  top: 50%;
  left: 0;
  opacity: 0.8;
  background-color: rgb(212, 212, 212); 
  border-radius: 50%;
  transform: translate(50%, -50%);
}
.arrow_right{
  position: absolute;
  top: 50%;
  right: 0;
  opacity: 0.8;
  background-color: rgb(212, 212, 212); 
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
