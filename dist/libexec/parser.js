"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = parser;
function parser(tokens) {
    let program = [];
    let pos = 0;
    while (pos < tokens.length) {
        const token = tokens[pos];
        if (token == undefined)
            break;
        if (token.type == "VAR") {
            pos++;
            const next = tokens[pos];
            if (next == undefined)
                break;
            if (!next)
                throw new Error("Fim inesperado do código");
            if (next.type != "IDENT") {
                throw new Error(`Nome da variável não definido na posição ${pos}.`);
            }
            else {
                pos++;
                const nextnext = tokens[pos];
                if (nextnext == undefined)
                    break;
                if (nextnext.type != "EQUAL") {
                    throw new Error(`Faltando expressão '=' na posição ${pos}.`);
                }
                else {
                    pos++;
                    const nextnextnext = tokens[pos];
                    if (nextnextnext == undefined)
                        break;
                    if (nextnextnext.type != "NUMBER" && nextnextnext.type != "STRING") {
                        throw new Error(`Valor da variável não definido na posição ${pos}.`);
                    }
                    else {
                        pos++;
                        program.push({ kind: "VarDecl", name: next.value, value: nextnextnext.value });
                        continue;
                    }
                }
            }
        }
        if (token.type == "PRINT") {
            pos++;
            const next = tokens[pos];
            if (next == undefined)
                break;
            if (!next)
                throw new Error("Fim inesperado do código");
            if (next.type != "LPAREN") {
                throw new Error(`Faltando '(' depois de print, posição ${pos}.`);
            }
            else {
                pos++;
                const nextnext = tokens[pos];
                if (nextnext == undefined)
                    break;
                if (nextnext.type == "IDENT" || nextnext.type == "NUMBER" || nextnext.type == "STRING") {
                    pos++;
                    const nextnextnext = tokens[pos];
                    if (nextnextnext == undefined)
                        break;
                    if (nextnextnext.type == "RPAREN") {
                        pos++;
                        program.push({ kind: "Print", valueType: nextnext.type, value: nextnext.value });
                        continue;
                    }
                    else {
                        throw new Error(`Faltando ')' depois de print, posição ${pos}.`);
                    }
                }
                else {
                    throw new Error(`Faltando um valor dentro de print, posição ${pos}.`);
                }
            }
        }
        throw new Error(`Comando inesperado: ${token.type} na posição ${pos}`);
    }
    return program;
}
//# sourceMappingURL=parser.js.map