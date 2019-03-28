<template>
  <v-app>
      <v-content>  
  <div id = "ModuleStatistic">
    <!-- {{module1}} -->
    <!-- <input v-model="selected_mod" placeholder="e.g. BT3103"> <br>
    <v-btn v-on:click="show_final_marks">Display Statistics</v-btn> -->
    <!-- <test v-bind:module1='module1'></test> -->
    
    <line-chart
      v-if="show_1"
      xtitle="Final Marks"
      ytitle="Count"
      :data="histData_1"
      
    >
    </line-chart>
    <div v-if="show_1">
    <radar-chart :chartData="this.radar_data_pos_1"></radar-chart>
    <radar-chart :chartData="this.radar_data_neg_1" ></radar-chart>
    <pie-chart :data="pie_data_1"></pie-chart>
    </div>
    <br />
    <!-- <div v-if="std">Standard deviation is {{ std }}</div>
    <div v-if="std">Mean is {{ mean }}</div>
    <div v-if="std">Median is {{ median }}</div> -->
    <br />
  </div>
   </v-content>
    </v-app>
</template>
<style scoped>
/* h3 {
  margin: 40px 10px 10px;
}
ul {
  list-style-type: circle;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
<script>
//import Chart from "./components/Chart.vue";
// import { seRef } from "./firebase";
import { db } from "../firebase";
import RadarChart from './charts/radarchart.js'
import test from "./test.vue"
// console.log(LineChart)

export default {
  name: "ModuleStatistic",
  props:['module1','module1_properties','radar_data_pos_1','radar_data_neg_1','histData_1','show_1','pie_data_1'],
  components:{
    RadarChart,
    test
  },
  data() {
    return {
      //test: "penis",
      pie_data:[],
      selected_mod: null,
      radar_data_pos: {
        labels: [],
        datasets: [
                {
                label: 'What students liked about the module',
                backgroundColor: 'rgba(24,83,80,.3)',
                data: []
                },
                
            ]
        },
      radar_data_neg: {
        labels: [],
        datasets: [
                
                {
                label: 'What students did not like about the module',
                backgroundColor: 'rgba(80,10,10,.3)',
                data: []
                }
            ]
        }
    };
  },
  methods: {
    get_pie(){
      var dic = this.module1_properties["composition"];
      var keys = Object.keys(dic);
      for(var i = 0; i<keys.length; i++){
        var key = keys[i];
        this.pie_data.push([key,dic[key],]);
      }
      console.log(this.pie_data);
    }
  // mounted() {
  //   this.show_final_marks();
  // }
  }
};

// next is to add filters, so that can display information by module
</script>
