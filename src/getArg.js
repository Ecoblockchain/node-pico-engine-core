var _ = require("lodash");

/**
 * This allows for both named and positional args
 */
module.exports = function(args, name, index){
    if(args === void 0 || args === null){
        return void 0;
    }
    return _.has(args, name)
        ? args[name]
        : args[index];
};
