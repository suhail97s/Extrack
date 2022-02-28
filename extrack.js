var extensionList = document.getElementById('extension-list');

function analyseExtension(e) {
  //browser.management.setEnabled(e.target.value, true);
  // parse extension id to find more info
  //alert(management.ExtensionInfo(e.target.value))

  var table = document.getElementById("myTable");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var getting = browser.management.get(e.target.value);
  getting.then(info =>{
    cell1.innerHTML = info.name;
    cell2.innerHTML = info.permissions;
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
  document.createElement()
  e.preventDefault();
  window.close();
}

browser.management.getAll().then((extensions) => {
  for (let extension of extensions) {
    if (extension.type !== 'extension') {
      continue;
    }
    let option = document.createElement('option');
    option.textContent = extension.name;
    option.value = extension.id;
    if (extension.enabled) {
      option.selected = true;
    }
    extensionList.appendChild(option);
  }
});
extensionList.addEventListener('change', analyseExtension)