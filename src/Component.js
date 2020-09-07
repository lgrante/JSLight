import ObjectBrowser from './utils/ObjectBrowser'
import Syntax from './LightSyntax'
import { LightElement, elementType } from './LightElement'

function Component()
{
    this.domBrowser = (componentTree => {
        const { getParameters } = Syntax
        const _searchComponent = condition => componentTree.filter(component => {
            Object.values(component.attributes).some(attribute => condition(attribute))
        })
        const domElements = components => ({
            get: () => components, 
            toLightElement: type => components.map(component => new LightElement(component, type))
        })

        return {
            withKeyWord: keyWord => domElements(_searchComponent(attribute => attribute.name === keyWord)),
            withParam: (index, param) => domElements(_searchComponent(attribute => getParameters(attribute.nodeValue)[index] === param)),
            linkedToState: stateName => domElements(_searchComponent(attribute => {
                return RegExp("/^" + stateName + "/").test(getParameters(attribute.nodeValue)[0])
            }))
        }
    })(Object.values(document.all))

    /*
     * Initializing component state.
     */
    this.state = new Object()

    /*
     * Reading states passed as parameters.
     */
    if (typeof arguments[0] === Object) {
        let states = Object.values(arguments[0])

        for (let i = 0; i < states.length; i++)
            this.state[states[i][0]] = this.createState[states[i][1]]
    }
}

Component.prototype.updateState = (statePath, value) => {
    const linkedElements = this.componentsBrowser.linkedToState(statePath).toLightElement()
    const field = ObjectBrowser(this.state, statePath)

    field.get().set(value)
    linkedElements.forEach(element => {
        element.setContent(field.get().get())
    })
}

Component.prototype.createState = (stateName, defaultValue) => {
    let stateName = stateName
    let value = defaultValue

    return {
        get: () => value,
        set: newValue => { 
            if (newValue !== value)
                this.updateState(stateName, newValue)
            value = newValue 
        },
    }
}