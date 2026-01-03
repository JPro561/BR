"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpreter = interpreter;
function interpreter(program) {
    const vars = new Map();
    for (const stmt of program) {
        if (stmt == undefined)
            break;
        if (stmt.kind === "VarDecl") {
            vars.set(stmt.name, stmt.value);
            continue;
        }
        if (stmt.kind === "Print") {
            if (typeof stmt.value === "string" && vars.has(stmt.value)) {
                console.log(vars.get(stmt.value));
            }
            else {
                console.log(stmt.value);
            }
        }
    }
}
//# sourceMappingURL=interpreter.js.map