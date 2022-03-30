// var extensionList = document.getElementById('extension-list');
var list = document.getElementById("myList");
var table = document.getElementById("table");
var riskTable = document.getElementById("riskTable");


/*=========================== PERMISSION CLASSIFICATIONS FOR FIREFOX =============================*/
var highRiskPermission = ["", "browsingData", "downloads", "downloads.open", "history", "nativeMessaging",
  "privacy", "proxy", "tabs", "webNavigation"];

var mediumRiskPermission = ["activeTab", "bookmarks", "clipboardRead", "clipboardWrite", "contextMenus", "cookies", "downloads",
  "geolocation", "identity", "management", "sessions", "storage", "topSites", "webRequest", "webRequestBlocking", "browserSettings",
  "search", "menu"];

var lowRiskPermission = ["alarm", "idle", "notifications", "storage", "unlimitedStorage", "pkcs11", "captivePortal","contextIdentities",
  "find", "identity", "dns", "tabHide", "theme"];

var hrpDescription = ["",
  "Enables extensions to clear browsing data.",  // browsingData
  "Enables extensions to initiate, mointor, manipulate, and search for downloads, including running a downloaded malicious script.", // downloads
  "Allows extensions to open the downloaded file i.e. run malicious downloaded scripts.", // downloads.open
  "Allow extensions to full history of user with rights to read, add and delete.", // history
  "Allows native (Win, Linux, Mac) programs that register with the web browser to communicate with extensions.", // nativeMessaging
  "Allows extension to turn off malware protections.", // privacy
  "Allows extension to manage web browser settings and send a user's internal traffic.", // proxy 
  "Enalbes extensions to access current urls and favicons.", // tabs 
  "Allows extension to listen to webistes that user visits." // webNavigation
  // "Enables extensions to interact with code running on webpage which matches any URL that uses the https: or http: scheme." // *://*/*
];



/*==========================END OF PERMISSION CLASSIFICATIONS FOR FIREFOX ==========================*/


function analyseExtension(e) {
  //browser.management.setEnabled(e.target.value, true);
  // parse extension id to find more info
  //alert(management.ExtensionInfo(e.target.value))

  /*=========================== GET CURRENT TAB URL =============================*/
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      console.log(tabs[0].url);
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
  let permsDescr = document.getElementById("permsDescr")
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
    permsDescr.innerHTML = "";

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
            permsDescr.innerHTML += "Extension can interact with any webpage that starts with http:, https:, file:, or ftp: scheme." + "<br>";
          }
          if (hostPerms == '*://*/*') {
            extPerms.innerHTML += "*://*/*" + "<br>";
            riskPerms.innerHTML += "*://*/*" + "<br>";
            permsDescr.innerHTML += "Enables extensions to interact with code running on webpage which matches any URL that uses the https: or http: scheme." + "<br>"; 
          } 
          else{
            extPerms.innerHTML += hostPerms;
            riskPerms.innerHTML += hostPerms;
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
            console.log(curr_perms);
            if (p = highRiskPermission.indexOf(curr_perms)) {
              console.log(p);
              permsDescr.innerHTML += hrpDescription[p] + "<br>";
            }
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
            permsDescr.innerHTML = "" + "<br>";
          }
        }
      /* HIGH RISK AND MEDIUM NOT IDENTIFIED YET, MOVE ON TO CHECK FOR LOW */
        if (identified_risk != "Medium" && identified_risk != "High")
        {
          // find current perms in low risk list
          if (lowRiskPermission.indexOf(curr_perms) > -1){
            //get the perms and show in table
            identified_risk = "Low";
            riskLevel.innerHTML = "Low";
            riskPerms.innerHTML += curr_perms + "<br>";
            permsDescr.innerHTML = "" + "<br>";
          }
        }
      
      }
    }
 

    /* NO RISKS IDENTIFIED */
    if (identified_risk=="" && hostPermsCount == 0)
    {
      extPerms.innerHTML = "No Permissions";
      riskLevel.innerHTML = "No Risks";
      riskPerms.innerHTML = "No Permissions";
      permsDescr.innerHTML = "" + "<br>";
    }

    // console.log(info.permissions);
    // info.installType
    // "admin": the add-on was installed because of an administrative policy.
    // "development": the add-on was installed unpacked from disk.
    // "normal": the add-on was installed normally from an install package.
    // "sideload": the add-on was installed by some other software on the user's computer.
    // "other": the add-on was installed in some other way.

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
/*=========================== DISABLE EXTENSIONS===========================================*/
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
/*=========================== END OF DISABLE EXTENSIONS=====================================*/
/* =====================LISTENERS =======================*/
let backBtn = document.getElementById("backBtn");
//change to onclicks
list.addEventListener('click', analyseExtension);
backBtn.addEventListener('click', showExtensionList);
/* ==================END OF LISTENERS ====================*/

// let observer = new MutationObserver((mutations) => {
//   console.log(mutations)
//   mutations.forEach((mutation) => {
//     let oldValue = mutation.oldValue;
//     let newValue = mutation.target; //.textContent
//     if (oldValue !== newValue) {
//         console.log("The changes are :" + oldValue + " and new value : " + newValue);
//     }
//   });
// });




// observer.observe(document.body, {
//   characterDataOldValue: true, 
//   subtree: true, 
//   childList: true, 
//   characterData: true
// });


/* ===========================THIS OPEN EXTENSION AS A TAB========================*/
function openMyPage() {
  console.log("injecting");
   browser.tabs.create({
     "url": "popup/extrack.html"
   });
}

/*
Add openMyPage() as a listener to clicks on the browser action.
*/
browser.browserAction.onClicked.addListener(openMyPage);

