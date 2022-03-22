// var extensionList = document.getElementById('extension-list');
var list = document.getElementById("myList");
var table = document.getElementById("table");

function analyseExtension(e) {
  //browser.management.setEnabled(e.target.value, true);
  // parse extension id to find more info
  //alert(management.ExtensionInfo(e.target.value))
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      console.log(tabs[0].url);
  })
  if (e.target.type === "button")
  {
    if (list.style.display === "block")
    {
      list.style.display = "none";
      table.style.display = "block";
    }
  }
  console.log(e.target);
  let extName = document.getElementById("extName");
  let extPerms = document.getElementById("extPerms");
  var getting = browser.management.get(e.target.value);
  getting.then(info =>{
    extName.innerHTML = info.name;
    console.log(info.name);
    extPerms.innerHTML = info.permissions;
    console.log(info.permissions);
    // info.installType
    // "admin": the add-on was installed because of an administrative policy.
    // "development": the add-on was installed unpacked from disk.
    // "normal": the add-on was installed normally from an install package.
    // "sideload": the add-on was installed by some other software on the user's computer.
    // "other": the add-on was installed in some other way.

    // info.version
    // info.permissions
    // info.homepageUrl
  });  
  // e.preventDefault();
  // window.close();
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