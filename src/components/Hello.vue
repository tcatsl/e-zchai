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
Describe: <v-btn floating small style="visibility: hidden" ><v-icon>edit</v-icon></v-btn><v-btn floating small v-on:click.native="addTest()" class="green accent-1" ><v-icon>add</v-icon></v-btn>
<ul>

<li v-for="(test, index) in tests"><v-btn floating small v-on:click.native="removeTest(index)" class="red lighten-1"><v-icon>clear</v-icon></v-btn> {{test.describe.name}} <span class="text-xs-center"><v-btn floating small v-show="test.describe.editingDescr == false" v-on:click.native="editDescr(test.describe)"><v-icon>edit</v-icon></v-btn><v-btn floating small v-show="test.describe.editingDescr == true" v-on:click.native="finishEditDescr(test.describe)" class="green accent-1"><v-icon>done</v-icon></v-btn></span>
<div v-show="test.describe.editingDescr == true">
<v-text-field label="The name of the thing you are testing:" v-model="test.describe.name"></v-text-field>
</div>
<ul class ="itsList">
It: <v-btn floating small style="visibility: hidden" ><v-icon>edit</v-icon></v-btn><v-btn floating small v-on:click.native="pushIts(index)" class="green accent-1" v-show="test.describe.editingDescr == false"><v-icon>add</v-icon></v-btn>
<li v-for="(it, index2) in test.describe.its"><v-btn floating small v-on:click.native="removeIts(index, index2)" class="red lighten-1" ><v-icon>clear</v-icon></v-btn> {{it.itsDescr}} <v-btn floating small v-show="it.editingIt == false && addingIt == false" v-on:click.native="editIt(it)"><v-icon>edit</v-icon></v-btn><v-btn floating small class="green accent-1" v-show="it.editingIt == true" v-on:click.native="finishEditIt(it)"><v-icon>done</v-icon></v-btn>
<div v-show="it.editingIt == true">
<v-text-field label="(should...):" v-model="it.itsDescr"></v-text-field>
</div>
<div v-show="it.addingIt == true">
<v-text-field label="What it should do:" v-model="itToPush.itsDescr"></v-text-field>
</div>
<ul class= "assertList">
Assertions (<a href="http://chaijs.com/api/assert/" target="_blank">reference</a>): <v-btn floating small style="visibility: hidden" ><v-icon>edit</v-icon></v-btn><v-btn floating small v-on:click.native="addAss(it)" v-show="it.editingIt == false && addingIt == false && editingAss == false && addingAss == false" class="green accent-1"><v-icon>add</v-icon></v-btn>
<li v-for="(ass, index3) in it.assertions"><v-btn floating small v-on:click.native="removeAss(index, index2, index3)" class="red lighten-1"><v-icon>clear</v-icon></v-btn> {{ass['p'+(ass.params.length)]}} <v-btn floating small v-show="ass.editingAss == false" v-on:click.native="editAss(ass)"><v-icon>edit</v-icon></v-btn><v-btn floating small v-show="ass.editingAss == true" v-on:click.native="finishEditAss(ass)" class="green accent-1"><v-icon>done</v-icon></v-btn>
<div v-show="ass.editingAss == true">
<v-select single-line id="editAssSelect" ref="editAssSelect" autofocus :autocomplete="true" auto v-bind:items="assertions" :on-change="func()" @keydown.tab.capture.native="tab2($event)"  v-model="ass.assert" label="Assertion:"></v-select>
<v-text-field ref="stuffo" v-for="(param, index9) in ass.params" v-bind:label="param" v-model="ass['p'+ (index9+1)]"></v-text-field>
</div>
</li>
<br>

<li id="newassertion" v-if="it.addingAss == true"><v-btn floating small v-on:click.native="clearAss(it)" class="red lighten-1"><v-icon>clear</v-icon></v-btn>{{assToAdd['p'+(assToAdd.params.length)]}}<v-btn floating small v-on:click.native="pushAss(index, index2, it)" class="green accent-1"><v-icon>done</v-icon></v-btn>
<v-select single-line ref="addAssSelect" id="addAssSelect" @keydown.tab.capture.native="tab($event)" :autocomplete="true" auto v-bind:items="assertions" :on-change="func()" v-model="assToAdd.assert" label="Assertion:"></v-select>
<v-text-field class="testing" ref="stuff"  v-for="(param2, index0) in assToAdd.params" v-bind:label="param2" v-model="assToAdd['p'+(index0+1)]"></v-text-field>
</li>
</ul>
</li>
<li id="newIt" v-show="test.addingIt == true">
{{itToPush.itsDescr}}
<v-text-field label="(should...):" v-model="itToPush.itsDescr"></v-text-field><v-btn floating small v-on:click.native="pushIts(index)" class="green accent-1"><v-icon>done</v-icon></v-btn>

</li>
</ul>

</li>
</ul>
</div>

<pre id="tests"><code id="testcode" class="lang-eval-js">
assert = chai.assert
mocha.suite.suites = []

