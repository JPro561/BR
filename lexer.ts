export type Token =
  | { type: "PRINT" }
  | { type: "VAR" }
  | { type: "LPAREN" }
  | { type: "RPAREN" }
  | { type: "EQUAL" }
  | { type: "IDENT"; value: string }
  | { type: "NUMBER"; value: number }
  | { type: "STRING"; value: string }
;

const keyWords = {
    PRINT: "print",
    VAR: "var",
};

export function lexer( input: string ) {
    let tokens: Token[] = [];

    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === undefined) break;

        if (ch === " " || ch === "\n" || ch === "\r" || ch === "\t") {
            continue;
        }

        if (/[a-zA-Z_]/.test(ch)) {
            let word = "";

            while (i < input.length) {
                const c = input[i];
                if (c === undefined || !/[a-zA-Z0-9_]/.test(c)) break;
                word += c;
                i++;
            }

            if (word === keyWords.PRINT) {
                tokens.push({ type: "PRINT" });
            } else if (word === keyWords.VAR) {
                tokens.push({ type: "VAR" });
            } else {
                tokens.push({ type: "IDENT", value: word });
            }

            i--;
            continue;
        }

        if (/[0-9]/.test(ch)) {
            let number = "";

            while (i < input.length) {
                const c = input[i];
                if (c === undefined || !/[0-9]/.test(c)) break;
                number += c;
                i++;
            }

            tokens.push({ type: "NUMBER", value: parseInt(number) });

            i--;
            continue;
        }

        if (ch === '"') {
            i++;
            let s = "";

            while (i < input.length) {
                const c = input[i];
                if (c === undefined) break;
                if (c === '"') break;
                s += c;
                i++;
            }

            if (i >= input.length) throw new Error("String não fechada");
            i++;
            tokens.push({ type: "STRING", value: s });
            i--;
            continue;
        }

        if (ch === "'") {
            i++;
            let s = "";

            while (i < input.length && ch !== "'") {
                s += ch;
                i++;
            }

            if (i >= input.length) throw new Error("String não fechada com aspas");

            tokens.push({ type: "STRING", value: s });
            continue;
        }

        if (ch == "(") {
            tokens.push({ type: "LPAREN" });
            continue;
        }

        if (ch == ")") {
            tokens.push({ type: "RPAREN" });
            continue;
        }

        if (ch == "=") {
            tokens.push({ type: "EQUAL" });
            continue;
        }

        throw new Error(
            `Caractere inesperado '${ch}' na posição ${i}`
        );
    }

    if (tokens.length === 0) {
        throw new Error(`Comando não encontrado: ${input}`);
    }

    return tokens;
};
