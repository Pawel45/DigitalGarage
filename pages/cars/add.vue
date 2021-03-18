<template>
  <v-app id="app">
    <v-container id="main_container">
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">Přidat Auto</h1>
        <!-- <v-btn @click="addCar()">ADD</v-btn> -->
      </v-layout>
      <v-layout row wrap class="">
        <v-stepper v-model="e6" vertical non-linear style="width: 100%">
          <!-- STEP 1 -->
          <v-stepper-step :complete="e6 > 1" step="1">
            Vyberte značku a model auta
            <small></small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-select
                :items="manufacturers"
                label="Značka"
                v-model="selectedManufacturer"
                return-object
                single-line
                dense
                solo
                v-on:change="getModels()"
                style="width: 20%; min-width: 200px"
              >
              </v-select>
              <v-select
                :items="models"
                label="Model"
                dense
                solo
                v-model="selectedModel"
                v-if="selectedManufacturer != ''"
                style="width: 20%; min-width: 200px"
              ></v-select>

            <v-btn
              :disabled="selectedModel == ''"
              @click="e6 = 2"
              color="primary"
              >Pokračovat</v-btn
            >
          </v-stepper-content>

          <!-- STEP 2 -->
          <v-stepper-step :complete="e6 > 2" step="2"
            >Vyberte fotografie auta</v-stepper-step
          >

          <v-stepper-content step="2">
            <p><b>První</b> zvolená fotografie bude použita jako <b>náhledová</b>.</p>
            <p>Maximální velikost jednoho souboru je maximálně <b>10MB</b>.</p>
            <v-file-input
              v-model="files"
              multiple
              show-size
              small-chips
              accept="image/*"
              prepend-icon="mdi-camera"
              truncate-length="36"
              style="width: 30%; min-width: 220px"
            ></v-file-input>

            <v-btn :disabled="files == ''" @click="e6 = 3" color="primary"
              >Pokračovat</v-btn
            >
            <v-btn @click="e6 = 1" text>Zpět</v-btn>
          </v-stepper-content>

          <!-- STEP 3 -->
          <v-stepper-step :complete="e6 > 3" step="3"
            >Uveďte doplňující informace</v-stepper-step
          >

          <v-stepper-content step="3" style="min-width: 320px; width: 40%">
            <h4 style="margin-bottom: 10px;">Napište vše, co víte o svém vozidle.</h4>
            <p><i>Rok výroby, tachometr, objem, výkon, výbava..</i></p>
            <v-textarea v-model="info" label="Informace"></v-textarea>

            <v-btn :disabled="info == ''" @click="e6 = 4" color="primary"
              >Pokračovat</v-btn
            >
            <v-btn @click="e6 = 2" text>Zpět</v-btn>
          </v-stepper-content>

          <!-- STEP 4 -->
          <v-stepper-step step="4">Dokončení příspěvku</v-stepper-step>

          <v-stepper-content step="4">
            <v-text-field
              v-model="owner"
              label="Jméno (volitelné)"
              style="width: 30%; min-width: 220px"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              label="E-mail"
              style="width: 30%; min-width: 220px"
            ></v-text-field>
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name=""
              hint="Minimální délka 8 znaků"
              counter
              @click:append="show = !show"
              v-model="password"
              label="Heslo (slouží k pozdější úpravě)"
              style="width: 30%; min-width: 220px"
            ></v-text-field>
            <v-text-field
              :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, (password === passwordConfirm) || 'Hesla se musí shodovat!']"
              :type="showConfirm ? 'text' : 'password'"
              name=""
              hint="Minimální délka 8 znaků"
              counter
              @click:append="showConfirm = !showConfirm"
              v-model="passwordConfirm"
              label="Potvrďte heslo"
              style="width: 30%; min-width: 220px"
            ></v-text-field>

            <v-btn
              :disabled="email == '' || password == '' || password.length < 8 || isDisabled || password != passwordConfirm"
              @click="uploadImagesToFirestore()"
              color="primary"
              >Vložit</v-btn
            >
            <v-btn @click="e6 = 3" text>Zpět</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";
import bcrypt from 'bcryptjs';

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

    db.collection("znacky").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.manufacturers.push(doc.id);
    });
  });
  },
  data() {
    return {
      e6: 1,
      files: [],
      info: "",
      text: "",
      email: "",
      password: "",
      passwordConfirm: "",
      hash: "",
      owner: "",
      show: false,
      showConfirm: false,
      firebaseImages: [],
      maxFileSize: 10000000,
      isDisabled: false,

      rules: {
        required: (value) => !!value || "Nutné vyplnit.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Neplatný e-mail.";
        },        
      },

      selectedManufacturer: "Alfa Romeo",
      selectedModel: "",

      manufacturers: [],
      models: [],
    };
  },
  methods: {
    getModels() {
      var db = firebase.firestore();

      var docRef = db.collection("znackyTest").doc(this.selectedManufacturer);

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
    getHashedPassword(){  
      const password = this.password;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return err;
        bcrypt.hash(password, salt, (err, hash) => {
            // Store hash in DB.
            if (err) return err;
            this.hash = hash;
        });
      });
    },
    async addItemToFirestore(){
      var db = firebase.firestore();

      //Přidání do databáze
      const docRef = db.collection('cars').doc();

      await docRef.set({
        email: this.email.toLowerCase(),
        hash: this.hash,
        info: this.info,
        manu: this.selectedManufacturer,
        model: this.selectedModel,
        files: this.firebaseImages,
        owner: this.owner,
      }).then(() => {
        alert("Vaše auto bylo úspěšně přidáno!");
        this.$router.push("/car/" + docRef.id);
      });
    },
    async uploadImagesToFirestore(){
      this.isDisabled = true;
      this.getHashedPassword();
      //Upload obrázků
      async function putStorageItem(item, firebaseImages, maxFileSize) {
        if(item.size < maxFileSize){
        // the return value will be a Promise
          return firebase.storage().ref('images/' + Math.random() + item.name).put(item)
          .then((snapshot) => {
            console.log('One success:', item);
            return snapshot.ref.getDownloadURL().then(downloadURL => {
                //promise inside promise to get donloadable URL
                firebaseImages.push(downloadURL);
                console.log("File available at", downloadURL);
            });
          }).catch((error) => {
            console.log('One failed:', item, error.message);
          });
        }
        else{
          console.log("File is too large");
        }
      }
        

      Promise.all(
        // Array of "Promises"
        this.files.map(item => putStorageItem(item, this.firebaseImages, this.maxFileSize))
      )
      .then(() => {
        console.log(`All success`);
        this.addItemToFirestore();
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message)
      });

      return this.firebaseImages;
    },    
    passwordConfirmationRule() {
      return () => (this.password === this.passwordConfirm) || 'Hesla se musí shodovat!'
    }
  },
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
