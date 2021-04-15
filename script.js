// Fetch the items from JSON file
function loadItems() {
  return fetch('data/data.json')
  .then(response => response.json()) // return fetch throw response 
  // .then(json => console.log(json));  better to check line by line using console
  .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join(''); // Array to String => join('')
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
    <span class="item_description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

// // Handle button click
// function onButtonClick(event, items) {
//   const dataset = event.target.dataset;
//   const key = dataset.key;
//   const value = dataset.value;

//   if(key == null || value == null) {
//     return;
//   }
//   updateItems(items, key, value);
// }

// //Make the items matching {key: value} invisible
// function updateItems(items, key, value) {
//   items.forEach(item => {
//     if (item[key] === value) {
//       item.classList.remove("invisible");
//     } else {
//       item.classList.add("invisible");
//     }
//   });
// }


function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter(item => item[key] === value));
}

//also possible but it need to be updated everytime it's called. not effective. 
//so better solution will be the above


function setEventListener(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}


//main
loadItems() 
  .then(items => {
    // take json items check with console.log(items);
    displayItems(items);
    setEventListener(items)
})
.catch(console.log);