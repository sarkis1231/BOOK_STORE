let Fn = {};
Fn.isEmpty= function (value) {
    return (
        !!(value === undefined || value === null ||
            (typeof value === 'object' && !(Array.isArray(value)) && value["empty"]) ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        )
    );
} //prototype Lib Util let's say

Fn.noop= function (){}

module.exports = {Fn};