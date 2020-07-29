import { enableGusture } from "./gusture";

export function createElement(Cls,attributes,...children){
    let o ;
    if(typeof Cls == "string"){
        o = new Wrap(Cls)
    } else {
        o = new Cls({
            timer:{}
        })
    }
    // let o = new Cls;
    for(let neme in attributes){
        // o[neme] = attributes[neme]
        o.setAttribute(neme,attributes[neme])
    }

    let visit = (children)=>{
        for(let child of children){
            if(typeof child  === "string"){
                child = new Text(child)
            }
            if(typeof child  === "object"&& child  instanceof Array){
                visit(child)
                continue
            }
            o.appendChild(child)
            // o.children.push(child)
        }
    }
    visit(children)
    

    return o;

}

export class Text{
    constructor(text){
        this.children = []
        this.root = document.createTextNode(text)
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}
class Wrap{
    constructor(type) {
        this.children = []
        this.root = document.createElement(type)
    }
   
    setAttribute(name,val){
        this.root.setAttribute(name,val)
        if(name.match(/^on([\s\S]+)$/)){
            let eventName = RegExp.$1.replace(/^[\s\S]/, c=>c.toLowerCase())
            this.addEventListener(eventName,val)
        }
        if(name == "enableGusture"){
            enableGusture(this.root)
        }

       
    }
    appendChild(child){
        this.children.push(child)
    }
    addEventListener(){
        this.root.addEventListener(...arguments)
    }

    get style(){
        return this.root.style
    }
    mountTo(parent){
        parent.appendChild(this.root)
        for(let child of this.children){
            child.mountTo(this.root)
        }
    }
}