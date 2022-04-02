// content-script.js


// let linkArray;
// let resultsArray;

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  // browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
//   console.log(document.querySelector("body"));
  let currentDOM = document.querySelector("body");
  // only can parse return value as string, not document type. so changed to innerHTML
  return Promise.resolve({response: currentDOM.innerHTML});
});


var table = document.getElementById("table");

//   for (const links of linkArray) {

function AddTable(linkArray, resultsArray){
// for (const links of linkArray) {
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

var domBtn = document.getElementById("domBtn");
domBtn.addEventListener('click', AddTable);

// var domhidden = document.getElementById("domarrays");


browser.runtime.onMessage.addListener(request => {
  const {linkArray, resultsArray} = request;
  console.log(linkArray);
  console.log(resultsArray);
  AddTable(linkArray, resultsArray);
  // console.log(linkArray);
  // console.log(resultsArray);
  // browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
  // window.dispatchEvent(new CustomEvent('SendArrays', {links: linkArray, results: resultsArray}));
  // console.log("SENT DISPATCH EVENT TO DOM JS");
  // domhidden.innerHTML(linkArray);
  // browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
  
  // exportFunction(runDispatch, window, {defineAs:'runDispatch'});
  // runDispatch();
});

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

