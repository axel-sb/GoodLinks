import { readdirSync } from 'node:fs';

// https://stackoverflow.com/a/72458960/12985826

//, Passing something like 'fs' to import depends on Node.js style module resolution. Node.js will search the contents of the node_modules folder for matching modules. Browsers can't do that, they haven't got a file system to search; they only deal in URLs.

//+++ If you want to access files on the user's computer, then you'll need to use <input type="file"> and the FileReader API.


let source = "/Volumes/Samsung/EggHead";

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

let folders = getDirectories(source);
let added;
let starred = false;
let i = 0;
let title = folders[i];
let tags = ["egghead", "tutorial", "coding", "video"];
let summary = "Tutorial Videos from EggHead.io";
let url = source + "/" + folders[0];
let newBookmarks = [];

// create an array of objects to be added to the existing bookmarks array from the JSON file

for (i; i < folders.length; i++) {
  added = Math.floor(Date.now() / 1000);
  title = folders[i];
  url = source + "/" + folders[i];
  newBookmarks.push({ added, tags, title, starred, url, summary });
} // end for loop

let manualBm = [{
  added: Math.floor(Date.now() / 1000),
  starred: "false",
  tags: ["local"],
  url: "/Users/a/Dropbox-M/KM/Floating Info Window"
}]

newBookmarks.concat(manualBm)

console.log({newBookmarks});

newBookmarks.forEach(function (bookmark) {
  let tag = bookmark.tags;
  console.log({tag});
});

export default newBookmarks;
