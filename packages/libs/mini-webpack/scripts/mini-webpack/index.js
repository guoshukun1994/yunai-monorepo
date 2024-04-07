const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

let ID = 0;

function createGraph(entry) {
    return [];
}

function bundle(graph) {
    return '';
}

const graph = createGraph('../../src/entry');
const result = bundle(graph);

