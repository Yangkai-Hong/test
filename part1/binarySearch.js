var binarySearch = function(ele, arr) {
    let left = 0,
        right = arr.length - 1,
        mid;
    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        //console.log(left, mid, right);
        if (arr[mid] <= ele) left = mid + 1; 
        else right = mid - 1;
    }
    return left;
}

var arr = new Array(10).fill(0).map(x => Math.random());
arr.sort((a,b) => a - b)

console.log(binarySearch(0.44, arr), arr)