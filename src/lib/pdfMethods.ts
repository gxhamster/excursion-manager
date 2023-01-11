import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { downloadPdfFromUri } from "./downloadPdf";

export async function modifyPdf(pdfDoc: PDFDocument, from: number, to: number) {
  let pdfDataUri = "";
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

  // const url = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";
  // const fontBytes = await fetch(url).then((res) => res.arrayBuffer());
  // pdfDoc.registerFontkit(fontkit);
  // const ubuntuFont = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  const newDoc = await PDFDocument.create();

  for (let i = from; i <= to; i++) {
    const [page] = await newDoc.copyPages(pdfDoc, [0]);
    page.drawText(`INV# ${i}`, {
      x: width - 100,
      y: height - 50,
      size: 20,
      font: timesRoman,
      color: rgb(0, 0, 0),
    });
    newDoc.addPage(page);
  }
  pdfDataUri = await newDoc.saveAsBase64({ dataUri: true });
  downloadPdfFromUri(pdfDataUri);
}
