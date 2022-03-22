// fetch original
// TODO: how to get active tab URL?
// TODO: Add button to call this function
fetch('https://www.w3schools.com/')
  .then(res => res.text())
  .then((responseText) => {
    const doc = new DOMParser().parseFromString(responseText, 'text/html');
    //const h1 = doc.querySelector('h1');
    //console.log(responseText);
    const original = doc.querySelector('body');   

    console.log(original.innerHTML);
  });


// fetch current
var current = document.getElementsByTagName("body");
var bodycontent = current[0];
console.log(bodycontent.innerHTML);

var compare = require('dom-compare').compare,
    reporter = require('dom-compare').GroupingReporter,
    expected = original.innerHTML, // expected DOM tree
    actual = bodycontent.innerHTML, // actual one
    result, diff, groupedDiff;

// compare to DOM trees, get a result object
result = compare(expected, actual);

// get comparison result
console.log(result.getResult()); // false cause' trees are different

// get all differences
diff = result.getDifferences(); // array of diff-objects

// differences, grouped by node XPath
groupedDiff = reporter.getDifferences(result); // object, key - node XPATH, value - array of differences (strings)

// string representation
console.log(reporter.report(result));