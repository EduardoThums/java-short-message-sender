import Delta from 'quill-delta'

export function deltaToText(delta: Delta) {
    return delta.reduce((text, op) => {
        if (!op.insert) throw new TypeError('only `insert` operations can be transformed!');
        if (typeof op.insert !== 'string') return text + ' ';
        return text + op.insert;
    }, '');
};