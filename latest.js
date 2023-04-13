// get JSON data
import bookmarks from "./bookmarks_2023-04-02.mjs";
import newBookmarks from "./bmExternal.js";

let bm = bookmarks.concat(newBookmarks);
console.log(bm);

let body = document.querySelector("body");
const ul = document.querySelector("ul");
let items = document.querySelectorAll("li");

bm.forEach(function (bookmark) {
  let newLi = document.createElement("li");
  ul.append(newLi);
  let a = document.createElement("a");
  a.href = bookmark.url;
  a.innerHTML = bookmark.title;
  const p = document.createElement("p");
  p.innerHTML = bookmark.summary;
  newLi.append(a, p);
  if (bookmark.starred) {
    newLi.classList.add("is-starred");
  }
});

function liveSearch() {
  let search_query = document.getElementById("searchbox").value;
  let items = document.querySelectorAll("li");
  //Use innerText if all contents are visible
  //Use textContent for including hidden elements
  for (var i = 0; i < items.length; i++) {
    if (items[i].innerHTML.toLowerCase().includes(search_query.toLowerCase())) {
      items[i].classList.remove("is-hidden");
    } else {
      items[i].classList.add("is-hidden");
    }
  }
}

//A little delay
let typingTimer;
let typeInterval = 500;
let searchInput = document.getElementById("searchbox");

searchInput.addEventListener("keyup", () => {
  clearTimeout(typingTimer); // The global clearTimeout() method cancels a timeout previously established by calling setTimeout().
  typingTimer = setTimeout(liveSearch, typeInterval);
});

// TAG FILTER ___________________________________

function tagSearch() {
  let tagFilter = tagInput.value;
  let items = document.querySelectorAll("li");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add("is-hidden");
  }
  //Use innerText if all contents are visible
  //Use textContent for including hidden elements
  bm = bm.filter((tag) => tag.tags.includes(tagFilter));
  bm.forEach(function (bookmark) {
    let newLi = document.createElement("li");
    ul.append(newLi);
    let a = document.createElement("a");
    a.href = bookmark.url;
    a.innerHTML = bookmark.title;
    const p = document.createElement("p");
    p.innerHTML = bookmark.summary;
    newLi.append(a, p);
    if (bookmark.starred) {
      newLi.classList.add("is-starred");
    }
  }); 
}
let tagInput = document.getElementById("tag-filter-box");
tagInput.addEventListener("change", tagSearch);

// STARRED ___________________________________
let starredCheckbox = document.getElementById("starred-checkbox");
let starredItems = document.querySelectorAll("li.is-starred");

starredCheckbox.addEventListener("change", () => {
  let items = document.querySelectorAll("li");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add("is-hidden");
    if (items[i].classList.contains("is-starred") && starredCheckbox.checked) {
      console.log("is-starred and checked");
      items[i].classList.remove("is-hidden");
    } else {
      items[i].classList.add("is-hidden");
    }
    if (!starredCheckbox.checked) items[i].classList.remove("is-hidden");
  }
});

// RESET _____________________________________

let reset = document.querySelector("#reset");

reset.addEventListener("click", resetFilters);

function resetFilters() {
  let items = document.querySelectorAll("li");
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("is-hidden");
    items[i].className = "";
    items[i].classList.remove("is-starred");
    document.getElementById("searchbox").value = "";
    tagInput.value = "";

    console.log("executed resetFilters function on 'li's' (items)");
  }
}

/* ............. SAVE JSON  ............. */

/* import { writeFileSync } from 'fs';
const JSONToFile = (obj, filename) =>
  writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));
JSONToFile(bm, 'bm-edited')
console.log('edit', 'bm-edited.json') */

