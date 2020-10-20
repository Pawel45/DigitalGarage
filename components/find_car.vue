<template>
  <div id="app">
    <v-container>
      <v-layout row wrap class="pa-2 my-6"> 
        <h1 class="head_title">Vyhledat Auto</h1>
      </v-layout>
      <v-layout row class="search"> 
        <v-flex sm6 class="search_car">
          <v-layout column wrap>
            <v-flex class="pa-3 pt-0">
              <h2 class="title">Vyberte Auto</h2>
            </v-flex>
            <v-flex class="pa-3">
              <p class="description">Get the straight story from our experts and real-world feedback from consumers like you.</p>
            </v-flex>
            <v-flex class="pa-3">
              <v-select
              :items="manufacturers"
              item-text="manu"
              item-value="value"
              label="Značka" 
              v-model="select"
              :hint="`${select.manu}, ${select.value}`"
              persistent-hint
              return-object
              single-line
              dense 
              solo 
          >
              </v-select>
              <v-select
              :items="models[select.value].options" 
              label="Model" 
              dense
              solo 
              v-model="selectedModel" 
              v-if="select != ''">
              </v-select>
              <v-btn style="width:100%">Vyhledat</v-btn>
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
  data(){
    return {
      select: { manu: 'Audi', value: '0' },

      manufacturers: [
        { manu: 'Audi', value: '0' },
        { manu: 'BMW', value: '1' },
        { manu: 'Mercedes', value: '2' },
      ],

      models: [
        {
          manu: "Audi",
          options: [
            "A3",
            "A4"
          ]
        },
        {
          manu: "BMW",
          options: [
            "E36",
            "E46"
          ]
        },


      ],

      selectedManufacturer: "",
      selectedModel: "",
    }
  }
}

</script>

<style lang="css" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');

  #app{
    background-image: url('https://file.kbb.com/kbb/images/PageBackground/SVG/cityscape-2a.svg');
    background-position: bottom;
    background-repeat: repeat-x;
    background-size: 1800px;
    min-height: 400px;
  }

  .head_title{
    font-family: 'Montserrat', sans-serif !important;
    font-size: 60px;
    font-weight: 800;
  }
  
  .search{
    background-color: #2b5195;
    border-radius: 4px;
    min-height: 300px;
    color: white;
  }

  .search_car{
    max-width: 472px;
    padding: 20px;
  }

  .description{
    font-family: "Open Sans",sans-serif,Tahoma,Arial;
    font-size: 14px;
  }

  .title{
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 800;
  }

  .select_image_flex{
    flex-grow: 1 !important; 
    max-width: 100%;
  }
  @media (max-width: 600px) {
    .select_image_flex{
      display: none;
    }
    .search_car{
      justify-content: center;
      text-align: center;
      flex: 1;
      max-width: 100%;
    }
  }

  .select_image{
    background: url(https://file.kbb.com/kbb/images/Owners/owners-hero-img.png) center center / contain no-repeat, rgb(43, 81, 149);
    background-position: center center;
    background-repeat: no-repeat; 
    height: 100%;   
  }
</style>
