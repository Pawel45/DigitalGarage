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
        label="e-mail:"
        style="min-width: 200px"
        > 
        </v-text-field>
        </v-flex>
        <v-flex>
          <v-btn>Ukázat vozidla</v-btn>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');

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

  .head_title{
    font-family: 'Montserrat', sans-serif !important;
    font-size: 48px;
    font-weight: 800;
  }

  @media (max-width: 600px){
    .head_title{
      font-size: 24px;
      text-align: center;
    }
    .fl1{
      justify-content: center;
    }
  }

</style>
