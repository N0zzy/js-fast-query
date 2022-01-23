# js-fast-query
jFquery - alternative jquery library for faster work with DOM-elements

## example

>.elem - js object-element (vanilla)

    $$.query("div").elem.innerHTML = "test";

>.ready() + .css()

    $$.query("div").ready((o, e)=>{
        o.css({
            width: "100px"
        });      
    });

> .css()

    $$.query("div").css({
        width: "100px" 
    });

>.text() - only write

    $$.query("div").text();

>.html() - only write

    $$.query("div").html();

>.extends() + .module.fn

    $$.extends("test", ()=> {
        console.dir("test");
    });

    $$.query("div").module.test();
    