const $$ = new function () {
    'use strict';
    this.elem = null;
    this.query = (elem)=> {
        this.elem = [];
        this.elem.push("string" == typeof elem
            ? document.querySelector(elem)
            : elem
        );
        return this;
    };
    this.queryAll = (selector)=> {
        this.elem = document.querySelectorAll(selector);
        return this;
    };
    this.ready = (fn)=> {
        if(this.elem[0] !== null && this.elem[0] !== undefined) {
            fn(this, this.elem);
            return {error: false};
        }
        return {error: true};
    };
    this.css = (styles)=> {
        this.elem.forEach((o)=>{
            for(let s in styles){
                o.style[s] = styles[s];
            }
        });
        return this;
    };
    this.append = (content)=> {
        this.elem.forEach((o)=>{
            switch(typeof content){
                case "string": o.innerHTML += content; break;
                case "object": o.appendChild(content); break;
            }
        });
        return this;
    };
    this.prepend = (content)=> {
        this.elem.forEach((o)=>{
            switch(typeof content){
                case "string": o.innerHTML = content + o.innerHTML; break;
                case "object": o.prepend(content); break;
            }
        });
        return this;
    };
    this.remove = ()=> {
        this.elem.forEach((o)=>{
            o.remove();
        });
    };
    this.clear = ()=> {
        this.elem = [];
    };
    this.attr = (name, value = "")=> {
        this.elem.forEach((o)=>{
            o.setAttribute(name, value);
        });
        return this;
    };
    this.addClass = ()=> {
        this.elem.forEach((o)=>{
            o.classList.add(selector);
        });
        return this;
    };
    this.removeClass = (selector)=> {
        this.elem.forEach((o)=>{
            o.classList.remove(selector);
        });
        return this;
    };
    this.click = (click)=> {
        this.elem.forEach((o)=>{
            o.onclick = click;
        });
    };
    this.text = (content)=> {
        this.elem.forEach((o)=>{
            o.innerText = content;
        });
    };
    this.html = (content, append = false)=> {
        this.elem.forEach((o)=>{
            o.innerText = content;
            !!append ? o.innerHTML += content : o.innerHTML = content;
        });
    };

    this.exec = (params = {})=> {
        if(typeof params != 'object') return;
        this.elem.forEach((o)=>{
            for (let k in params) {
                switch (k.toLowerCase()) {
                    case 'css': for(let s in params[k]){
                        o.style[s] = styles[s];
                    } break;
                    case 'append': switch(typeof params[k]){
                        case "string": o.innerHTML += content; break;
                        case "object": o.appendChild(content); break;
                    } break;
                    case 'prepend': switch(typeof params[k]){
                        case "string": o.innerHTML = content + o.innerHTML; break;
                        case "object": o.prepend(content); break;
                    } break;
                    case 'click': o.onclick = params[k]; break;
                    case 'text': o.innerText = params[k]; break;
                    case 'html': o.innerHTML = params[k]; break;
                    case 'attr': o.setAttribute(params[k].name, params[k].value); break;
                    case 'addclass': o.classList.add(params[k]); break;
                    case 'removeclass': o.classList.remove(params[k]); break;
                    case 'remove': params[k] ? o.remove() : null; break;
                }
            }
        });
    };

    this.module = {};

    this.extends = (name, fn)=> {
        this.module[name] = ()=> {
            fn($$.elem);
        };
    };
};