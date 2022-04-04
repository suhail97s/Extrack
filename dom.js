/* GET ARRAY RESULTS STORED IN LOCAL STORAGE FROM BUNDLE.JS */
var linkArray1 = JSON.parse(localStorage.getItem("link_array"));
var resultsArray2 = JSON.parse(localStorage.getItem("results_array"));

var seen = {};
addTable(linkArray1,resultsArray2);
function addTable(linkArray1,resultsArray2){
    var table = document.getElementById("table");
    if(linkArray1 != null){
        for (var i = 0; i < linkArray1.length; i++) {
            /*=================== CHECK FOR DUPLICATE LINKS =================== */
            if (!(linkArray1[i] in seen)) {
                seen[linkArray1[i]] = true;
                /*=========================== GET HTML ELEMENTS =============================*/
                let linkName = document.createElement("h5");
                linkName.innerHTML = linkArray1[i];
                table.appendChild(linkName);
                let br = document.createElement("br");
                let domTable = document.createElement("table");
                let tbodyDOM = document.createElement("tbody");
                let trDOMHead = document.createElement("tr");
                let trDOMBody = document.createElement("tr");
                let thDOMLevel = document.createElement("th");
                let tdDOMLevel = document.createElement("td");
                /*=========================== END OF HTML ELEMENTS =============================*/
                domTable.className = 'table table-hover table-info';
            
                thDOMLevel.innerHTML = "DOM Changes";
                thDOMLevel.className = "col-lg-2 col-md-2 col-sm-2"
                trDOMHead.appendChild(thDOMLevel);
                trDOMHead.className = "table-active"
                tbodyDOM.appendChild(trDOMHead);
            
                tdDOMLevel.innerHTML = resultsArray2[i];
                
                trDOMBody.appendChild(tdDOMLevel);
                tbodyDOM.appendChild(trDOMBody);
                domTable.append(tbodyDOM);
                table.appendChild(domTable);
                table.appendChild(br);
            }
        }
    }
}