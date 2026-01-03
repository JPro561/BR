import { Stmt } from "./parser";

export function interpreter( program: Stmt[] ) {
    const vars = new Map<string, number | string>();

    for (const stmt of program) {
        if (stmt == undefined) break;

        if (stmt.kind === "VarDecl") {
            vars.set(stmt.name, stmt.value);
            continue;
        }
        if (stmt.kind === "Print") {
            if (typeof stmt.value === "string" && vars.has(stmt.value)) {
                console.log(vars.get(stmt.value));
            } else {
                console.log(stmt.value);
            }
        }
    }
}
