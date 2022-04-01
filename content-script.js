// content-script.js

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  console.log(request.greeting);
//   console.log(document.querySelector("body"));
  let currentDOM = document.querySelector("body");
  // only can parse return value as string, not document type. so changed to innerHTML
  return Promise.resolve({response: currentDOM.innerHTML});
});


// const linkArray = [];
// const resultsArray = [];

browser.runtime.onMessage.addListener(request => {
  const {linkArray, resultsArray} = request;
  // console.log(linkArray);
  // console.log(resultsArray);
  // browser.runtime.sendMessage({"linkArray":linkArray, "resultsArray":resultsArray});
  window.dispatchEvent(new CustomEvent('SendArrays', {links: linkArray, results: resultsArray}));
  console.log("SENT DISPATCH EVENT TO DOM JS");
});

