import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const [inputPdf, outputPng] = process.argv.slice(2);
if (!inputPdf || !outputPng) {
    console.error('Usage: node pdf-to-png.mjs <input.pdf> <output.png>');
    process.exit(1);
}

const data = new Uint8Array(fs.readFileSync(inputPdf));
const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
const page = await doc.getPage(1);
const viewport = page.getViewport({ scale: 2 });
const canvasFactory = {
    create(w, h) {
        const canvas = createCanvas(w, h);
        return { canvas, context: canvas.getContext('2d') };
    },
    reset({ canvas }, w, h) {
        canvas.width = w;
        canvas.height = h;
    },
    destroy({ canvas }) {
        canvas.width = 0;
        canvas.height = 0;
    },
};

const { canvas, context } = canvasFactory.create(viewport.width, viewport.height);

await page.render({ canvasContext: context, viewport, canvasFactory }).promise;
fs.mkdirSync(path.dirname(outputPng), { recursive: true });
fs.writeFileSync(outputPng, canvas.toBuffer('image/png'));
console.log(`Wrote ${outputPng}`);
