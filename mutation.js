
// const observer = new MutationObserver(function (mutations){
//     mutations.forEach(function(mutation){
//         if(mutation.addedNodes.length){

//         }
//     })
// })

// const targetNode = document.querySelector('ol');

// const config = {
//   attributes: true, 
//   childList: true, 
//   characterData: true
// };
  
// const callback = mutations => {  
//   mutations.forEach(mutation => {
//     if (mutation.type === 'childList') {
//       const listValues = Array.from(targetNode.children)
//           .map(node => node.innerHTML)
//           .filter(html => html !== '<br>');
//       console.log(listValues);
//     }
//   });
// }

// const observer = new MutationObserver(callback);

// observer.observe(targetNode, config);


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

//   const parent = document.querySelector(".parent")
//   parent.children[0].remove()

  // TO STOP MUTATION CHANGES USE observer.disconnect();