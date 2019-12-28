export function hex_to_ascii(str1)
{
    var hex  = str1.toString();
    var str = '';
    for (var n = 2; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

// convertit les BN en string et les hexa en ascii
export function makeReadable(property) {
    let res = {}
    for ( let key in property ) {
        if ( typeof property[key] === 'string' && key !== 'owner' && key !== '7' ) {
            res[key] = hex_to_ascii(property[key])
        }
        else if ( typeof property[key] === 'object' ) {
            res[key] = property[key].toNumber()
        }
        else {
            res[key] = property[key]
        }
    }
    return res
}
