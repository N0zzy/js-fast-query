const $$ = new function () {
    'use strict';
    const cache = new Map();
    this.elem = [];

    const jFquery = function(e) {
        this.elem = e;
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
        this.addClass = (selector)=> {
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
        this.text = (content = null)=> {
            if(content === null) {
                return this.elem[0].innerText;
            }
            this.elem.forEach((o)=>{
                o.innerText = content;
            });
        };
        this.html = (content = null, append = false)=> {
            if(content === null) {
                return this.elem[0].innerHTML;
            }

            this.elem.forEach((o)=>{
                o.innerText = content;
                !!append ? o.innerHTML += content : o.innerHTML = content;
            });
        };
        this.width = (fixed = 2)=> {
            return Number(this.elem[0].getBoundingClientRect().width.toFixed(fixed));
        };
        this.height = (fixed = 2)=> {
            return this.elem[0].getBoundingClientRect().height.toFixed(fixed);
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
    };

    this.query = (selector)=> {
        if(!cache.has(selector)){
            this.elem = [];
            this.elem.push("string" == typeof selector
                ? document.querySelector(selector)
                : selector
            );
            cache.set(selector, new jFquery(this.elem));
        }
        return cache.get(selector);
    };
    this.queryAll = (selector)=> {
        if(!cache.has(selector)){
            this.elem = document.querySelectorAll(selector);
            cache.set(selector, new jFquery(this.elem));
        }
        return cache.get(selector);
    };
    this.clearCache = (selector = null)=> {
        if(selector === null) {
            cache.clear();
        }
        else {

        }
    };
};