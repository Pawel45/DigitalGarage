<template>
  <v-app>
    <!-- Navigation menu for small devices -->
    <v-navigation-drawer 
      v-model="sideNav" 
      absolute
      left
      temporary>
      <v-list>
        <v-list-item-group
        
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- END -->


    <v-toolbar class="toolbar primary-color">

      <!-- Hamburger menu for small devices -->
      <v-app-bar-nav-icon 
      @click="sideNav = !sideNav"
      class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <!-- END -->

      <v-toolbar-title>
        <nuxt-link to="/">
          <v-img :src="require('@/images/logo.webp')" width="120"/>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
      class="hidden-xs-only"
      v-for="(item, i) in items.slice().reverse()" :key="i">
          <v-btn depressed class="primary-color" style="color: white;" :to="item.to">
            {{ item.text }}
            </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <nuxt/>
    
    <v-footer dark padless>
    <v-card
      flat
      tile
      class="indigo white--text text-center primary-color" style="width:100%;">
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.id"
          class="mx-4 white--text"
          icon>
          <a :href="icon.link" style="text-decoration: none; color: white; ">
            <v-icon size="24px">
            {{ icon.name }}
            </v-icon>
          </a>
          
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Vytvořeno jako maturitní projekt.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Pavel Pel</strong>
      </v-card-text>
    </v-card>
  </v-footer>

  </v-app>
</template>

<script>

export default {
  components: {
    },
  data () {
    return {
      
      sideNav: false,
      items: [
        { text: 'Přidat auto', icon: 'mdi-plus', to: '/cars/add'},
        { text: 'Moje garáž', icon: 'mdi-car', to: '/cars/garage'},
      ],
      icons: [
        {
          name: "mdi-facebook",
          link: "https://www.facebook.com/pavel.pel/",
        },
        {
          name: "mdi-instagram",
          link: "https://www.instagram.com/pavel.pel/",
        },
      ],
      
    }
  }
}
</script>

<style lang="scss" scoped>

@import "assets/variables.scss";
  @media only screen and (min-width: 1264px) {
  .toolbar {
    padding: 0 13% !important;
    flex: 0;
  }
}
  .primary-color{
    background-color: $primary !important;
  }

</style>
