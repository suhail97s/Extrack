// content-script.js


// let linky;
// let resulty;

browser.runtime.onMessage.addListener((request,sender,sendResponse) => {
  console.log("Message from the background script:");
  let {linkArray, resultsArray} = request;
  // browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
//   console.log(document.querySelector("body"));
  let currentDOM = document.querySelector("body");
  sendResponse(linkArray, resultsArray);
  // only can parse return value as string, not document type. so changed to innerHTML
  return Promise.resolve({response: currentDOM.innerHTML});
});


// browser.runtime.onMessage.addListener(request => {
  
//   linky = linkArray;
//   resulty = resultsArray;  
//   // AddTable(linky, resulty);
//   return Promise.resolve({});
//   // console.log(linkArray);
//   // console.log(resultsArray);
//   // browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
//   // window.dispatchEvent(new CustomEvent('SendArrays', {links: linkArray, results: resultsArray}));
//   // console.log("SENT DISPATCH EVENT TO DOM JS");
//   // domhidden.innerHTML(linkArray);
//   // browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
  
//   // exportFunction(runDispatch, window, {defineAs:'runDispatch'});
//   // runDispatch();
// });




//   for (const links of linkArray) {
// var table = document.getElementById("table");

function AddTable(linkArray, resultsArray){
  console.log(linkArray);
  console.log(resultsArray);
  console.log("hello cutie");
// for (const links of linkArray) {
  var index = 0;  
  for (var links in linkArray){
    // linkArray.forEach((links, index)=>{
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
        index++
    };
}

// var domBtn = document.getElementById("domBtn");
// if(domBtn){
//   console.log("im herEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe");
// }
// domBtn.addEventListener('click', startSendMessage);

// function startSendMessage(){
//   console.log("the real linkARray and real resulst ARray");
//   console.log(linkArray);
//   browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
// }

// var domhidden = document.getElementById("domarrays");
// function runDispatch(){
//   // window.dispatchEvent(new CustomEvent('SendArrays', {"links": linkArray, "results": resultsArray}));
//   browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
//   setTimeout(runDispatch, 0);
// }

// runDispatch();
// browser.runtime.onMessage.addListener(request => {
  // if(request.domMsg){
  //   return Promise.resolve({linkRes: linkArray, resultsRes: resultsArray }); 
  // }
  // console.log(linkArray);
  // console.log(resultsArray);
  // browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
  // window.dispatchEvent(new CustomEvent('SendArrays', {links: linkArray, results: resultsArray}));
  // console.log("SENT DISPATCH EVENT TO DOM JS");
// });

