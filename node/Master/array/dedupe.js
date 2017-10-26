'use strict'

function dedupe (client, hasher) {
    hasher = hasher || JSON.stringify

    const clone = []
    const lookup = {}

    for (let i = 0; i < client.length; i++) {
        let elem = client[i]  //数组元素
        let hashed = hasher(elem) //键

        

        if (!lookup[hashed]) {  //对象中没有键
            clone.push(elem)   //放到新数组
            lookup[hashed] = true //标识符
        }
    }

    return clone
}

module.exports = dedupe;