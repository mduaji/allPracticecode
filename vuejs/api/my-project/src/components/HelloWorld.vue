<template>
 <div>
     Name: {{ name }}
     Age: {{ age }}
     Dob: {{ dob }}
 </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name:'Profile',
  computed:{
   ...mapState(['name','age','dob'])
  },
  methods:{
   ...mapMutations(['updateName']),
   ...mapActions(['getUserData'])
  }
}
</script>
<style>

</style>
