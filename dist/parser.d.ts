import type { Token } from "./lexer";
export type Stmt = {
    kind: "VarDecl";
    name: string;
    value: number | string;
} | {
    kind: "Print";
    valueType: "IDENT" | "NUMBER" | "STRING";
    value: string | number;
};
export declare function parser(tokens: Token[]): Stmt[];
//# sourceMappingURL=parser.d.ts.map