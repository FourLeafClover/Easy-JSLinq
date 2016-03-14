(function () {

    var ERRORCode_1 = "Array can not be null";
    var ERRORCode_2 = "The type of field must be number";
    var ERRORCode_3 = "The type of Param is not array";

    var dataItems = [];

    var Linq = function () {
    };

    Linq.prototype.From = function (array) {
        dataItems = array;
        return this;
    }

    Linq.prototype.Count = function () {
        if (dataItems === null) {
            throw ERRORCode_1;
        }
        return dataItems === null ? 0 : dataItems.length;
    }

    Linq.prototype.All = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        if (dataItems.length === 0) {
            return false;
        }

        var result = true;
        for(var index = 0; index<dataItems.length;index++){
            if (!func(dataItems[index])) {
                result = false;
                break;
            }
        }
        return result;
    }

    Linq.prototype.Any = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        var result = false;

        for (var index = 0; index < dataItems.length; index++) {
            if (func(dataItems[index])) {
                result = true;
                break;
            }
        }
        return result;
    }

    Linq.prototype.Sum = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        if (dataItems.length === 0) {
            return 0;
        }

        var sum = 0;
        if (typeof(func[dataItems]) === 'number') {
            for (var item in dataItems) {
                sum += func(dataItems);
            }
        } else {
            throw ERRORCode_2;
        }

        return sum;
    }

    Linq.prototype.Join = function (splitChar) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        return dataItems.join(splitChar);
    }

    Linq.prototype.FirstOrDefault = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        if (dataItems.length === 0) {
            return null;
        }

        return dataItems[0];
    }

    Linq.prototype.LastOrDeafult = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        if (dataItems.length === 0) {
            return null;
        }
        return dataItems[dataItems.length - 1];
    }

    Linq.prototype.Where = function (func) {
        if (dataItems === null) {
            throw  ERRORCode_1;
        }
        var result = [];

        dataItems.Foreach(function(item){
            if (func(item)) {
                result.push(item);
            }
        });
        dataItems = result;
        return this;
    }

    Linq.prototype.Select = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        var result = [];

        dataItems.Foreach(function(item){
            result.push(func(item));
        })

        dataItems = result;
        return this;
    }

    Linq.prototype.Foreach = function (func) {

        if (dataItems === null) {
            throw ERRORCode_1;
        }

        dataItems.forEach(function(item){
           func(item);
        });

        return this;
    }

    Linq.prototype.AddRange = function (array) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        if (array === null) {
            return this;
        }

        if (!Array.isArray(array)) {
            throw ERRORCode_3;
        }

        array.forEach(function(item){
            dataItems.push(item);
        });

        return this;
    }

    Linq.prototype.Remove = function (item) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        var index = dataItems.indexOf(item);
        if (index > 0) {
            dataItems.splice(index, 1);
        }
        return this;
    }

    Linq.prototype.RemoveRange = function (items) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        if (!Array.isArray(items)) {
            throw ERRORCode_3;
        }

        items.forEach(function(item){
            var index = dataItems.indexOf(item);
            if (index > 0) {
                dataItems.splice(index, 1);
            }
        })
        return this;
    }

    Linq.prototype.ToArray = function () {
        return dataItems;
    };

    var jsLinq = new Linq();

    window.EasyLinq = jsLinq;
})(window.EasyLinq);