export function getMergeSortAnimations(array){
  const animations = [];
  const tempArray = array.slice();
  var arrLength = tempArray.length;
  mergeSortHelper(tempArray, 0, arrLength-1, animations);

  return animations;
}

function mergeSortHelper(array, startIndx, endIndx, animations){
  if(startIndx >= endIndx){
    return;
  }
  const midIndx = startIndx + parseInt((endIndx-startIndx)/2);
  mergeSortHelper(array, startIndx, midIndx, animations);
  mergeSortHelper(array, midIndx+1, endIndx, animations);

  merge(array, startIndx, midIndx, endIndx, animations);
}

function merge(array, startIndx, midIndx, endIndx, animations){
  let i = startIndx;
  let j = midIndx+1;
  let k = startIndx;

  let copy = array.slice();

  while(i <= midIndx && j <= endIndx){
    if(copy[i] > copy[j]){
      animations.push([k, copy[j]]);
      animations.push([k, copy[j]]);
      array[k++] = copy[j++];
    }
    else{
      animations.push([k, copy[i]]);
      animations.push([k, copy[i]]);
      array[k++] = copy[i++];
    }
  }

  while(i <= midIndx){
    animations.push([k, copy[i]]);
    animations.push([k, copy[i]]);
    array[k++] = copy[i++];
  }
  while(j <= endIndx){
    animations.push([k, copy[j]]);
    animations.push([k, copy[j]]);
    array[k++] = copy[j++];
  }
}


export function getSelectionSortAnimations(array) {
  const animations = [];
  const tempArray = array.slice();
  var arrLength = tempArray.length;
  for(let i = 0; i < arrLength-1; i++){
    let minIndex = i;
    animations.push([0, tempArray[minIndex], minIndex, 0, 0]);
    for(let j = i + 1; j < arrLength; j++){
        if(tempArray[j] < tempArray[minIndex]){
          animations.push([0, tempArray[minIndex], minIndex, tempArray[j], j]);
          minIndex = j;
          animations.push([0, tempArray[minIndex], minIndex, tempArray[j], j]);
        }
    }
    animations.push([0, tempArray[minIndex], minIndex, 0, 0]);
    animations.push([0, tempArray[minIndex], minIndex, tempArray[i], i]);
    animations.push([1, tempArray[minIndex], minIndex, tempArray[i], i]);

    swap(tempArray, i, minIndex);
  }
  return animations;
}

function swap(array, indexOne, indexTwo){
  let temp = array[indexOne];
  array[indexOne] = array[indexTwo];
  array[indexTwo] = temp;
}

export function getInsertionSortAnimations(array){
  const animations = [];
  const tempArray = array.slice();
  var arrLength = array.length;
  for(let i = 0; i < arrLength; i++){
    let currVal = tempArray[i];
    for(let j = i - 1; j > -1; j--){
      if(tempArray[j] > currVal){
        animations.push([j, tempArray[j], currVal]);
        animations.push([j, tempArray[j], currVal]);
        swap(tempArray, j, j+1);
      }
      else{
        continue;
      }
    }
  }

  return animations;
}

export function getBubbleSortAnimations(array){
  const animations = [];
  const tempArray = array.slice();
  var arrLength = array.length;
  let isSorted = 0;
  while(!isSorted){
    isSorted = 1;
    for(let i = 0; i < arrLength-1; i++){
      animations.push([0, i, tempArray[i], tempArray[i+1]]);
      if(tempArray[i] > tempArray[i+1]){
        isSorted = 0;
        animations.push([1, i, tempArray[i], tempArray[i+1]]);
        swap(tempArray,i, i+1);
      }
      else{
        animations.push([2, i, tempArray[i], tempArray[i+1]])
      }
    }
  } 
  return animations;
}

export function getHeapSortAnimations(array){
  const animations = [];
  const tempArray = array.slice();
  var arrLength = array.length;
  //(n/2)-1 index is the last index of the heap that is not a leaf
  for(let i = Math.floor(arrLength/2 - 1); i >= 0; i--){
    heapify(tempArray, i, arrLength, animations);
  }

  //moving the root (the biggest value) to the end of the array, shortening the array length by 1, and heapifying, continually
  //moving the biggest value to the end to sort the array.
  for(let i = arrLength-1; i > 0; i--){
    animations.push([0, i, tempArray[0], tempArray[i]]);
    animations.push([0, i, tempArray[0], tempArray[i]]);
    swap(tempArray, 0, i);

    heapify(tempArray, 0, i, animations);
  }

  return animations;
}

//only visualize the ones that being swapped
function heapify(array, currIndx, length, animations){
  while(currIndx < length){
    const leftChildIndx = 2*currIndx + 1;
    const rightChildIndx = 2*currIndx + 2;
    let biggestIndx = currIndx;
    if(leftChildIndx < length && array[leftChildIndx] > array[biggestIndx]){
      biggestIndx = leftChildIndx;
    }
    if(rightChildIndx < length && array[rightChildIndx] > array[biggestIndx]){
      biggestIndx = rightChildIndx;
    }

    if(biggestIndx === currIndx){
      break;
    }

    animations.push([currIndx, biggestIndx, array[currIndx], array[biggestIndx]]);
    animations.push([currIndx, biggestIndx, array[currIndx], array[biggestIndx]]);

    swap(array, biggestIndx, currIndx);
    currIndx = biggestIndx;
  }
}

export function getQuickSortAnimations(array){
  const animations = [];
  const tempArray = array.slice();
  var arrLength = array.length;
  quickSortHelper(tempArray, 0, arrLength-1, animations);

  return animations;
}

function quickSortHelper(array, low, high, animations){
  if(low < high){
    let pIndx = partition(array, low, high, animations);

    if(low < pIndx-1){
      quickSortHelper(array, low, pIndx-1, animations);
    }
    if(high > pIndx){
      quickSortHelper(array, pIndx, high, animations);
    }
  }
}

function partition(array, low, high, animations){
  let i = low;
  let j = high;
  let pIndx = Math.floor((low+high)/2);
  animations.push([1, 0, pIndx, 0, 0, 0]);
  let pivot = array[pIndx];
  while(i <= j){
    if(array[i] < pivot){
      animations.push([0, 0, i, 0, 0 ,0]);
      animations.push([-1, 0, i, 0, 0 ,0]);
      i++;
      continue;
    }
    if(array[j] > pivot){
      animations.push([0, 0, j, 0, 0, 0]);
      animations.push([-1, 0, i, 0, 0 ,0]);
      j--;
      continue;
    }
    if(i <= j){
      animations.push([0, 1, i, j, array[i], array[j]]);
      animations.push([0, 1, i, j, array[i], array[j]]);
      swap(array, i, j);
      i++;
      j--;
    }
  }
  animations.push([2, 0, i, 0, 0, 0]);

  return i;
}