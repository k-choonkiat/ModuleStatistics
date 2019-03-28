<template>
  <div>
      <keep-alive>
            <component v-bind:is ="module-statistic"> </component>
      </keep-alive>
      <!-- <component v-bind:is ="component2"> </component> -->
      <!-- <component v-bind:is ="component3"> </component> -->
    
      <!-- <button v-on:click="component2='module-statistic2'">I want to compare against another module</button> -->
      <!-- <button v-on:click="component3 = 'module-comparator'">What should I take?</button> -->
    
  </div>
</template>

<script>
import ModuleStatistic from "./components/ModuleStatistic.vue";
// import ModuleStatistic2 from "./components/ModuleStatistic2.vue";
// import ModuleComparator from "./components/ModuleComparator.vue";

// import { seRef } from "./firebase";
import { db } from "./firebase";
//import VueChartKick from "vue-chartkick";

export default {
  name: "App",
  components:{
      'module-statistic': ModuleStatistic,
    //   'module-statistic2': ModuleStatistic2,
    //   'module-comparator': ModuleComparator
  },
  data() {
    return {
        component: "module-statistic",
        component2: null,
        component3: null
    };
  },
  methods: {
    rerender() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        // eslint-disable-next-line
        console.log("re-render start");
        this.$nextTick(() => {
          // eslint-disable-next-line
          console.log("re-render end");
        });
      });
    },
    
    async show_final_marks() {
      // eslint-disable-next-line
      // console.log("help");
      let data = await db
        .ref("/se/data")
        .once("value")
        .then(function(snapshot) {
          var d = snapshot.val();
          return d;
        });
      console.log(this.selected_mod);
      var datakeys = Object.keys(data);
      var hist = {};
      var values = [];
      var total = 0;
      var count = 0;
      for (var i = 0; i < datakeys.length; i++) {
        // console.log(key);
        var key = datakeys[i];
        //console.log(typeof this.selected_mod);
        var val = data[key]["final_marks"];
        var mod = data[key]["module_code"];
        
        
        if(new String(mod).valueOf() == new String(this.selected_mod).valueOf()){
          this.std = data[key]["final_marks_std"];
        }
        if (val > 0 & (new String(mod).valueOf() == new String(this.selected_mod).valueOf())) {
          total+= val;
          count += 1;
          val = Math.ceil(val / 5) * 5;
          if (hist[val] != null) {
            hist[val] = hist[val] + 1;
          } else {
            hist[val] = 1;
            values.push(val);
          }
        }
      }
      this.mean = total/count;
      values.sort();
      // eslint-disable-next-line
      // console.log(values);
      var sorted_hist = {};
      for (var j = 0; j < values.length; j++) {
        sorted_hist[values[j]] = hist[values[j]];
        if(j == Math.floor(values.length/2)){
          this.median = val;
        }
        //console.log(sorted_hist);
      }
      //console.log("test");
      //console.log(hist);
      this.chartData = sorted_hist;
      //this.chartData = {1:2};
      // eslint-disable-next-line
      console.log(this.chartData);
      this.show = true;
      //sthis.rerender();
    }
  }
  // async mounted() {
  //   this.show_final_marks();
  // }
};

// next is to add filters, so that can display information by module
</script>