describe('x', function() {
  it('should not equal 9', function() {
    assert.notEqual(9, x);
  });
});
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
  assertions: ["assert","fail","isOk","isNotOk","equal","notEqual","strictEqual","notStrictEqual","deepEqual","notDeepEqual","isAbove","isAtLeast","isBelow","isAtMost","isTrue","isNotTrue","isFalse","isNotFalse","isNull","isNotNull","isNaN","isNotNaN","exists","notExists","isUndefined","isDefined","isFunction","isNotFunction","isObject","isNotObject","isArray","isNotArray","isString","isNotString","isNumber","isNotNumber","isFinite","isBoolean","isNotBoolean","typeOf","notTypeOf","instanceOf","notInstanceOf","include","notInclude","deepInclude","notDeepInclude","nestedInclude","notNestedInclude","deepNestedInclude","notDeepNestedInclude","ownInclude","notOwnInclude","deepOwnInclude","notDeepOwnInclude","match","notMatch","property","notProperty","propertyVal","notPropertyVal","deepPropertyVal","notDeepPropertyVal","nestedProperty","notNestedProperty","nestedPropertyVal","notNestedPropertyVal","deepNestedPropertyVal","notDeepNestedPropertyVal","lengthOf","hasAnyKeys","hasAllKeys","containsAllKeys","doesNotHaveAnyKeys","doesNotHaveAllKeys","hasAllDeepKeys","containsAllDeepKeys","doesNotHaveAnyDeepKeys","doesNotHaveAllDeepKeys","throws","doesNotThrow","operator","closeTo","approximately","sameMembers","notSameMembers","sameDeepMembers","notSameDeepMembers","sameOrderedMembers","notSameOrderedMembers","sameDeepOrderedMembers","notSameDeepOrderedMembers","includeMembers","notIncludeMembers","includeDeepMembers","notIncludeDeepMembers","includeOrderedMembers","notIncludeOrderedMembers","includeDeepOrderedMembers","notIncludeDeepOrderedMembers","oneOf","changes","changesBy","doesNotChange","changesButNotBy","increases","increasesBy","doesNotIncrease","increasesButNotBy","decreases","decreasesBy","doesNotDecrease","decreasesButNotBy","ifError","isExtensible","isNotExtensible","isSealed","isNotSealed","isFrozen","isNotFrozen","isEmpty","isNotEmpty"].map(function(el, ind, arr){
  return {text: el, value: el}
  }),
  params:[["expression","message"],["actual","expected","message","operator"],["object","message"],["object","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["valuetocheck","valuetobeabove","message"],["valuetocheck","valuetobeatleast","message"],["valuetocheck","valuetobebelow","message"],["valuetocheck","valuetobeatmost","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","name","message"],["value","name","message"],["object","constructor","message"],["object","constructor","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["value","regexp","message"],["value","regexp","message"],["object","property","message"],["object","property","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","message"],["object","property","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","length","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["hasanydeepkeysobject","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["fn","errorlikestringregexp","stringregexp","message"],["fn","errorlikestringregexp","stringregexp","message"],["val1","operator","val2","message"],["actual","expected","delta","message"],["actual","expected","delta","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["inlist","list","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["byfunction","object","property","delta","message"],["function","object","property","delta","message"],["object"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["target", "message"],["target", "message"]],
  addingAss: false,
  addingIt: false,
  editingAss: false,
  itToPush: {itsDescr: null, assertions: [], addingAss: false, addingIt: true, editingIt: false},
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
  tests: [{addingIt: false, describe: {editingDescr: false, name:'x', its:
  [{itsDescr: 'should not equal 9', assertions: [{assert:'notEqual', p1: 'x', p2: '9', p3: 'x should not equal 9', p4: null, params: ['actual', 'expected', 'message'], descr:'x should not equal 9', editingAss: false}], editingIt: false, addingAss: false}]}}]
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
  this.$forceUpdate()
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
  this.$forceUpdate()
  vm.$refs.stuffo[0].focus()
})
}
  },
  func: function (){
  this.assToAdd.params = this.params[this.names.indexOf(this.assToAdd.assert)]

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
  ass.editingAss = true;
  this.editingAss = true;
  setTimeout(() => {
    this.$forceUpdate()
    vm.$refs.editAssSelect[0].focus()
    document.getElementById('editAssSelect').click()
  })
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
  },
  addTest: function(){
  this.tests.push({addingIt: false, describe: {editingDescr: true, name:'', its:
  [{editingIt: true, itsDescr: null, assertions: [{assert: 'assert', p1: null, p2: null, p3: null, p4: null, descr: null, editingAss: true, params: this.params[0]}], addingAss: false}]}})
  this.editingAss = true;
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
   itsCode += 'it("'+this.tests[i].describe.its[its].itsDescr+'", function(){\n'+assertCode+'})\n'
    code += 'describe("'+this.tests[i].describe.name+'", function(){\n'+ itsCode +'})\n'
  tests.innerHTML = '<code class="lang-eval-js">'+ 'assert = chai.assert\n mocha.suite.suites = []\n'+ code+'</code>'
  reLoad()
   return
  }
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
  this.buildTests()

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
 padding: 20px;
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
}
button {
margin: 6
}
.btn.btn--floating{
height: 16px;
margin: 0;
float: right
}
.btn--floating.btn--small .icon {
font-size: 10px;
bottom: 1px;
position: relative;

}
ul {
margin-left: 20px;
list-style: inside
}
#runTest{
width: 98%
}
</style>
