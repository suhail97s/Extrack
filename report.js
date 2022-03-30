// var extensionList = document.getElementById('extension-list');
var list = document.getElementById("myList");
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

function analyseExtension(e) {
  //browser.management.setEnabled(e.target.value, true);
  // parse extension id to find more info
  //alert(management.ExtensionInfo(e.target.value))

  /*=========================== GET CURRENT TAB URL =============================*/
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      console.log("tabs:" + tabs[0].url);
  })
  /*=========================== END OF CURRENT TAB URL =============================*/

  /*============================= SHOW EXTENSION INFO =================================*/
  if (e.target.type === "button")
  {
    if (list.style.display === "block")
    {
      list.style.display = "none";
      table.style.display = "block";
      riskTable.style.display = "block";
    }
  }
  console.log(e.target);
 /*=========================== END OF SHOW EXTENSION INFO =============================*/

 /*=========================== GET HTML ELEMENTS =============================*/
  let extName = document.getElementById("extName");
  let extPerms = document.getElementById("extPerms");
  let riskLevel = document.getElementById("riskLevel");
  let riskPerms = document.getElementById("riskPerms");
  let installType = document.getElementById("installType");
  let version = document.getElementById("version");
  let homepageURL = document.getElementById("homepageURL");
/*=========================== END OF HTML ELEMENTS =============================*/
  var getting = browser.management.get(e.target.value);

  /*=========================== GET EXTENSION INFO AND PERMS=============================*/
  getting.then(info =>{
    let identified_risk = "";
    let hostPermsCount = 0;

    // Empty the table
    extPerms.innerHTML = "";
    riskPerms.innerHTML = "";
    riskLevel.innerHTML = "";

    /* EXTENSION INFORMATION */
    extName.innerHTML = info.name;
    installType.innerHTML = info.installType;
    version.innerHTML = info.version;
    homepageURL.innerHTML = info.homepageUrl;
    
    /* EXTENSION PERMS */
    if (info.hostPermissions.length != 0)
    {
      for (let i = 0; i < info.hostPermissions.length; i++)
      {
        let hostPerms = info.hostPermissions[i]
        if (hostPerms.match("moz-extension://*")){continue;}
        else{
            
            identified_risk = "High";
            riskLevel.innerHTML = "High";
            hostPermsCount++;
          if (hostPerms.match("<all_urls>"))
          {
            extPerms.innerHTML += "all_urls" + "<br>";
            riskPerms.innerHTML += "all_urls" + "<br>";
          }
          else{
            extPerms.innerHTML += hostPerms + "<br>";
            riskPerms.innerHTML += hostPerms + "<br>";
          }
        }
      }
    }
    if (info.permissions.length != 0)
    {
      for (let i = 0; i < info.permissions.length; i++)
      {
        let curr_perms = info.permissions[i];
        if (curr_perms.match("internal:*")){continue;}
  
        extPerms.innerHTML += curr_perms + "<br>";

        /* HIGH RISK IDENTIFIED, OR NO RISK IDENTIFIED YET */
        if (identified_risk == "" || identified_risk == "High")
        {
          if (highRiskPermission.indexOf(curr_perms) > -1)
          {
            identified_risk = "High";
            riskLevel.innerHTML = "High"
            riskPerms.innerHTML += curr_perms + "<br>";
          }
        }
        /* HIGH RISK NOT IDENTIFIED YET, MOVE ON TO CHECK FOR MEDIUM */
        if (identified_risk != "High")
        {
          // find current perms in medium risk list
          if (mediumRiskPermission.indexOf(curr_perms) > -1){
            //get the perms and show in table
            identified_risk = "Medium";
            riskLevel.innerHTML = "Medium";
            riskPerms.innerHTML += curr_perms + "<br>";
          }
        }
        /* HIGH RISK AND MEDIUM NOT IDENTIFIED YET, MOVE ON TO CHECK FOR LOW */
        if (identified_risk != "Medium" && identified_risk != "High"){
          // find current perms in low risk list
          if (lowRiskPermission.indexOf(curr_perms) > -1){
            //get the perms and show in table
            identified_risk = "Low";
            riskLevel.innerHTML = "Low";
            riskPerms.innerHTML += curr_perms + "<br>";
          }
        }
      }
    }
    /* NO RISKS IDENTIFIED */
    if (identified_risk=="" && hostPermsCount == 0 )
    {
      extPerms.innerHTML = "No Permissions";
      riskLevel.innerHTML = "No Risks";
      riskPerms.innerHTML = "No Permissions";
    }
  });  
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
/* =====================LISTENERS =======================*/
let backBtn = document.getElementById("backBtn");
//change to onclick
list.addEventListener('click', analyseExtension);
backBtn.addEventListener('click', showExtensionList);
/* ==================END OF LISTENERS ====================*/


/* ===========================THIS OPEN EXTENSION AS A TAB========================*/
function openMyPage() {
  console.log("injecting");
  window.focus;
  browser.tabs.create({
    "url": "popup/extrack.html"
  });
}
browser.browserAction.onClicked.addListener(openMyPage);
