/**
 * @author ruoyu
 * @description 虚拟DMO Demo
 * @todo 暂时不考虑复杂情况
 */

 /**下面是ES6的写法 */
class VNode {
    constructor(tag, children, text) {
        this.tag = tag
        this.text = text
        this.children = children
    }

    render() {
        if (this.tag === '#text') {
            return document.createTextNode(this.text)
        }
        let el = document.createElement(this.tag)
        this.children.forEach(vChild => {
            el.appendChild(vChild.render())
        })
        return el
    }
}
/**上面是ES6写法 */


function v(tag, children, text){
    if(typeof children ==='string'){
        text = children
        children = []
    }
    return new VNode(tag, children, text)
}


// /**下面是ES5的写法 */
// function vNode(tag, children, text) {
//     this.tag = tag
//     this.text = text
//     this.children = children
// }

// vNode.prototype.render = function(){
//     if (this.tag === '#text') {
//         return document.createTextNode(this.text)
//     }
//     let el = document.createElement(this.tag)
//     this.children.forEach(vChild => {
//         el.appendChild(vChild.render())
//     })
//     return el
// }
// /***以上是ES5写法 */

let vNodes = v('div', [
    v('p', [
        v('span', [v('#text', 'xiedaimala.com')])
    ]), 
    v('span', [
        v('#text', 'jirengu.com')
    ])
])

console.log(vNodes)
console.log(vNodes.render())