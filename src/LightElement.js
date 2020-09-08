const LightElementEditor = require('./LigthElementEditor')

const elementType = {
    CONDITIONAL: "conditional",
    DYNAMIC: "dynamic",
    LIST: "list",
    RESPONSIVE: "responsive"
}

exports.elementType = elementType

function LightElement(node, type)
{
    if (!Object.values(elementType).includes(type))
        throw new Error(type + " is not a corret element type.")
    this.node = node,
    this.parent = node.parentNode,
    this.childs = node.childNodes,
    this.prev = node.previousSibling,
    this.next = node.nextSibling,
    this.type = type
}

LightElement.prototype.setContent = content => {
    if (content.constructor.name !== "Array" && this.type === elementType.LIST)
        throw new Error("Element of type list can't have content different from Array type.")
    switch (this.type) {
        case elementType.CONDITIONAL:
            LightElementEditor(this, document).setDisplay(content)
        case elementType.DYNAMIC:
            this.node.innerHTML = content
        case elementType.LIST:
            LightElementEditor(this, document).setChildList(content)
    }
}

exports.LightElement = LightElement