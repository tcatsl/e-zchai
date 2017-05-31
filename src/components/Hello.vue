<template>
<div>
Code:
<pre><code class="lang-eval-js">

var x = 9
</code></pre>
<div id="mocha"></div>
<button id = "runTest" v-on:click="rUn()">Run tests</button>
Tests:
</button>
<pre v-show="true == false"><code class=" hidden lang-eval-js" data-external-libs="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js, http://chaijs.com/chai.js">
assert = chai.assert
mocha.suite.suites = []
mocha.setup("bdd")
</code>
</pre>
<pre id="tests"><code class="lang-eval-js" data-external-libs="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js, http://chaijs.com/chai.js">
  describe('x', function() {
    it('should not equal 9', function() {
      assert.notEqual(9, x);
  });
});
</code></pre>

</div>
</template>

<script>
var assertions = ["fail","isOk","isNotOk","equal","notEqual","strictEqual","notStrictEqual","deepStrictEqual","deepEqual","notDeepEqual","isAbove","isAtLeast","isBelow","isAtMost","isTrue","isNotTrue","isFalse","isNotFalse","isNull","isNotNull","isNaN","isNotNaN","exists","notExists","isUndefined","isDefined","isFunction","isNotFunction","isObject","isNotObject","isArray","isNotArray","isString","isNotString","isNumber","isNotNumber","isFinite","isBoolean","isNotBoolean","typeOf","notTypeOf","instanceOf","notInstanceOf","include","notInclude","deepInclude","notDeepInclude","nestedInclude","notNestedInclude","deepNestedInclude","notDeepNestedInclude","ownInclude","notOwnInclude","deepOwnInclude","notDeepOwnInclude","match","notMatch","property","notProperty","propertyVal","notPropertyVal","deepPropertyVal","notDeepPropertyVal","ownProperty","notOwnProperty","ownPropertyVal","notOwnPropertyVal","deepOwnPropertyVal","notDeepOwnPropertyVal","nestedProperty","notNestedProperty","nestedPropertyVal","notNestedPropertyVal","deepNestedPropertyVal","notDeepNestedPropertyVal","lengthOf","hasAnyKeys","hasAllKeys","containsAllKeys","doesNotHaveAnyKeys","doesNotHaveAllKeys","hasAnyDeepKeys","hasAllDeepKeys","containsAllDeepKeys","doesNotHaveAnyDeepKeys","doesNotHaveAllDeepKeys","throws","doesNotThrow","operator","closeTo","approximately","sameMembers","notSameMembers","sameDeepMembers","notSameDeepMembers","sameOrderedMembers","notSameOrderedMembers","sameDeepOrderedMembers","notSameDeepOrderedMembers","includeMembers","notIncludeMembers","includeDeepMembers","notIncludeDeepMembers","includeOrderedMembers","notIncludeOrderedMembers","includeDeepOrderedMembers","notIncludeDeepOrderedMembers","oneOf","changes","changesBy","doesNotChange","changesButNotBy","increases","increasesBy","doesNotIncrease","increasesButNotBy","decreases","decreasesBy","doesNotDecrease","doesNotDecreaseBy","decreasesButNotBy","ifError","isExtensible","isNotExtensible","isSealed","isNotSealed","isFrozen","isNotFrozen","isEmpty","isNotEmpty","ok","notOk","throw","Throw","extensible","notExtensible","sealed","notSealed","frozen","notFrozen","empty","notEmpty"]
function runMochaTests() {
  Object.keys( require.cache ).forEach( function( file ) {
      delete require.cache[ file ];
  } );

  var mocha = new Mocha();

  mocha.addFile( 'run_test.js' );

  mocha.run();
}
 function reLoad(){

  var script = document.createElement("script");
  script.id = "repl"
  script.src = "https://storage.googleapis.com/app.klipse.tech/plugin_prod/js/klipse_plugin.min.js";
   document.body.append(script)
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
  methods: {
  rUn: function(){
  document.getElementById("mocha").innerHTML = ""
resetTests(mocha.suite);
mocha.run();
  }
  },
  mounted: reLoad()
}
</script>
