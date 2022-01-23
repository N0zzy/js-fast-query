const $$ = new function () {
    this.elem = null;

    this.query = (selector)=> {
        this.elem = document.querySelector(selector);
        return this;
    };
    this.ready = (fn)=> {
        if(this.elem != null) {
            fn(this, this.elem);
            return {error: false};
        }
        return {error: true};
    };
    this.css = (styles)=> {
        for(let s in styles){
            this.elem.style[s] = styles[s];
        }
        return this;
    };
    this.append = (content)=> {
        switch(typeof content){
            case "string": this.elem.innerHTML += content; break;
            case "object": this.elem.appendChild(content); break;
        }
        return this;
    };
    this.prepend = (content)=> {
        switch(typeof content){
            case "string": this.elem.innerHTML = content + this.elem.innerHTML; break;
            case "object": this.elem.prepend(content); break;
        }
        return this;
    };
    this.remove = ()=> {
        this.elem.remove();
        this.elem = null;
    };
    this.clear = ()=> {
        this.elem = null;
    };
    this.attr = (name, value = "")=> {
        this.elem.setAttribute(name, value);
        return this;
    };
    this.addClass = ()=> {
        this.elem.classList.add(selector);
        return this;
    };
    this.removeClass = (selector)=> {
        this.elem.classList.remove(selector);
        return this;
    };
    this.click = (click)=> {
        this.elem.onclick = click;
    };
    this.text = (content)=> {
        this.elem.innerText = content;
    };
    this.html = (content)=> {
        this.elem.innerHTML = content;
    };

    this.module = {};

    this.extends = (name, fn)=> {
        this.module[name] = ()=> {
            fn($$.elem);
        };
    };
};
