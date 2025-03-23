function quickSort(arr,num){
  let left=0;
  let right=arr.length;
  while(left<right){
    while(arr[right-1]>num){
      right--;
    }
    while(arr[left]<num){
      left++;
    }
    let temp=arr[right];
    arr[right]=arr[left];
    arr[left]=temp;
  } 
}