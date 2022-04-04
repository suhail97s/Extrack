/* LISTENER TO SEND CURRENT TAB DOM THROUGH SENDMESSAGE IN BUNDLE.JS */
browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  let currentDOM = document.querySelector("body");
  return Promise.resolve({response: currentDOM.innerHTML});
});