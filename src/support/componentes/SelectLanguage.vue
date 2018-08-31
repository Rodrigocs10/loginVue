<template>
<span>
    <v-badge >        
        <v-avatar size="36">
            <a href="#" @click="setLocalization('us')">
                <flag iso="us" style="font-size:25px"  />
            </a>
        </v-avatar>
      </v-badge>
      <v-badge>
        <v-avatar size="36">
            <a href="#" @click="setLocalization('es')">
            <flag iso="es" style="font-size:25px"  />
            </a>
        </v-avatar>
      </v-badge>
      <v-badge>        
        <v-avatar size="36">
        <a href="#" @click="setLocalization('br')">
          <flag iso="br" style="font-size:25px"  />
        </a>
        </v-avatar>
      </v-badge>
</span>
</template>
<script>

import { mapGetters } from "vuex";

  export default {
    name: 'SelectLanguage',    
    methods:{
        setLocalization:function(p_localization){            
        //     this.$store.dispatch("setLocalization", {
        //         localization: p_localization
        //   });
        this.$validator.localize(p_localization);    
          this.$validator.reset()
        }
    },
//     computed: {
//       //...mapGetters(["getLocalization"])
//       getLocalization(){          
//           console.log("Getting state localization" ,this.$store.state.localization)
//           return this.$store.state.localization
//       }
//     },
//     watch:{        
//         getLocalization(oldLocalization, newLocalization){
//             console.log(newLocalization)
//             this.$validator.localize(newLocalization);    
//         }
//   }
  }
</script>