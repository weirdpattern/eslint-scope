"use strict";

const expect = require("chai").expect;
const analyze = require("..").analyze;

describe("object expression", function() {
    it("doesn't require property type", function() {
        // Hardcoded AST.  Esprima adds an extra 'Property'
        // key/value to ObjectExpressions, so we're not using
        // it parse a program string.
        const ast = {
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "Identifier",
                        name: "a"
                    },
                    init: {
                        type: "ObjectExpression",
                        properties: [{
                            kind: "init",
                            key: {
                                type: "Identifier",
                                name: "foo"
                            },
                            value: {
                                type: "Identifier",
                                name: "a"
                            }
                        }]
                    }
                }]
            }]
        };

        const scope = analyze(ast).scopes[0];
        expect(scope.variables).to.have.length(1);
        expect(scope.references).to.have.length(2);
        expect(scope.variables[0].name).to.be.equal("a");
        expect(scope.references[0].identifier.name).to.be.equal("a");
        expect(scope.references[1].identifier.name).to.be.equal("a");
    });
});
