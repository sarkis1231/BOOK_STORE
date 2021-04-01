const {Fn} = require("../functions");
const {SCHEMES_NAMES} = require("../constants");
let UTIL = {};

UTIL.getBooksFilterAggregate = function (set) {
    let aggregateArray = [
        // deleted
        {$match: {disabled: {$ne: true}}},

        // pagination
        {$skip: set.index ? parseInt(set.index) : 0},

        // pagination limit
        {$limit: set.limitBy ? set.parseInt(set.limitBy) : 10}
    ];

    if(!Fn.isEmpty(set.query)) {
        // filters
        aggregateArray.push({$match: {...set.query}})
    }

    let $lookups = [
        {
            $lookup: {
                from: SCHEMES_NAMES.Authors.toLowerCase(),
                localField: "author",
                foreignField: "_id",
                as: 'author'
            }
        },
        {
            $lookup: {
                from: SCHEMES_NAMES.Genres.toLowerCase(),
                localField: "genre",
                foreignField: "_id",
                as: 'genre'
            }
        }
    ];

    aggregateArray.push(...$lookups);

    return aggregateArray;

};

module.exports = UTIL;