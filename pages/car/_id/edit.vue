<template>
  <v-app>
    <v-container id="main_container" grid-list-md>
        <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">Upravit Příspěvek</h1>
        <v-spacer></v-spacer>
        </v-layout>
        <v-stepper v-if="valid" v-model="e6" vertical non-linear style="width: 100%">

        <!-- STEP 1 -->
          <v-stepper-step :complete="e6 > 1" step="1">
            Údaje
            <small></small>
          </v-stepper-step>

          <v-stepper-content step="1" style="min-width: 320px; width: 40%">
            <v-text-field
              v-model="owner"
              label="Jméno (volitelné)"
              style="width: 30%; min-width: 220px"
            ></v-text-field>
            <v-btn
              aria-label="Continue"
              :disabled="owner == ''"
              @click="e6 = 2"
              color="primary"
              >Pokračovat</v-btn
            >
          </v-stepper-content>

        <!-- STEP 2 -->
          <v-stepper-step :complete="e6 > 2" step="2">
            Informace o autě
            <small></small>
          </v-stepper-step>

          <v-stepper-content step="2" style="min-width: 320px; width: 40%">
            <h4 style="margin-bottom: 10px;">Napište vše, co víte o svém vozidle.</h4>
            <p><i>Rok výroby, tachometr, objem, výkon, výbava..</i></p>
            <v-textarea v-model="info" label="Informace"></v-textarea>
            <v-btn
              aria-label="Continue"
              @click="e6 = 3"
              color="primary"
              >Pokračovat</v-btn
            >
            <v-btn @click="e6 = 1" text aria-label="Back">Zpět</v-btn>
          </v-stepper-content>

          <!-- STEP 3 -->
          <v-stepper-step :complete="e6 > 3" step="3"
            >Vyberte fotografie auta</v-stepper-step
          >

          <v-stepper-content step="3">
            <p v-if="files != ''"><b>Kliknutím</b> na fotografii ji <b>smažete</b>.</p>
            <img
            v-for="(item, i) in files"
            :key="i"
            style="width: 150px; margin: 0 5px; border: 1px black solid; cursor: pointer;"
            @click="deleteImg(i)"
            :src="item"
            alt=""
            />

            <h4 class="mt-5 mb-3">Přidání fografií</h4>
            <p>Maximální velikost jednoho souboru je maximálně <b>10MB</b>.</p>
            <v-file-input
              v-model="newFiles"
              multiple
              show-size
              small-chips
              accept="image/*"
              prepend-icon="mdi-camera"
              truncate-length="36"
              style="width: 30%; min-width: 220px"
            ></v-file-input>

            <v-btn @click="uploadImagesToFirestore()" color="primary" aria-label="Continue"
              >Upravit</v-btn
            >
            <v-btn @click="e6 = 2" text aria-label="Back">Zpět</v-btn>
          </v-stepper-content>
        </v-stepper>

    <v-layout v-if="!valid" column text-center align-center>
        <v-flex>
          <h3 class="otherText">Zadejte heslo, které jste si ke svému vozidlu vytvořili.</h3>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            v-model="password"
            label="Heslo:"
            style="min-width: 200px"
          >
          </v-text-field>
        </v-flex>
        <v-flex>
          <v-btn class="ma-3" color="#1f3e74 !important" dark @click="editPost()" aria-label="Show"
            >Upravit</v-btn
          >
          <v-btn class="ma-3" color="#cc3a35 !important" dark @click="deletePost()" aria-label="Show"
            >Smazat</v-btn
          >
        </v-flex>
    </v-layout>

    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase';
import bcrypt from 'bcryptjs';

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
            this.id = doc.id;
            this.info = doc.data().info;
            this.files = doc.data().files;
            this.owner = doc.data().owner;
            this.hash = doc.data().hash;

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            this.$router.push("/");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  },
  data(){
      return{
        e6: 1,
        id: "",
        valid: false,
        files: [],
        newFiles: [],
        maxFileSize: 10000000,
        password: "",
        hash: "",
        show: false,
        info: "",
        owner: "",        
      }
  },
  methods: {
      deleteImg(index){
        var fileRef = firebase.storage().refFromURL(this.files[index]); 

        // Delete the file
        fileRef.delete().then(() => {
        // File deleted successfully
        }).catch((error) => {
        // Uh-oh, an error occurred!
        });

        this.files.splice(index, 1);
      },
      async uploadImagesToFirestore(){
        //Upload obrázků
        async function putStorageItem(item, files, maxFileSize) {
            if(item.size < maxFileSize){
            // the return value will be a Promise
            return firebase.storage().ref('images/' + Math.random() + item.name).put(item)
            .then((snapshot) => {
                console.log('One success:', item);
                return snapshot.ref.getDownloadURL().then(downloadURL => {
                    //promise inside promise to get donloadable URL
                    files.push(downloadURL);
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
            this.newFiles.map(item => putStorageItem(item, this.files, this.maxFileSize))
        )
        .then(() => {
            console.log(`All success`);
            this.updatePost();
        })
        .catch((error) => {
            console.log(`Some failed: `, error.message)
        });
      },
      editPost(){
        bcrypt.compare(this.password, this.hash).then((res) => {
            this.valid = res;
        });
      },
      deletePost(){
        bcrypt.compare(this.password, this.hash).then((res) => {
            if(res){
              var db = firebase.firestore();
              for (let index = 0; index < this.files.length; index++) {
                this.deleteImg(index);      
              }
              db.collection("cars").doc(this.id).delete().then(() => {
              console.log("Document successfully deleted!");
              this.$router.push("/");
              }).catch((error) => {
                  console.error("Error removing document: ", error);
              });
            }
        });
      },
      async updatePost(){
        var db = firebase.firestore();
        await db.collection("cars").doc(this.id).update({
            info: this.info,
            owner: this.owner,
            files: this.files,
        })
        .then(() => {
            console.log("Document successfully updated!");
            alert("Vaše auto bylo upraveno!");
            this.$router.push("/car/" + this.id);
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
      },
  },
  components: {},
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500&display=swap');

#app {
  background-color: #f2f2f2;
}

.head_title {
  font-family: "Montserrat", sans-serif !important;
  font-size: 48px;
  font-weight: 800;
}

.otherText{
  font-family: 'Poppins', sans-serif !important;
  font-size: 18px;
  font-weight: 400;
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

#main_container{
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
</style>
