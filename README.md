# Extrack
## Installation guide
- Step 1: Clone into directory
  ```
  git clone https://github.com/suhail97s/Extrack.git
  ```
- Step 2: In Firefox: Open the about:debugging page, click the This Firefox option, click the Load Temporary Add-on button, then select any file in your extension's directory.
The extension now installs, and remains installed until you restart Firefox.
- Step 3: Go to any website, e.g. morzilla.org, extension is ready for use.
## User Manual
### Starting Out (GUI)
- Step 1: Click on the Extrack extension icon, the Graphical User Interface (GUI), landing page, will appear.
- Step 2: There are three main features in the landing page:
  1. A list of extension that is installed in the browser: Clicking on any extension to view details of the extension.
  2. DOM Changes button: View Document Object Model (DOM) difference between the current and expected DOM.
  3. Generate Report button: Shows the respective risk rating and description of permission of extensions; Shows a summary details of all extension installed in the browser.
### Extension details (list)
- The following table shows the **extension information**:
  Header  | Function
  ------------- | -------------
  Name  | The name of the extension
  Permissions  |   Shows all permissions that are permitted to the extension
  Type  |  How the extension was installed
  Version  |  The current version number of the extension
  Homepage URL  |  The homepage URL of the extension

- The following table shows the **extension health information**:
Header  | Function
  ------------- | -------------
  Risk Level  | Shows the risk level of the extension
  Permissions  |   Show permissions that are of high risk and permitted to the extension
  Permission Description  |  A short summary of what the permission is

### View DOM change (button)
- Shows any DOM changes of the current active tab compared to the expected DOM
### Generate Report (button)
- Shows all permission sorted from the highest risk level with detailed description
- Summary button:
  - Shows a summary details of all extension installed on the browser
