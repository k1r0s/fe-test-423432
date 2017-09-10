var data = require("../dist/data/host-app-data.json");
// data = data.slice(0, 50);

//Copyright 2009 Nicholas C. Zakas. All rights reserved.
//MIT-Licensed, see source file
function binarySearch(items, value){

    var startIndex  = 0,
        stopIndex   = items.length - 1,
        middle      = Math.floor((stopIndex + startIndex)/2);

    while(items[middle] != value && startIndex < stopIndex){

        //adjust search area
        if (value < items[middle]){
            stopIndex = middle - 1;
        } else if (value > items[middle]){
            startIndex = middle + 1;
        }

        //recalculate middle
        middle = Math.floor((stopIndex + startIndex)/2);
    }

    //make sure it's the right value
    return (items[middle] != value) ? -1 : middle;
}

// http://www.stoimen.com/blog/2010/07/02/friday-algorithms-javascript-merge-sort/
function mergeSort(arr) {
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    return merge(mergeSort(left), mergeSort(right));
}

function fastIterate(array, cbk) {
  for (var i = 0, l = array.length; i < l; i++) {
    cbk(array[i], i);
  }
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}

function flatByKey(array, key) {
  var result = []
  // flat 'host' key
  fastIterate(array, function(item){
    result.push.apply(result, item[key]);
  })
  return result;
}

function removeDuplicates(array){
  var sortedArray = mergeSort(array);
  var result = [];
  fastIterate(sortedArray, function(item, i){
    if(result[result.length - 1] === item) return;
    result.push(item);
  });
  return result;
}

function groupBy(groups, array) {

  fastIterate(array, function(item){
    fastIterate(item.host, function(hostName){
      if(groups[hostName] instanceof Array)
        groups[hostName].push(item);
    });
  });
}

function getGroupedAppsByHost(array) {
  var hosts = [];
  var uniqueHosts = [];

  // O(n)
  var hosts = flatByKey(array, "host");

  // O(n log(n))
  var uniqueHostNames = removeDuplicates(hosts);

  // O(n)
  var uniqueHosts = {};
  fastIterate(uniqueHostNames, function(hostName, i){
    uniqueHosts[hostName] = [];
  })

  // O(n * N)) where N is the longest host list
  groupBy(uniqueHosts, array);

  return uniqueHosts;
}

// Array.prototype.sort is O(n log(n)) > info https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
function $getTopAppsByHost$(group, hostName) {
  var appList = group[hostName];

  appList.sort(function(a, b){
    return b["apdex"] - a["apdex"];
  });

  return appList.slice(0, 25);
}

var start = Date.now();
var result = getGroupedAppsByHost(data);
// console.log(result);
// sort -> e7bf58af-f0be.dallas.biz
var sortedApps = $getTopAppsByHost$(result, "e7bf58af-f0be.dallas.biz");
var end = Date.now();
sortedApps.forEach(function(app){
  console.log("\n" + app.apdex + " | " + app.name + "\n");
});

console.log("data processing took %d ms", end - start);
