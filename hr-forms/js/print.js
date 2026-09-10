/* Print Mechanics & A4 Formatting */
@media screen {
    .print-preview-container {
        background-color: #525659;
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .a4-page {
        background: #ffffff;
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        box-sizing: border-box;
    }
}

/* حل مشكلة الورقة البيضاء تماماً */
@media print {
    @page {
        size: A4 portrait;
        margin: 0;
    }

    html, body {
        width: 210mm !important;
        height: auto !important;
        background: #ffffff !important;
        color: #000000 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
    }

    /* إخفاء القوائم والشريط الجانبي عند الطباعة */
    .sidebar, .company-selector-bar, .no-print, .btn, form {
        display: none !important;
    }

    .main-content {
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
    }

    .view-panel {
        display: block !important;
    }

    .print-preview-container {
        display: block !important;
        padding: 0 !important;
        background: none !important;
    }

    .a4-page {
        width: 210mm !important;
        min-height: 297mm !important;
        padding: 20mm !important;
        margin: 0 auto !important;
        box-shadow: none !important;
        box-sizing: border-box !important;
        page-break-after: always;
    }
}

/* صندوق تحرير النص كملف الوورد */
.word-editor-box {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 25px;
    min-height: 320px;
    font-size: 1.15rem;
    line-height: 2;
    outline: none;
    text-align: justify;
}

.word-editor-box:focus {
    border-color: #0b4fb3;
    box-shadow: 0 0 0 3px rgba(11, 79, 179, 0.1);
}
