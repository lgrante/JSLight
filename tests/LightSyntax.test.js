const { getParameters } = require('../src/LightSyntax')

test("test g@etParameters()", () => {
    const parameterStr = "(paramA, paramB)"

    expect(getParameters(parameterStr)).toEqual(["paramA", "paramB"])
})