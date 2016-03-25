(function () {

    var ERRORCode_1 = "Array can not be null or undefined";
    var ERRORCode_2 = "Please input one param";
    var ERRORCode_3 = "The type of Param is not array";
    var ERRORCode_4 = "The function only support one param";

    var Creator = function () {
    };

    var Linq = function (dataSource) {
        this.dataSource = dataSource;
    };

    Creator.prototype.From = function () {
        var args = arguments;
        if (args.length === 0) {
            throw ERRORCode_2;
        }
        if (args.length > 1) {
            throw ERRORCode_4;
        }
        if (args[0] === undefined || args[0] === null) {
            throw ERRORCode_1;
        }
        if (!Array.isArray(args[0])) {
            throw ERRORCode_3;
        }
        return new Linq(args[0]);
    }

    Linq.prototype.All = function (func) {
        if (this.dataSource === null) {
            throw ERRORCode_1;
        }

        if (this.dataSource.length === 0) {
            return false;
        }

        var result = true;
        for (var index = 0; index < this.dataSource.length; index++) {
            if (!func(this.dataSource[index])) {
                result = false;
                break;
            }
        }
        return result;
    }

    Linq.prototype.Add = function (item) {
        this.dataSource.push(item);
        return this;
    }

    Linq.prototype.Any = function (func) {
        var result = false;
        for (var index = 0; index < this.dataSource.length; index++) {
            if (func(this.dataSource[index])) {
                result = true;
                break;
            }
        }
        return result;
    }

    Linq.prototype.Clear = function () {
        this.dataSource.splice(0, this.dataSource.length);
    }

    Linq.prototype.Count = function () {
        return this.dataSource.length;
    }

    Linq.prototype.FindIndexOf = function (func) {
        var result = -1;
        for (var index = 0; index < this.dataSource.length; index++) {
            if (func(this.dataSource[index])) {
                result = index;
            }
        }
        return result;
    }

    Linq.prototype.FindLastIndexOf = function (func) {
        var result = -1;
        for (var index = this.dataSource.length - 1; index >= 0; index--) {
            if (func(this.dataSource[index])) {
                result = index;
            }
        }

        return result;
    }

    Linq.prototype.FirstOrDefault = function (func) {
        if (this.dataSource.length === 0) {
            return null;
        }
        if (func === undefined) {
            return this.dataSource[0];
        } else {
            for (var index = 0; index < this.dataSource.length; index++) {
                if (func(this.dataSource[index])) {
                    return this.dataSource[index];
                }
            }
        }
        return null;
    }

    Linq.prototype.Foreach = function (func) {
        this.dataSource.forEach(function (item) {
            func(item);
        });
        return this;
    }

    Linq.prototype.IndexOf = function (item) {
        return this.dataSource.indexOf(item);
        return this;
    }

    Linq.prototype.Join = function (splitChar) {
        return this.dataSource.join(splitChar);
    }

    Linq.prototype.LastOrDeafult = function (func) {
        if (this.dataSource.length === 0) {
            return null;
        }
        return this.dataSource[this.dataSource.length - 1];
    }

    Linq.prototype.Pop = function (item) {
        var index = this.dataSource.indexOf(item);
        if (index > -1) {
            this.dataSource.splice(index, 1);
        }
        return this;
    }

    Linq.prototype.PopRange = function (items) {
        if (!Array.isArray(items)) {
            throw ERRORCode_3;
        }
        var outer = this;
        items.forEach(function (item) {
            var index = outer.dataSource.indexOf(item);
            if (index > -1) {
                outer.dataSource.splice(index, 1);
            }
        })
        return this;
    }

    Linq.prototype.RemoveAll = function (func) {
        var removeItem = [];
        this.dataSource.forEach(function (item) {
            if (func(item)) {
                removeItem.push(item);
            }
        })

        var outer = this;
        removeItem.forEach(function (item) {
            var index = outer.dataSource.indexOf(item);
            outer.dataSource.splice(index, 1);
        });

        return this;
    }

    Linq.prototype.Sum = function (func) {
        if (this.dataSource.length === 0) {
            return 0;
        }
        var sum = 0;

        if (func === undefined) {
            this.dataSource.forEach(function (item) {
                if (typeof(item) === 'number') {
                    sum += item;
                } else {
                    throw ERRORCode_3;
                }
            });
        }
        else {
            this.dataSource.forEach(function (item) {
                var iterator = func(item);
                if (typeof(iterator) === 'number') {
                    sum += iterator;
                } else {
                    throw ERRORCode_3;
                }
            });
        }
        return sum;
    }

    Linq.prototype.Select = function (func) {
        var result = [];

        this.dataSource.forEach(function (item) {
            result.push(func(item));
        })

        this.dataSource = result;
        return this;
    }

    Linq.prototype.Sort = function (func) {
        this.dataSource.sort(func);
        return this;
    }

    Linq.prototype.AddRange = function (array) {
        if (array === null) {
            return this;
        }

        if (!Array.isArray(array)) {
            throw ERRORCode_3;
        }

        var outer = this;
        array.forEach(function (item) {
            outer.dataSource.push(item);
        });

        return this;
    }

    Linq.prototype.ToArray = function () {
        return this.dataSource;
    }

    Linq.prototype.Where = function (func) {
        var result = [];
        this.dataSource.forEach(function (item) {
            if (func(item)) {
                result.push(item);
            }
        });
        this.dataSource = result;
        return this;
    }

    if (window.EasyLinq === undefined || window.EasyLinq === null) {
        window.EasyLinq = new Creator();
    }

})(window.EasyLinq);