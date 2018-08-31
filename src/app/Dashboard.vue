<template>
  <v-flex xs12 row>
  	<v-layout row wrap>
	  	<v-flex xs12 sm6 md3 pa-2>
				<router-link to="ultimasVotacoes" tag="span">
					<v-card class="elevation-2">
						<v-card-title>
							<v-flex xs6>
								<v-icon class="green--text" size="72">how_to_vote</v-icon>
							</v-flex>
						<v-flex xs6 class="text-xs-right">
							<h3 class="display-2 grey--text">22</h3>
							<h6 class="caption grey--text text--lighten-1">Enquetes</h6>
						</v-flex>
						</v-card-title>
						<v-divider></v-divider>
						<v-card-actions>
							<div class="body-1 grey--text text--lighten-1">ANO</div>
						</v-card-actions>
					</v-card>
				</router-link>
	    </v-flex>
	    <v-flex xs12 sm6 md3 pa-2>
				<router-link to="usuarios" tag="span">
					<v-card class="elevation-2">
						<v-card-title>
							<v-flex xs6>
								<v-icon class="amber--text" size="72">person</v-icon>
							</v-flex>
						<v-flex xs6 class="text-xs-right">
							<h3 class="display-2 grey--text">{{quantidadeUsuarios}}</h3>
							<h6 class="caption grey--text text--lighten-1">Usuários</h6>
						</v-flex>
						</v-card-title>
						<v-divider></v-divider>
						<v-card-actions>
							<div class="body-1 grey--text text--lighten-1">22</div>
						</v-card-actions>
					</v-card>
				</router-link>
	    </v-flex>
	    <v-flex xs12 sm6 md3 pa-2>
	      <v-card class="elevation-2">
	        <v-card-title>
	          <v-flex xs6>
	          	<v-icon class="deep-orange--text" size="72">attach_money</v-icon>
	          </v-flex>
	    	  <v-flex xs6 class="text-xs-right">
		        <h3 class="display-2 grey--text">95K</h3>
		        <h6 class="caption grey--text text--lighten-1">Revenue</h6>
	    	  </v-flex>
	        </v-card-title>
	        <v-divider></v-divider>
	        <v-card-actions>
	          <div class="body-1 grey--text text--lighten-1">THIS MONTH</div>
	        </v-card-actions>
	      </v-card>
	    </v-flex>
	    <v-flex xs12 sm6 md3 pa-2>
	      <v-card class="elevation-2">
	        <v-card-title>
	          <v-flex xs6>
	          	<v-icon class="pink--text" size="72">work_outline</v-icon>
	          </v-flex>
	    	  <v-flex xs6 class="text-xs-right">
		        <h3 class="display-2 grey--text">4K</h3>
		        <h6 class="caption grey--text text--lighten-1">Bookings</h6>
	    	  </v-flex>
	        </v-card-title>
	        <v-divider></v-divider>
	        <v-card-actions>
	          <div class="body-1 grey--text text--lighten-1">THIS WEEK</div>
	        </v-card-actions>
	      </v-card>
	    </v-flex>
    </v-layout>
    </v-flex>
</template>
        
<script>

import axios from "axios";

  export default {
    name: 'Dashboard',
    data () {
      return {
        quantidadeUsuarios: null
			}
		},
			methods:{
				getQuantidadeUsuarios:function(){
					axios.get('/usuarios/count').then(res =>
					{
						this.quantidadeUsuarios = res.data
					})
				}
    },
    created: function(){
			this.$root.breadcrumbs = []
			this.getQuantidadeUsuarios()
    }
  }
</script>
