# js-fast-query
jFquery - alternative jquery library that is several times faster than it due to additional object caching for working with DOM elements.

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
