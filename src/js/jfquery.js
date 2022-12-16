const $$ = new function () {
    'use strict';
    let cache = new Map();

    const jFquery = function(e, s) {
        this.elem = e;
        this.selector = s;
        this.events = {};

        let extendEvents = ()=> {
            this.elem.forEach((e, i)=>{
                for (let key in e) {
                    if(key.startsWith('on', 0)) {
                        if(e[key] !== null)  this.events[key] = 'enable';
                    }
                }
            });
        };

        extendEvents();

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
        this.appendData = (o, content)=> {
            if(typeof content === 'string')  {
                o.insertAdjacentHTML('beforeend', content);
            }
            else {
                if(content instanceof jFquery){
                    o.insertAdjacentElement('beforeend', content.elem[0]);
                }
                else {
                    o.insertAdjacentElement('beforeend', content);
                }
            }
        };

        this.append = (content)=> {
            if(this.elem.length > 1) {
                this.elem.forEach((o)=>{
                    this.appendData(o, content);
                });
            }
            else {
                this.appendData(this.elem[0], content);
            }
            return this;
        };
        this.prepend = (content)=> {
            this.elem.forEach((o)=>{
                if(typeof content === 'string')  o.insertAdjacentHTML('afterbegin', content);
                else {
                    if(content instanceof jFquery){
                        o.insertAdjacentElement('afterbegin', content.elem[0]);
                    }
                    else {
                        o.insertAdjacentElement('afterbegin', content);
                    }
                }
            });
            return this;
        };
        this.remove = (all = false)=> {
            if(all) {
                this.elem.forEach((o, i)=>{
                    o.innerHTML = "";
                });
            }
            else {
                this.elem[0].innerHTML = "";
            }
            $$.clearCache(this.selector);
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
        this.resize = (fn)=> {
            this.elem.forEach((o, i)=>{
                o.onresize = fn;
            });
            return this;
        };
        this.contextmenu = (click)=> {
            this.elem.forEach((o, i)=>{
                o.oncontextmenu = click;
                this.events[i]['oncontextmenu'] = 'enable';
            });
            return this;
        };
        this.dblclick = (click)=> {
            this.elem.forEach((o, i)=>{
                o.ondblclick = click;
                this.events[i]['ondblclick'] = 'enable';
            });
            return this;
        };
        this.click = (click)=> {
            this.elem.forEach((o, i)=>{
                o.onclick = (e)=> {
                    click(e);
                };
                this.events['onclick'] = click;
            });
            return this;
        };
        this.hover = (over, out)=> {
            this.elem.forEach((o,i)=>{
                o.onmouseover = over;
                o.onmouseout = out;
                this.events[i]['onmouseover'] = 'enable';
                this.events[i]['onmouseout'] = 'enable';
            });
            return this;
        };
        this.on = (type, fn)=> {
            this.elem.forEach((o,i)=>{
                o['on' + type] = fn;
                this.events[i]['on' + type] = 'enable';
            });
            return this;
        };
        this.off = ()=> {
            this.elem.forEach((o, i)=>{
                for(let n in this.events[i]){
                    o[n] = null;
                    delete this.events[n];
                }
            });
            return this;
        };
        this.text = (content = null)=> {
            if(content === null) {
                return this.elem[0].innerText;
            }
            this.elem.forEach((o)=>{
                o.innerText = content;
            });
            return this.elem[0];
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
        this.animate = (props = {}) => {
            if(!window.anime){
                console.warn('library `https://animejs.com` not found...');
                return;
            }
            props.targets = this.selector;
            window.anime(props);
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
            let elem = [];
            elem.push( document.querySelector(selector) );
            cache.set(selector, new jFquery(elem, selector));
        }
        return cache.get(selector);
    };
    this.queryAll = (selector, )=> {
        if(!cache.has(selector)){
            let elem = document.querySelectorAll(selector);
            cache.set(selector, new jFquery(elem, selector));
        }
        return cache.get(selector);
    };
    this.make = (tag, selector = '')=> {
        if(!cache.has(selector)){
            let elem = [];
            let e = document.createElement(tag);
            let id = selector.match(/#(?<id>[^#\s]+)/);
            e.id = id === null ? null: id.groups.id;
            let gCls = selector.match(/(?<classes>\.[^#]+)/);
            gCls = gCls === null ? "" : gCls.groups.classes;
            gCls.slice(1).split('.').forEach((v)=>{
                if(v.length < 1) return;
                e.classList.add(v);
            });
            elem.push( e );
            cache.set(selector, new jFquery(elem, selector));
        }
        return cache.get(selector);
    };
    this.clearCache = (selector = null)=> {
        if(selector === null) {
            cache.clear();
        }
        else {
            cache.delete(selector);
        }
    };
    this.getCache = ()=> {
        return cache;
    };
};