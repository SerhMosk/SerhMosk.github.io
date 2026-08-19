// Assembles the base64 PDF payloads (split into small chunk files under
// js/pdfdata/ to keep each source file small) and wires them up as real
// downloadable PDFs on the "PDF (Повне)" / "PDF (Full)" buttons.
function initPdfLinks() {
    const uaLink = document.getElementById('pdf-download-uk');
    if (uaLink && window.PDF_UA_CHUNKS && !uaLink.href.startsWith('data:')) {
        uaLink.href = 'data:application/pdf;base64,' + window.PDF_UA_CHUNKS.join('');
        uaLink.setAttribute('download', 'CV_Serhiy_Moskalenko_Full_Stack_Developer_UA.pdf');
    }

    const enLink = document.getElementById('pdf-download-en');
    if (enLink && window.PDF_EN_CHUNKS && !enLink.href.startsWith('data:')) {
        enLink.href = 'data:application/pdf;base64,' + window.PDF_EN_CHUNKS.join('');
        enLink.setAttribute('download', 'CV_Serhiy_Moskalenko_Full_Stack_Developer_EN.pdf');
    }
}
