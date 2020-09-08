module.exports = {
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

    getParameters: attributeValue => attributeValue.match(/([a-zA-Z0-9]+\, )+[a-zA-Z0-9]+/)[0].split(', ')
}