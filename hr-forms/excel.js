const S1_EXCEL_HEADERS = [
    "اسم المؤمن عليه", "الرقم القومي", "الرقم التأميني", "المهنة", "كود المهنة",
    "المؤهل", "الجنسية", "تاريخ بدء الاشتراك", "أجر الاشتراك", "الأجر الشامل",
    "اسم المنشأة", "رقم المنشأة", "رقم الهاتف", "اسم مقدم الطلب", "صفة مقدم الطلب",
    "استيفاء الكشف الطبي", "نسبة العجز", "تاريخ بداية العجز", "عقار رقم", "شارع", "قرية", "محافظة", "قسم / مركز"
];

function downloadExcelTemplate() {
    const sampleRow = {
        "اسم المؤمن عليه": "مثال: أحمد محمد علي",
        "الرقم القومي": "29001011234567",
        "الرقم التأميني": "123456",
        "المهنة": "محاسب",
        "كود المهنة": "101",
        "المؤهل": "بكالوريوس تجارة",
        "الجنسية": "مصري",
        "تاريخ بدء الاشتراك": "2026-01-01",
        "أجر الاشتراك": "10000",
        "الأجر الشامل": "12000",
        "اسم المنشأة": "أكاديمية براكسي",
        "رقم المنشأة": "98765432",
        "رقم الهاتف": "01000000000",
        "اسم مقدم الطلب": "محمود حسني",
        "صفة مقدم الطلب": "مفوض",
        "استيفاء الكشف الطبي": "نعم",
        "نسبة العجز": "",
        "تاريخ بداية العجز": "",
        "عقار رقم": "10",
        "شارع": "الجمهورية",
        "قرية": "-",
        "محافظة": "القاهرة",
        "قسم / مركز": "عابدين"
    };

    const ws = XLSX.utils.json_to_sheet([sampleRow], { header: S1_EXCEL_HEADERS });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "S1_Template");
    XLSX.writeFile(wb, "S1_Employees_Template.xlsx");
}

let uploadedExcelTempData = [];

function handleExcelUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawJson = XLSX.utils.sheet_to_json(sheet);

        uploadedExcelTempData = rawJson.map(row => ({
            name: row["اسم المؤمن عليه"] || "",
            nationalId: String(row["الرقم القومي"] || ""),
            insuranceNo: String(row["الرقم التأميني"] || ""),
            job: row["المهنة"] || "",
            startDate: row["تاريخ بدء الاشتراك"] || "",
            salaryIns: row["أجر الاشتراك"] || "0",
            salaryTotal: row["الأجر الشامل"] || "0",
            qualification: row["المؤهل"] || "",
            nationality: row["الجنسية"] || "مصري",
            phone: row["رقم الهاتف"] || "",
            compName: row["اسم المنشأة"] || "",
            compId: row["رقم المنشأة"] || "",
            applicantName: row["اسم مقدم الطلب"] || "",
            applicantTitle: row["صفة مقدم الطلب"] || "مفوض"
        }));

        renderExcelPreviewTable(uploadedExcelTempData);
    };
    reader.readAsArrayBuffer(file);
}

function renderExcelPreviewTable(data) {
    const section = document.getElementById('excel-preview-section');
    const tbody = document.querySelector('#excel-preview-table tbody');
    const thead = document.querySelector('#excel-preview-table thead');
    const countSpan = document.getElementById('excel-count');

    countSpan.innerText = data.length;
    thead.innerHTML = `<tr><th>#</th><th>الاسم</th><th>الرقم القومي</th><th>الرقم التأميني</th><th>المهنة</th></tr>`;
    tbody.innerHTML = '';

    data.forEach((emp, i) => {
        tbody.innerHTML += `<tr><td>${i+1}</td><td>${emp.name}</td><td>${emp.nationalId}</td><td>${emp.insuranceNo}</td><td>${emp.job}</td></tr>`;
    });

    section.style.display = 'block';
}

function confirmExcelImport() {
    if (uploadedExcelTempData.length === 0) return;
    const currentList = getStoredEmployees();
    const updatedList = [...currentList, ...uploadedExcelTempData];
    saveEmployeesData(updatedList);
    alert(`تم بنجاح استيراد ${uploadedExcelTempData.length} موظف إلى قاعدة البيانات!`);
    document.getElementById('excel-preview-section').style.display = 'none';
    refreshUI();
}

function exportDatabaseToExcel() {
    const employees = getStoredEmployees();
    const mapped = employees.map(emp => ({
        "اسم المؤمن عليه": emp.name,
        "الرقم القومي": emp.nationalId,
        "الرقم التأميني": emp.insuranceNo,
        "المهنة": emp.job,
        "تاريخ بدء الاشتراك": emp.startDate,
        "أجر الاشتراك": emp.salaryIns,
        "الأجر الشامل": emp.salaryTotal,
        "المؤهل": emp.qualification,
        "الجنسية": emp.nationality,
        "اسم المنشأة": emp.compName,
        "رقم المنشأة": emp.compId,
        "رقم الهاتف": emp.phone
    }));

    const ws = XLSX.utils.json_to_sheet(mapped);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Database_Export");
    XLSX.writeFile(wb, "HR_Employees_Database.xlsx");
}
