export var assertions = ["assert","fail","isOk","isNotOk","equal","notEqual","strictEqual","notStrictEqual","deepEqual","notDeepEqual","isAbove","isAtLeast","isBelow","isAtMost","isTrue","isNotTrue","isFalse","isNotFalse","isNull","isNotNull","isNaN","isNotNaN","exists","notExists","isUndefined","isDefined","isFunction","isNotFunction","isObject","isNotObject","isArray","isNotArray","isString","isNotString","isNumber","isNotNumber","isFinite","isBoolean","isNotBoolean","typeOf","notTypeOf","instanceOf","notInstanceOf","include","notInclude","deepInclude","notDeepInclude","nestedInclude","notNestedInclude","deepNestedInclude","notDeepNestedInclude","ownInclude","notOwnInclude","deepOwnInclude","notDeepOwnInclude","match","notMatch","property","notProperty","propertyVal","notPropertyVal","deepPropertyVal","notDeepPropertyVal","nestedProperty","notNestedProperty","nestedPropertyVal","notNestedPropertyVal","deepNestedPropertyVal","notDeepNestedPropertyVal","lengthOf","hasAnyKeys","hasAllKeys","containsAllKeys","doesNotHaveAnyKeys","doesNotHaveAllKeys","hasAllDeepKeys","containsAllDeepKeys","doesNotHaveAnyDeepKeys","doesNotHaveAllDeepKeys","throws","doesNotThrow","operator","closeTo","approximately","sameMembers","notSameMembers","sameDeepMembers","notSameDeepMembers","sameOrderedMembers","notSameOrderedMembers","sameDeepOrderedMembers","notSameDeepOrderedMembers","includeMembers","notIncludeMembers","includeDeepMembers","notIncludeDeepMembers","includeOrderedMembers","notIncludeOrderedMembers","includeDeepOrderedMembers","notIncludeDeepOrderedMembers","oneOf","changes","changesBy","doesNotChange","changesButNotBy","increases","increasesBy","doesNotIncrease","increasesButNotBy","decreases","decreasesBy","doesNotDecrease","decreasesButNotBy","ifError","isExtensible","isNotExtensible","isSealed","isNotSealed","isFrozen","isNotFrozen","isEmpty","isNotEmpty"].map(function(el, ind, arr){
  return {text: el, value: el}
})

export var params = [["expression to test for truthiness","message"],["actual","expected","message","operator"],["object","message"],["object","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["actual","expected","message"],["valuetocheck","valuetobeabove","message"],["valuetocheck","valuetobeatleast","message"],["valuetocheck","valuetobebelow","message"],["valuetocheck","valuetobeatmost","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","message"],["value","name","message"],["value","name","message"],["object","constructor","message"],["object","constructor","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["haystack","needle","message"],["value","regexp","message"],["value","regexp","message"],["object","property","message"],["object","property","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","message"],["object","property","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","property","value","message"],["object","length","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["hasanydeepkeysobject","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["object","keys","message"],["fn","errorlikestringregexp","stringregexp","message"],["fn","errorlikestringregexp","stringregexp","message"],["val1","operator","val2","message"],["actual","expected","delta","message"],["actual","expected","delta","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["set1","set2","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["superset","subset","message"],["inlist","list","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["function","object","property","message"],["function","object","property","message"],["function","object","property","delta","message"],["function","object","property","message"],["byfunction","object","property","delta","message"],["function","object","property","delta","message"],["object"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["object", "message"],["target", "message"],["target", "message"]]