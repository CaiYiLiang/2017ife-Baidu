/*
 *动态数据绑定（三）
 *http://ife.baidu.com/course/detail/id/21
 *Run environment : Browser
*/
function Observer(obj){
  this.data = obj
  this.ParentNodeList = this.getParentNodeList();
  this.walk(obj)
}

Observer.prototype.walk = function(obj) {

  let parentNodeList = this.ParentNodeList
  Object.keys(obj).forEach(key => {
    let val = obj[key]
    if(typeof obj[key] === "object"){
       this.walk(obj[key])
    }

    Object.defineProperty(obj,key,{
     enumerable: true,
     configurable: true,
     get:function(){ 
       console.log("You are visiting the attribute: "+ key +" - " + val)
       return val },
     set:function(newValue) {       
       Object.keys(parentNodeList).forEach(function(listKey){
         if(parentNodeList[listKey]===key){
          delete parentNodeList[listKey]
         }
       })

       if(typeof newValue === 'object'){
       // refresh the ParentNodeList
       let newObj = newValue
       Object.keys(newObj).forEach(function(newObjKey){
         parentNodeList[newObjKey] = key
       })
       
       console.log("set中的this")
       console.log(this)
       this.ParentNodeList = parentNodeList

       Observer.prototype.walk.call(this,newValue)
       } 
       console.log("You are updating the attribute: "+ key +" - "+ newValue)
       Observer.prototype.$change.call(this,key,newValue)  //Event Trigger 
       
       if(parentNodeList.hasOwnProperty(key)){
         Observer.prototype.$change.call(this,parentNodeList[key])
       }
      
       val = newValue
      }
  })
 })
}

Observer.prototype.oberseredList = {}  //subscriber list,shared property with oberser&publisher
let oberseredList = Observer.prototype.oberseredList


Observer.prototype.$watch = function(oberseredKey,cb) {    //subscriber register
  if(!oberseredList.hasOwnProperty(oberseredKey)){
   oberseredList[oberseredKey] = []
  }
  oberseredList[oberseredKey].push(cb)
}

Observer.prototype.$change = function(oberseredKey){  //Event Trigger
  let params = Array.prototype.slice.call(arguments,1)
  if(oberseredList.hasOwnProperty(oberseredKey)) { 
     oberseredList[oberseredKey].forEach(cb => {
      cb.apply(null,params)
     })
  }
  
}

Observer.prototype.getParentNodeList = function() {
   let parentNodeList = {}

   Object.keys(this.data).forEach( key => {  
    if(typeof this.data[key] === "object"){
      let parentNodeKey = key
      Object.keys(this.data[key]).forEach( key => {
        parentNodeList[key] = parentNodeKey
      })
    } 
    
  } )

  return parentNodeList
} 

/*Test Case*/
var person1 = new Observer({name: { firstName: 'shaofeng', lastName: 'liang'}, age:20, address:{add1:"China",add2:"UK"} });
person1.data.age
person1.$watch('age', function(age) {
         console.log(`我的年纪变了，现在已经是：${age}岁了`)
 });
person1.data.age = 55
person1.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

person1.data.name.firstName = 'hahaha';

person1.data.name = { newName: "lady" , oldName: "beautiful"}

