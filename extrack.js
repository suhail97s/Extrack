document.body.style.border = "5px solid red";

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