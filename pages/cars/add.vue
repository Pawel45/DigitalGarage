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
              item-text="manu"
              item-value="value"
              label="Značka"
              v-model="selectedManufacturer"
              return-object
              single-line
              dense
              solo
              style="width: 20%; min-width: 200px"
              @change="selectedModel = ''"
            >
            </v-select>
            <v-select
              :items="getModels(selectedManufacturer.value)"
              label="Model"
              item-text="name"
              item-value="value"
              dense
              solo
              return-object
              v-model="selectedModel"
              v-if="selectedManufacturer != ''"
              style="width: 20%; min-width: 200px"
            >
            </v-select>

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
            <p>Maximální velikost jedné fotografie je max <b>10MB</b>.</p>
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

            <v-btn
              :disabled="email == '' || password == '' || password.length < 8"
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

export default {
  mounted(){
    //Připojení databáze
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDt1XVGdBpKqwb1v5zVDb663X-QNw5fvJs',
        authDomain: 'carrate.firebaseapp.com',
        projectId: 'carrate',
        storageBucket: "carrate.appspot.com",
      });
    }else { firebase.app();}
  },
  data() {
    return {
      e6: 1,
      files: [],
      info: "",
      text: "",
      email: "",
      password: "",
      owner: "",
      show: false,
      sumbit: false,
      firebaseImages: [],
      maxFileSize: 10000000,

      rules: {
        required: (value) => !!value || "Nutné vyplnit.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Neplatný e-mail.";
        },
      },

      selectedManufacturer: { manu: "Alfa Romeo", value: "0" },
      selectedModel: "",

      manufacturers: [
        { manu: "Alfa Romeo", value: "0" },
        { manu: "Audi", value: "1" },
        { manu: "BMW", value: "2" },
        { manu: "Bugatti", value: "3" },
        { manu: "Cadillac", value: "4" },
        { manu: "Caterham", value: "5" },
        { manu: "Citroën", value: "6" },
        { manu: "Dacia", value: "7" },
        { manu: "Dodge", value: "8" },
        { manu: "Ferrari", value: "9" },
        { manu: "Fiat", value: "10" },
        { manu: "Ford", value: "11" },
        { manu: "Hummer", value: "12" },
        { manu: "Hyundai", value: "13" },
        { manu: "Chevrolet", value: "14" },
        { manu: "Chrysler", value: "15" },
        { manu: "Isuzu", value: "16" },
        { manu: "Iveco", value: "17" },
        { manu: "Jaguar", value: "18" },
        { manu: "Jeep", value: "19" },
        { manu: "Kia", value: "20" },
        { manu: "KTM", value: "21" },
        { manu: "Lada", value: "22" },
        { manu: "Lamborghini", value: "23" },
        { manu: "Lancia", value: "24" },
        { manu: "Land Rover", value: "25" },
        { manu: "Lexus", value: "26" },
        { manu: "Lotus", value: "27" },
        { manu: "Mahindra", value: "28" },
        { manu: "Maserati", value: "29" },
        { manu: "Mazda", value: "30" },
        { manu: "McLaren", value: "31" },
        { manu: "Mercedes", value: "32" },
        { manu: "MG", value: "33" },
        { manu: "Mini", value: "34" },
        { manu: "Mitsubishi", value: "35" },
        { manu: "Nissan", value: "36" },
        { manu: "Opel", value: "37" },
        { manu: "Peugeot", value: "38" },
        { manu: "Porsche", value: "39" },
        { manu: "Renault", value: "40" },
        { manu: "Rover", value: "41" },
        { manu: "Saab", value: "42" },
        { manu: "Seat", value: "43" },
        { manu: "Smart", value: "44" },
        { manu: "Subaru", value: "45" },
        { manu: "Suzuki", value: "46" },
        { manu: "Škoda", value: "47" },
        { manu: "Toyota", value: "48" },
        { manu: "Volkswagen", value: "49" },
        { manu: "Volvo", value: "50" },
      ],

      models: [
        [
          { name: "147", value: "147" },
          { name: "156", value: "156" },
          { name: "159", value: "159" },
          { name: "166", value: "166" },
        ],
        [{ name: "A3", value: "a3" }],
        [{ name: "E46", value: "e46" }],
      ],
    };
  },
  methods: {
    getModels() {
      let result = [];
      this.models[this.selectedManufacturer.value].forEach((element) => {
        result.push(element);
      });
      return result;
    },
    async addItemToFirestore(){
      var db = firebase.firestore();

      //Přidání do databáze
      const docRef = db.collection('cars').doc();

      await docRef.set({
        email: this.email,
        info: this.info,
        manu: this.selectedManufacturer.manu,
        model: this.selectedModel.name,
        files: this.firebaseImages,
        owner: this.owner,
      }).then(() => {
        alert("Vaše auto bylo úspěšně přidáno!")
        this.$router.push("/car/" + docRef.id);
      });
    },
    async uploadImagesToFirestore(){
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
      .then((url) => {
        console.log(`All success`);
        this.addItemToFirestore();
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message)
      });

      return this.firebaseImages;
    },
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
