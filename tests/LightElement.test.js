const { JSDOM } = require('jsdom')
const LightElementEditor = require('../src/LigthElementEditor')
const { LightElement, elementType } = require('../src/LightElement')

function getLightElementEditor(html, type) {
    const { document } = new JSDOM(html).window
    const targetNode = document.getElementsByClassName("target")[0]
    const lightElement = new LightElement(targetNode, type)

    return { document: document, editor: new LightElementEditor(lightElement, document) }
}

function getHTML(body) {
    return '<html>' +
                '<head>' +
                    '<meta charset="utf-8">' +
                    '<title>Unit test</title>' +
                '</head>' +
                '<body>' +
                    body +
                '</body>' +
            '</html>'
}

describe('Change element content directly from LightElementEditor', () => {
    describe('test conditional element', () => {
        describe('one child', () => {
            const defaultBody = 
                '<div>' +
                    '<h1 class="target">Hello World</h1>' +
                '</div>'
            const { document, editor } = getLightElementEditor(getHTML(defaultBody), elementType.CONDITIONAL)

            test('hide a ligth element', () => {
                editor.setDisplay(false)
                expect(document.body.innerHTML).toEqual('<div></div>')
            })
            
            test('hide and show again a light element', () => {
                editor.setDisplay(false)
                editor.setDisplay(true)
                expect(document.body.innerHTML).toEqual(defaultBody)
            })
        })

        describe('several childs: one after or one before the targeted node', () => {
            const defaultBodyTargetBefore = 
                '<div>' +
                    '<p class="target">Item 1</p>' +
                    '<p>Item 2</p>' +
                '</div>'
            const defaultBodyTargetAfter = 
                '<div>' +
                    '<p>Item 1</p>' +
                    '<p class="target">Item 2</p>' +
                '</div>'
            const defaultBodyTargetInList =
                '<div>' +
                    '<p>Item 1</p>' +
                    '<p class="target">Item 2</p>' +
                    '<p>Item 3</p>' +
                    '<p>Item 4</p>' +
                '</div>'

            test('hide and show again a light element before', () => {
                const { document, editor } = getLightElementEditor(getHTML(defaultBodyTargetAfter), elementType.CONDITIONAL)

                editor.setDisplay(false)
                editor.setDisplay(true)
                expect(document.body.innerHTML).toEqual(defaultBodyTargetAfter)
            })

            test('hide and show again a light element after', () => {
                const { document, editor } = getLightElementEditor(getHTML(defaultBodyTargetBefore), elementType.CONDITIONAL)

                editor.setDisplay(false)
                editor.setDisplay(true)
                expect(document.body.innerHTML).toEqual(defaultBodyTargetBefore)
            })

            test('hide and show again a light element into a list', () => {
                const { document, editor } = getLightElementEditor(getHTML(defaultBodyTargetInList), elementType.CONDITIONAL)

                editor.setDisplay(false)
                editor.setDisplay(true)
                expect(document.body.innerHTML).toEqual(defaultBodyTargetInList)
            })
        })
    })

    describe('test dynamic element', () => {
        test('change content of light element', () => {
            const { document, editor } = getLightElementEditor(getHTML('<p class="target">Hello World!</p>'), elementType.DYNAMIC)

            editor.setContent("Good bye World!")
            expect(document.body.innerHTML).toEqual('<p class="target">Good bye World!</p>')
        })
    })

    /*
    describe('test list element', () => {
        test('')
    })
    */
})