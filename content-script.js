// content-script.js

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  console.log(request.greeting);
//   console.log(document.querySelector("body"));
  let currentDOM = document.querySelector("body");
  // only can parse return value as string, not document type. so changed to innerHTML
  return Promise.resolve({response: currentDOM.innerHTML});
});
