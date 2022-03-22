
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
fetch('https://www.w3schools.com/')
  .then(res => res.text())
  .then((responseText) => {
    const doc = new DOMParser().parseFromString(responseText, 'text/html');
    //const h1 = doc.querySelector('h1');
    //console.log(responseText);
    const original = doc.querySelector('body');

    var current = document.getElementsByTagName("body");
    var bodycontent = current[0];

    // comparison
    console.log(original.innerHTML);
    console.log(bodycontent.innerHTML);
    //console.log(doc);
  });

//   const parent = document.querySelector(".parent")
//   parent.children[0].remove()

  // TO STOP MUTATION CHANGES USE observer.disconnect();