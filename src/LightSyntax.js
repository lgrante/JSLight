const Syntax = {
    keyWords: {
        COMPONENT: "component",
        INCLUDE: "include",
        CONTENT: "content",
        IF: "if",
        LIST: "list",
        ITEM: "item",
        ACTION: "action"
    },

    symbols: {
        instruction: "?",
        chain: ":"
    },

    getParameters: attributeValue => attributeValue.search(/([a-z]+\, )+[a-z]+/).split(', '),
}

export default Syntax