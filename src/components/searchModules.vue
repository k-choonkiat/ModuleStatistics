<template>
  <div id="show-modules">
    <h1>NUS Modules</h1>
    <input type= "text" v-model="search" placeholder="search modules"/>
    <div v-for="module in filteredModules" :key="module.id" class="single-module">
      <!--  <router-link :to="'/module/'+module['.key']"> <h2>{{ module[".key"] }} </h2> </router-link> -->
      <router-link :to="'/module/'+module.ModuleCode"> <h2>{{ module.ModuleCode }} </h2> </router-link>
      <h2>{{module.ModuleTitle}}</h2>
      <article>
        <p>Department: {{module.Department}}</p>
        <p>Module Credit: {{module.ModuleCredit}}</p>
        <p>Webcast: {{module.Webcast}}</p>
        <p>SU: {{module.SU}}</p>
      </article>
    </div>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld'
// import {db} from "@/firebase.js"
// import {seRef} from '@/firebase.js'
import {modsInfo} from '@/firebase.js'
export default {
  name: 'searchModules',
  components: {
    HelloWorld
  },
  firebase: {
    // modules: seRef
    modules: modsInfo
  },
  data () {
    return {
      search: '',
      test: 123
    }
  },
  computed: {
    filteredModules: function () {
      // console.log(this.modules)
      return this.modules.filter((module) => {
        // return module['.key'].match(this.search.toUpperCase())
        return module.ModuleCode.match(this.search.toUpperCase())
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#show-modules {
  max-width: 800px;
  margin:0 auto;
}
.single-module {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
</style>