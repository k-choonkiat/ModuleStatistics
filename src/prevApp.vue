/* eslint-disable */
<template>
  <div>

    <v-app>
      <v-content>  
        
        <v-container fluid grid-list-xl  ma-0 pa-1>
          <v-layout row justify-end>
            <!-- {{module1}} -->
            <v-btn v-if="component2==null" v-on:click="component2='module-statistic2'">I want to compare against another module</v-btn>
            <!-- <chartjs-radar :datalabel="'TestDataLabel'" :labels="['happy','myhappy','hello']" :data="[100,40,60]"></chartjs-radar>
            <chartjs-line></chartjs-line> -->
            <input v-model="module2" placeholder="e.g. BT3103" v-if="component2">
            <v-btn v-if="component2" v-on:click="displayModule2">GO</v-btn>
          </v-layout>
          <v-layout row wrap pa-2>
            
            
            <v-flex xs6>
              <v-card height=100% >
              <component 
              v-bind:is ="component" 
              v-bind:histData_1="histData[0]" 
              v-bind:radar_data_pos_1="radar_data_pos_1" 
              v-bind:radar_data_neg_1="radar_data_neg_1"
              v-bind:show_1="show_1"
              v-bind:pie_data_1="pie_data_1"
              >  
              </component>
              </v-card>
              
            </v-flex>
            <!-- <v-divider vertical></v-divider> -->
            <v-flex xs6>
              <v-card height=100% >
              <component 
              v-bind:is ="component2"
              v-bind:histData_2="histData[1]" 
              v-bind:radar_data_pos_2="radar_data_pos_2" 
              v-bind:radar_data_neg_2="radar_data_neg_2"
              v-bind:show_2="show_1"
              v-bind:pie_data_2="pie_data_2"
              > 
              </component>
              </v-card>
            </v-flex>
            
            <!-- <component v-bind:is ="component3" : > </component> -->
          </v-layout>
            
            <v-flex v-if ="component2!=null">
              <component 
              v-bind:is="component3"
              v-bind:module1_properties="module1_properties"
              v-bind:module2_properties="module2_properties"
              v-bind:module1_pros="module1_pros"
              v-bind:module2_pros="module2_pros"
              v-bind:module1_cons="module1_cons"
              v-bind:module2_cons="module2_cons"
              v-bind:show_1="show_1"
              > 
              </component>  </v-flex>
        </v-container>
      </v-content>
    </v-app>
      <button v-if="component2==null" v-on:click="component2='module-statistic2'">I want to compare against another module</button>
      <!-- <button v-on:click="component3 = 'module-comparator'">What should I take?</button> -->
    
  </div>
</template>

<script>
import { db } from "./firebase";
import ModuleStatistic from "./components/ModuleStatistic.vue";
import ModuleStatistic2 from "./components/ModuleStatistic2.vue";
import ModuleComparator from "./components/ModuleComparator.vue";

// import { seRef } from "./firebase";
//import { db } from "./firebase";
//import VueChartKick from "vue-chartkick";

