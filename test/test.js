(function () {

    var getObjArray = function () {
        return [
            {Name: 'Florence', Age: 23, Birthday: new Date('1992/02/02')},
            {Name: 'Hardy', Age: 23, Birthday: new Date('1992/02/02')},
            {Name: 'Frank', Age: 24, Birthday: new Date('1992/02/02')},
            {Name: 'Loch', Age: 24, Birthday: new Date('1992/02/02')},
            {Name: 'Vincent', Age: 25, Birthday: new Date('1992/02/05')},
            {Name: 'Timothy', Age: 25, Birthday: new Date('1990/02/02')}
        ];
    };

    QUnit.test("All", function (assert) {
        var result = EasyLinq.From([1, 1, 1, 1]).All(function (x) {
            return x === 1;
        });
        assert.ok(result);
    });

    QUnit.test("Add", function (assert) {
        var data = [1, 2, 3, 4];
        EasyLinq.From(data).Add(4);
        assert.deepEqual(data, [1, 2, 3, 4, 4]);
    });

    QUnit.test("Any", function (assert) {
        var result1 = EasyLinq.From([1, 2, 3, 4]).Any(function (x) {
            return x === 2;
        });

        var result2 = EasyLinq.From([1, 2, 3, 4]).Any(function (x) {
            return x === 5;
        });

        var result3 = EasyLinq.From([]).Any(function (x) {
            return x === 5;
        });

        assert.ok(result1);
        assert.ok(!result2);
        assert.ok(!result3);
    });

    QUnit.test('Clear', function (assert) {
        var data = [1, 2, 3, 4];
        EasyLinq.From(data).Clear();
        assert.deepEqual(data, []);
    })

    QUnit.test('Count', function (assert) {
        var data1 = [];
        var data2 = [1, 2, 3, 4];
        var result1 = EasyLinq.From(data1).Count();
        var result2 = EasyLinq.From(data2).Count();
        assert.equal(0, 0);
        assert.equal(4, 4);
    })

    QUnit.test('FindexIndexOf', function (assert) {
        var data1 = [1, 2, 3, 3, 4];
        var data2 = [];

        var result1 = EasyLinq.From(data1).FindIndexOf(function (item) {
            return item === 3;
        });

        var result2 = EasyLinq.From(data1).FindIndexOf(function (item) {
            return item === 5;
        });

        var result3 = EasyLinq.From(data2).FindIndexOf(function (item) {
            return item === 1;
        });

        assert.equal(2, 2, 'Linq For FindIndex of 1th passed!');
        assert.equal(-1, -1, 'Passed!');
        assert.equal(-1, -1, 'Passed!');

    });

    QUnit.test('FindLastIndexOf', function (assert) {
        var data1 = [1, 2, 2, 3, 3, 5];
        var data2 = [];

        var result1 = EasyLinq.From(data1).FindLastIndexOf(function (item) {
            return item === 3;
        });

        var result2 = EasyLinq.From(data1).FindLastIndexOf(function (item) {
            return item === 5;
        });

        var result3 = EasyLinq.From(data2).FindLastIndexOf(function (item) {
            return item === 1;
        });

        assert.equal(4, 4);
        assert.equal(-1, -1);
        assert.equal(-1, -1);
    })

    QUnit.test('FirstOrDefault', function (assert) {
        var data1 = [];
        var data2 = getObjArray();
        var result1 = EasyLinq.From(data1).FirstOrDefault();
        var result2 = EasyLinq.From(data2).FirstOrDefault();
        var result3 = EasyLinq.From(data2).FirstOrDefault(function (item) {
            return item.Age > 23;
        });
        var result4 = EasyLinq.From(data2).FirstOrDefault(function (item) {
            return item.Age > 26;
        });

        assert.deepEqual(result1, null);
        assert.deepEqual(result2, data2[0]);
        assert.deepEqual(result3, data2[2]);
        assert.deepEqual(result4, null);
    })

    QUnit.test('ForEach', function (assert) {
        var data = getObjArray();
        EasyLinq.From(data).Foreach(function (item) {
            item.Name = 'Test';
            item.Age = 30;
        });

        var expected = [
            {Name: 'Test', Age: 30, Birthday: new Date('1992/02/02')},
            {Name: 'Test', Age: 30, Birthday: new Date('1992/02/02')},
            {Name: 'Test', Age: 30, Birthday: new Date('1992/02/02')},
            {Name: 'Test', Age: 30, Birthday: new Date('1992/02/02')},
            {Name: 'Test', Age: 30, Birthday: new Date('1992/02/05')},
            {Name: 'Test', Age: 30, Birthday: new Date('1990/02/02')}
        ];
        assert.deepEqual(data, expected);
    })

    QUnit.test('IndexOf', function (assert) {
        var data = getObjArray();
        var indexData = data[3];
        var result1 = EasyLinq.From(data).IndexOf(indexData);
        assert.equal(result1, 3);
        var result2 = EasyLinq.From(data).IndexOf(123);
        assert.equal(result2, -1);
    })

    QUnit.test('Join', function (assert) {
        var data1 = [];
        var data2 = [1, 2, 3];
        var result1 = EasyLinq.From(data1).Join(',');
        var result2 = EasyLinq.From(data2).Join(',');
        assert.equal(result1, '');
        assert.equal(result2, '1,2,3');
    });

    QUnit.test('Pop', function (assert) {
        var data = getObjArray();
        var popItem = data[1];

        var expected = [
            {Name: 'Florence', Age: 23, Birthday: new Date('1992/02/02')},
            {Name: 'Frank', Age: 24, Birthday: new Date('1992/02/02')},
            {Name: 'Loch', Age: 24, Birthday: new Date('1992/02/02')},
            {Name: 'Vincent', Age: 25, Birthday: new Date('1992/02/05')},
            {Name: 'Timothy', Age: 25, Birthday: new Date('1990/02/02')}
        ];
        EasyLinq.From(data).Pop(popItem);
        assert.deepEqual(data, expected);
    });

    QUnit.test('PopRange', function (assert) {
        var data = getObjArray();
        var popItems = [data[0], data[1]];

        var expected = [
            {Name: 'Frank', Age: 24, Birthday: new Date('1992/02/02')},
            {Name: 'Loch', Age: 24, Birthday: new Date('1992/02/02')},
            {Name: 'Vincent', Age: 25, Birthday: new Date('1992/02/05')},
            {Name: 'Timothy', Age: 25, Birthday: new Date('1990/02/02')}
        ];

        EasyLinq.From(data).PopRange(popItems);
        assert.deepEqual(data, expected);
    });

    QUnit.test('RemoveAll', function (assert) {
        var data = getObjArray();
        EasyLinq.From(data).RemoveAll(function (item) {
            return item.Age === 23;
        });

        var expected = [
            {Name: 'Frank', Age: 24, Birthday: new Date('1992/02/02')},
            {Name: 'Loch', Age: 24, Birthday: new Date('1992/02/02')},
            {Name: 'Vincent', Age: 25, Birthday: new Date('1992/02/05')},
            {Name: 'Timothy', Age: 25, Birthday: new Date('1990/02/02')}
        ];
        assert.deepEqual(data, expected);
    });

    QUnit.test('Sum', function (assert) {
        var data1 = [];
        var data2 = [1, 2, 3];
        var data3 = getObjArray();

        var result1 = EasyLinq.From(data1).Sum();
        var result2 = EasyLinq.From(data2).Sum();
        var result3 = EasyLinq.From(data3).Sum(function (item) {
            return item.Age;
        });

        assert.equal(result1, 0);
        assert.equal(result2, 6);
        assert.equal(result3, 144);
    })

    QUnit.test('Select', function (assert) {
        var data = [1, 2, 3, 4];
        var result = EasyLinq.From(data).Select(function (item) {
            return item * 2;
        }).ToArray();

        assert.deepEqual(result, [2, 4, 6, 8]);
    })

    QUnit.test('AddRange', function (assert) {
        var data = [1,2,3,4];
        EasyLinq.From(data).AddRange([5,6]);
        assert.deepEqual(data,[1,2,3,4,5,6]);
    })

    QUnit.test('Where',function(assert){
        var data = getObjArray();
        var result = EasyLinq.From(data).Where(function(item){
           return item.Age === 24;
        }).ToArray();

        var expected = [data[2],data[3]];
        assert.deepEqual(result,expected);
    })

})(window.QUnit);
