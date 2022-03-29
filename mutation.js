// fetch original
// TODO: how to get active tab URL?
var dom =  require('./dom-compare')

// TODO: Add button to call this function
var original, expected, result, diff, groupedDiff;
fetch('https://www.w3schools.com/')
  .then(res => res.text())
  .then((responseText) => {
    const doc = new DOMParser().parseFromString(responseText, 'text/html');
    //const h1 = doc.querySelector('h1');
    //console.log(responseText);
    original = doc.querySelector('body');   
    expected = original.innerHTML;
    // console.log(original.innerHTML);
    analyseDOM(expected);
  });

function analyseDOM(expected){
  // fetch current
  var current = document.getElementsByTagName("body");
  var bodycontent = current[0];
  var actual = bodycontent.innerHTML;

  console.log("Result:")
  // compare to DOM trees, get a result object
  result = dom.compare(expected, actual);

  // get comparison result
  // console.log("Result:")
  console.log("Results:" + result.getResult()); // false cause' trees are different

  // get all differences
  diff = result.getDifferences(); // array of diff-objects

  // differences, grouped by node XPath
  // groupedDiff = reporter.getDifferences(result); // object, key - node XPATH, value - array of differences (strings)

  // string representation
  // console.log(reporter.report(result));
}

  // console.log(bodycontent.innerHTML);

  // var dom = require('dom_compare');

  // var expected = original.innerHTML, // expected DOM tree
  //     actual = bodycontent.innerHTML, // actual one
  //     result, diff, groupedDiff;
  // var compare = require('dom-compare').compare,
  //     reporter = require('dom-compare').GroupingReporter;