const linearSearch = (arr, val) => {
  for (_arr of arr) {
    if (_arr == val) {
      return true;
    }
  }
  return false;
};

const binarySearch = (arr, val) => {
  if (!arr.length) return false;

  let middle = Math.floor(arr.length / 2);

  if (arr[middle] == val) return true;

  if (val < arr[middle]) return binarySearch(arr.slice(0, middle), val);
  else return binarySearch(arr.slice(middle + 1), val);
};

console.log(binarySearch([3, 4, 6, 9, 10, 15], 20));
