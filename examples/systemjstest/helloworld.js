
export function sayHello() {
    alert('Hello world!');
}
 export function sayHelloInline() {
    var node = document.createElement('p');
    var textnode = document.createTextNode('Hello world!!!');
    node.appendChild(textnode);
    document.body.appendChild(node);
}