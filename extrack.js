// var extensionList = document.getElementById('extension-list');
var list = document.getElementById("myList");
var table = document.getElementById("table");
var riskTable = document.getElementById("riskTable");


var highRiskPermission = { 
  permissions: ["<all_urls>", "browsingData", "downloads", "downloads.open", "history", "nativeMessaging",
  "privacy", "proxy", "tabs", "webNavigation"] 
};

var mediumRiskPermission = ["activeTab", "bookmarks", "clipboardRead", "clipboardWrite", "contextMenus", "cookies", "downloads",
  "geolocation", "identity", "management", "sessions", "storage", "topSites", "webRequest", "webRequestBlocking", "browserSettings",
  "search", "menu"];

var lowRiskPermission = ["alarm", "idle", "notifications", "storage", "unlimitedStorage", "pkcs11", "captivePortal","contextIdentities",
  "find", "identity", "dns", "tabHide", "theme"];

function analyseExtension(e) {
  //browser.management.setEnabled(e.target.value, true);
  // parse extension id to find more info
  //alert(management.ExtensionInfo(e.target.value))
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
 
  let extName = document.getElementById("extName");
  let extPerms = document.getElementById("extPerms");
  let riskLevel = document.getElementById("riskLevel");
  let riskPerms = document.getElementById("riskPerms");

  var getting = browser.management.get(e.target.value);

  getting.then(info =>{
    let identified_risk = "";
    let hostPermsCount = 0;

    // Empty the table
    extPerms.innerHTML = "";
    riskPerms.innerHTML = "";
    riskLevel.innerHTML = "";

    extName.innerHTML = info.name;

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
  
        // Check that higher perms has yet to be identified
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
    if (identified_risk=="" && hostPermsCount == 0 )
    {
      extPerms.innerHTML = "No Permissions";
      riskLevel.innerHTML = "No Risks";
      riskPerms.innerHTML = "No Permissions";
    }

    // console.log(info.permissions);
    // info.installType
    // "admin": the add-on was installed because of an administrative policy.
    // "development": the add-on was installed unpacked from disk.
    // "normal": the add-on was installed normally from an install package.
    // "sideload": the add-on was installed by some other software on the user's computer.
    // "other": the add-on was installed in some other way.

    // info.version
    // info.hostpermissions
    // info.homepageUrl
  });  
}
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
browser.management.getAll().then((extensions) => {
  for (let extension of extensions) {
    if (extension.type !== 'extension') {
      continue;
    }
    if (extension.enabled) {
      let divListItem = document.createElement("button")
      divListItem.type = "button"
      divListItem.className = "text-dark list-group-item list-group-item-action list-group-item-light"
      divListItem.id = extension.name
      divListItem.value = extension.id
      divListItem.innerText = extension.name;
      list.appendChild(divListItem);
    }
  }
});
let backBtn = document.getElementById("backBtn");
//change to onclick
list.addEventListener('click', analyseExtension);
backBtn.addEventListener('click', showExtensionList);

let observer = new MutationObserver((mutations) => {
  console.log(mutations)
  mutations.forEach((mutation) => {
    let oldValue = mutation.oldValue;
    let newValue = mutation.target; //.textContent
    if (oldValue !== newValue) {
        console.log("The changes are :" + oldValue + " and new value : " + newValue);
    }
  });
});



observer.observe(document.body, {
  characterDataOldValue: true, 
  subtree: true, 
  childList: true, 
  characterData: true
});