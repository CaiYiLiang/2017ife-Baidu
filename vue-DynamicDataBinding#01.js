/*
 *动态数据绑定（一）
 *http://ife.baidu.com/course/detail/id/15
 *Run environment : Browser
*/

// ES5 Syntax
function Observer(obj){
   //console.log("Observering..")
   this.walk(obj)
}

var p = Observer.prototype
p.data = {}

p.walk = function(obj){
	Object.keys(obj).forEach(function(key){
		//console.log(key+": "+obj[key])
		if(typeof obj[key] === "object"){return p.walk(obj[key])}
         Object.defineProperty(p.data,key,{
        	get:function(){ console.log("You are visiting the attribute: "+ key+" - "+obj[key]); return obj[key]  },
        	set:function(newValue) { console.log("You are updating the attribute: "+ key+" - "+ newValue); obj[key] = newValue }
        })
	})
}


// ES6 Syntax
Observer.prototype.data = {};

class Observer{
   constructor(obj){
   	 //console.log("Observering..")
   	 this.walk(obj)
   }

   walk(obj){
    Object.keys(obj).forEach(key => {
		//console.log(key+": "+obj[key])
		if(typeof obj[key] === "object"){return Observer.prototype.walk(obj[key])}
         Object.defineProperty(data,key,{
        	get:() => { console.log("You are visiting the attribute: "+ key+" - "+obj[key]); return obj[key]  },
        	set:newValue => { console.log("You are updating the attribute: "+ key+" - "+ newValue); obj[key] = newValue }
        })
	})
   }
}

/* Test Case */
var person1 = new Observer({name:"xiaoming", age:20, address:{add1:"China",add2:"UK"} });
person1.data.add1
