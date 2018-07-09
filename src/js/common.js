



function dataFilter(data) {
	
		if(!data || data.length == 0) return [];
		var treeData = []
		function getTree(data,id,treeData){
			for(var i = 0; i< data.length; i++){
				if(data[i].pid == id){
					//为了tree的数据格式
						var item = {
						label: data[i].name,
						value:`${data[i].id}`,
						key: `${data[i].id}`,
						pid: data[i].pid
					}
					treeData.push(Object.assign(data[i],item))
				
					if(isSame(data[i].id)){
						treeData[treeData.length-1].children = [];
						getTree(data, treeData[treeData.length-1].id, treeData[treeData.length-1].children)
					}
				}
			}
		}
	//判断有没有子元素
	function isSame(id) {
		var falg = false;
		for (let i = 0; i < data.length; i++) {
			if(data[i].pid == id){
			falg=true;
				break;
			}
		}
		return falg
	}
	getTree(data, 0, treeData)
	if(JSON.stringify(treeData) == "[]"){
		getTree(data, 10, treeData)
	}
	return treeData
}
//改变权限限定
const goIntoHomeRouteBefore = (history, location, power) => {
	
	const pathname = location.pathname
	let isBreak = false;
   let isSamePath = false
   if(pathname == "/home" || pathname == "/login") return false; 
	for (let i = 0; i < power.length; i++) {
		if(isBreak){
			break
		}
		if(power[i].children){
			for (let k = 0; k < power[i].children.length; k++) {
				const item =  power[i].children[k];	
				if(pathname.indexOf(item.path)+1){
					isSamePath = true;
					isBreak = true;
					break;
				}
				
			}
		}	
	}
	
// 	//没有相同的时候
	if(!isSamePath){
		for (const key in sessionStorage) {
			if (sessionStorage.hasOwnProperty(key)) {
				 sessionStorage[key] = ""
				
			}
		}
		history.replace("/login")
	}
	
}

export {dataFilter, goIntoHomeRouteBefore}