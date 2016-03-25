# Easy-JSLinq
Linq For JS

基于JS 的Linq 扩展.因为考虑如果直接在原型修改会破坏原型。尤其是在公司里面很多Team在一个大的平台开发。如果所有Team都在原型扩展方法，
导致的后果是。如果不同Team里面原型扩展名一样可是功能不一样就会比较麻烦。所以就只能单独写一个Linq库.来处理。

主要是将.net的Linq移植到JS上.对.Neter友好.对Java可能不太友好

>1.支持链式编程.
>2.调用From方法会实例化一个Object对象.dataSource是传进去的Array对象
{
   dataSource:Array
   .property
}
>3. 类似于.net的Linq.
  3.1 Where,FirstOrdefault... 取出来的都是From传进去的source里面的元素
  3.2 Add,Remove 也是会改变From 传进去的source数组的
  3.3 调用Select后会重新去实例化对象里面的dataSource. 但是不会去改变From方法传进去的source

var linq1 = EasyLinq.From([1,2,4]);
var sum = linq1.Sum(); // 7
var array2 = EasyLinq.From([1,2,4]).Select(function(item){
   return item*2;
}).ToArray(); // [2,4,8]

var sum2 = EasyLinq.From([1,2,4]).Select(function(item){
       return item*2;
 }).Sum(); // 14


