<template>
<v-layout>
<v-flex xs12>
<div>

<pre><code class="lang-eval-js">

var x = 9
</code></pre>

<div id="mocha"><h5>Test results will appear here.</h5></div>
<div class="text-xs-center"  id="run">
<v-btn id = "runTest" v-on:click.native="rUn()">Run Tests</v-btn>
</div>
<div id="testList">
<p>
Describe: </v-btn><v-btn floating small v-on:click.native="addTest()" class="green accent-1" ><v-icon>add</v-icon></v-btn>
</p>


<v-expansion-panel v-do>
    <v-expansion-panel-content v-bind:value="index === tests.length-1"v-for="(test, index) in tests" :key="index" >
      <div slot="header"><v-btn floating small v-on:click.native.capture.stop.prevent="removeTest(index)" class="red lighten-1"><v-icon>clear</v-icon></v-btn><span class="text-xs-center"><v-btn floating small v-show="test.describe.editingDescr == false" v-on:click.native.capture.stop.prevent="editDescr(test.describe)"><v-icon>edit</v-icon></v-btn><v-btn floating small v-show="test.describe.editingDescr == true" v-on:click.native.capture.stop.prevent="finishEditDescr(test.describe)" class="green accent-1"><v-icon>done</v-icon></v-btn></span>{{test.describe.name}}<div v-show="test.describe.editingDescr == true">
      <v-text-field autofocus v-on:click.native.capture.prevent.stop="func" label="The name of the thing you are testing:" v-model="test.describe.name"></v-text-field>
      </div></div>
      <div>
      </div>
      <v-card>
      <v-card-text>
      <p>
      It: <v-btn floating small v-on:click.native.capture.stop.prevent="pushIts(index)" class="green accent-1" v-show="test.describe.editingDescr == false"><v-icon>add</v-icon></v-btn>
      </p>
      <v-expansion-panel v-do>
      <v-expansion-panel-content v-bind:value="index4 === test.describe.its.length-1" v-for="(it, index4) in test.describe.its" :key="index4" >
      <div slot="header">
      <v-btn floating small v-on:click.native.capture.stop.prevent="removeIts(index, index4)" class="red lighten-1" ><v-icon>clear</v-icon></v-btn><v-btn floating small v-show="it.editingIt == false && addingIt == false" v-on:click.native.capture.stop.prevent="editIt(it)"><v-icon>edit</v-icon></v-btn><v-btn floating small class="green accent-1" v-show="it.editingIt == true" v-on:click.native.capture.stop.prevent="finishEditIt(it)"><v-icon>done</v-icon></v-btn> {{it.itsDescr}} <v-text-field v-show="it.editingIt == true" v-on:click.native.capture.prevent.stop="func" label="(should...):" v-model="it.itsDescr"></v-text-field>
      </div>
      <v-card>
      <v-card-text>
      <p>
      Assertions (<a href="http://chaijs.com/api/assert/" target="_blank">reference</a>): <v-btn floating small v-on:click.native.capture.stop.prevent="pushAss(index, index4, it)"  class="green accent-1"><v-icon>add</v-icon></v-btn>
      </p>
      <v-expansion-panel v-do>
      <v-expansion-panel-content v-bind:value="index5 === it.assertions.length-1" v-bind:key="'ass' + index5"  v-for="(ass, index5) in it.assertions" @click.native="editAss">
      <div slot="header">
      <v-btn floating small v-on:click.native.capture.stop.prevent="removeAss(index, index4, index5)" class="red lighten-1"><v-icon>clear</v-icon></v-btn><v-btn class="green accent-1" v-show="(editingAss== true)" floating small><v-icon>done</v-icon></v-btn><v-btn floating small v-show="(editingAss== false)"><v-icon>edit</v-icon></v-btn> {{ass['p'+(ass.params.length)]}}
      </div>
      <v-card>
      <v-card-text>
      <div >
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
  tests: []
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
  editAss: function(ass){
  if (this.editingAss == false){
  ass.editingAss = true;
  this.editingAss = true;
  setTimeout(() => {
    this.$forceUpdate()
    vm.$refs.editAssSelect[0].focus()
    document.getElementById('editAssSelect').click()
  })
  } else {
  this.buildTests();
  ass.editingAss = false;
  this.editingAss = false;
  }
  },
  pushAss: function(index, index2, it){
  this.tests[index].describe.its[index2].assertions.push({assert: this.assToAdd.assert, p1: this.assToAdd.p1, p2: this.assToAdd.p2, p3: this.assToAdd.p3, p4: this.assToAdd.p4, params: this.assToAdd.params, descr: this.assToAdd.descr, editingAss: false})
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
  pushNewAssertion: function(index, index2, it){
  this.tests[index].describe.its[index2].assertions.push({assert: 'assert', p1: null, p2: null, p3: null, p4: null, params: this.params[0], descr: null, editingAss: false})
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
  this.tests[index].describe.its.push({itsDescr: this.itToPush.itsDescr, assertions: this.itToPush.assertions, addingAss: false, addingIt: false, editingIt: true})
  this.itToPush = {};
  this.itToPush.itsDescr = null;
  this.itToPush.assertions = [{assert: 'assert', p1: null, p2: null, p3: null, p4: null, descr: null, editingAss: true, params: this.params[0]}];
  this.tests[index].addingIt = false;
  this.buildTests();
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
  this.tests[index].describe.its[index2].assertions.splice(index3, 1)
  this.buildTests()
  this.tests[index].describe.its[index2].editingIt = false
  this.addingIt == false
  this.editingAss == false
  this.addingAss == false
  },
  addTest: function(){
  this.editingAss=true;
  this.tests.push({addingIt: false, describe: {editingDescr: true, name:'', its:
  [{editingIt: true, itsDescr: null, assertions: [{assert: 'assert', p1: null, p2: null, p3: null, p4: null, descr: null, editingAss: false, params: this.params[0]}], addingAss: false}]}})

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
    if (this.tests[i].describe.its[its].assertions[ass].params[0] != 'message'){
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
border-left: solid 2px #90B4FE;
border-right: solid 2px #90B4FE;
border-top: solid 2px #90B4FE;
box-shadow: 0
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
margin-left: 20px;
list-style: inside
}
#runTest{
width: 100%;
margin: 0px;
padding: 4px
}
input {
width: 100%
}
.expansion-panel__header--active:after{
float: right
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
border-bottom: 2px solid #10B42E;
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
border-radius: 8px
}
.expansion-panel .expansion-panel{
border: 2px solid #F0B09E;
}
.expansion-panel .expansion-panel .expansion-panel {
border: 2px solid #F020FE;
}
.expansion-panel .expansion-panel .expansion-panel .expansion-panel__header{
border-bottom: 2px solid #F020FE;
}
.expansion-panel .expansion-panel .expansion-panel__header{
border-bottom: 2px solid #F0B09E;
}
.expansion-panel {
height: auto;
border: 2px solid #10B42E;
margin-left: 0;
box-shadow: none
}
.card__text {
padding-top: 2px;
padding-bottom: 0px;
padding-right: 0
}
.card__text p {
margin-bottom: 3px
}
p{
margin-bottom: 0px
}
#klipse-container-1.klipse-container, #klipse-container-0.klipse-container{
display: none
}
#mocha {
height: auto !important
}
</style>
