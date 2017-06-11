<template>
  <v-layout>
    <v-flex xs12>
      <div>
        <auth id="stuff4" :tests.sync="tests" :code.sync="code" :envname.sync="envname"></auth>
        <pre v-on:keyup.native="buildTests()" id="codebox">
          <code class="lang-eval-js">
          var x = 9
          </code>
        </pre>

        <div id="mocha">
          <h5>
            <b>Test results will appear here.</b>
          </h5>
        </div>
        <div class="text-xs-center"  id="run">
          <v-btn id = "runTest" v-on:click.native="rUn()"><h6 id="hsix"><b>Run Tests</b></h6></v-btn>
        </div>
        <div id="testList">
          <h5><b>Tests:</b></h5>
          <h6>
            <v-btn floating small v-on:click.native="addTest()" class="green accent-3" id="add1" >
              <v-icon>add</v-icon>
            </v-btn>
            &nbsp;<b>Describe:</b>
          </h6>
          <v-expansion-panel id="foo" v-height>
            <v-expansion-panel-content v-clickme v-bind:value="index === tests.length-1"v-for="(test, index) in tests" :key="index" >
              <div class="descrhead" slot="header">
                <v-btn floating small v-on:click.native.capture.stop.prevent="removeTest(index)" class="red lighten-1">
                  <v-icon>clear</v-icon>
                </v-btn>
                <span class="text-xs-center">
                  <v-btn floating small v-show="test.describe.editingDescr == false" v-on:click.native.capture.stop.prevent="editDescr(test.describe)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn floating small v-show="test.describe.editingDescr == true" v-on:click.native.capture.stop.prevent="finishEditDescr(test.describe)" class="green accent-1">
                    <v-icon>done</v-icon>
                  </v-btn>
                </span>
                &nbsp;{{test.describe.name}}
                <div v-show="test.describe.editingDescr == true">
                  <v-text-field @keyup.native="buildTests" autofocus v-on:click.native.capture.prevent.stop="func" label="The name of the thing you are testing:" v-model="test.describe.name">
                  </v-text-field>
                </div>
              </div>
              <v-card>
                <v-card-text>
                  <p>
                    &nbsp;&nbsp;<h6>
                      <v-btn floating small v-on:click.native.capture.stop.prevent="pushIts(index)" class="green accent-3" id="add2" ><v-icon>add</v-icon>
                      </v-btn>
                      <b>It:</b>
                    </h6>
                  </p>
                  <v-expansion-panel v-height>
                    <v-expansion-panel-content v-clickme v-bind:value="index4 === test.describe.its.length-1" v-for="(it, index4) in test.describe.its" :key="index4" >
                      <div class="itshead" slot="header">
                        <v-btn floating small v-on:click.native.capture.stop.prevent="removeIts(index, index4)" class="red lighten-1" >
                          <v-icon>clear</v-icon>
                        </v-btn>
                        <v-btn floating small v-show="it.editingIt == false" v-on:click.native.stop.prevent="editIt(it)">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn floating small class="green accent-1" v-show="it.editingIt == true" v-on:click.native.capture.stop.prevent="finishEditIt(it)">
                          <v-icon>done</v-icon>
                        </v-btn>
                         &nbsp;{{it.itsDescr}} <v-text-field @keyup.native="buildTests" v-show="it.editingIt == true" v-on:click.native.capture.prevent.stop="func" label="(should...):" v-model="it.itsDescr">
                         </v-text-field>
                       </div>
                       <v-card>
                         <v-card-text>
                           <p>
                             &nbsp;&nbsp;<h6>
                              <v-btn floating small class="green accent-3" v-on:click.native.capture.stop.prevent="pushAssertion(index, index4, it)"   id="add3">
                                <v-icon>add</v-icon>
                              </v-btn>
                              <b>Assertions (<a href="http://chaijs.com/api/assert/" target="_blank">reference</a>):</b>
                            </h6>
                          </p>
                          <v-expansion-panel  v-height>
                            <v-expansion-panel-content @click.native="editAssertion(index, index4, assertion, $event)" v-clickme v-bind:value="index5 === it.assertions.length-1" v-bind:key="'assertion' + index5"  v-for="(assertion, index5) in it.assertions">
                              <div @click.native="editAssertion(index, index4, assertion, $event)" slot="header">
                                <v-btn floating small v-on:click.native.capture.stop.prevent="removeAssertion(index, index4, index5)" class="red lighten-1">
                                  <v-icon>clear</v-icon>
                                </v-btn>
                                <v-btn class="green accent-1" v-show="(assertion.editingAssertion== true)" floating small>
                                  <v-icon>done</v-icon>
                                </v-btn>
                                <v-btn floating small v-show="(assertion.editingAssertion== false)">
                                  <v-icon>edit</v-icon>
                                </v-btn>
                                &nbsp;&nbsp;{{assertion['p'+(assertion.params.length)]}}
                              </div>
                              <v-card>
                                <v-card-text>
                                  <div class="eeee" >
                                    <v-select @keyup.native="buildTests" id="editAssertionSelect" ref="editAssertionSelect" autofocus :autocomplete="true" auto v-bind:items="assertions" :on-change="func(assertion)" @keydown.tab.capture.native="tab2($event)"  v-model="assertion.assert" label="Assertion:">
                                    </v-select>
                                    <v-text-field @keyup.native="buildTests" @click.native.capture.stop.prevent="" ref="stuffo" v-for="(param, index9) in assertion.params" v-bind:label="param" v-model="assertion['p'+ (index9+1)]">
                                    </v-text-field>
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
        <pre id="tests">
          <code id="testcode" class="lang-eval-js">
            assert = chai.assert
            mocha.suite.suites = []
          </code>
        </pre>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { isLoggedIn, getIdToken, login, logout, returnEmail } from '../auth';
