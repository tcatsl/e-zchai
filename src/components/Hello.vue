<template>
<v-layout>
<v-flex xs12>
<div>

<pre><code class="lang-eval-js">

var x = 9
</code></pre>

<div id="mocha"><h5><b>Test results will appear here.</b></h5></div>

<div id="testList">
<p>&nbsp;&nbsp;
  <h5><b>Tests:</b></h5>
  <h6><v-btn floating small v-on:click.native="addTest()"  id="add1" class="green accent-3"><v-icon>add</v-icon></v-btn>&nbsp;<b>Describe:</b></h6>
</p>


<v-expansion-panel id="foo" v-xdo>
    <v-expansion-panel-content v-xdo v-bind:value="index === tests.length-1"v-for="(test, index) in tests" :key="index" >
      <div class="descrhead" slot="header"><v-btn floating small v-on:click.native.capture.stop.prevent="removeTest(index)" class="red lighten-1"><v-icon>clear</v-icon></v-btn><span class="text-xs-center"><v-btn floating small v-show="test.describe.editingDescr == false" v-on:click.native.capture.stop.prevent="editDescr(test.describe)"><v-icon>edit</v-icon></v-btn><v-btn floating small v-show="test.describe.editingDescr == true" v-on:click.native.capture.stop.prevent="finishEditDescr(test.describe)" class="green accent-1"><v-icon>done</v-icon></v-btn></span> &nbsp;{{test.describe.name}}<div v-show="test.describe.editingDescr == true">
      <v-text-field autofocus v-on:click.native.capture.prevent.stop="func" label="The name of the thing you are testing:" v-model="test.describe.name"></v-text-field>
      </div></div>
      <div>
      </div>
      <v-card>
      <v-card-text>
      <p>
       &nbsp;&nbsp;<h6><v-btn floating small v-on:click.native.capture.stop.prevent="pushIts(index)"  id="add2" class="green accent-3"><v-icon>add</v-icon></v-btn> <b>It:</b></h6>
      </p>
      <v-expansion-panel v-do>
      <v-expansion-panel-content v-xdo v-bind:value="index4 === test.describe.its.length-1" v-for="(it, index4) in test.describe.its" :key="index4" >
      <div class="itshead" slot="header">
      <v-btn floating small v-on:click.native.capture.stop.prevent="removeIts(index, index4)" class="red lighten-1" ><v-icon>clear</v-icon></v-btn><v-btn floating small v-show="it.editingIt == false && addingIt == false" v-on:click.native.stop.prevent="editIt(it)"><v-icon>edit</v-icon></v-btn><v-btn floating small class="green accent-1" v-show="it.editingIt == true" v-on:click.native.capture.stop.prevent="finishEditIt(it)"><v-icon>done</v-icon></v-btn> &nbsp;{{it.itsDescr}} <v-text-field v-show="it.editingIt == true" v-on:click.native.capture.prevent.stop="func" label="(should...):" v-model="it.itsDescr"></v-text-field>
      </div>
      <v-card>
      <v-card-text>
      <p>
      &nbsp;&nbsp;<h6><v-btn floating small v-on:click.native.capture.stop.prevent="pushAss(index, index4, it)"   id="add3" class="green accent-3"><v-icon>add</v-icon></v-btn>  <b>Assertions (<a href="http://chaijs.com/api/assert/" target="_blank">reference</a>):</b></h6>
      </p>
      <v-expansion-panel  v-do>
      <v-expansion-panel-content @click.native="editAss(index, index4, ass, $event)" v-xdo v-bind:value="index5 === it.assertions.length-1" v-bind:key="'ass' + index5"  v-for="(ass, index5) in it.assertions"  >
      <div @click.native="editAss(index, index4, ass, $event)" slot="header">
      <v-btn floating small v-on:click.native.capture.stop.prevent="removeAss(index, index4, index5)" class="red lighten-1"><v-icon>clear</v-icon></v-btn><v-btn class="green accent-1" v-show="(ass.editingAss== true)" floating small><v-icon>done</v-icon></v-btn><v-btn floating small v-show="(ass.editingAss== false)"><v-icon>edit</v-icon></v-btn>&nbsp;&nbsp;{{ass['p'+(ass.params.length)]}}
    </div>
      <v-card>
      <v-card-text>
      <div class="eeee" >
      <v-select id="editAssSelect" ref="editAssSelect" autofocus :autocomplete="true" auto v-bind:items="assertions" :on-change="func(ass)" @keydown.tab.capture.native="tab2($event)"  v-model="ass.assert" label="Assertion:"></v-select>
      <v-text-field @click.native.capture.stop.prevent="" ref="stuffo" v-for="(param, index9) in ass.params" v-bind:label="param" v-model="ass['p'+ (index9+1)]"></v-text-field>
      </div>
      </v-card-text>
      </v-card>
      </v-expansion-panel-content>
      </v-expansion-panel>
      </v-card-text>
      </v-card>
      </v-expansion-panel-content>
      </v-expansion-panel>
      </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  <div class="text-xs-center"  id="run">
  <v-btn id = "runTest" v-on:click.native="rUn()"><h6><b>Run Tests</b></h6></v-btn>
  </div>
