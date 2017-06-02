<template>

<div>

<pre><code class="lang-eval-js">

var x = 9
</code></pre>
<div id="run">
<v-btn id = "runTest" v-on:click.native="rUn()">Run Tests</v-btn>
</div>
<div id="mocha"><h5>Test results will appear here.</h5></div>
<div id="testList">
<h5>Tests: <v-btn v-on:click.native="addTest()">New Test</v-btn></h5>
<ul>

<li v-for="(test, index) in tests">{{test.describe.name}} <v-btn v-on:click.native="removeTest(index)">Delete</v-btn><v-btn v-show="test.describe.editingDescr == false" v-on:click.native="editDescr(test.describe)">Edit</v-btn>
<v-btn v-show="test.describe.editingDescr == true" v-on:click.native="finishEditDescr(test.describe)">Done</v-btn>
<div v-show="test.describe.editingDescr == true">
<v-text-field label="The name of the thing you are testing:" v-model="test.describe.name"></v-text-field>
</div>
<ul class ="itsList">
<li v-for="(it, index2) in test.describe.its">It: {{it.itsDescr}} <v-btn v-on:click.native="removeIts(index, index2)">Delete</v-btn><v-btn v-show="it.editingIt == false" v-on:click.native="editIt(it)">Edit</v-btn>

<v-btn v-on:click.native="addIts(test)">New It</v-btn>
<v-btn v-show="it.editingIt == true" v-on:click.native="finishEditIt(it)">Done</v-btn>
<div v-show="it.editingIt == true">
<v-text-field label="What it should do:" v-model="it.itsDescr"></v-text-field>
</div>
<ul class= "assertList">
Assertions(<a href="http://chaijs.com/api/assert/" target="_blank">reference</a>):
<li v-for="(ass, index3) in it.assertions"> {{ass.descr}} <v-btn v-on:click.native="removeAss(index, index2, index3)">Delete</v-btn> <v-btn v-show="ass.editingAss == false" v-on:click.native="editAss(ass)">Edit</v-btn>
<v-btn v-on:click.native="addAss(it)">New Assertion</v-btn>
<v-btn v-show="ass.editingAss == true" v-on:click.native="finishEditAss(ass)">Done</v-btn>
<div v-show="ass.editingAss == true">
<v-select v-bind:items="assertions" v-model="ass.assert" label="Assert:"></v-select>
<v-text-field label="Parameter 1" v-model="ass.p1"></v-text-field>
<v-text-field v-if="evaluate('chai.assert.'+ass.assert+'.length > 2')" label="Parameter 2" v-model="ass.p2"></v-text-field>
<v-text-field v-if="evaluate('chai.assert.'+ass.assert+'.length > 3')" label="Parameter 3" v-model="ass.p3"></v-text-field>
<v-text-field label="Description" v-model="ass.descr"></v-text-field>
</div>
</li>
<br>

<li v-if="it.addingAss == true">
<v-select v-bind:items="assertions" v-model="assToAdd.assert" label="Assert:"></v-select>
<v-text-field label="Parameter 1" v-model="assToAdd.p1"></v-text-field>
<v-text-field label="Parameter 2" v-if="evaluate('chai.assert.'+assToAdd.assert+'.length > 2')"  v-model="assToAdd.p2"></v-text-field>
<v-text-field label="Parameter 3" v-if="evaluate('chai.assert.'+assToAdd.assert+'.length > 3')" v-model="assToAdd.p3"></v-text-field>
<v-text-field label="Description" v-model="assToAdd.descr"></v-text-field>
<v-btn v-on:click.native="pushAss(index, index2, it)">Done</v-btn>
</li>
</ul>
</li>
<li id="newIt" v-show="test.addingIt == true">
<v-flex xs-4>
<v-text-field label="What it should do:" v-model="itToPush.descr"></v-text-field>
<v-btn v-on:click.native="pushIts(index)">Done</v-btn>
</v-flex>
</li>
</ul>

</li>
</ul>
</div>

<pre id="tests"><code id="testcode" class="lang-eval-js">
assert = chai.assert
mocha.suite.suites = []
mocha.setup("bdd")

describe('x', function() {
  it('should not equal 9', function() {
    assert.notEqual(9, x);
  });
});
</code></pre>

</div>
</template>

