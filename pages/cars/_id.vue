<template>
  <v-app>
    <v-container id="main_container">
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">Audi A3</h1>
        <v-spacer></v-spacer>
        <p>ID: {{this.$route.params.id}}</p>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-layout column>
            <v-flex >
              <img style="width: 100%;" src="https://audimediacenter-a.akamaihd.net/system/production/media/90567/images/72391bd2d21a80a761f0df1bd5bff197d5804daa/A201895_blog.jpg?1583155437" alt="">
            </v-flex>
            <v-flex text-center>
              <img style="width: 147px;" src="https://audimediacenter-a.akamaihd.net/system/production/media/90567/images/72391bd2d21a80a761f0df1bd5bff197d5804daa/A201895_blog.jpg?1583155437" alt="">
              <img style="width: 147px;" src="https://audimediacenter-a.akamaihd.net/system/production/media/90567/images/72391bd2d21a80a761f0df1bd5bff197d5804daa/A201895_blog.jpg?1583155437" alt="">
              <img style="width: 147px;" src="https://audimediacenter-a.akamaihd.net/system/production/media/90567/images/72391bd2d21a80a761f0df1bd5bff197d5804daa/A201895_blog.jpg?1583155437" alt="">
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <h3>Rok výroby: 2004</h3>
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