</div>

<pre id="tests"><code id="testcode" class="lang-eval-js">
assert = chai.assert
mocha.suite.suites = []
</code></pre>

</div>
</v-flex>
</v-layout>
</template>

<script>
import vSelect from "vue-select"
var chai = require('chai')
var assert = chai.assert
var vm;


 function reLoad(){
  var script = document.getElementById("repl") || false
  if (!!script){
  document.body.removeChild(script)
  }
  var script = document.createElement("script");
  script.id = "repl"
  script.src = "https://storage.googleapis.com/app.klipse.tech/plugin_prod/js/klipse_plugin.min.js";

   document.body.append(script)
   setTimeout(function(){
   var final = document.getElementsByClassName("cm-s-default")
   final[final.length -1 ].id = "final"
   final[final.length -1 ].innerHTML = ""}, 4000)
}
function resetTests(suite) {
suite.tests.forEach(function(t) {
  delete t.state;
  t.timedOut = false;
});
suite.suites.forEach(resetTests);
}
export default {
  name: 'hello',
  data: function(){
  return {
    code: '',
  re1: /expansion-panel__header--active/g,
  assertions: ["assert","fail","isOk","isNotOk","equal","notEqual","strictEqual","notStrictEqual","deepEqual","notDeepEqual","isAbove","isAtLeast","isBelow","isAtMost","isTrue","isNotTrue","isFalse","isNotFalse","isNull","isNotNull","isNaN","isNotNaN","exists","notExists","isUndefined","isDefined","isFunction","isNotFunction","isObject","isNotObject","isArray","isNotArray","isString","isNotString","isNumber","isNotNumber","isFinite","isBoolean","isNotBoolean","typeOf","notTypeOf","instanceOf","notInstanceOf","include","notInclude","deepInclude","notDeepInclude","nestedInclude","notNestedInclude","deepNestedInclude","notDeepNestedInclude","ownInclude","notOwnInclude","deepOwnInclude","notDeepOwnInclude","match","notMatch","property","notProperty","propertyVal","notPropertyVal","deepPropertyVal","notDeepPropertyVal","nestedProperty","notNestedProperty","nestedPropertyVal","notNestedPropertyVal","deepNestedPropertyVal","notDeepNestedPropertyVal","lengthOf","hasAnyKeys","hasAllKeys","containsAllKeys","doesNotHaveAnyKeys","doesNotHaveAllKeys","hasAllDeepKeys","containsAllDeepKeys","doesNotHaveAnyDeepKeys","doesNotHaveAllDeepKeys","throws","doesNotThrow","operator","closeTo","approximately","sameMembers","notSameMembers","sameDeepMembers","notSameDeepMembers","sameOrderedMembers","notSameOrderedMembers","sameDeepOrderedMembers","notSameDeepOrderedMembers","includeMembers","notIncludeMembers","includeDeepMembers","notIncludeDeepMembers","includeOrderedMembers","notIncludeOrderedMembers","includeDeepOrderedMembers","notIncludeDeepOrderedMembers","oneOf","changes","changesBy","doesNotChange","changesButNotBy","increases","increasesBy","doesNotIncrease","increasesButNotBy","decreases","decreasesBy","doesNotDecrease","decreasesButNotBy","ifError","isExtensible","isNotExtensible","isSealed","isNotSealed","isFrozen","isNotFrozen","isEmpty","isNotEmpty"].map(function(el, ind, arr){
  return {text: el, value: el}
  }),
  params:[["expression","message"],["actual","expected","message","operator"],["object","message"],["object","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["valuetocheck","valuetobeabove","message"],["valuetocheck","valuetobeatleast","message"],["valuetocheck","valuetobebelow","message"],["valuetocheck","valuetobeatmost","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","name","message"],["value","name","message"],["object","constructor","message"],["object","constructor","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["value","regexp","message"],["value","regexp","message"],["object","property","message"],["object","property","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","message"],["object","property","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","length","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["hasanydeepkeysobject","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["fn","errorlikestringregexp","stringregexp","message"],["fn","errorlikestringregexp","stringregexp","message"],["val1","operator","val2","message"],["actual","expected","delta","message"],["actual","expected","delta","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["inlist","list","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["byfunction","object","property","delta","message"],["function","object","property","delta","message"],["object"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["target", "message"],["target", "message"]],
  addingAss: false,
  addingIt: false,
  editingAss: true,
  itToPush: {itsDescr: null, assertions: [{}], addingAss: false, addingIt: true, editingIt: false},
  names: [],
  assToAdd: {
  length: null,
  assert: 'assert',
  p1: null,
  p2: null,
  p3: null,
  descr: null,
  params: [],
  editingAss: false
  },
  tests: [],
  stuff: []
  }
  },
  methods: {
  tab:  function (e) {
  var d = e.currentTarget
  var z = document.createEvent('HTMLEvents')
  z.initEvent('keydown', true, true)
  z.keyCode = 13
e.currentTarget.dispatchEvent(z)

if (!!this.$refs.stuff){
setTimeout(() => {
  vm.$forceUpdate()
  vm.$refs.stuff[0].focus()
})
}
  },
  tab2:  function (e) {
  var d = e.currentTarget
  var z = document.createEvent('HTMLEvents')
  z.initEvent('keydown', true, true)
  z.keyCode = 13
e.currentTarget.dispatchEvent(z)

if (!!this.$refs.stuffo){
setTimeout(() => {
  vm.$forceUpdate()
  vm.$refs.stuffo[0].focus()
})
}
  },
  show: function(el){
    // alert("stoopid")
  },
  func: function (ass){

  if (this.params[0][0] == "expression" && !!ass){
  ass.params = this.params[this.names.indexOf(ass.assert)]
}
  },
  evaluate: function (stuff){
  return eval(stuff)
  },
  editDescr: function (describe){
   describe.editingDescr = true
  },
  finishEditDescr: function(describe){
  describe.editingDescr = false;
  this.buildTests();
  },
  editIt: function(it) {
  it.editingIt = true
  },
  finishEditIt: function(it){
  it.editingIt = false;
  this.buildTests();
  },
  finishEditAss: function(ass) {
  ass.editingAss = false;
  this.editingAss = false
  this.buildTests();
  },
  editAss: function(index, index2, ass, e){
 if
 (e.srcElement.classList.toString() != 'card__text'){
  if (ass.editingAss == false){
  for (var h = 0; h < this.tests[index].describe.its[index2].assertions.length; h++){
  this.tests[index].describe.its[index2].assertions[h].editingAss = false;
  }
  ass.editingAss = true;
  this.editingAss = true;
  setTimeout(() => {
    this.$forceUpdate()
  })
  } else {
  for (var h = 0; h < this.tests[index].describe.its[index2].assertions.length; h++){
  this.tests[index].describe.its[index2].assertions[h].editingAss = false;
  }
  this.buildTests();
  }
} else {
  e.preventDefault()
  return
}
  },
  pushAss: function(index, index2, it){

  for (var h = 0; h < this.tests[index].describe.its[index2].assertions.length; h++){
  this.tests[index].describe.its[index2].assertions[h].editingAss = false;
  }
  this.tests[index].describe.its[index2].assertions.push({assert: this.assToAdd.assert, p1: this.assToAdd.p1, p2: this.assToAdd.p2, p3: this.assToAdd.p3, p4: this.assToAdd.p4, params: this.assToAdd.params, descr: this.assToAdd.descr, editingAss: true})
  it.addingAss = false
  this.assToAdd.editingAss = true;
  this.addingAss = false;
  this.assToAdd.assert = 'assert'
  this.assToAdd.p1 = null;
  this.assToAdd.p2 = null;
  this.assToAdd.p3 = null;
  this.assToAdd.p4 = null;
  this.assToAdd.descr = null;
  this.assToAdd.params = this.params[0];
  this.buildTests();

  },
  pushNewAssertion: function(index, index2, it){
  this.tests[index].describe.its[index2].assertions.push({assert: 'assert', p1: null, p2: null, p3: null, p4: null, params: this.params[0], descr: null, editingAss: true})
  it.addingAss = false
  this.addingAss = false;
  this.editingAss = false;
  this.assToAdd.assert = 'assert'
  this.assToAdd.p1 = null;
  this.assToAdd.p2 = null;
  this.assToAdd.p3 = null;
  this.assToAdd.descr = null;
  this.assToAdd.params = null;
  this.buildTests();

  },
  pushIts: function(index){
  for (var z = 0; z< this.tests.length; z++){
  for (var l = 0; l < this.tests[z].describe.its.length; l++){
  this.tests[z].describe.its[l].editingIt = false;
  }
  }
  this.tests[index].describe.its.push({itsDescr: this.itToPush.itsDescr, assertions: this.itToPush.assertions, addingAss: false, addingIt: false, editingIt: true})
  this.itToPush = {};
  this.itToPush.itsDescr = null;
  this.itToPush.assertions = [{assert: 'assert', p1: null, p2: null, p3: null, p4: null, descr: null, editingAss: true, params: this.params[0]}];
  this.tests[index].addingIt = false;
  this.buildTests();
  this.editingAss = true;
  },
  addIts: function(test){
  test.addingIt = true;
  },
  rUn: function(){
  document.getElementById("mocha").innerHTML = ""
  resetTests(mocha.suite)
mocha.run();
  },
  addAss: function(it) {
  it.addingAss = true;
  this.addingAss = true;
  setTimeout(() => {
    this.$forceUpdate()
    vm.$refs.addAssSelect[0].focus()
    document.getElementById('addAssSelect').click()
  })
  },
  clearAss: function(it){
  it.addingAss = false;
  this.addingAss = false;
  this.editingAss = false;
  this.assToAdd.assert = 'assert'
  this.assToAdd.p1 = null;
  this.assToAdd.p2 = null;
  this.assToAdd.p3 = null;
  this.assToAdd.descr = null;
  this.assToAdd.params = null;
  this.buildTests();
  },
  removeTest: function (index) {
  this.tests.splice(index, 1);
  this.buildTests()
  },
  removeIts: function (index, index2) {
  this.tests[index].describe.its.splice(index2, 1);
  this.buildTests()
  },
  removeAss: function (index, index2, index3){
    for (var i = 0; i < this.tests[index].describe.its[index2].assertions.length; i++){
      this.tests[index].describe.its[index2].assertions[i].editingAss = false
    }

  this.tests[index].describe.its[index2].assertions.splice(index3, 1)
  if (!!this.tests[index].describe.its[index2].assertions[this.tests[index].describe.its[index2].assertions.length -1]){
  this.tests[index].describe.its[index2].assertions[this.tests[index].describe.its[index2].assertions.length -1].editingAss = true
}
  this.buildTests()
  this.tests[index].describe.its[index2].editingIt = false
  this.addingIt ==false
  this.editingAss = false
  this.addingAss = false
  },
  addTest: function(){
  for (var z = 0; z< this.tests.length; z++){
  this.tests[z].describe.editingDescr = false;
  }
  this.editingAss=true;
  this.tests.push({addingIt: false, describe: {editingDescr: true, name:'', its:
  [{editingIt: true, itsDescr: null, assertions: [{assert: 'assert', p1: null, p2: null, p3: null, p4: null, descr: null, editingAss: true, params: this.params[0]}], addingAss: false}]}})

  },
  buildTests: function (){

  var code = ''
  for (var i = 0; i < this.tests.length; i++){
  var itsCode = '';
  for (var its = 0; its < this.tests[i].describe.its.length; its++){
  var assertCode = '';
  for (var ass = 0; ass < this.tests[i].describe.its[its].assertions.length; ass++){

  assertCode += 'assert'
  if (this.tests[i].describe.its[its].assertions[ass].assert == "assert"){
   assertCode += '('+this.tests[i].describe.its[its].assertions[ass].p1 + ', '+JSON.stringify(this.tests[i].describe.its[its].assertions[ass].p2) + ')\n'
  } else {
  var len = this.evaluate('chai.assert.'+ this.tests[i].describe.its[its].assertions[ass].assert +'.length')
  if (len > 0){
  if (this.tests[i].describe.its[its].assertions[ass].params[0] != 'message'){
  assertCode += '.'+this.tests[i].describe.its[its].assertions[ass].assert+'('+this.tests[i].describe.its[its].assertions[ass].p1
  }else {
  assertCode += ', ' + JSON.stringify(this.tests[i].describe.its[its].assertions[ass].p1)
  }
  if (len > 1){
  if (this.tests[i].describe.its[its].assertions[ass].params[1] != 'message'){
    assertCode += ', ' + this.tests[i].describe.its[its].assertions[ass].p2
    } else {
    assertCode += ', ' + JSON.stringify(this.tests[i].describe.its[its].assertions[ass].p2)
    }
    if (len > 2){
    if (this.tests[i].describe.its[its].assertions[ass].params[2] != 'message'){
      assertCode += ', ' + this.tests[i].describe.its[its].assertions[ass].p3
      }else {
      assertCode += ', ' + JSON.stringify(this.tests[i].describe.its[its].assertions[ass].p3)
      }
    if (len > 3){
    if (this.tests[i].describe.its[its].assertions[ass].params[3] != 'message'){
     assertCode += ', ' + this.tests[i].describe.its[its].assertions[ass].p4
     } else {
     assertCode += ', ' + JSON.stringify(this.tests[i].describe.its[its].assertions[ass].p4)
     }
    }
    }
  }
  }
  assertCode += ')\n'
  }
  }
   itsCode += 'it("'+this.tests[i].describe.its[its].itsDescr+'", function(){\n'+assertCode+'})\n'
  }
    code += 'describe("'+this.tests[i].describe.name+'", function(){\n'+ itsCode +'})\n'
  }
  tests.innerHTML = '<code class="lang-eval-js">'+ 'assert = chai.assert\n mocha.suite.suites = []\n'+ code+'</code>'
  this.code=code
  reLoad()
  }
  },
  mounted: function(){
  this.itToPush.assertions = [{assert: 'assert', p1: null, p2: null, p3: null, p4: null, descr: null, editingAss: true, params: this.params[0]}]
  this.names = this.assertions.map(function(el, ind, arr){return el.text})
  reLoad();
  vm = this;
  this.chai = chai

  mocha.setup("bdd")
  },
  directives: {
  do: {
    // When the bound element is inserted into the DOM...
    inserted: function (el1) {
      // Focus the element
      setTimeout(function(){
        var z = document.getElementsByClassName('expansion-panel__body')
      // alert(z.length)
        var q = document.getElementsByClassName('expansion-panel__header')
        var c = el1.children
        Array.prototype.forEach.call(z, function(el, ind, arr){
        if (el1.contains(el) || el1 == el  || el1.parentNode.parentNode.parentNode == el) {el.style.height = "auto"
          }
        })
        Array.prototype.forEach.call(q, function(el, ind, arr){
          if (el1.contains(el) || el1 == el || el1.parentNode.parentNode.parentNode == el  || el1.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode == el) { el.style.height = "auto"

          }
        })
      }, 1500)
      setTimeout(function(){
    })
  }
  },
  xdo: {
    unbind: function(el){
        for (var i = 0; i < vm.stuff.length; i++){
          if (vm.stuff[i].el == el && !!vm.stuff[i].p.children[vm.stuff[i].p.children.length -1]){

            vm.stuff[i].p.children[vm.stuff[i].p.children.length -1].click()
            vm.stuff[i].p.children[vm.stuff[i].p.children.length -1].click()
          }
        }
    },
    inserted: function(el){
      setTimeout(function(){el.click(); el.click()})
      vm.stuff.push({el: el, p: el.parentElement})
    }
  }
}
}
</script>
<style>
.menu .menu__content, .list {
 position: static;
 }
 .menu .menu__content{
 top: 0
  }
* {
font-family: 'Roboto Mono', monospace
}
.CodeMirror  .CodeMirror-lines *{
font-family: 'Roboto Mono', monospace
}
#testList {
 border-right: solid 2px #90B4FE;
 border-left: solid 2px #90B4FE;
 border-top: solid 2px #90B4FE;
}
#final {
border: 0
}
#mocha{
border-right: solid 2px #90B4FE;
border-left: solid 2px #90B4FE;
padding: 40px;
margin: 0
}
pre{
border: solid 1px #90B4FE
}
#run{
border-top: solid 2px #90B4FE;
box-shadow: 0;
background-color: #90B4FE
}
button {
margin: 6px
}
.btn.btn--raised{
box-shadow: none
}
.btn.btn--floating{
height: 16px;
margin: 0;
bottom: 1px;
box-shadow: none
}
.btn--floating.btn--small .icon {
font-size: 10px;
position: inherit;

}
ul {
padding-left: 40px;
list-style: inside
}
#runTest{
width: 100%;
margin: 0px;
padding: 6px
}
input {
width: 100%
}
.expansion-panel__header--active:after{
float: right
}
#mocha-stats{
  position: static !important;
}
.expansion-panel__header{
padding-top: 0px;
display: inline-flex;
width: 100%
}
.expansion-panel__header > *{
width: 98%
}
.expanion-panel__body, .expansion-panel, .expansion-panel__header {
height: auto !important
}
.expansion-panel__header{
padding: 5px;
box-shadow: none;
border-bottom: 1px solid #10B42E;
border-top: 1px solid #10B42E;

}
.expansion-panel > li:first-child >div:first-child{
  border-top-left-radius: 5px !important;
  border-top-right-radius: 5px !important;
}
.input-group--text-field{
padding-bottom: 0;
margin-bottom: 0
}
.input-group__details{
min-height: 2px;
height: 2px
}
.expansion-panel{
border-radius: 8px;
padding-bottom: 5px;
margin-right: 5px;

border-top: 0
}
.expansion-panel .expansion-panel{
border: 2px solid #F0B09E;
width: inherit !important;
border-top: 1px solid #F0B09E;
}
.expansion-panel .expansion-panel .expansion-panel {
  width: inherit !important;
border: 2px solid #F020FE;
border-top: 1px solid #F020FE
}

