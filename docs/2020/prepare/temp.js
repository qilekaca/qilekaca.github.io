const arr = [3, 4, 5, 2, 6, 1, 9];
// function mergeSort(arr) {
//   let len = arr.length;
//   if (len < 2) return;
//   let m = Math.floor(len / 2),
//     left = arr.slice(0, m),
//     right = arr.slice(m);
//   return merge(mergeSort(left), mergeSort(right));
// }
// function merge(left, right) {
//   let result = [];
//   while (left.length && right.length) {
//     if (left[0] <= right[0]) {
//       result.push(left.shift());
//     } else {
//       result.push(right.shift());
//     }
//   }
//   while (left.length) {
//     result.push(left.shift());
//   }
//   while (right.length) {
//     result.push(right.shift());
//   }
//   return result;
// }
function mergeSort(arr) {
  // 采用自上而下的递归方法
  var len = arr.length;
  if (len < 2) {
    return arr;
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
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

  while (left.length) result.push(left.shift());

  while (right.length) result.push(right.shift());

  return result;
}
console.log(mergeSort(arr));
