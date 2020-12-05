<template>
  <v-app>
    <v-container id="main_container">
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">Přidat Auto</h1>
      </v-layout>
      <v-layout row>
        <h2>hello</h2>
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