.expansion-panel .expansion-panel .expansion-panel .expansion-panel__header{
border-bottom: 1px solid #F020FE;
border-top: 1px solid #F020FE;
margin: 0;
}
.expansion-panel li{
  border: 0
}
.expansion-panel .expansion-panel .expansion-panel .card__text{
width: 98% !important;
}
.expansion-panel .expansion-panel .expansion-panel__header{
border-bottom: 1px solid #F0B09E;
border-top: 1px solid #F0B09E;
}
#add1{
  background-color: #10B42E
}
#add2{
  background-color: #F0B09E;
}
#add3 {
  background-color: #F020FE
}
.expansion-panel .expansion-panel__body{
  /*background-color: #FFFFFF !important*/
}
.expansion-panel {
  /*background-color: #FFFFFF !important;*/
height: auto !important;
border: 2px solid #10B42E;
border-top-width: 1px;
margin-left: 0;
box-shadow: none
}
.card__text .expansion-panel__header{
  width: 100% !important;
}
.card {
  z-index: 0
}
.card__text, .card__text .card__text {
  width: inherit !important;
  margin-left: 70px;
padding-top: 2px;
padding-bottom: 0px;
padding-right: 0

}
.expansion-panel .card__text{
}
.expansion-panel .expansion-panel .card__text{
}
.expansion-panel .expansion-panel .expansion-panel .card__text {
  margin-left: 0;
  padding-left: 5px;
  box-sizing: content-box;
}
.card__text p {
margin-bottom: 0px
}
p{
margin-bottom: 0px;
margin-top: 0px
}
#klipse-container-1.klipse-container, #klipse-container-0.klipse-container{
display: none
}
.expansion-panel .expansion-panel__header i {
  margin-right: 0;
}
#mocha {
height: auto !important
}
.expansion-panel .v-btn {

}
.btn--floating.btn--small .icon {
  height: 16px
}
#add1 {
  border-radius: 30%

}
#add1, #add2, #add3 {
  margin-left: 7px;
  border-radius: 3px
}
.list {
  margin-left: 0;

}
.input-group{
}
.itshead .input-group, .descrhead .input-group{
}
h6 {
  margin-bottom: 20px;
  font-size: 18px
}
</style>
