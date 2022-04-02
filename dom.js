var linkArray1 = JSON.parse(localStorage.getItem("link_array"));
var resultsArray2 = JSON.parse(localStorage.getItem("results_array"));

// console.log("THIS DOM JS IS ALREADY LOADAED");
// // console.log(linkArray);

// // window.runDispatch();

// browser.runtime.onMessage.addListener(message => {
//     // linkArray = message.linkArray;
//     // resultsArray = message.resultsArray;
//     linkArray = message.linkArray;
//     resultsArray = message.resultsArray;
    
//     console.log('DOM HTML');
//     console.log(linkArray);
//     console.log(resultsArray);
// });

// window.addEventListener('SendArrays', function (e) {
//     linkArray = e.links;
//     resultsArray = e.results;
//     console.log('received');
//     console.log(linkArray);
//     console.log(resultsArray);
//   });

// browser.runtime.sendMessage(
//     {var1:linkArray, var2:resultsArray}
//  ).then(response => {
//     /* RESPONSE WE GOT BACK FROM CONTENT-SCRIPT.JS */
//     // console.log("Message from the content-script.js:");
//     // console.log(response.response);
//     // Changing the response back to document type, from currentDOM.innerHTML
//     linkArray = response.var1;
//     resultsArray = response.var2;
//     //get the expected DOM
   
//     });
// browser.runtime.onMessage.addListener(request => {
//     console.log("Message from the background 2222222222222222222:");
//     let {linkArray, resultsArray} = request;

//     for (i = 0; i < linkArray.length; i++) {
//         linkArray1.push(linkArray[i]);
//       }

//     for (i = 0; i < resultsArray.length; i++) {
//         resultsArray2.push(resultsArray[i]);
//       }
//     test(linkArray1,resultsArray2)
//     console.log();
//     console.log(resultsArray2);
//     console.log("for the love of god, please work");
//     // browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
//   //   console.log(document.querySelector("body"));
//   });
  

// browser.runtime.onMessage.addListener(request => {
//     console.log("Message to dom js:");
//     const {linkArray1, resultsArray2} = request;
//     linkArray = linkArray1;
//     resultsArray = resultsArray2;
//     console.log(linkArray);
//     console.log(resultsArray);
//     // browser.runtime.sendMessage(linkArray, resultsArray);
//   });
console.log("REALEST SHIT");

console.log(linkArray1);
console.log(resultsArray2);

test(linkArray1,resultsArray2);

function test(linkArray1,resultsArray2){
    var table = document.getElementById("table");
    if(linkArray1.length != 0){
        linkArray1.forEach((links, index)=>{
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
        
    
            tdDOMLevel.innerHTML = resultsArray2[index];
            
        
            trDOMBody.appendChild(tdDOMLevel);
            tbodyDOM.appendChild(trDOMBody);
            domTable.append(tbodyDOM);
            table.appendChild(domTable);
            table.appendChild(br);
    //  }
            });
    }
}