<script>
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
   final[final.length -1 ].innerHTML = ""}, 2500)
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
  assertions: ["fail","isOk","isNotOk","equal","notEqual","strictEqual","notStrictEqual","deepStrictEqual","deepEqual","notDeepEqual","isAbove","isAtLeast","isBelow","isAtMost","isTrue","isNotTrue","isFalse","isNotFalse","isNull","isNotNull","isNaN","isNotNaN","exists","notExists","isUndefined","isDefined","isFunction","isNotFunction","isObject","isNotObject","isArray","isNotArray","isString","isNotString","isNumber","isNotNumber","isFinite","isBoolean","isNotBoolean","typeOf","notTypeOf","instanceOf","notInstanceOf","include","notInclude","deepInclude","notDeepInclude","nestedInclude","notNestedInclude","deepNestedInclude","notDeepNestedInclude","ownInclude","notOwnInclude","deepOwnInclude","notDeepOwnInclude","match","notMatch","property","notProperty","propertyVal","notPropertyVal","deepPropertyVal","notDeepPropertyVal","ownProperty","notOwnProperty","ownPropertyVal","notOwnPropertyVal","deepOwnPropertyVal","notDeepOwnPropertyVal","nestedProperty","notNestedProperty","nestedPropertyVal","notNestedPropertyVal","deepNestedPropertyVal","notDeepNestedPropertyVal","lengthOf","hasAnyKeys","hasAllKeys","containsAllKeys","doesNotHaveAnyKeys","doesNotHaveAllKeys","hasAnyDeepKeys","hasAllDeepKeys","containsAllDeepKeys","doesNotHaveAnyDeepKeys","doesNotHaveAllDeepKeys","throws","doesNotThrow","operator","closeTo","approximately","sameMembers","notSameMembers","sameDeepMembers","notSameDeepMembers","sameOrderedMembers","notSameOrderedMembers","sameDeepOrderedMembers","notSameDeepOrderedMembers","includeMembers","notIncludeMembers","includeDeepMembers","notIncludeDeepMembers","includeOrderedMembers","notIncludeOrderedMembers","includeDeepOrderedMembers","notIncludeDeepOrderedMembers","oneOf","changes","changesBy","doesNotChange","changesButNotBy","increases","increasesBy","doesNotIncrease","increasesButNotBy","decreases","decreasesBy","doesNotDecrease","doesNotDecreaseBy","decreasesButNotBy","ifError","isExtensible","isNotExtensible","isSealed","isNotSealed","isFrozen","isNotFrozen","isEmpty","isNotEmpty","ok","notOk","throw","Throw","extensible","notExtensible","sealed","notSealed","frozen","notFrozen","empty","notEmpty"].map(function(el, ind, arr){
  return {text: el, value: el}
  }),
  addingAss: false,
  addingIt: false,
  itToPush: {itsDescr: null, assertions: [], addingAss: false, editingIt: false},
  assToAdd: {
  length: null,
  assert: 'deepEqual',
  p1: null,
  p2: null,
  p3: null,
  descr: null
  },
  tests: [{addingIt: false, describe: {editingDescr: false, name:'x', its:
  [{itsDescr: 'should not equal 9', assertions: [{assert:'notEqual', p1: 'x', p2: '9', p3: null, descr:'x should not equal 9', editingAss: false}], editingIt: false, addingAss: false}]}}]
  }
  },
  methods: {
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
  this.buildTests();
  },
  editAss: function(ass){
  ass.editingAss = true;
  },
  pushAss: function(index, index2, it){
  this.tests[index].describe.its[index2].assertions.push({assert: this.assToAdd.assert, p1: this.assToAdd.p1, p2: this.assToAdd.p2, p3: this.assToAdd.p3, descr: this.assToAdd.descr, editingAss: false})
  it.addingAss = false
  this.assToAdd.assert = 'deepEqual'
  this.assToAdd.p1 = null
  this.assToAdd.p2 = null
  this.assToAdd.p3 = null
  this.assToAdd.descr = null
  this.buildTests();

  },
  pushIts: function(index){
  this.tests[index].describe.its.push({itsDescr: this.itToPush.descr, assertions: this.itToPush.assertions, addingAss: false, editingIt: false})
  this.itToPush = {};
  this.itToPush.descr = null;
  this.itToPush.assertions = [];
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
  [{editingIt: true, assertions: [{assert: 'deepEqual', p1: null, p2: null, p3: null, descr: null, editingAss: true}], addingAss: false}]}})
  },
  buildTests: function (){
  var code = ''
  for (var i = 0; i < this.tests.length; i++){
  var itsCode = '';
  for (var its = 0; its < this.tests[i].describe.its.length; its++){
  var assertCode = '';
  for (var ass = 0; ass < this.tests[i].describe.its[its].assertions.length; ass++){
  assertCode += 'assert.'+this.tests[i].describe.its[its].assertions[ass].assert+'('+this.tests[i].describe.its[its].assertions[ass].p1
  var len = this.evaluate('chai.assert.'+ this.tests[i].describe.its[its].assertions[ass].assert +'.length')
  if (len > 2){
    assertCode += ', ' + this.tests[i].describe.its[its].assertions[ass].p2
    if (len > 3){
      assertCode += ', ' + this.tests[i].describe.its[its].assertions[ass].p3
    }
  }
  assertCode += ', "' + this.tests[i].describe.its[its].assertions[ass].descr
  assertCode += '")\n'
  }
   itsCode += 'it("'+this.tests[i].describe.its[its].itsDescr+'", function(){\n'+assertCode+'})\n'
  }
    code += 'describe("'+this.tests[i].describe.name+'", function(){\n'+ itsCode +'})\n'
  }
  tests.innerHTML = '<code class="lang-eval-js">'+ 'assert = chai.assert\n mocha.suite.suites = []\n mocha.setup("bdd")\n'+ code+'</code>'
  reLoad()
  }
  },
  mounted: function(){
  reLoad();
  vm = this;
  this.chai = chai
  this.buildTests()

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
font-family: 'Bitter', serif;
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
border-bottom: solid 2px #90B4FE;
}
</style>
