<template>
  <v-app>
    <v-container id="main_container" grid-list-md>
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">{{this.manu}} {{this.model}}</h1>
        <v-spacer></v-spacer>
        <h4>ID: {{ this.$route.params.id }}</h4>
      </v-layout>
      <v-layout row>
        <!-- MOBILE VERSION -->
        <v-flex hidden-lg-and-up lg7>
          <v-carousel hide-delimiters cycle lg7 height="100%">
            <v-carousel-item
              v-for="(item, i) in files"
              :key="i"
              :src="item"
              :href="item"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
        <!-- WEB VERSION -->
        <v-flex lg7 hidden-md-and-down>
          <img style="width: 100%; border: 1px black solid;" :src="myImage" alt="" />
        </v-flex>
        <v-flex lg5 hidden-md-and-down>
          <v-layout column wrap text-center>
            <v-flex align-center>
              <img
                v-for="(item, i) in files"
                :key="i"
                style="width: 150px; margin: 0 5px; border: 1px black solid;"
                @mouseover="myImage = item"
                :src="item"
                alt=""
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <h2>{{this.manu}} {{this.model}}</h2>
          {{this.info}}
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
          apiKey: 'AIzaSyDt1XVGdBpKqwb1v5zVDb663X-QNw5fvJs',
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

    }
  },
  methods: {
    
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");

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
</style>
