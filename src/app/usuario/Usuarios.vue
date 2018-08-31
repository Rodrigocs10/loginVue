<template>  
    <span :style="{ width: 100 + '%'}">
<form @submit.prevent="save">

  <v-dialog v-model="deleteDialog" max-width="500px">        
        <v-card>
          <v-card-title>
            <span class="headline">Deletar Usuário</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field 
                  v-model="deletedItem.cpfOuCnpj" 
                  :mask="cpfMask"
                  label="CPF"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="deletedItem.nome" label="Nome"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="deletedItem.email" label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                   <v-select
                        v-model="selectedEdit"
                        :items="getPerfis.perfis"                
                        item-text="descricao"
                        item-value="cod"                
                        label="Perfis"
                        multiple                                
                    ></v-select>    
                </v-flex>                
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDeleteDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="deleteUsuario">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </form>
    <v-toolbar class="elevation-0"  >                
        <v-toolbar-items :style="{ width: 100 + '%'}" >            
                <v-select
                v-model="selected"
                :items="getPerfis.perfis"                
                item-text="descricao"
                item-value="cod"                
                label="Perfis"
                multiple                                
                ></v-select>            
            
        </v-toolbar-items>
    </v-toolbar>        
 
        <button type="button" 
            class="btn btn--bottom btn--floating btn--fixed btn--right theme--dark red" 
            style="transform-origin: center center 0px;"
            @click="novoUsuario">
              <div class="btn__content">
                <i aria-hidden="true" class="icon material-icons">add</i>
              </div>
        </button>

    <v-data-table    
        :headers="headers"
        :items="usuarios"
        hide-actions
        class="elevation-1"
    >
    <template slot="items" slot-scope="props">      
        <td class="text-xs-right">{{ props.item.cpfOuCnpj }}</td>      
        <td class="text-xs-left">{{ props.item.nome }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>            
        <td class="text-xs-left">{{ props.item.perfis }}</td>            
        <td class="text-xs-left">{{ props.item.dataCadastro }}</td>      
        <td class="justify-center layout px-0">
          <router-link :to="{ name: 'EditarUsuario', params: { usuario: props.item }}">
            <v-icon
                small
                class="mr-2"                
            >edit</v-icon>
          </router-link>            
            <v-icon
                small
                @click="deleteItem(props.item)"
            >delete</v-icon>
            </td>      
    </template>
  </v-data-table>

    </span>
</template>
        
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { cpfMask } from "Support/mascaras";

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "Dashboard",
  data() {
    return {
      ativo: null,
      titulo: null,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      nome: null,
      email: null,
      cpfOuCnpj: null,
      senha: null,
      usuarios: [],
      selected: [],
      selectedEdit: [],
      strConsulta: null,
      headers: [
        { text: "CPF", value: "CPF" },
        { text: "Nome", value: "nome" },
        { text: "Email", value: "emaiol" },
        { text: "Perfis", value: "perfis" },
        { text: "Data Cadastro", value: "dataCadastro" }
      ],
      dialog: false,
      deleteDialog: false,
      defaultItem: {
        id: 0,
        cpfOuCnpj: "",
        nome: 0,
        email: 0,
        perfis: [],
        dataCadastro: 0
      },
      deletedIndex: -1,
      deletedItem: {
        id: 0,
        cpfOuCnpj: "",
        nome: 0,
        email: 0,
        perfis: [],
        dataCadastro: 0
      },
      cpfMask: cpfMask
    };
  },
  methods: {
    consultarUsuario: function() {
      if (this.selected.length !== 0) {
        let str = "";
        for (var i = 0; i < this.selected.length; i++) {
          if (i !== 0) {
            str += "&";
          }
          str += "name=" + this.selected[i];
        }
        this.strConsulta = str;
        axios
          .get(
            "/usuarios" +
              (this.strConsulta === null
                ? ""
                : "/listarUsuariosPerfil?" + this.strConsulta)
          )
          .then(res => {
            this.usuarios = res.data;
          });
      } else {
        this.usuarios = [];
      }
    },
    novoUsuario: function() {
      this.$router.replace("novoUsuario");
    },
    deleteItem(item) {
      this.deletedIndex = this.usuarios.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
      setTimeout(() => {
        this.deletedItem = Object.assign({}, this.defaultItem);
        this.deletedIndex = -1;
      }, 300);
    },
    deleteUsuario() {
      if (this.deletedIndex > -1) {
        axios.delete("/usuarios/" + this.deletedItem.id).then(res => {
          this.deleteDialog = false;
          this.consultarUsuario();
        });
      }
    }
  },
  computed: {
    ...mapGetters(["token", "getPerfis"])
  },
  watch: {
    selected() {
      this.consultarUsuario();
    }
  },
  created: function() {
    let iPerfis = this.getPerfis.perfis.map(i => i.cod);
    this.selected = iPerfis;

    this.consultarUsuario();

    this.$root.breadcrumbs = [
      {
        text: "Usuários",
        disabled: true,
        href: "/usuarios"
      },
      {
        text: "Usuário",
        disabled: true
      }
    ];
  }
};
</script>
