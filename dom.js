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
                let domTable = document.createElement("div");
                let tdDOMLevel = document.createElement("p");
                /*=========================== END OF HTML ELEMENTS =============================*/
                linkName.style.marginLeft = "20px";
                linkName.style.marginRight = "20px";
                linkName.style.fontWeight = "bold";
                domTable.className = 'overflow-auto';
                domTable.style.maxHeight = "300px";
                domTable.style.margin = "20px";
                domTable.style.padding = "20px";
                domTable.style.background = "Linen";
                tdDOMLevel.style.fontFamily = "monospace";
            
                tdDOMLevel.innerHTML = resultsArray2[i];
                
                domTable.append(tdDOMLevel);
                table.appendChild(domTable);
                table.appendChild(br);
            }
        }
    }
}