export default {
  name: "App",
  //prop:['test'],
  components:{
      'module-statistic': ModuleStatistic,
      'module-statistic2': ModuleStatistic2,
      'module-comparator': ModuleComparator
  },
  data() {
    return {
        show_1: true,
        component: "module-statistic",
        component2: null,
        component3: "module-comparator",
        module1: "ACC2002",
        pie_data_1:[],
        module1_properties: {
          std: null,
          mean: null,
          median: null,
          SU: null,
          webcast: null,
          rating: null,
          feedback_pos:{},
          feedback_neg:{},
          composition:{
            "SOC":{
              "number": 0,
              "CAP": 0,
            },
            "Business":{
              "number": 0,
              "CAP": 0,
            },
            "Engineering":{
              "number": 0,
              "CAP": 0,
            },
            "SDE":{
              "number": 0,
              "CAP": 0,
            },
            "FASS":{
              "number": 0,
              "CAP": 0,
            },
            "Science":{
              "number": 0,
              "CAP": 0,
            }
          },

        },
        module1_pros:{},
        module1_cons:{},
        module2: null,
        pie_data_2:[],
        module2_properties: {
          std: null,
          mean: null,
          median: null,
          SU: null,
          webcast: null,
          rating: null,
          feedback_pos:{},
          feedback_neg:{},
          composition:{
            "SOC":{
              "number": 0,
              "CAP": 0,
            },
            "Business":{
              "number": 0,
              "CAP": 0,
            },
            "Engineering":{
              "number": 0,
              "CAP": 0,
            },
            "SDE":{
              "number": 0,
              "CAP": 0,
            },
            "FASS":{
              "number": 0,
              "CAP": 0,
            },
            "Science":{
              "number": 0,
              "CAP": 0,
            }
          }
        },
        module2_pros:{},
        module2_cons:{},
        test: "penis",
        histData:[],
        //histData:null,
        radar_data_pos_1: {
        labels: [],
        datasets: [
                {
                label: 'What students liked about the module',
                backgroundColor: 'rgba(24,83,80,.3)',
                data: []
                },
                
            ]
        },
      radar_data_neg_1: {
        labels: [],
        datasets: [
                
                {
                label: 'What students did not like about the module',
                backgroundColor: 'rgba(80,10,10,.3)',
                data: []
                }
            ]
        },
      radar_data_pos_2: {
      labels: [],
      datasets: [
              {
              label: 'What students liked about the module',
              backgroundColor: 'rgba(24,83,80,.3)',
              data: []
              },
              
          ]
      },
      radar_data_neg_2: {
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
  async mounted(){
    console.log("run")
    
    this.get_radar_data_1(this.module1);
    await this.show_final_marks(this.module1,0);
    this.get_pie_1();
    
    
    // this.show_final_marks(module2);
    // this.show_final_marks(this.module2,1);
    // this.get_radar_data_2(this.module2);

  },
  methods: {
    async get_pie_1(){
      var dic = this.module1_properties["composition"];
      var keys = Object.keys(dic);
      for(var i = 0; i<keys.length; i++){
        var key = keys[i];
        this.pie_data_1.push([key,dic[key]["number"],]);
      }
      console.log("pie pie")
      console.log(this.pie_data_1);
    },
    async displayModule2(){
      
      await this.get_radar_data_2(this.module2);
      await this.show_final_marks(this.module2,1);
      await this.get_pie_2();
      this.compare_Mod()
    },
    async get_pie_2(){
      var dic = this.module2_properties["composition"];
      var keys = Object.keys(dic);
      for(var i = 0; i<keys.length; i++){
        var key = keys[i];
        this.pie_data_2.push([key,dic[key]["number"],]);
      }
      console.log("pie pie2")
      console.log(this.pie_data_2);
    },
    
    
    rerender() {
      this.show_1 = false;
      this.$nextTick(() => {
        this.show_1 = true;
        // eslint-disable-next-line
        console.log("re-render start");
        this.$nextTick(() => {
          // eslint-disable-next-line
          console.log("re-render end");
        });
      });
    },
    async initate(){
      console.log("initiate data");
      await this.show_final_marks();
      await this.get_radar_data();
    },
    compare_Mod(){
        // var stats = ['std','SU','webcast','rating']
        // var stats = ['std','SU','webcast','rating']
        console.log("comparing modules")
        var stats = ['std','SU','webcast']
        for (var i=0;i<stats.length;i++){
            var key = [stats[i]];
            var val_1 = this.module1_properties[key];
            var val_2 = this.module2_properties[key];
            if(val_1 > val_2){
                this.module1_pros[key]=val_1;
            }else{
                this.module1_pros[key]=val_2;
            }
        }
        var dict = this.module1_properties["feedback_pos"];
        console.log(dict)
        var labels = Object.keys(dict);
        for(var j = 0; j<labels.length; j++){
            var key_fp = labels[j];
            if(dict[key_fp]>5){
                this.module1_pros[key_fp]=true;
            }
        }
        dict = this.module1_properties["feedback_neg"];
        labels = Object.keys(dict);
        for(j = 0; j<labels.length; j++){
            key_fp = labels[j];
            if(dict[key_fp]>5){
                this.module1_cons[key_fp]=true;
            }
        }
        dict = this.module2_properties["feedback_pos"];
        labels = Object.keys(dict);
        for(j = 0; j<labels.length; j++){
            key_fp = labels[j];
            if(dict[key_fp]>5){
                this.module2_pros[key_fp]=true;
            }
        }
        dict = this.module2_properties["feedback_neg"];
        labels = Object.keys(dict);
        for(j = 0; j<labels.length; j++){
            key_fp = labels[j];
            if(dict[key_fp]>5){
                this.module2_cons[key_fp]=true;
            }
        }
        console.log(this.module1_pros);
        this.rerender();
    },
    async get_radar_data_1(selected_mod){
      console.log("get radar data 1")
      let data = await db
        .ref("/mf/data")
        .once("value")
        .then(function(snapshot) {
          var d = snapshot.val();
          return d;
        });

      var datakeys = Object.keys(data);
      var mapping_pos = {};
      var mapping_neg = {}
      for (var i = 0; i < data.length; i++) {
        var key = datakeys[i];
        //console.log(typeof this.selected_mod);
        var val_pos = data[key]["m4"];
        var val_neg = data[key]["m5"];
        var mod = data[key]["mod_class_id"];
        // console.log(mod)
        if (new String(mod).valueOf() == new String(selected_mod).valueOf()) {
          //count += 1;
          // console.log(mod)
          if (mapping_pos[val_pos] != null) {
            
            mapping_pos[val_pos] = mapping_pos[val_pos] + 1;
          } else {
            this.radar_data_pos_1.labels.push(val_pos);
            mapping_pos[val_pos] = 1;
          }
          if (mapping_neg[val_neg] != null) {
            mapping_neg[val_neg] = mapping_neg[val_neg] + 1;
          } else {
            this.radar_data_neg_1.labels.push(val_neg)
            mapping_neg[val_neg] = 1;
          }
          // console.log(hist)
        }
        //console.log("gg")
      }
      
      for(var label in this.radar_data_pos_1.labels){
        // console.log(this.radar_data_pos_1.labels[label]);
        this.radar_data_pos_1.datasets[0].data.push(mapping_pos[this.radar_data_pos_1.labels[label]]);
      }
      for(var label_neg in this.radar_data_neg_1.labels){
        this.radar_data_neg_1.datasets[0].data.push(mapping_neg[this.radar_data_neg_1.labels[label_neg]]);
      }

      this.module1_properties["feedback_pos"]=mapping_pos;
      console.log("current feedback pos 1")
      console.log(this.module1_properties["feedback_pos"])
      this.module1_properties["feedback_neg"]=mapping_neg;
      // this.radar_data_pos.datasets[0].data=values_pos;
      console.log("new radar data")
      console.log(this.radar_data_pos_1.datasets[0].data);
      // this.radar_data_neg.datasets[0].data=values_neg;
      this.show=true;
      // console.log(this.radar_data_neg_1)
      this.rerender();
      // this.radar_data_pos.update()

        
    },
    async get_radar_data_2(selected_mod){
      console.log("get radar data 2")
      let data = await db
        .ref("/mf/data")
        .once("value")
        .then(function(snapshot) {
          var d = snapshot.val();
          return d;
        });

      var datakeys = Object.keys(data);
      var mapping_pos = {};
      var mapping_neg = {}
      for (var i = 0; i < data.length; i++) {
        var key = datakeys[i];
        //console.log(typeof this.selected_mod);
        var val_pos = data[key]["m4"];
        var val_neg = data[key]["m5"];
        var mod = data[key]["mod_class_id"];
        // console.log(mod)
        if (new String(mod).valueOf() == new String(selected_mod).valueOf()) {
          //count += 1;
          // console.log(mod)
          if (mapping_pos[val_pos] != null) {
            
            mapping_pos[val_pos] = mapping_pos[val_pos] + 1;
          } else {
            this.radar_data_pos_2.labels.push(val_pos);
            mapping_pos[val_pos] = 1;
          }
          if (mapping_neg[val_neg] != null) {
            mapping_neg[val_neg] = mapping_neg[val_neg] + 1;
          } else {
            this.radar_data_neg_2.labels.push(val_neg)
            mapping_neg[val_neg] = 1;
          }
          // console.log(hist)
        }
        //console.log("gg")
      }
      this.module2_properties["feedback_pos"]=mapping_pos;
      this.module2_properties["feedback_neg"]=mapping_neg;
      for(var label in this.radar_data_pos_2.labels){
        // console.log(this.radar_data_pos_2.labels[label]);
        this.radar_data_pos_2.datasets[0].data.push(mapping_pos[this.radar_data_pos_2.labels[label]]);
      }
      for(var label_neg in this.radar_data_neg_2.labels){
        this.radar_data_neg_2.datasets[0].data.push(mapping_neg[this.radar_data_neg_2.labels[label_neg]]);
      }
      // this.radar_data_pos.datasets[0].data=values_pos;
      console.log("new radar data")
      console.log(this.radar_data_pos_2.datasets[0].data);
      // this.radar_data_neg.datasets[0].data=values_neg;
      this.show=true;
      console.log(this.radar_data_neg_2)
      this.rerender();
      // this.radar_data_pos.update()

        
    },
    
    async show_final_marks(selected_mod,pos) {
      // eslint-disable-next-line
      // console.log("help");
      // console.log(this.radar_data_neg)
      let data = await db
        .ref("/se/data")
        .once("value")
        .then(function(snapshot) {
          var d = snapshot.val();
          return d;
        });
      // eslint-disable-next-line
      console.log(selected_mod);
      // console.log(data)
      var datakeys = Object.keys(data);
      // console.log(datakeys)
      var hist = {};
      var values = [];
      var total = 0;
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        // console.log(key);
        var key = datakeys[i];
        //console.log(typeof this.selected_mod);
        var val = data[key]["final_marks"];
        var mod = data[key]["ModuleCode"];
        // console.log(mod)
        
        
        if(new String(mod).valueOf() == new String(selected_mod).valueOf()){
          // this.std = data[key]["final_marks_std"];
          if(this.module1_properties["std"]==null || this.module1_properties["webcast"]==null){
            this.module1_properties["std"]=data[key]["final_marks_std"];
            this.module1_properties["webcast"]=data[key]["Webcast"];
            
          }
          if(pos==0){
            
            this.module1_properties["SU"]=this.module1_properties["SU"]+data[key]["SU"];
            // console.log(data[key]["Faculty"]);
            this.module1_properties["composition"][data[key]["Faculty"]]["number"]=this.module1_properties["composition"][data[key]["Faculty"]]["number"]+1;

            
          }else{
            this.module2_properties["std"]=data[key]["final_marks_std"];
            this.module2_properties["SU"]=this.module2_properties["SU"]+data[key]["SU"];
            this.module2_properties["composition"][data[key]["Faculty"]]["number"]=this.module2_properties["composition"][data[key]["Faculty"]]["number"]+1;
          }
        }
        if (val > 0 & (new String(mod).valueOf() == new String(selected_mod).valueOf())) {
          total+= val;
          count += 1;
          val = Math.ceil(val / 5) * 5;
          
          if (hist[val] != null) {
            hist[val] = hist[val] + 1;
          } else {
            hist[val] = 1;
            values.push(val);
          }
          // console.log(hist)
        }
        //console.log("gg")
      }
      if(pos==0){
        this.module1_properties["mean"]=total/count;
      }else{
        this.module2_properties["mean"]=total/count;
      }
      // this.mean = total/count;
      values.sort();
      // eslint-disable-next-line
      // console.log(values);
      var sorted_hist = {};
      for (var j = 0; j < values.length; j++) {
        sorted_hist[values[j]] = hist[values[j]];
        if(j == Math.floor(values.length/2)){
          if(pos==0){
            this.module1_properties["median"]=val;
          }else{
            this.module2_properties["median"]=val;
          }
        }
        //console.log(sorted_hist);
      }
      //console.log("test");
      // console.log(this.std);
      this.histData[pos]=sorted_hist;
      //this.histData = {1:2};
      // eslint-disable-next-line
      // console.log("hist data here")
      // console.log(this.histData);
      console.log(this.module1_properties);
      this.show = true;
      // this.get_radar_data_1();
      // this.rerender();
    }
  }
  // async mounted() {
  //   this.show_final_marks();
  // }
};

// next is to add filters, so that can display information by module
</script>

<style>
.flexbox-container {
  display: flex;
  /* flex-basis: 50% */
}
</style>