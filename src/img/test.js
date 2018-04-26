
//findNumber([1,3,3,4],2,function (num) {
//	console.log(num)
//})

//请使用递归实现一个函数findNumber，它接受3个参数，第一个参数是一个只含有数字的数组，第二个参数是一个数字，第三个参数是一个函数
//函数的功能是在数组中分别找出大于第二个参数的数字和小于第二个参数的数字，找完之后传入回调函数中
//如下：
findNumber([1,2,3,4,5,6], 3, (lessThanThree, greaterThanThree) => {
 console.log(lessThanThree);     // [1,2]
 console.log(greaterThanThree);  // [4,5,6]
})



function findNumber(numArr,anyNum,fn){
	var lessThanThree = [];
	var greaterThanThree = [];
	
	for(var i=0; i<numArr.length; i++){
		if(anyNum>numArr[i]){
			lessThanThree.push(numArr[i])
		}else{
			
			if(numArr[i] != anyNum){
				greaterThanThree.push(numArr[i])
			}
			
		}
	}
	fn(lessThanThree,greaterThanThree)
}