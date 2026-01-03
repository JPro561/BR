#!/usr/bin/env node

// Módulos
import * as fs from 'node:fs';
import { extname } from "node:path";

// 
import { lexer } from "./lexer";
import { parser } from "./parser";
import { interpreter } from "./interpreter";

const args = process.argv;

if (args[3]) {
    const ext = extname(args[3]);
    if (ext == ".br") {
        const source = fs.readFileSync(args[3], "utf8");
        try {
            const tokens = lexer(source);
            const program = parser(tokens);
            interpreter(program);
        }
        catch(err) {
            console.log(String(err))
             console.log(`Arquivo: ${String(source)}`)
            process.exit(1);
        }
    } else if (ext !== ".br") {
        console.error("Arquivo inválido. Use um arquivo .br");
        process.exit(1);
    }
} else if (args[2] == "-help") {
    console.log("Uso: br <caminho do seu arquivo.br>");
    process.exit(0);
} else if (!args[2]) {
    console.log("Bem-vindo ao Br. Para ajuda, digite br -help");
    process.exit(0);
}
