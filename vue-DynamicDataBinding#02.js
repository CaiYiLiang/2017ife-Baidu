/*
 *动态数据绑定（二）
 *http://ife.baidu.com/course/detail/id/20
 *Run environment : Browser
*/

function Observer(obj){
   this.walk(obj)
}

var p = Observer.prototype
p.data = {}

p.walk = function(obj){
    Object.keys(obj).forEach(function(key){
    if(typeof obj[key] === "object"){p.walk(obj[key])}
    console.log(key);
    Object.defineProperty(p.data,key,{
        get:function(){ 
          console.log("You are visiting the attribute: "+ key+" - "+ obj[key]); 
          return obj[key]  },
        set:function(newValue) { 
          console.log("You are updating the attribute: "+ key +" - "+ newValue); 
          obj[key] = newValue }
        })
	})
}


/* Test Case */
var person1 = new Observer({name:"xiaoming", age:20, address:{add1:"China",add2:"UK"} });
person1.data.add1

//=============================================================================================
/*
function Observer (data) {
  //暂不考虑数组
  this.data = data;
  this.makeObserver(data);
}
Observer.prototype.setterAndGetter = function (key, val) {
  //此为问题一的要点
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function(){
      console.log('你访问了' + key);
      return val;
    },
    set: function(newVal){
      console.log('你设置了' + key);
      console.log('新的' + key + '=' + newVal);
      val = newVal;
    }
  })
}
Observer.prototype.makeObserver = function (obj) {
  let val;
  //此为问题二的要点
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      val = obj[key];
      //深度遍历
      if(typeof val === 'object'){
        new Observer(val);
      }
    }
    this.setterAndGetter(key, val);
  }
}

//测试
let app = new Observer({
basicInfo: {
    name: 'liujianhuan',
    age: 25
},
company: 'Qihoo 360',
address: 'Chaoyang, Beijing'









*/