var utils =
(function () {

function debug () {
    if ( utils.isDebug ) {
        console.log.apply( console, arguments );
    }
}


function random ( min, max ) {
    var length = arguments.length, tmp;
    if ( length == 1 ) {
        max = min;
        min = 0;
    } else if ( length == 2 ) {
        if ( min > max ) {
            tmp = min;
            min = max;
            max = tmp;
        }
    } 

    if ( typeof min != 'number' || typeof max != 'number' ) {
        throw new Error( '参数必须使用数字' );
    } 
    // 参数不能是 NaN, 也不能是 无穷大
    if ( !isFinite( min ) || !isFinite( max ) || isNaN( min ) || isNaN( max ) ) {
        throw new Error( '未提供有效参数' );
    }


    // debug( '字符串拼接实现: min = ' + min + ', max = ' + max );
    debug( 'min = %d, max = %d', min, max );
    return parseInt( ( max - min ) * Math.random() + min );
}
function sort( array, callback ) {
    if ( callback == null ) callback = ( a, b ) => a > b;
    for ( var i = 0; i < array.length - 1; i++ ) {
        for ( var j = 0; j < array.length - 1 - i; j++ ) {
            if ( callback( array[ j ], array[ j + 1 ] ) ) {
                var tmp = array[ j ];
                array[ j ] = array[ j + 1 ];
                array[ j + 1 ] = tmp;
            }
        }
    }
}
var utils = {
    isDebug: true,
    random: random,
    sort:sort
};

return utils;
})();