# js-fast-query
jFquery - alternative jquery library for faster work with DOM-elements

## example
>.elem - js object-element (vanilla)

    $$.query("div").elem.innerHTML = "test";
___
>.ready() + .css()

    $$.query("div").ready((o, e)=>{
        o.css({
            width: "100px"
        });      
    });
___
> .css()

    $$.query("div").css({
        width: "100px" 
    });
___
>.text() - only write

    $$.query("div").text('test');
___
>.html() - only write

    $$.query("div").html('<div>test</div>');
___
>.extends() + .module.fn

    $$.extends("test", ()=> {
        console.dir("test");
    });

    $$.query("div").module.test();
 ___   