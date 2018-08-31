<template>
<v-icon class="blue--text" x-large v-if="votosSim > votosNao">thumb_up_alt</v-icon>		        
<v-icon class="red--text"  x-large v-else-if="votosSim < votosNao">thumb_down_alt</v-icon>		        
<v-icon class="gray--text" x-large v-else>remove</v-icon>		        
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