const linkArray = [];
const resultsArray = [];

console.log("THIS DOM JS IS ALREADY LOADAED");

// browser.runtime.onMessage.addListener((message) => {
//     // linkArray = message.linkArray;
//     // resultsArray = message.resultsArray;
//     const {linkArray, resultsArray} = message;
    
//     console.log('sent TO THE DOM HTML');
//     console.log(linkArray);
//     console.log(resultsArray);
// });

window.addEventListener('SendArrays', function (e) {
    linkArray = e.links;
    resultsArray = e.results;
    console.log('received');
    console.log(linkArray);
    console.log(resultsArray);
  });


// browser.runtime.onMessage.addListener(request => {
//     console.log("Message to dom js:");
//     const {linkArray1, resultsArray2} = request;
//     linkArray = linkArray1;
//     resultsArray = resultsArray2;
//     console.log(linkArray);
//     console.log(resultsArray);
//     // browser.runtime.sendMessage(linkArray, resultsArray);
//   });
  

var table = document.getElementById("table");
var riskTable = document.getElementById("riskTable");

//   for (const links of linkArray) {
if(linkArray.length != 0){
    linkArray.forEach((links, index)=>{
    /*=========================== GET HTML ELEMENTS =============================*/
        let linkName = document.createElement("h5");
        linkName.innerHTML = links;
        table.appendChild(linkName);
        let br = document.createElement("br");
        let domTable = document.createElement("table");
        let tbodyDOM = document.createElement("tbody");
        let trDOMHead = document.createElement("tr");
        let trDOMBody = document.createElement("tr");
        let thDOMLevel = document.createElement("th");
        let tdDOMLevel = document.createElement("td");
    /*=========================== END OF HTML ELEMENTS =============================*/
        
        domTable.className = 'table table-hover table-secondary';
        
        thDOMLevel.innerHTML = "DOM Changes";
        thDOMLevel.className = "col-lg-2 col-md-2 col-sm-2"
        trDOMHead.appendChild(thDOMLevel);
        trDOMHead.className = "table-active"
        tbodyDOM.appendChild(trDOMHead);
    
   
        tdDOMLevel.innerHTML = resultsArray[index];
        
    
        trDOMBody.appendChild(tdDOMLevel);
        tbodyDOM.appendChild(trDOMBody);
        domTable.append(tbodyDOM);
        table.appendChild(domTable);
        table.appendChild(br);
//  }
    });
}