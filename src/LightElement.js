import LightElementEditor from './LigthElementEditor'

export const elementType = {
    CONDITIONAL: "conditional",
    DYNAMIC: "dynamic",
    LIST: "list",
    RESPONSIVE: "responsive"
}

export function LightElement(node, type)
{
    if (!Object.values(elementType).includes(type))
        throw new Error(type + " is not a corret element type.")
    this = {
        node: node,
        parent: node.parentNode,
        childs: node.childNodes,
        prev: node.previousSibling,
        next: node.nextSibling,
        type: type
    }
}

LightElement.prototype.setContent = content => {
    if (content.constructor.name !== "Array" && this.type === elementType.LIST)
        throw new Error("Element of type list can't have content different from Array type.")
    switch (this.type) {
        case elementType.CONDITIONAL:
            LightElementEditor(this).setDisplay(content)
        case elementType.DYNAMIC:
            this.node.innerHTML = content
        case elementType.LIST:
            LightElementEditor(this).setChildList(content)
    }
}