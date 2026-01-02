export type Token = {
    type: "PRINT";
} | {
    type: "VAR";
} | {
    type: "LPAREN";
} | {
    type: "RPAREN";
} | {
    type: "EQUAL";
} | {
    type: "IDENT";
    value: string;
} | {
    type: "NUMBER";
    value: number;
} | {
    type: "STRING";
    value: string;
};
export declare function lexer(input: string): Token[];
//# sourceMappingURL=lexer.d.ts.map