import Auth from '@/components/auth'
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
}
function resetTests(suite) {
  suite.tests.forEach(function(t) {
    delete t.state;
    t.timedOut = false;
  });
  suite.suites.forEach(resetTests);
}
export default {
  name: 'env',
  props: ['id'],
  data: function(){
    return {
      user: null,
      envname: null,
      code: '',
      re1: /expansion-panel__header--active/g,
      assertions: ["assert","fail","isOk","isNotOk","equal","notEqual","strictEqual","notStrictEqual","deepEqual","notDeepEqual","isAbove","isAtLeast","isBelow","isAtMost","isTrue","isNotTrue","isFalse","isNotFalse","isNull","isNotNull","isNaN","isNotNaN","exists","notExists","isUndefined","isDefined","isFunction","isNotFunction","isObject","isNotObject","isArray","isNotArray","isString","isNotString","isNumber","isNotNumber","isFinite","isBoolean","isNotBoolean","typeOf","notTypeOf","instanceOf","notInstanceOf","include","notInclude","deepInclude","notDeepInclude","nestedInclude","notNestedInclude","deepNestedInclude","notDeepNestedInclude","ownInclude","notOwnInclude","deepOwnInclude","notDeepOwnInclude","match","notMatch","property","notProperty","propertyVal","notPropertyVal","deepPropertyVal","notDeepPropertyVal","nestedProperty","notNestedProperty","nestedPropertyVal","notNestedPropertyVal","deepNestedPropertyVal","notDeepNestedPropertyVal","lengthOf","hasAnyKeys","hasAllKeys","containsAllKeys","doesNotHaveAnyKeys","doesNotHaveAllKeys","hasAllDeepKeys","containsAllDeepKeys","doesNotHaveAnyDeepKeys","doesNotHaveAllDeepKeys","throws","doesNotThrow","operator","closeTo","approximately","sameMembers","notSameMembers","sameDeepMembers","notSameDeepMembers","sameOrderedMembers","notSameOrderedMembers","sameDeepOrderedMembers","notSameDeepOrderedMembers","includeMembers","notIncludeMembers","includeDeepMembers","notIncludeDeepMembers","includeOrderedMembers","notIncludeOrderedMembers","includeDeepOrderedMembers","notIncludeDeepOrderedMembers","oneOf","changes","changesBy","doesNotChange","changesButNotBy","increases","increasesBy","doesNotIncrease","increasesButNotBy","decreases","decreasesBy","doesNotDecrease","decreasesButNotBy","ifError","isExtensible","isNotExtensible","isSealed","isNotSealed","isFrozen","isNotFrozen","isEmpty","isNotEmpty"].map(function(el, ind, arr){
        return {text: el, value: el}
      }),
      params:[["expression to test for truthiness","message"],["actual","expected","message","operator"],["object","message"],["object","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["valuetocheck","valuetobeabove","message"],["valuetocheck","valuetobeatleast","message"],["valuetocheck","valuetobebelow","message"],["valuetocheck","valuetobeatmost","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","name","message"],["value","name","message"],["object","constructor","message"],["object","constructor","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["value","regexp","message"],["value","regexp","message"],["object","property","message"],["object","property","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","message"],["object","property","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","length","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["hasanydeepkeysobject","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["fn","errorlikestringregexp","stringregexp","message"],["fn","errorlikestringregexp","stringregexp","message"],["val1","operator","val2","message"],["actual","expected","delta","message"],["actual","expected","delta","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["inlist","list","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["byfunction","object","property","delta","message"],["function","object","property","delta","message"],["object"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["target", "message"],["target", "message"]],
      itToPush: {itsDescr: null, assertions: [{}], addingIt: true, editingIt: false},
      names: [],
      assertionToAdd: {
        length: null,
        assert: 'assert',
        p1: null,
        p2: null,
        p3: null,
        descr: null,
        params: [],
        editingAssertion: true
      },
      tests: [],
      boundExPanContent: []
    }
  },
  methods: {
    checkEmail: function(){
      var z = !!isLoggedIn()
      return (this.user == returnEmail())
    }
    tab2: function (e) {
      var d = e.currentTarget
      var z = document.createEvent('HTMLEvents')
      z.initEvent('keydown', true, true)
      z.keyCode = 13
      e.currentTarget.dispatchEvent(z)

      if (!!this.$refs.boundExPanContent){
        setTimeout(function(){
          vm.$forceUpdate()
          vm.$refs.boundExPanContent[0].focus()
        })
      }
    },
    show: function(el){
    // alert("stoopid")
    },
    func: function (assertion){

      if (this.params[0][0] == "expression to test for truthiness" && !!assertion){
        assertion.params = this.params[this.names.indexOf(assertion.assert)]
        this.buildTests()
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
    finishEditAssertion: function(assertion) {
      assertion.editingAss = false;
      this.buildTests();
    },
    editAssertion: function(index, index2, assertion, e){
      if
      (e.srcElement.classList.toString() != 'card__text'){
        if (assertion.editingAssertion == false){
          for (var h = 0; h < this.tests[index].describe.its[index2].assertions.length; h++){
            this.tests[index].describe.its[index2].assertions[h].editingAssertion = false;
          }
          assertion.editingAssertion = true;
          setTimeout(function() {
            vm.$forceUpdate()
          })
        } else {
          for (var h = 0; h <  this.tests[index].describe.its[index2].assertions.length; h++){
            this.tests[index].describe.its[index2].assertions[h].editingAssertion = false;
          }
          this.buildTests();
        }
      } else {
        e.preventDefault()
        return
      }
    },
    pushAssertion: function(index, index2, it){

      for (var h = 0; h < this.tests[index].describe.its[index2].assertions.length; h++){
        this.tests[index].describe.its[index2].assertions[h].editingAssertion = false;
      }
      this.tests[index].describe.its[index2].assertions.push({assert: this.assertionToAdd.assert, p1: this.assertionToAdd.p1, p2: this.assertionToAdd.p2, p3: this.assertionToAdd.p3, p4: this.assertionToAdd.p4, params: this.assertionToAdd.params, descr: this.assertionToAdd.descr, editingAss: true})
      it.addingAss = false
      this.assertionToAdd.editingAss = true;
      this.addingAss = false;
      this.assertionToAdd.assert = 'assert'
      this.assertionToAdd.p1 = null;
      this.assertionToAdd.p2 = null;
      this.assertionToAdd.p3 = null;
      this.assertionToAdd.p4 = null;
      this.assertionToAdd.descr = null;
      this.assertionToAdd.params = this.params[0];
      this.buildTests();

    },
    pushNewAssertion: function(index, index2, it){
      this.tests[index].describe.its[index2].assertions.push({assert: 'assert', p1: null, p2: null, p3: null, p4: null, params: this.params[0], descr: null, editingAss: true})
      this.editingAssertion = false;
      this.assertionToAdd.assert = 'assert'
      this.assertionToAdd.p1 = null;
      this.assertionToAdd.p2 = null;
      this.assertionToAdd.p3 = null;
      this.assertionToAdd.descr = null;
      this.assertionToAdd.params = null;
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
      this.itToPush.assertions = [{assert: 'assert', p1: null, p2: null, p3: null, p4: null, descr: null, editingAssertion: true, params: this.params[0]}];
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
    removeTest: function (index) {
      this.tests.splice(index, 1);
      this.buildTests()
    },
    removeIts: function (index, index2) {
      this.tests[index].describe.its.splice(index2, 1);
      this.buildTests()
    },
    removeAssertion: function (index, index2, index3){
      for (var i = 0; i < this.tests[index].describe.its[index2].assertions.length; i++){
        this.tests[index].describe.its[index2].assertions[i].editingAssertion = false
      }

      this.tests[index].describe.its[index2].assertions.splice(index3, 1)
      if (!!this.tests[index].describe.its[index2].assertions[this.tests[index].describe.its[index2].assertions.length -1]){
        this.tests[index].describe.its[index2].assertions[this.tests[index].describe.its[index2].assertions.length -1].editingAssertion = true
      }
      this.buildTests()
      this.tests[index].describe.its[index2].editingIt = false
      this.addingIt ==false
    },
    addTest: function(){
      for (var z = 0; z< this.tests.length; z++){
        this.tests[z].describe.editingDescr = false;
      }
      this.editingAssertion=true;
      this.tests.push({
        addingIt: false,
        describe: {
          editingDescr: true,
          name:'',
          its: [{
            editingIt: true,
            itsDescr: null,
            assertions: [{
              assert: 'assert',
              p1: null,
              p2: null,
              p3: null,
              p4: null,
              editingAssertion: true,
              params: this.params[0]
            }]
          }]
        }
      })
    },
    testBuildTimeout: null,
    buildTests: function (){
      clearTimeout(vm.testBuildTimeout)
      vm.testBuildTimeout = setTimeout(function(){
        var code = ''
        for (var i = 0; i < vm.tests.length; i++){
          var itsCode = '';
          for (var its = 0; its < vm.tests[i].describe.its.length; its++){
            var assertCode = '';
            for (var assertion = 0; assertion < vm.tests[i].describe.its[its].assertions.length; assertion++){

              assertCode += 'assert'
              if (vm.tests[i].describe.its[its].assertions[assertion].assert == "assert"){
                assertCode += '('+vm.tests[i].describe.its[its].assertions[assertion].p1 + ', '+JSON.stringify(vm.tests[i].describe.its[its].assertions[assertion].p2) + ')\n'
              } else {
                var len = vm.evaluate('chai.assert.'+ vm.tests[i].describe.its[its].assertions[assertion].assert +'.length')
                if (len > 0){
                  if (vm.tests[i].describe.its[its].assertions[assertion].params[0] != 'message'){
                    assertCode += '.'+vm.tests[i].describe.its[its].assertions[assertion].assert+'('+vm.tests[i].describe.its[its].assertions[assertion].p1
                  }else {
                    assertCode += ', ' + JSON.stringify(vm.tests[i].describe.its[its].assertions[assertion].p1)
                  }
                  if (len > 1){
                    if (vm.tests[i].describe.its[its].assertions[assertion].params[1] != 'message'){
                      assertCode += ', ' + vm.tests[i].describe.its[its].assertions[assertion].p2
                    } else {
                      assertCode += ', ' + JSON.stringify(vm.tests[i].describe.its[its].assertions[assertion].p2)
                    }
                    if (len > 2){
                      if  (vm.tests[i].describe.its[its].assertions[assertion].params[2] != 'message'){
                        assertCode += ', ' +  vm.tests[i].describe.its[its].assertions[assertion].p3
                      }else {
                        assertCode += ', ' + JSON.stringify(vm.tests[i].describe.its[its].assertions[assertion].p3)
                      }
                      if (len > 3){
                        if (vm.tests[i].describe.its[its].assertions[assertion].params[3] != 'message'){
                          assertCode += ', ' + vm.tests[i].describe.its[its].assertions[assertion].p4
                        } else {
                          assertCode += ', ' + JSON.stringify(vm.tests[i].describe.its[its].assertions[assertion].p4)
                        }
                      }
                    }
                  }
                }
                assertCode += ')\n'
              }
            }
            itsCode += 'it("'+vm.tests[i].describe.its[its].itsDescr+'", function(){\n'+assertCode+'})\n'
          }
          code += 'describe("'+vm.tests[i].describe.name+'", function(){\n'+ itsCode +'})\n'
        }
        tests.innerHTML = '<code class="lang-eval-js">'+ 'assert = chai.assert\n mocha.suite.suites = []\n'+ code+'</code>'
        reLoad()
        if (!!vm.id && !!vm.checkEmail() && !!document.getElementsByClassName('cm-s-default')[0]){
          var myHeaders = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer "+getIdToken(),
          })
          var myInit = {
            method: 'put',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
              private: false,
              tests: JSON.stringify(vm.tests),
              name: vm.name,
              code: document.getElementsByClassName('cm-s-default')[0].innerText
            })
          }
          fetch('https://ezchaiserver.herokuapp.com/env/'+vm.id, myInit).then(function(res){
            res.json().then(function(json){
            })
          })
        }
      }, 500)
    }
  },
  mounted: function(){
    this.itToPush.assertions = [{
      assert: 'assert',
      p1: null,
      p2: null,
      p3: null,
      p4: null,
      editingAssertion: true,
      params: this.params[0]
    }]
    this.names = this.assertions.map(function(el, ind, arr){
      return el.text
    })
    vm = this;
    this.chai = chai
    mocha.setup("bdd")
    var myHeaders = new Headers({
      "Authorization": "Bearer "+getIdToken() || null,
    })
    var myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    }
    if (!!this.id){
      if (!!isLoggedIn() && vm.checkEmail()){
        fetch('https://ezchaiserver.herokuapp.com/env/'+this.id, myInit).then(function(data){
          data.json().then(function(json){
            vm.tests = JSON.parse(json[0].tests)
            document.getElementById('codebox').innerHTML = '<code class="lang-eval-js">'+ json[0].code+'</code>'
            vm.name = json[0].name
            vm.id = json[0].short_id
            vm.user = json[0].users_email
            vm.buildTests()
          })
        })
      } else {
        fetch('https://ezchaiserver.herokuapp.com/env/'+this.id).then(function(data){
          data.json().then(function(json){
            vm.tests = JSON.parse(json[0].tests)
            document.getElementById('codebox').innerHTML = '<code class="lang-eval-js">'+ json[0].code+'</code>'
            vm.name = json[0].name
            vm.id = json[0].short_id
            vm.user = json[0].users_email
            vm.buildTests()
          })
        })
      }
    } else {
      vm.tests = []
      document.getElementById('codebox').innerHTML = '<code class="lang-eval-js">'+ 'var x = 9'+'</code>'
      vm.name = undefined
      vm.id = undefined
      vm.user = 'Bob'
      vm.buildTests()
    }
    document.getElementById("codebox").addEventListener('keyup', function(e){vm.buildTests()})
  },
  directives: {
    height: {
    // When the bound element is inserted into the DOM...
      inserted: function (el1) {
      // Focus the element
        setTimeout(function(){
          var z = document.getElementsByClassName('expansion-panel__body')
      // alert(z.length)
          var q = document.getElementsByClassName('expansion-panel__header')
          var c = el1.children
          Array.prototype.forEach.call(z, function(el, ind, arr){
            if (el1.contains(el) || el1 == el  || el1.parentNode.parentNode.parentNode == el) {
              el.style.height = "auto"
            }
          })
          Array.prototype.forEach.call(q, function(el, ind, arr){
            if (el1.contains(el) || el1 == el || el1.parentNode.parentNode.parentNode == el  || el1.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode == el) {
              el.style.height = "auto"
            }
          })
        }, 1500)
      }
    },
    clickme: {
      unbind: function(el){
        for (var i = 0; i < vm.stuff.length; i++){
          if (vm.boundExPanContent[i].el == el && !!vm.boundExPanContent[i].p.children[vm.boundExPanContent[i].p.children.length -1]){
            vm.boundExPanContent[i].p.children[vm.boundExPanContent[i].p.children.length -1].click()
            vm.boundExPanContent[i].p.children[vm.boundExPanContent[i].p.children.length -1].click()
          }
        }
      },
      inserted: function(el){
        setTimeout(function(){el.click(); el.click()
          vm.boundExPanContent = []
          vm.boundExPanContent.push({
            el: el,
            p: el.parentElement
          })
        })
      }
    }
  },
  components: {
    'auth': Auth
  }
}
</script>
<style>
#app, #yo{
  padding: 10px;
}
.menu .menu__content, .list {
  position: static;
}
.menu .menu__content{
  top: 0;
}
* {
  font-family: 'Roboto Mono', monospace;
}
.CodeMirror  .CodeMirror-lines *{
  font-family: 'Roboto Mono', monospace;
}
#testList {
  border-right: solid 2px #90B4FE;
  border-left: solid 2px #90B4FE;
  border-top: solid 2px #90B4FE;
  padding: 10px;
}
#final {
  border: 0;
}
#mocha{
  border-right: solid 2px #90B4FE;
  border-left: solid 2px #90B4FE;
  padding: 40px;
  margin: 0;
}
pre{
  border: solid 1px #90B4FE;
}
#run{
  border-top: solid 2px #90B4FE;
  box-shadow: 0;
}
button {
  margin: 6px;
}
.btn.btn--raised{
  box-shadow: none;
}
.btn.btn--floating{
  height: 16px;
  margin: 0;
  bottom: 1px;
  box-shadow: none;
}
.btn--floating.btn--small .icon {
  font-size: 10px;
  position: inherit;
}
ul {
  padding-left: 40px;
  list-style: inside;
}
#runTest{
  width: 100% !important;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 6px !important;
  margin-left: 0;
  margin-right: 0;
}
input {
  width: 100%;
}
.expansion-panel__header--active:after{
  float: right;
}
#mocha-stats{
  position: static !important;
}
.expansion-panel__header{
  padding-top: 0px;
  display: inline-flex;
  width: 100%;
}
.expansion-panel__header > *{
  width: 98%;
}
.expanion-panel__body, .expansion-panel, .expansion-panel__header {
  height: auto !important;
}
.expansion-panel__header{
  padding: 5px;
  box-shadow: none;
  border-bottom: 1px solid #10B42E;
  border-top: 1px solid #10B42E;
}
.expansion-panel>li:last-child >div:first-child:not(.expansion-panel__header--active){
  border-bottom-width: 0px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.expansion-panel li:last-child >div> .card{
  border-bottom-width: 0px !important;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.expansion-panel > li:first-child >div:first-child{
  border-top-left-radius: 5px !important;
  border-top-right-radius: 5px !important;
}
.input-group--text-field{
  padding-bottom: 0;
  margin-bottom: 0;
}
.input-group__details{
  min-height: 2px;
  height: 2px;
}
.expansion-panel .expansion-panel{
  margin-bottom: 5px;
}
.expansion-panel{
  border-radius: 8px;
  margin-right: 5px;
  border-top: 0;
}
.expansion-panel .expansion-panel{
  border: 2px solid #F0B09E;
  width: inherit !important;
  border-top: 1px solid #F0B09E;
}
.expansion-panel .expansion-panel .expansion-panel {
  width: inherit !important;
  border: 2px solid #F020FE;
  border-top: 1px solid #F020FE;
}

.expansion-panel .expansion-panel .expansion-panel .expansion-panel__header{
  border-bottom: 1px solid #F020FE;
  border-top: 1px solid #F020FE;
  margin: 0;
}
.expansion-panel li{
  border: 0;
}
.expansion-panel .expansion-panel .expansion-panel .card__text{
  width: 98% !important;
}
.expansion-panel .expansion-panel .expansion-panel__header{
  border-bottom: 1px solid #F0B09E;
  border-top: 1px solid #F0B09E;
}
#add1{
  background-color: #10B42E;
}
#add2{
  background-color: #F0B09E;
}
#add3 {
  background-color: #F020FE;
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
  box-shadow: none;
}
.card__text .expansion-panel__header{
  width: 100% !important;
}
.card {
  z-index: 0;
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
.expansion-panel .expansion-panel .expansion-panel .card {
  border-bottom: 1px solid #F020FE;
}
.expansion-panel .expansion-panel .card {
  border-bottom: 1px solid #F0B09E;
}

.expansion-panel .card {
  border-bottom: 1px solid  #10B42E;
}
.card__text p {
  margin-bottom: 0px;
}
p{
  margin-bottom: 0px;
  margin-top: 0px;
}
#klipse-container-1.klipse-container, #klipse-container-0.klipse-container{
  display: none;
}
.expansion-panel .expansion-panel__header i {
  margin-right: 0;
}
#mocha {
  height: auto !important;
}
.expansion-panel .v-btn {

}
.btn--floating.btn--small .icon {
  height: 16px;
}
#add1 {
  border-radius: 30%;
}
#add1, #add2, #add3 {
  margin-left: 7px;
  border-radius: 3px;
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
  font-size: 18px;
}
#tests > .cm-s-default:nth-child(0n + 2) {
  display: none !important;
}
#hsix{
  padding: 3px;
}
h5 {
  margin-left: 10px;
}
.CodeMirror-hscrollbar, .CodeMirror-hscrollbar{
  z-index: 3 !important;
}
#stuff4{
  margin-top: 10px;
}
#yo{
  padding-bottom: 20px;
  padding-right: 0;
  padding-left: 0;
  margin-left: 0;
  margin-right: 0;
  height: auto;
}
.dialog__container{
  float: right;
}
#mocha .test pre.error{
  color: black !important;
}
</style>
