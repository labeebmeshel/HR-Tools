// Excel Import/Export Handling (CSV/Structure fallback)
const HR_Excel = {
    downloadTemplate() {
        const headers = ['الاسم', 'الرقم القومي', 'الرقم التأميني', 'الوظيفة', 'تاريخ التعيين', 'الهاتف'];
        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.join(",") + "\n";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Employees_Import_Template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        HR_Database.log('تنزيل قالب Excel', 'تم تنزيل قالب استيراد الموظفين');
    },

    exportEmployees() {
        const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
        let csv = "data:text/csv;charset=utf-8,\uFEFFكود الموظف,الاسم,الرقم القومي,الرقم التأميني,الوظيفة,تاريخ التعيين\n";
        employees.forEach(e => {
            csv += `${e.id},${e.name},${e.nationalId},${e.insuranceNo},${e.jobTitle},${e.hireDate}\n`;
        });
        const encodedUri = encodeURI(csv);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Employees_Database_Export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        HR_Database.log('تصدير بيانات', 'تم تصدير قاعدة بيانات الموظفين إلى Excel/CSV');
    }
};