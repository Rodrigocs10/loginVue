<template>
  
<v-container fluid grid-list-md>

    <form @submit.prevent="onSubmit">
    <v-text-field
        v-validate="'required|max:100'"
        v-model="nome"
        :counter="100"        
        label="Nome"
        data-vv-name="nome"        
    />    
    <span style="color:red">{{ errors.first('nome') }}</span>
    <v-text-field
        v-validate="'required|email'"
        v-model="email"
        :counter="100"        
        label="Email"
        data-vv-name="email"        
    />    
    <span style="color:red">{{ errors.first('email') }}</span>

    <v-text-field
        v-validate="'required'"
        v-model="cpfOuCnpj"
        :mask="cpfMask"
        :counter="100"                
        label="CPF / CNPJ"
        data-vv-name="cpfOuCnpj"        
    />    
    <span style="color:red">{{ errors.first('cpfOuCnpj') }}</span>

    <v-text-field
        v-validate="'required|max:100'"
        v-model="senha"
        :counter="100"        
        label="Senha"
        type="password" 
        data-vv-name="senha"        
    />    
    <span style="color:red">{{ errors.first('senha') }}</span>

    <v-select
                v-model="selected"
                :items="getPerfis.perfis"                
                item-text="descricao"
                item-value="cod"                
                label="Perfis"
                multiple                                
                ></v-select>            

    <v-btn type="submit">Salvar</v-btn>
    <v-btn @click="cancelar">Cancelar</v-btn>
  </form>
  
</v-container>
    
    
</template>
        
<script>
import axios from 'axios'
import {cpfMask} from 'Support/mascaras'
import { mapGetters } from 'vuex'
import tratarValidacaoServidor from 'Support/util/validacao'

  export default {
    $_veeValidate: {
        validator: 'new'
    },
    name: 'Dashboard',
    data () {
      return {                
        ativo: null,
        titulo:null,
        id: null,
        nome: null,
        email: null,
        cpfOuCnpj: null,
        senha: null,
        confirmacaoSenha: null,
        tipo: null,
        cpfMask: cpfMask,
        selected: [],       
      }
    },
    methods:{
      onSubmit:function(){
        
        // Validação no cliente
        this.$validator.validateAll().then(res => {
          console.log("this.selected", this.selected)
          if(res){
                var postData = {
                nome: this.nome,
                email: this.email,
                cpfOuCnpj: this.cpfOuCnpj,
                tipo: this.tipo,
                senha: this.senha,
                perfis: this.selected                
            };

            if(this.id){
              axios.put("/usuarios/" + this.id ,postData)
                  .then(response => {
                    this.$router.replace("usuarios")
                  }
                ).catch(error => {                    
                    tratarValidacaoServidor(error, this.errors)
              });
            }else{            
              axios.post("/usuarios",postData)
                    .then(response => {
                      this.$router.replace("usuarios")
                    }
                  ).catch(error => {                    
                      tratarValidacaoServidor(error, this.errors)
                });
            }


            // 
          }
        })
       },                      
      cancelar:function(){
          this.$router.replace("usuarios")
      }
    },
    computed:{
      ...mapGetters(["getPerfis"])
    },
    created: function(){
      console.log("this.route.params.usuario", this.$route.params.usuario)
      if(this.$route.params.usuario){
        let usuario = this.$route.params.usuario        
        this.nome = usuario.nome
        this.email = usuario.email
        this.cpfOuCnpj = usuario.cpfOuCnpj
        this.id = usuario.id
        //this.tipo = usuario.tipo        
        //this.perfis =usuario.perfis
        this.selected = []
        
        // Transforma array na forma ['ADMIN', 'CLIENTE] para [1, 2]
        usuario.perfis.forEach(element => {
            this.getPerfis.perfis.forEach(el => {              
              if("ROLE_" + element === el.descricao){
              this.selected.push(el.cod)              
              }
            }
            )
          })          

      }
      
      this.$root.breadcrumbs = [
        {
          text: 'Usuários',
          disabled: true,
          href: '/dashboard'
        },
        {
          text: 'Novo Usuário',
          disabled: true
        }
      ]
    }
  }
</script>
