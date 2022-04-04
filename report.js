// var extensionList = document.getElementById('extension-list');
// var list = document.getElementById("myList");
var table = document.getElementById("table");
var riskTable = document.getElementById("riskTable");

/*=========================== PERMISSION CLASSIFICATIONS FOR FIREFOX =============================*/
var highRiskPermission = ["browsingData", "downloads", "downloads.open", "history", "nativeMessaging",
  "privacy", "proxy", "tabs", "webNavigation"];

var mediumRiskPermission = ["activeTab", "bookmarks", "clipboardRead", "clipboardWrite", "contextMenus", "cookies", "downloads",
  "geolocation", "identity", "management", "sessions", "storage", "topSites", "webRequest", "webRequestBlocking", "browserSettings",
  "search", "menus"];

var lowRiskPermission = ["alarm", "idle", "notifications", "storage", "unlimitedStorage", 
"pkcs11", "captivePortal","contextualIdentities", "find", "identity", "dns", "tabHide", "theme"];

/*==========================END OF PERMISSION CLASSIFICATIONS FOR FIREFOX ==========================*/
/*=========================== GENERATE EXTENSIONS LIST===========================================*/
browser.management.getAll().then((extensions) => {
  for (let extension of extensions) {
    if (extension.type !== 'extension') {
      continue;
    }
    if (extension.enabled) {
      console.log("Extension:"+extension);
      analyseExtension(extension);
    }
  }
});
/*=========================== GENERATE EXTENSIONS LIST=====================================*/
function analyseExtension(extension) {
  /*=========================== GET CURRENT TAB URL =============================*/
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      console.log("tabs:" + tabs[0].url);
  })
  /*=========================== END OF CURRENT TAB URL =============================*/

 /*=========================== GET HTML ELEMENTS =============================*/
  let extName = document.createElement("h5");
  extName.innerHTML = extension.name;
  table.appendChild(extName);
  let br = document.createElement("br");
  
  let riskTable = document.createElement("table");
  let tbodyRisk = document.createElement("tbody");
  let trRiskHead = document.createElement("tr");
  let trRiskBody = document.createElement("tr");
  let thRiskLevel = document.createElement("th");
  let thRiskPerms = document.createElement("th");
  let tdRiskLevel = document.createElement("td");
  let tdRiskPerms = document.createElement("td");

  let extTable = document.createElement("table");
  let tbody = document.createElement("tbody");
  let trhead = document.createElement("tr");
  let trbody = document.createElement("tr");
  let thName = document.createElement("th");
  let thPerm = document.createElement("th");
  let thInstallType = document.createElement("th");
  let thVer = document.createElement("th");
  let thURL = document.createElement("th");
  let tdName = document.createElement("td");
  let tdPerms = document.createElement("td");
  let tdInstallType = document.createElement("td");
  let tdVer = document.createElement("td");
  let tdURL = document.createElement("td");
  
