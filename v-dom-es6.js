/**
 * @author ruoyu
 * @description 虚拟DMO Demo
 * @todo 在若愚老师代码基础上理解虚拟dom，暂时不考虑复杂情况
 */

 /**下面是ES6的写法 */
class VNode {
    constructor(tag, children, text) {
        this.tag = tag
        this.text = text
        this.children = children
    }

    render() {    // 看似平平无奇，实则有东西的
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
        console.log('aaa', children)
        console.log('tag', tag)

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

/*

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

const root = document.querySelector('#root')
root.appendChild(vNodes.render())

let vNodes2 = v('div', [
    v('p', [
        v('span', [v('#text', 'xiedaimala.com')])
    ]), 
    v('span', [
        v('#text', 'jirengu.com')
    ]), 
    v('span', [
        v('#text', 'ruoyu')
    ])
])

document.querySelector('#btn').onclick = function(){
    root.innerHTML = ''
    root.appendChild(vNodes2.render())
}

*/

function patchElement(parent, newVNode, oldVNode, index = 0){  // parent 是DOM结构 要比较里面的孩子
    if(!oldVNode){   // patchElement(root, Vnode1)这样就没有老节点了
        parent.appendChild(newVNode.render())
    }else if(!newVNode){   // patchElement(root, null, Vnode1) 删除一个 目前若原来有两个只能删除一个，不完善
        parent.removeChild(parent.childNodes[index])
    }else if(newVNode.tag!==oldVNode.tag || newVNode.text !== oldVNode.text){
        console.log('parent', parent)
        console.log(newVNode)
        console.log(oldVNode)
        console.log(newVNode.text)
        console.log(oldVNode.text)
        parent.replaceChild(newVNode.render(), parent.childNodes[index])
    }else{
        for(let i=0; i<newVNode.children.length||i<oldVNode.children.length;i++){
            patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)
        }
    }
}

let vNode1 = v('div',[v('#text', 'hello')])
let vNode2 = v('div', [v('#text', 'world')])

console.log(vNode1)
console.log(vNode1.render())

const root = document.querySelector('#root')
patchElement(root, vNode1)

var a = ['hello']
console.log('aaa', typeof a)
console.log(a)