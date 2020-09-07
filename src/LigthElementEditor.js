import Syntax from './LightSyntax'
import ObjectBrowser from './utils/ObjectBrowser'

export default function LightElementEditor(element) {
    this.domTree = () => Object.values(document.all)
    this.element = element
}

LightElementEditor.prototype.setDisplay = state => {
    const { node, parent, next, prev } = this.element

    if (state && !this.domTree().includes(node)) {
        if (parent.childElementCount === 1) {
            parent.appendChild(node)
        } else if (next !== null) {
            parent.insertBefore(node, next)
        } else if (prev !== null) {
            parent.insertAfter(node, prev)
        }
    } else if (!state && this.domTree().includes(node))
        parent.removeChild(node)
}

LightElementEditor.prototype.setContent = content => {
    if (content !== this.node.innerHTML)
        this.node.innerHTML = content
}

LightElementEditor.prototype.setChildList = content => {
    const { child, node } = this.element
    const items = Object.values(child)
    const modelItem = items[0]

    for (let i = 0; i < content.length; i++) {
        const objectPath = Syntax.getParameters(Object.values(modelItem.attributes).find(a => Syntax.getKeyWord(a.nodeValue) === Syntax.ITEM).name)[0]
        const itemField = ObjectBrowser(content[i], objectPath)

        if (i < items.length) {
            if (items[i].innerHTML !== itemField.get())
                items[i].innerHTML = itemField.get()
        } else {
            const item = modelItem

            item.innerHTML = itemField.get()
            node.appendChild(item)
        }
    }
    for (let i = content.length; i < items.length; i++)
        node.removeChild(items[i])
}