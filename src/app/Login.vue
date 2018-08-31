<template>
  <v-app id="inspire">
    <div id="alert" v-if="isSenhaErrada">
    <v-alert :value="true" type="error" transition="slide-y-transition">
      email/senha incorreto!
    </v-alert>
    </div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <select-language />
              </v-toolbar>
              

               <form @submit.prevent="onSubmit" >
                  <v-progress-linear :indeterminate="true" v-if="isLogging"></v-progress-linear>
              <v-card-text>               
                  <v-text-field 
                    id="email"
                      prepend-icon="person" 
                      v-validate="'required|email'"                      
                      name="v_email"
                      label="Email"                       
                      v-model="email"   
                      type="text"
                       >
                  </v-text-field>
                  <span style="color:red">{{ errors.first('v_email') }}</span>
                  <v-text-field 
                      id="password" 
                      prepend-icon="lock"
                       name="password" 
                       label="Senha" 
                       type="password" 
                       v-validate="'required'"                      
                       v-model="password"         
                        >
                  </v-text-field>      
                  <div class="container unauthenticated">
        With Facebook: <a href="/login">click here</a>
    </div>         
                  <span style="color:red">{{ errors.first('password') }}</span>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-card-actions>
               </form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import SelectLanguage from '../support/componentes/SelectLanguage'

import { mapFields } from 'vuex-map-fields';

export default {


  data: () => ({
    drawer: null,    
  }),
  components: {     
      SelectLanguage,
    },  
  methods: {
    onSubmit: function() {
      var postData = {
        email: this.email,
        senha: this.password
      };
     
      
      this.$validator.validateAll().then(result => {
        if(result){
          this.$store.dispatch("login", {
            email: postData.email,
            senha: postData.senha
          });
        }
      }).catch(err => console.log(err));

    }
  },
  computed: {
    ...mapGetters(["isSenhaErrada", "isLogging"]),
    email: {
    get () {
      return this.$store.state.email;
    },
    set (val) {
      this.$store.commit('email', val);
    }
    },
    password: {
    get () {
      return this.$store.state.password;
    },
    set (val) {
      this.$store.commit('password', val);
    }
    }
  
  },
  onReset: function(evt) {
    evt.preventDefault();
    /* Reset our form values */
    this.email = "";

    this.$nextTick(() => {
      this.show = true;
    });
  }
};
</script>