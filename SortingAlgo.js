// Bubble Sort

function swap(array, i , j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
};

function bubbleSort(array) {
  let swaps = 0;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1);
      swaps++;
    }
  }

  if (swaps > 0) {
    return bubbleSort(array);
  }

  return array;
};

// Merge Sort

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right, array);
};

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }

  return array;
};

// Quicksort 

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }

  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

function partition(array, start, end) {
  const pivot = array[end -1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }

  swap(array, end - 1, j);
  return j;
};

/*
Question 1-
Understanding merge sort Given the following list of numbers:
21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

What is the resulting list that will be sorted after 3 recursive calls to mergesort? What is the resulting list that will be sorted after 16 recursive calls to mergesort? What are the first 2 lists to be merged? Which two lists would be merged on the 7th merge?

On call #1, left is assigned to [21, 1, 26, 45, 29, 28, 2, 9]. On recursive call #1, left is further divided to be [21, 1, 26, 45]. On recursive call #2, left is further divided to be [21, 1]. On recursive call #3 - mergeSort([21, 1]) - left is further divided to be [21]. On recursive call #4, mergeSort([21]) returns [21]. The algorithm then processes the right-side value of 1. On recursive call #5, mergeSort([1]) returns [1]. On recursive call #6, mergeSort([21, 1]) calls merge ([21], [1], [21, 1]). On recursive call #7, merge returns [1, 21]. This causes mergeSort([21, 1]) to return [1, 21]. On recursive call #8, mergeSort([26, 45]) divides left to be [26] and right to be [45]. On recursive call #9, mergeSort([26]) returns 26. On recursive call #10, mergeSort([45]) returns 45. On recursive call #11, merge([26], [45], [26, 45]) returns [26, 45]. This causes mergeSort([26, 45]) to return [26, 45]. On recursive call #12, mergeSort([21, 1, 26, 45]) calls merge([1, 21], [26, 45], [21, 1, 26, 45]) and returns [1, 21, 26, 45]. On recursive call #13, mergeSort([29, 28, 2, 9]) subdivides itself into [29, 28] and [2, 9]. On recursive call #14, mergeSort([29, 28]) subdivides itself into [29] and [28]. On recursive call #15, mergeSort([29]) returns 29. On recursive call #16, mergeSort([28]) returns 28.

*/

/*
Question 2-
Understanding quicksort
1) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order. After the first partition step has been completed, the contents of the array is in the following order: 3 9 1 14 17 24 22 20. Which of the following statements is correct about the partition step? Explain your answer.
The pivot could have been 17, but could not have been 14 ***The pivot could have been either 14 or 17 Neither 14 nor 17 could have been the pivot The pivot could have been 14, but could not have been 17

***The pivot could have been either 14 or 17: The array is currently sorted in such a way that all items to the left of 14 are less than 14 and all items to the right of 14 are greater than 14. This also holds true for 17. Therefore, either of these numbers could have been the pivot. No other value in the array meets this criteria.

2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 show the resulting list after the second partitioning according to the quicksort algorithm.
When using the last item on the list as a pivot

Partition #1: (Pivot = 12) [10, 3, 9, 12, 14, 17, 13, 15, 19, 16] Partition #2: (Left-side, pivot = 9) [3, 9, 10, 12, 14, 17, 13, 15, 19, 16]

When using the first item on the list as a pivot

Partition #1: (pivot = 14) [13, 10, 3, 9, 12, 14, 17, 15, 19, 16] Partition #2: (Left-side, pivot = 13) [10, 3, 9, 12, 13, 14, 17, 15, 19, 16]

*/

/* 
Question 3-
Implementing quicksort
Write a function qSort that sorts a dataset using the quicksort algorithm. 
The dataset to sort is: 
89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5.


let DATA = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'.split(' ');
DATA = DATA.map(num => parseInt(num));

function qSort(arr, start=0, end=arr.length) {
  if (start >= end) {
    return arr;
  }
  const middle = partition(arr, start, end);
  arr = qSort(arr, start, middle);
  arr = qSort(arr, middle+1, end);
  return arr;
}

function partition(arr, start, end) {
  const pivot = arr[end-1];
  let j = start;
  for (let i = start; i < end-1; i++) {
    if(arr[i] <= pivot) {
      swap(arr, i, j);
      j++;
    }
  }
  swap(arr, end-1, j);
  return j;
}

function swap (arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function main(){
  const sorted = qSort(DATA);
  console.log(sorted);
  let ok = true;
  for (let i=0; i<sorted.length-1; i++) {
    if (sorted[i] > sorted[i+1]) ok = false;
  }
  console.log(ok);
}
main();
*/

