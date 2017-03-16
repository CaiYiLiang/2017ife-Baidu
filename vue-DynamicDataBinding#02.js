/*
 *动态数据绑定（二）
 *http://ife.baidu.com/course/detail/id/20
 *Run environment : Browser
*/
function Observer(obj){
  this.data = obj;
  this.walk(obj);
}

Observer.prototype.walk = function(obj) {
  Object.keys(obj).forEach(key => {
    let val = obj[key]
    if(typeof obj[key] === "object"){
      new Observer(obj[key])
    }

    Object.defineProperty(this.data,key,{
     enumerable: true,
     configurable: true,
     get:function(){ 
       console.log("You are visiting the attribute: "+ key +" - " + val)
       return val },
     set:function(newValue) {
       if(typeof newValue === 'object'){
       new Observer(newValue)
       } 
       console.log("You are updating the attribute: "+ key +" - "+ newValue)
       Observer.prototype.$change.call(this,key,newValue)  //Event Trigger 
       val = newValue
      }
  })
 })
}

Observer.prototype.oberseredList = {}  //subscriber list,shared property with oberser&publisher
let oberseredList = Observer.prototype.oberseredList

Observer.prototype.$watch = (oberseredKey,cb) =>{    //subscriber register
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


/*Test Case*/
var person1 = new Observer({name:"xiaoming", age:20, address:{add1:"China",add2:"UK"} });
person1.data.age
person1.$watch('age', function(age) {
         console.log(`我的年纪变了，现在已经是：${age}岁了`)
 });
person1.data.age = 55
person1.data

/*ERROR: Uncaught RangeError: Maximum call stack size exceeded
*
*You cannot access a property in the getters or setters by the same name 
*as a property you are defining using Object.defineProperty. 
*You've created a recursive function call that never exits.
*
*/

/*ERROR: "arguments is not defined" 
*
* An arrow function expression has a shorter syntax than a function expression 
*and does not bind its own this, arguments, super, or new.target. 
*These function expressions are best suited for non-method functions, 
*and they cannot be used as constructors.
*/
