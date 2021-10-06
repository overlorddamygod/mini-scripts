const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let greaterNumIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[greaterNumIndex]) {
        greaterNumIndex = j;
      }
    }
    if (greaterNumIndex != i) {
      let temp = arr[i];
      arr[i] = arr[greaterNumIndex];
      arr[greaterNumIndex] = temp;
    }
  }
  return arr;
};

const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let val = arr[i];

    j = i - 1;
    while (j >= 0 && arr[j] > val) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = val;
  }
  return arr;
};

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  let middle = Math.floor(arr.length / 2);

  let leftArr = arr.slice(0, middle);
  let rightArr = arr.slice(middle);

  return merge(mergeSort(leftArr), mergeSort(rightArr));
};

const merge = (arr1, arr2) => {
  let sorted = [];
  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      sorted.push(arr1.shift());
    } else {
      sorted.push(arr2.shift());
    }
  }
  return [...sorted, ...arr1, ...arr2];
};

const dec = selectionSort([3, 4, 6, 9, 10, 15]);

console.log(dec);
