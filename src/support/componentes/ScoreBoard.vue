<template>
<span>
    <v-flex xs5>
        <v-container>
            <v-layout>
                <v-icon class="blue--text" medium>thumb_up_alt</v-icon>
                <span class="display-1 grey--text">{{votosSim}}</span>
            </v-layout>
        </v-container>
    </v-flex>
    <v-flex xs5>
        <v-container>
            <v-layout>
                <v-icon class="red--text" medium>thumb_down_alt</v-icon>
                <span class="display-1 grey--text">{{votosNao}}</span>
            </v-layout>
        </v-container>
    </v-flex>
</span>
</template>
<script>
  export default {
    name: 'Breadcrumbs',
    props:{
        votosSim: Number,
        votosNao:Number
        }
  }
</script>