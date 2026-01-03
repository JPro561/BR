#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Módulos
const fs = require("node:fs");
const node_path_1 = require("node:path");
// 
const lexer_1 = require("./lexer");
const parser_1 = require("./parser");
const interpreter_1 = require("./interpreter");
const args = process.argv;
if (args[3]) {
    const ext = (0, node_path_1.extname)(args[3]);
    if (ext == ".br") {
        const source = fs.readFileSync(args[3], "utf8");
        try {
            const tokens = (0, lexer_1.lexer)(source);
            const program = (0, parser_1.parser)(tokens);
            (0, interpreter_1.interpreter)(program);
        }
        catch (err) {
            console.log(String(err));
            console.log(`Arquivo: ${String(source)}`);
            process.exit(1);
        }
    }
    else if (ext !== ".br") {
        console.error("Arquivo inválido. Use um arquivo .br");
        process.exit(1);
    }
}
else if (args[2] == "-help") {
    console.log("Uso: br <caminho do seu arquivo.br>");
    process.exit(0);
}
else if (!args[2]) {
    console.log("Bem-vindo ao Br. Para ajuda, digite br -help");
    process.exit(0);
}
//# sourceMappingURL=cli.js.map