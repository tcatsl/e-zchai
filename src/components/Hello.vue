<template>
<div>
Code:
<pre><code class="lang-eval-js">

var x = 9
</code></pre>
<div id="mocha"></div>
<v-btn id="add" v-on:click.native="addTest()">Add Test</v-btn>
<v-btn id = "runTest" v-on:click.native="rUn()">Run Tests</v-btn>

Tests:
<pre v-show="true == false"><code class=" hidden lang-eval-js" data-external-libs="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js, https://cdnjs.cloudflare.com/ajax/libs/chai/4.0.0/chai.min.js" data-loop-msec="1000">
</code>
</pre>
<pre id="tests"><code id="testcode" class="lang-eval-js" data-external-libs="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js, https://cdnjs.cloudflare.com/ajax/libs/chai/4.0.0/chai.min.js">
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
var vm;
var assertions = ["fail","isOk","isNotOk","equal","notEqual","strictEqual","notStrictEqual","deepStrictEqual","deepEqual","notDeepEqual","isAbove","isAtLeast","isBelow","isAtMost","isTrue","isNotTrue","isFalse","isNotFalse","isNull","isNotNull","isNaN","isNotNaN","exists","notExists","isUndefined","isDefined","isFunction","isNotFunction","isObject","isNotObject","isArray","isNotArray","isString","isNotString","isNumber","isNotNumber","isFinite","isBoolean","isNotBoolean","typeOf","notTypeOf","instanceOf","notInstanceOf","include","notInclude","deepInclude","notDeepInclude","nestedInclude","notNestedInclude","deepNestedInclude","notDeepNestedInclude","ownInclude","notOwnInclude","deepOwnInclude","notDeepOwnInclude","match","notMatch","property","notProperty","propertyVal","notPropertyVal","deepPropertyVal","notDeepPropertyVal","ownProperty","notOwnProperty","ownPropertyVal","notOwnPropertyVal","deepOwnPropertyVal","notDeepOwnPropertyVal","nestedProperty","notNestedProperty","nestedPropertyVal","notNestedPropertyVal","deepNestedPropertyVal","notDeepNestedPropertyVal","lengthOf","hasAnyKeys","hasAllKeys","containsAllKeys","doesNotHaveAnyKeys","doesNotHaveAllKeys","hasAnyDeepKeys","hasAllDeepKeys","containsAllDeepKeys","doesNotHaveAnyDeepKeys","doesNotHaveAllDeepKeys","throws","doesNotThrow","operator","closeTo","approximately","sameMembers","notSameMembers","sameDeepMembers","notSameDeepMembers","sameOrderedMembers","notSameOrderedMembers","sameDeepOrderedMembers","notSameDeepOrderedMembers","includeMembers","notIncludeMembers","includeDeepMembers","notIncludeDeepMembers","includeOrderedMembers","notIncludeOrderedMembers","includeDeepOrderedMembers","notIncludeDeepOrderedMembers","oneOf","changes","changesBy","doesNotChange","changesButNotBy","increases","increasesBy","doesNotIncrease","increasesButNotBy","decreases","decreasesBy","doesNotDecrease","doesNotDecreaseBy","decreasesButNotBy","ifError","isExtensible","isNotExtensible","isSealed","isNotSealed","isFrozen","isNotFrozen","isEmpty","isNotEmpty","ok","notOk","throw","Throw","extensible","notExtensible","sealed","notSealed","frozen","notFrozen","empty","notEmpty"]

 function reLoad(){
  if (!!script){
    script = null
  }
  var script = document.createElement("script");
  script.id = "repl"
  script.src = "https://storage.googleapis.com/app.klipse.tech/plugin_prod/js/klipse_plugin.min.js";

   document.body.append(script)
   setTimeout(function(){
   var final = document.getElementsByClassName("cm-s-default")
   final[final.length -1 ].innerHTML = ""}, 1000)
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
  tests: []
  }
  },
  methods: {
  rUn: function(){
  document.getElementById("mocha").innerHTML = ""
resetTests(mocha.suite);
mocha.run();
  },
  addTest: function(){
  this.tests.push({describe: {name:'x', its:
  [{itsDescr: 'should not equal 9', assertions: [{assert:'notEqual', p1: 'x', p2: '9', p3: null, descr:'should not equal 9'}]}]}})
  var code = ''
  for (var i = 0; i < this.tests.length; i++){
  var itsCode = '';
  for (var its = 0; its < this.tests[i].describe.its.length; its++){
  console.log(this.tests[i].describe.its[its])
  var assertCode = '';
  for (var ass = 0; ass < this.tests[i].describe.its[its].assertions.length; ass++){
  assertCode += 'assert.'+this.tests[i].describe.its[its].assertions[ass].assert+'('+this.tests[i].describe.its[its].assertions[ass].p1+', '+this.tests[i].describe.its[its].assertions[ass].p2+', )\n'
  }
   itsCode += 'it("'+this.tests[i].describe.its[its].itsDescr+'", function(){\n'+assertCode+'})\n'
  }
    code += 'describe("'+this.tests[i].describe.name+'", function(){\n'+ itsCode +'})\n'
  }
  tests.innerHTML = '<code class="lang-eval-js">'+ 'assert = chai.assert\n mocha.suite.suites = []\n mocha.setup("bdd")\n'+ code+'</code>'
  reLoad()
  }
  },
  mounted: function(){reLoad();
  vm = this;
  vm.assertions = assertions
  }
}
</script>
