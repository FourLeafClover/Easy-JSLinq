(function () {

    var ERRORCode_1 = "Array can not be null";
    var ERRORCode_2 = "The type of field must be number";
    var ERRORCode_3 = "The type of Param is not array";

    var dataItems = [];

    var Linq = function () {
    };

    Linq.prototype.All = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        if (dataItems.length === 0) {
            return false;
        }

        var result = true;
        for (var index = 0; index < dataItems.length; index++) {
            if (!func(dataItems[index])) {
                result = false;
                break;
            }
        }
        return result;
    }

    Linq.prototype.Add = function (item) {

        if (dataItems === null) {
            throw ERRORCode_1;
        }
        if (item != null) {
            dataItems.push(item);
        }

        return this;
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

    Linq.prototype.Clear = function () {
        if (dataItems === null) {
            throw ERRORCode_1;
        }
        dataItems.splice(0, dataItems.length);
    }

    Linq.prototype.Count = function () {
        if (dataItems === null) {
            throw ERRORCode_1;
        }
        return dataItems === null ? 0 : dataItems.length;
    }

    Linq.prototype.From = function (array) {
        dataItems = array;
        return this;
    }

    Linq.prototype.FindIndexOf = function (func) {
        if (dataItems) {
            throw ERRORCode_1;
        }

        var result = -1;

        for (var index = 0; index < dataItems.length; index++) {
            if (func(dataItems[index])) {
                result = index;
            }
        }

        return result;
    }

    Linq.prototype.FindLastIndexOf = function (func) {
        if (dataItems) {
            throw ERRORCode_1;
        }

        var result = -1;

        for (var index = dataItems.length - 1; index >= 0; index--) {
            if (func(dataItems[index])) {
                result = index;
            }
        }

        return result;
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

    Linq.prototype.Foreach = function (func) {

        if (dataItems === null) {
            throw ERRORCode_1;
        }

        dataItems.forEach(function (item) {
            func(item);
        });

        return this;
    }

    Linq.prototype.IndexOf = function (item) {
        if (dataItems) {
            throw ERRORCode_1;
        }

        if (item === null) {
            return -1;
        }
        else {
            return dataItems.indexOf(item);
        }

        return this;
    }

    Linq.prototype.Join = function (splitChar) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        return dataItems.join(splitChar);
    }

    Linq.prototype.LastIndexOf = function (item) {
        if (dataItems) {
            throw ERRORCode_1;
        }

        var result = -1;
        if (item !== -1) {
            for (var index = dataItems.length - 1; index >= 0; index--) {
                if (dataItems[index] === item) {
                    result = index;
                    break;
                }
            }
        }
        return result;
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

    Linq.prototype.Pop = function (item) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        var index = dataItems.indexOf(item);
        if (index > 0) {
            dataItems.splice(index, 1);
        }
        return this;
    }

    Linq.prototype.PopRange = function (items) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        if (!Array.isArray(items)) {
            throw ERRORCode_3;
        }

        items.forEach(function (item) {
            var index = dataItems.indexOf(item);
            if (index > 0) {
                dataItems.splice(index, 1);
            }
        })
        return this;
    }

    Linq.prototype.RemoveAll = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        var removeItem = [];
        dataItems.forEach(function (item) {
            if (func(item)) {
                removeItem.push(item);
            }
        })

        removeItem.forEach(function (item) {
            var index = dataItems.indexOf(item);
            dataItems.splice(index, 1);
        });

        return this;
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

    Linq.prototype.Select = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }

        var result = [];

        dataItems.Foreach(function (item) {
            result.push(func(item));
        })

        dataItems = result;
        return this;
    }

    Linq.prototype.Sort = function (func) {
        if (dataItems === null) {
            throw ERRORCode_1;
        }
        dataItems.sort(func);
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

        array.forEach(function (item) {
            dataItems.push(item);
        });

        return this;
    }

    Linq.prototype.ToArray = function () {
        return dataItems;
    }

    Linq.prototype.Where = function (func) {
        if (dataItems === null) {
            throw  ERRORCode_1;
        }
        var result = [];

        dataItems.Foreach(function (item) {
            if (func(item)) {
                result.push(item);
            }
        });
        dataItems = result;
        return this;
    }

    var jsLinq = new Linq();

    window.EasyLinq = jsLinq;
})(window.EasyLinq);