/* 
Question 4-
Implementing merge sort
Write a function mSort that sorts the dataset above using the merge sort algorithm.


let DATA = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'.split(' ');
DATA = DATA.map(num => parseInt(num));

function mSort (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.floor(arr.length/2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  left = mSort (left);
  right = mSort (right);
  return merge (left, right, arr);
}

function merge (left, right, arr) {
  let leftI = 0;
  let rightI = 0;
  let outputI = 0;
  while (leftI < left.length && rightI < right.length) {
    if (left[leftI] < right[rightI]) {
      arr[outputI++] = left[leftI++];
    }
    else {
      arr[outputI++] = right[rightI++];
    }
  }
  for (let i = leftI; i < left.length; i++) {
    arr[outputI++] = left[i];
  }
  for (let i = rightI; i < right.length; i++) {
    arr[outputI++] = right[i];
  }
  return arr;
}

function main(){
  const sorted = mSort(DATA);
  console.log(sorted);
  let ok = true;
  for (let i=0; i<sorted.length-1; i++) {
    if (sorted[i] > sorted[i+1]) ok = false;
  }
  console.log(ok);
}
main();

*/

/*
question 5-
const LinkedList = require('./list');
const {display} = require('./listFns');

5. Sorting a linked list using merge sort
Given a Linked List, sort the linked list using merge sort. 
You will need your linked list class from previous lesson 
to create the list and use all of its supplemental functions 
to solve this problem.


function mSortList (list) {
  let currNode = list.head;
  if (currNode.next === null) {
    return list;
  }
  let length = 1;
  while (currNode.next !== null) {
    length++;
    currNode = currNode.next;
  }
  const middleI = Math.floor(length/2);
  
  //make a new right-hand list with the second half of the nodes in the list
  let leftList = splitList(list, 0, middleI);
  // display(leftList);

  //make a new left-hand list
  // console.log('##################################');
  let rightList = splitList(list, middleI, length);
  // display(rightList);
  //add all of the values up to and including the middle node to leftList
  leftList = mSortList(leftList);
  rightList = mSortList(rightList);

  return mergeLists (leftList, rightList);
  
}

function splitList (list, startI, endI) {
  //make a new list of all nodes between startI and endI, including startI but not endI.
  let currNode = list.head;
  if (currNode === null) return;
  const returnList = new LinkedList();
  let i = 0;
  while (currNode !== null) {
    if (i >= startI && i < endI) {
      returnList.insertLast(currNode.value);
    }    
    i++;
    currNode = currNode.next;
  }
  return returnList;
}

function mergeLists (leftList, rightList) {
  //given two sorted lists, return a sorted list
  //containing all values of the two component lists, in ascending order

  //create a new empty linked list
  const mergedList = new LinkedList();
  let currLeft = leftList.head;
  let currRight = rightList.head;
  
  //while we still have nodes in both lists
  while (currLeft && currRight) {
    //if the value of the left list is lower, append it to the end of mergedList
    //and move currLeft forward one node
    if (currLeft.value <= currRight.value) {
      mergedList.insertLast(currLeft.value);
      currLeft = currLeft.next;
    }
    //otherwise append the value of currRight to mergedList
    //and move currRight forward one node
    else {
      mergedList.insertLast(currRight.value);
      currRight = currRight.next;
    }
  }
  //once we've reached the end of one list
  //append values from the remaining single list until none remain
  while (currLeft) {
    mergedList.insertLast(currLeft.value);
    currLeft = currLeft.next;
  }
  while (currRight) {
    mergedList.insertLast(currRight.value);
    currRight = currRight.next;
  }
  //return the merged list
  return mergedList;
}

function main(){
  const LL = new LinkedList();
  LL.insertFirst(7);
  LL.insertFirst(8);
  LL.insertFirst(3);
  LL.insertFirst(6);
  LL.insertFirst(4);
  LL.insertFirst(1);
  LL.insertFirst(2);
  LL.insertFirst(5);

  const sorted = mSortList(LL);
  display(sorted);
}
main();

function main2() {
  const LL1 = new LinkedList();
  LL1.insertFirst(2);

  const LL2 = new LinkedList();
  LL2.insertFirst(4);

  const merged = mergeLists(LL1, LL2);
  display(merged);

}
// main2();

*/

