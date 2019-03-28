<template>
  <div id="show-modules">
    <h1>Profile Page</h1>
    <div class='some-page-wrapper'>
      <div class='row'>
        <div class='column'>
          <div class='blue-column'>
            <center><h2>Student Details</h2>
            <img src="~../assets/profile.jpg" width="200" height="220"></center>
            <p> {{ student.Name}} </p>
            <p> {{ student.Year}} </p>
            <p> {{ student.Grad}} </p>
            <p> {{ student.Program}} </p>
          </div>
        </div>
        <div class='column'>
          <div class='green-column'>
            <h2>Graduation Requirements</h2>
            <h3><u>Graduation Progression</u></h3>
            <p><b> &#x25a2; No. of MCs completed: </b>{{totalMC}}/180MCs </p>
            <p><b>&#x25a2; ULR (GEM): </b> {{ sumGEM }}/{{Object.keys(this.student.GradReq.GEM).length.toString()}} Modules &#8594; {{ sumGEM*4 }}MCs/{{Object.keys(this.student.GradReq.GEM).length*4}}MCs</p>
            <p><b> &#x25a2; 1k Modules taken: </b>{{ sumLevel1 }}/{{Object.keys(this.student.GradReq.Level1).length.toString()}} Modules &#8594; {{ sumLevel1*4 }}MCs/{{Object.keys(this.student.GradReq.Level1).length*4}}MCs</p>
            <p><b>&#x25a2; Core Modules taken: </b>{{ sumCore }}/{{Object.keys(this.student.GradReq.Core).length.toString()}} Modules &#8594; {{ sumCore*4 }}MCs/{{Object.keys(this.student.GradReq.Core).length*4}}MCs</p>
            <p><b>&#x25a2; UEs taken: </b>{{ sumUE }}/{{Object.keys(this.student.GradReq.UEM).length.toString()}} Modules &#8594; {{ sumUE*4 }}MCs/{{Object.keys(this.student.GradReq.UEM).length*4}}MCs</p>
            <p><b> &#x25a2; Electives Taken: </b>{{totalElectives}} &#8594; {{ ElectivesMC}}MCs/24MCs</p>
            <ul id="example-1">
              <li>BT4101: {{bt4101Done}} </li>
              <li>List A: {{listA}} Modules</li>
              <li>List B: {{listB}} Modules</li>
              <li>List C: {{listC}} Modules</li>
            </ul>
            <p><b>&#x25a2; Industrial Attachment: </b> {{ iaDone }}</p>
            <ul id="example-1">
              <li>BT4101: {{bt4101Done}} </li>
              <li>List A: {{listA}} Modules</li>
              <li>List B: {{listB}} Modules</li>
              <li>List C: {{listC}} Modules</li>
            </ul>
            <h3><u>Degree Requirements</u></h3>
            <div class="card">
              <div class="card-header"><h3>Degree Requirements List</h3></div>
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Module Code</th>
                      <th>Done</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="module in student.GradReq">
                      <td>{{ module}}</td>
                      <td>{{ module}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './HelloWorld'
// import {db} from "@/firebase.js"
import {seRef} from '@/firebase.js'
export default {
  name: 'searchModules',
  components: {
    // HelloWorld
  },
  firebase: {
    modules: seRef
  },
  data () {
    return {
      student: {
        Name: "Student Name",
        Year: "Year 18/19 Semester 2",
        Grad: "Expected Year of Graduation: 2022",
        Program: "SEP Y2S2 Approved",
        GradReq: {
          GEM: {GEH:0,GEQ:1,GER:1,GES:0, GET:0},
          "Core": {"BT1101":1,"CS1010S":1,"CS1020":1,"CS2010":0,"EC1301":1,"IS1103/X":0,"MA1101R":1,"MA1521":1,"MKT1705X":1,"BT2101":1,"BT2102":0,"IS2101":0,"ST2334":0,"BT3102":0,"BT3103":0,"IS3103":0,"BT4103":0},
          "ElecOpt":{
            "BT4101":0,
            "A": {"DBA3712":0,"IE3120":0,"IS3240":0,"BT4013":0,"BT4016":0,"BT4211":0,"BT4212":0,"DBA4811":0,"IS4241":0,"IS4250":0,"MKT4812":0},
            "B":{"IE2110":0,"CS3244":0,"DBA3803":0,"BSE4711":0,"BT4012":0,"BT4015":0,"BT4221":0,"BT4222":0,"BT4240":0,"IS4241":0,"IE4210":0,"ST3131":0,"ST4245":0},
            "C":{"IS3221":0,"IS3261":0,"BT4014":0,"IS4228":0,"IS4302":0}
          },
          "Attachment":{"Done":0},
          "UEM":{"UEM1":0,"UEM2":0,"UEM3":0,"UEM4":0,"UEM5":0,"UEM6":0,"UEM7":0,"UEM8":0},
          "Level1":{"GEH":0,"GEQ":1,"GER":1,"GES":0,"GET":0,"BT1101":1,"CS1010S":1,"CS1020":1,"EC1301":1,"IS1103/X":0,"MA1101R":1,"MA1521":1,"MKT1705X":1,"mod1":0,"mod2":0}
        }
      }
    }
  },
  computed: {
    sumGEM: function () {
      let sum = 0;
      for (let i =0; i< Object.keys(this.student.GradReq.GEM).length; i++) {
        sum += Object.values(this.student.GradReq.GEM)[i]
      }
      return sum
    },
    sumLevel1: function () {
      let sum = 0;
      for (let i =0; i< Object.keys(this.student.GradReq.Level1).length; i++) {
        //console.log(Object.values(this.student.GradReq.Level1)[i])
        sum += Object.values(this.student.GradReq.Level1)[i]
      }
      return sum
    },
    sumCore: function () {
      let sum = 0;
      for (let i =0; i< Object.keys(this.student.GradReq.Core).length; i++) {
        //console.log(Object.values(this.student.GradReq.Core)[i])
        sum += Object.values(this.student.GradReq.Core)[i]
      }
      return sum 
    },
    sumUE: function () {
      let sum = 0;
      for (let i =0; i< Object.keys(this.student.GradReq.UEM).length; i++) {
        //console.log(Object.values(this.student.GradReq.UEM)[i])
        sum += Object.values(this.student.GradReq.UEM)[i]
      }
      return sum
    },
    iaDone: function () {
      if (this.student.GradReq.Attachment === 1) {
        return "Done"
      }
      return "Not Done"
    },
    bt4101Done: function () {
      if (this.student.GradReq.ElecOpt.BT4101 === 1) {
        return "Done"
      }
      return "Not Done"
    },
    ElectivesMC: function () {
      let sum = 0;
      if (this.student.GradReq.ElecOpt.BT4101===1) {
        sum += 12
      }
      //console.log(Object.keys(this.student.GradReq.ElecOpt).length-1)
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.A).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.A)[i] ===1) {
            sum +=4;
        }
      }
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.B).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.B)[i] ===1) {
            sum +=4;
        }
      }
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.C).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.C)[i] ===1) {
            sum +=4;
        }
      }
      return sum
    },
    totalElectives: function() {
      let sum = 0;
      if (this.student.GradReq.ElecOpt.BT4101===1) {
        sum += 1
      }
      //console.log(Object.keys(this.student.GradReq.ElecOpt).length-1)
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.A).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.A)[i] ===1) {
            sum +=1;
        }
      }
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.B).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.B)[i] ===1) {
            sum +=1;
        }
      }
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.C).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.C)[i] ===1) {
            sum +=1;
        }
      }
      return sum
    },
    listA: function () {
      let sum=0;
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.A).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.A)[i] ===1) {
            sum +=1;
        }
      }
      return sum
    },
    listB: function () {
      let sum=0;
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.B).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.B)[i] ===1) {
            sum +=1;
        }
      }
      return sum
    },
    listC: function () {
      let sum=0;
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.C).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.C)[i] ===1) {
            sum +=1;
        }
      }
      return sum;
    },
    // to be updated
    totalMC: function () {
      let countable = this.sumUE + this.sumCore + this.sumGEM + this.student.GradReq.Level1.mod1+ this.student.GradReq.Level1.mod2;
      countable = countable*4
      if (this.student.GradReq.Attachment ===1) {
        countable += 12
      }
      if (this.student.GradReq.ElecOpt.BT4101===1) {
        countable += 12
      }
      //console.log(Object.keys(this.student.GradReq.ElecOpt).length-1)
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.A).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.A)[i] ===1) {
            countable +=4;
        }
      }
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.B).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.B)[i] ===1) {
            countable +=4;
        }
      }
      for (let i =0; i< Object.keys(this.student.GradReq.ElecOpt.C).length; i++) {
        if (Object.values(this.student.GradReq.ElecOpt.C)[i] ===1) {
            countable +=4;
        }
      }
      return countable
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
  max-width: 1200px;
  margin:0 auto;
}
.some-page-wrapper {
  margin: 0px;
  background-color: #ffffff;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
.blue-column {
  background-color: #EAEAEA;
  height: 450px;
  margin: 20px;
  width: 250px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.green-column {
    height: 1000px;
    background-color: #EAEAEA;
    margin: 20px;
    width: 750px;
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
}
table {
  border-collapse: separate;
  border-spacing: 0;
  color: #4a4a4d;
  font: 14px/1.4 "Helvetica Neue", Helvetica, Arial, sans-serif;
}
th,
td {
  padding: 10px 15px;
  vertical-align: middle;
}
thead {
  background: #395870;
  background: linear-gradient(#49708f, #293f50);
  color: #fff;
  font-size: 11px;
  text-transform: uppercase;
}
th:first-child {
  border-top-left-radius: 5px;
  text-align: left;
}
th:last-child {
  border-top-right-radius: 5px;
}
tbody tr:nth-child(even) {
  background: #f0f0f2;
}
td {
  border-bottom: 1px solid #cecfd5;
  border-right: 1px solid #cecfd5;
}
td:first-child {
  border-left: 1px solid #cecfd5;
}
.book-title {
  color: #395870;
  display: block;
}
.text-offset {
  color: #7c7c80;
  font-size: 12px;
}
.item-stock,
.item-qty {
  text-align: center;
}
.item-price {
  text-align: right;
}
.item-multiple {
  display: block;
}
tfoot {
  text-align: right;
}
tfoot tr:last-child {
  background: #f0f0f2;
  color: #395870;
  font-weight: bold;
}
tfoot tr:last-child td:first-child {
  border-bottom-left-radius: 5px;
}
tfoot tr:last-child td:last-child {
  border-bottom-right-radius: 5px;
} 
</style>