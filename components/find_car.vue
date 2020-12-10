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
                item-text="manu"
                item-value="value"
                label="Značka"
                v-model="selectedManufacturer"
                return-object
                single-line
                dense
                solo
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
              ></v-select>
              <v-btn to="/cars" style="width: 100%">Vyhledat</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex sm6 class="justify-center select_image_flex">
          <div class="select_image"></div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    getModels(index) {
      let result = [];
      this.models[this.selectedManufacturer.value].forEach((element) => {
        result.push(element);
      });
      return result;
    },
  },
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap");

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
    font-size: 24px;
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
  font-family: "Open Sans", sans-serif, Tahoma, Arial;
  font-size: 14px;
}

.title {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 800;
}

.select_image_flex {
  flex-grow: 1 !important;
  max-width: 100%;
}
@media (max-width: 600px) {
  .select_image_flex {
    display: none;
  }
  .search_car {
    justify-content: center;
    text-align: center;
    flex: 1;
    max-width: 100%;
  }
}

.select_image {
  background: url(https://file.kbb.com/kbb/images/Owners/owners-hero-img.png)
      center center / contain no-repeat,
    rgb(43, 81, 149);
  background-position: center center;
  background-repeat: no-repeat;
  height: 100%;
  border-radius: 4px !important;
}
</style>
