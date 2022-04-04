/* LISTENER TO SEND CURRENT TAB DOM THROUGH SENDMESSAGE IN BUNDLE.JS */
browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  let currentDOM = document.querySelector("body");
  // only can parse return value as string, not document type. so changed to innerHTML
  return Promise.resolve({response: currentDOM.innerHTML});
});