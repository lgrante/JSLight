const Syntax = require('./LightSyntax')
const ObjectBrowser = require('./utils/ObjectBrowser')
const { LightElement } = require('./LightElement')

function LightElementEditor(element, document) {
    this.domTree = document.body
    this.element = element
}

LightElementEditor.prototype.setDisplay = function(state) {
    const { node, parent, next, prev } = this.element

    if (state && !this.domTree.contains(node)) {
        if (parent.childElementCount === 0)
            parent.appendChild(node)
        else if (next !== null)
            parent.insertBefore(node, next)
        else if (prev !== null)
            prev.after(node)
    } else if (!state && this.domTree.contains(node))
        parent.removeChild(node)
}

LightElementEditor.prototype.setContent = function(content) {
    if (content !== this.element.node.innerHTML)
        this.element.node.innerHTML = content
}

LightElementEditor.prototype.setChildList = function(content) {
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

module.exports = LightElementEditor