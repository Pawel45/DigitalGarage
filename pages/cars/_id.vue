<template>
  <v-app>
    <v-container id="main_container" grid-list-md>
      <v-layout row wrap class="pa-2 my-6 fl1">
        <h1 class="head_title">Audi A3</h1>
        <v-spacer></v-spacer>
        <h4>ID: {{ this.$route.params.id }}</h4>
      </v-layout>
      <v-layout row>
        <v-flex hidden-lg-and-up lg7>
          <v-carousel hide-delimiters lg7 height="100%">
            <v-carousel-item
              v-for="(item, i) in images"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex lg7 hidden-md-and-down>
          <img style="width: 100%" :src="myImage" alt="" />
        </v-flex>
        <v-flex lg5 hidden-md-and-down>
          <v-layout column wrap text-center>
            <v-flex align-center>
              <img
                v-for="(item, i) in images"
                :key="i"
                style="width: 150px; margin: 0 5px"
                @mouseover="myImage = item.src"
                :src="item.src"
                alt=""
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <h2>Audi A3, 2.0TDi 103kW</h2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
          accusantium eveniet quaerat maxime dolores! At accusantium suscipit
          cumque dolorum, ipsum sint. Deleniti corrupti, exercitationem
          necessitatibus tenetur repellat ipsa hic obcaecati.
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      myImage:
        "https://static.driveto.cz/images/full/c/e/ce92e7c1-d625-4a62-9a5e-692770a9e352.jpg",
      images: [
        {
          src:
            "https://static.driveto.cz/images/full/c/e/ce92e7c1-d625-4a62-9a5e-692770a9e352.jpg",
        },
        {
          src:
            "https://maxtondesign.com/eng_pl_Front-Splitter-V-1-Audi-S3-8P-FL-8512_2.jpg",
        },
        {
          src: "https://i.ebayimg.com/images/g/9IYAAOSwd9hdk5Zv/s-l400.jpg",
        },
        {
          src: "https://i.ytimg.com/vi/5z0xNPicHpk/maxresdefault.jpg",
        },
      ],
    };
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
</style>