/*
Question 6-
Bucket sort
Write an O(n) algorithm to sort an array of integers, 
where you know in advance what the lowest and highest values are. 
You can't use arr.splice(), shift() or unshift() for this exercise.


function bucketSort (arr, min, max) {
  //given an array, sort it with an O(n) algorithm
  //we know the maximum range of all values in the array
  //because of this, we know every possible value in the array
  //pass every value in the array into a hashMap, tracking the number of times each value appears
  const numMap = new Map();
  for (let i=0; i< arr.length; i++) {
    if (numMap.get(arr[i]) === undefined) {
      numMap.set(arr[i], 1);
    }
    else {
      numMap.set(arr[i], numMap.get(arr[i])+1);
    }
  }
  //then iterate from min to max
  //retrieving the values in the hashmap to know how many times the given value appears
  //overwrite the values in arr in order
  let arrI = 0;
  for (let i = min; i <= max; i++) {
    let numAppearing = numMap.get(i);
    while (numAppearing) {
      arr[arrI] = i;
      numAppearing--;
      arrI++;
    }
  }
  return arr;  
}

function main() {
  const ARR = [3, 7, 4, 9, 12, 5, 19];
  const MAX = Math.max(...ARR);
  const MIN = Math.min(...ARR);
  
  bucketSort(ARR, MIN, MAX);
  console.log(ARR);
}
main();

*/

/*
Question 7-
Sort in place
const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function shuffle(arr) {
  //randomly shuffles an array in place
  for (let i = 0; i < arr.length; i++) {
    //select a random index
    let randomIndex = Math.floor(Math.random() * arr.length);
    //swap the values at i and at the randomly chosen index
    swap(i, randomIndex, arr);
  }
  //return the randomized array
  return arr;
}

function swap(i, j, arr) {
  //given two indexes in an array, swaps the values of the two.
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function main(){
  shuffle(DATA);
  console.log(DATA);
}
main();
*/

/*
Question 8-
orting books
Imagine that I gave you 20 books to sort in alphabetical order. 
Express this as an algorithm and then implement your algorithm.

//helper function to determine which of two books comes before the other
//check first letter of the book's title
//first letter in the alphabet gets sorted before other letters
//if first letter is identical, check second letter, third letter, and so on

function abcOrder (str1, str2, charIndex=0) {
  //returns true if str1 comes before str2 in abc order
  //returns false if str2 comes before str1 in abc order
  //if strings are identical, return true
  if (str1 === str2) {
    return true;
  }
  if (str1.toLowerCase().charCodeAt([charIndex]) < str2.toLowerCase().charCodeAt([charIndex])) {
    return true;
  }
  else if (str1.toLowerCase().charCodeAt([charIndex]) > str2.toLowerCase().charCodeAt([charIndex])) {
    return false;
  }
  else {
    return abcOrder (str1, str2, charIndex+1);
  }
}

//do a slightly modified merge sort on the array 
//to account for the difference in input type

function mSortStrings (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.floor(arr.length/2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  left = mSortStrings (left);
  right = mSortStrings (right);
  return mergeStringArr (left, right, arr);
}

function mergeStringArr (left, right, arr) {
  let leftI = 0;
  let rightI = 0;
  let outputI = 0;
  while (leftI < left.length && rightI < right.length) {
    if (abcOrder(left[leftI], right[rightI])) {
      arr[outputI++] = left[leftI++];
    }
    else {
      arr[outputI++] = right[rightI++];
    }
  }
  for (let i = leftI; i < left.length; i++) {
    arr[outputI++] = left[i];
  }
  for (let i = rightI; i < right.length; i++) {
    arr[outputI++] = right[i];
  }
  return arr;
}




function main () {
  const DATA = [
    'Goodnight Moon',
    'Tome of Horrors',
    'Where the Wild Things Are',
    'Modern Thermodynamics',
    'Intro tt C++',
    'Papercraft',
    'Grimms Fairy Tales',
    'Bedtime Bestsellers'
  ];
  mSortStrings(DATA);
  console.log(DATA);
}
main();

*/