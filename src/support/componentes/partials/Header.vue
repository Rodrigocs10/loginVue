<template>
  <div>
    <v-navigation-drawer fixed v-model="drawer" :class="$root.sidebarBg" class="darken-2" dark app>
      <v-toolbar flat dark :class="$root.sidebarBg" class="darken-3">
        <v-list class="pa-0">
          <!-- <router-link to="/dashboard"> -->
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="null" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          <!-- </router-link> -->
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile to="/dashboard">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- Forms controls -->
        <v-list-group prepend-icon="how_to_vote" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>Votações</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/ultimasVotacoes">
            <v-list-tile-content>
              <v-list-tile-title>Últimas Votações</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon></v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile to="novaVotacao">
            <v-list-tile-content>
              <v-list-tile-title>Nova Votação</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon></v-icon>
            </v-list-tile-action>
          </v-list-tile>          
        </v-list-group>
        <!-- Forms controls -->        

        
        <v-list-group prepend-icon="account_circle" v-if="hasRole('ADMIN')">
          <v-list-tile slot="activator">            
            <v-list-tile-content>
              <v-list-tile-title>Administração</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/usuarios">
            <v-list-tile-content>
              <v-list-tile-title>Usuários</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon></v-icon>
            </v-list-tile-action>
          </v-list-tile>                              
        </v-list-group>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app light class="white">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn flat class="hidden-sm-and-down">Link One</v-btn>
      <v-btn flat class="hidden-sm-and-down">Link Two</v-btn> -->
           
      <SelectLanguage />

      <v-badge overlap color="red">
        <small slot="badge">3</small>
        <v-avatar color="transparent red--after" size="36">
          <v-icon light>notifications</v-icon>
        </v-avatar>
      </v-badge>
      <v-badge overlap color="red">
        <small slot="badge">5</small>
        <v-avatar color="transparent red--after" size="36">
          <v-icon light>email</v-icon>
        </v-avatar>
      </v-badge>
      <v-menu bottom left transition="slide-y-transition">
        <v-btn slot="activator" icon>
          <v-icon class="grey--text text--darken-1">account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/settings">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="onLogout">
            <v-list-tile-action>
              <v-icon>lock_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>
  </div>
</template>

<script>

import SelectLanguage from '../SelectLanguage'
import {mapState} from 'vuex'

  export default {
    name: 'Header',
    components:{
      SelectLanguage
    },
    data () {
      return {
        title: 'Condomínio Democrático',                
        drawer: true,
        admins: [
          ['Management', 'people_outline'],
          ['Settings', 'settings']
        ],
        cruds: [
          ['Create', 'add'],
          ['Read', 'insert_drive_file'],
          ['Update', 'update'],
          ['Delete', 'delete']
        ],
        types: [
          ['Headings', 'people_outline'],
          ['Sub Heading', 'settings']
        ]
      };      
    },
    methods:{          
          hasRole:function(profile){            
            return this.user.perfis.includes(profile)

          },
          onLogout() {
             this.$store.dispatch("logout");
          }
        },    
    computed:{
      ...mapState(['user'])
    }
  }
</script>