/*=========================== END OF HTML ELEMENTS =============================*/
  extTable.className = 'table table-hover table-info';
  riskTable.className = 'table table-hover table-secondary';
  
  thName.innerHTML = "Name";
  thName.className = "col-lg-2 col-md-2 col-sm-2"
  trhead.appendChild(thName);
  thPerm.innerHTML = "Permissions";
  thPerm.className = "col-lg-2 col-md-2 col-sm-2"
  trhead.appendChild(thPerm);
  thInstallType.innerHTML = "Type";
  thInstallType.className = "col-lg-2 col-md-2 col-sm-2"
  trhead.appendChild(thInstallType);
  thVer.innerHTML = "Version";
  thVer.className = "col-lg-2 col-md-2 col-sm-2"
  trhead.appendChild(thVer);
  thURL.innerHTML = "Homepage URL";
  thURL.className = "col-lg-2 col-md-2 col-sm-2"
  trhead.appendChild(thURL);
  trhead.className = "table-active"
  tbody.appendChild(trhead);

  /* EXTENSION INFORMATION */
  tdName.innerHTML = extension.name;
  tdInstallType.innerHTML = extension.installType;
  tdVer.innerHTML = extension.version;
  tdURL.innerHTML = extension.homepageUrl;
  /*=========================== GET EXTENSION INFO AND PERMS=============================*/
  thRiskLevel.innerHTML = "Risk Level";
  thRiskLevel.className = "col-lg-2 col-md-2 col-sm-2"
  trRiskHead.appendChild(thRiskLevel);
  thRiskPerms.innerHTML = "Permissions";
  thRiskPerms.className = "col-lg-2 col-md-2 col-sm-2"
  trRiskHead.appendChild(thRiskPerms);
  trRiskHead.className = "table-active"
  tbodyRisk.appendChild(trRiskHead);

  let identified_risk = "";
  let hostPermsCount = 0;

  // Empty the table
  // extPerms.innerHTML = "";
  tdRiskPerms.innerHTML = "";
  tdRiskLevel.innerHTML = "";
  
  /* EXTENSION PERMS */
  if (extension.hostPermissions.length != 0)
  {
    for (let i = 0; i < extension.hostPermissions.length; i++)
    {
      let hostPerms = extension.hostPermissions[i]
      if (hostPerms.match("moz-extension://*")){continue;}
      else{
          
          identified_risk = "High";
          tdRiskLevel.innerHTML = "High";
          hostPermsCount++;
        if (hostPerms.match("<all_urls>"))
        {
          tdPerms.innerHTML += "all_urls" + "<br>";
          tdRiskPerms.innerHTML += "all_urls" + "<br>";
        }
        else{
          tdPerms.innerHTML += hostPerms + "<br>";
          tdRiskPerms.innerHTML += hostPerms + "<br>";
        }
      }
    }
  }
  if (extension.permissions.length != 0)
  {
    for (let i = 0; i < extension.permissions.length; i++)
    {
      let curr_perms = extension.permissions[i];
      if (curr_perms.match("internal:*")){continue;}

      tdPerms.innerHTML += curr_perms + "<br>";

      /* HIGH RISK IDENTIFIED, OR NO RISK IDENTIFIED YET */
      if (identified_risk == "" || identified_risk == "High")
      {
        if (highRiskPermission.indexOf(curr_perms) > -1)
        {
          identified_risk = "High";
          tdRiskLevel.innerHTML = "High"
          tdRiskPerms.innerHTML += curr_perms + "<br>";
        }
      }
      /* HIGH RISK NOT IDENTIFIED YET, MOVE ON TO CHECK FOR MEDIUM */
      if (identified_risk != "High")
      {
        // find current perms in medium risk list
        if (mediumRiskPermission.indexOf(curr_perms) > -1){
          //get the perms and show in table
          identified_risk = "Medium";
          tdRiskLevel.innerHTML = "Medium";
          tdRiskPerms.innerHTML += curr_perms + "<br>";
        }
      }
      /* HIGH RISK AND MEDIUM NOT IDENTIFIED YET, MOVE ON TO CHECK FOR LOW */
      if (identified_risk != "Medium" && identified_risk != "High"){
        // find current perms in low risk list
        if (lowRiskPermission.indexOf(curr_perms) > -1){
          //get the perms and show in table
          identified_risk = "Low";
          tdRiskLevel.innerHTML = "Low";
          tdRiskPerms.innerHTML += curr_perms + "<br>";
        }
      }
    }
  }
  /* NO RISKS IDENTIFIED */
  if (identified_risk=="" && hostPermsCount == 0 )
  {
    tdPerms.innerHTML = "No Permissions";
    tdRiskLevel.innerHTML = "No Risks";
    tdRiskPerms.innerHTML = "No Permissions";
  }
  trbody.appendChild(tdName);
  trbody.appendChild(tdPerms);
  trbody.appendChild(tdInstallType);
  trbody.appendChild(tdVer);
  trbody.appendChild(tdURL);
  tbody.appendChild(trbody);
  extTable.appendChild(tbody);
  table.appendChild(extTable);

  trRiskBody.appendChild(tdRiskLevel);
  trRiskBody.appendChild(tdRiskPerms);
  tbodyRisk.appendChild(trRiskBody);
  riskTable.append(tbodyRisk);
  table.appendChild(riskTable);
  table.appendChild(br);
}
/*===========================END OF EXTENSION INFO AND PERMS=============================*/

/*============================= SHOW EXTENSION LIST ====================================*/
function showExtensionList(e)
{
  console.log(e.target.type);
  if (e.target.type === "button")
  {
    if (list.style.display === "none")
    {
      list.style.display = "block";
      table.style.display = "none";
      riskTable.style.display = "none";
    }
  }
}
/*============================= END OF SHOW EXTENSION LIST================================*/
