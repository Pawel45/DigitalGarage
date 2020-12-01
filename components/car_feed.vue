<template>
  <div>
      <div style="width:100%; background-color: #F2F2F2; padding-bottom: 30px;">
          <v-container grid-list-md id="main_container_car_feed" style="max-width: 70% !important; margin: auto;">
            <v-layout row wrap class="pa-2 my-6 fl1"> 
                <v-spacer></v-spacer>
                <h1 class="head_title">Lidem se líbí</h1>
                <v-spacer></v-spacer>
            </v-layout>
            <v-layout row>
                <v-flex lg3 mb-3>
                    <v-card class="mx-auto" max-width="280">
                    <v-img src="https://www.audi.homeradiatorsreview.com/assets/images/audi-a3-8p-retrofit-1008x624.jpg" height="200px"></v-img>
                    <v-card-title>Audi A3</v-card-title>
                    <v-card-subtitle>2.0TDi 103kW</v-card-subtitle>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#1f3e74" text>Prohlédnout</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex lg3 mb-3>
                    <v-card class="mx-auto" max-width="280">
                    <v-img src="https://www.audi.homeradiatorsreview.com/assets/images/audi-a3-8p-retrofit-1008x624.jpg" height="200px"></v-img>
                    <v-card-title>Audi A3</v-card-title>
                    <v-card-subtitle>2.0TDi 103kW</v-card-subtitle>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#1f3e74" text>Prohlédnout</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex lg3 mb-3>
                    <v-card class="mx-auto" max-width="280">
                    <v-img src="https://www.audi.homeradiatorsreview.com/assets/images/audi-a3-8p-retrofit-1008x624.jpg" height="200px"></v-img>
                    <v-card-title>Audi A3</v-card-title>
                    <v-card-subtitle>2.0TDi 103kW</v-card-subtitle>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#1f3e74" text>Prohlédnout</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex lg3 mb-3>
                    <v-card class="mx-auto" max-width="280">
                    <v-img src="https://www.audi.homeradiatorsreview.com/assets/images/audi-a3-8p-retrofit-1008x624.jpg" height="200px"></v-img>
                    <v-card-title>Audi A3</v-card-title>
                    <v-card-subtitle>2.0TDi 103kW</v-card-subtitle>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#1f3e74" text>Prohlédnout</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row justify-center mt-2>
                <v-btn color="#1f3e74 !important" dark to="cars/add">Přidej si své</v-btn>
            </v-layout>  
        </v-container>
      </div>
  </div>
    
</template>

<script>

export default {

}

</script>

<style lang="css" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');

    .head_title{
        font-family: 'Montserrat', sans-serif !important;
    }

</style>
