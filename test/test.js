(function(){

    var data =

    QUnit.test("Count",function(assert){
        var count =  EasyLinq.From([1,2,3,4]).Count();
        console.log(count);
        assert.ok(count === 4,'Linq for Count Passed!');
    });

    QUnit.test("All",function(assert){
        var result = EasyLinq.From([1,1,1,1]).All(function(x){
            return x===1;
        });

        assert.ok(result,'Linq for All Passed!');
    });

    QUnit

})(window.QUnit);
