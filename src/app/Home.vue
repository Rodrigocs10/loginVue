<template>
  <div>
    <header-section></header-section>
    <v-content>
      <v-container fluid>
        <v-layout row wrap>        
          <breadcrumbs v-if="$root.breadcrumbs.length"></breadcrumbs>            
            <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-layout>
      </v-container>
    </v-content>
    <footer-section></footer-section>
  </div>
</template>

<script>
  import Breadcrumbs from 'Support/componentes/partials/Breadcrumbs'
  import Header from 'Support/componentes/partials/Header'
  import Footer from 'Support/componentes/partials/Footer'

  export default {
    name: 'Dashboard',
    data () {
      return {
        
      }
    },
    components: {     
      'breadcrumbs': Breadcrumbs, 
      'header-section': Header,
      'footer-section': Footer
    },    
  }
</script>