// snippet.js

const fs = require('fs');


class Snippet {
    constructor(name, code, tags) {
        this.name = name;
        if(code.indexOf('//') === -1) {
            this.code = code;
        }
        else {
            this.code = code.slice(code.indexOf('\n'));
        }
        this.lines = this.countLines(code);
        this.tags = tags;
    }

    hasTag(tag) {
        if(this.tags.indexOf(tag) === -1) {
            return false;
        }
        else {
            return true;
        }
    }

    countLines(code) {
        const codeLines = code.split('\n');
        if(code.indexOf('//') === -1) {
            return codeLines.length;
        }
        else {
            return codeLines.length - 2;
        }

    }
}

module.exports = {
    Snippet: Snippet,

};