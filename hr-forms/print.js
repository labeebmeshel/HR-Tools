function printAllS1Forms() {
    const employees = getStoredEmployees();
    const company = getStoredCompany();

    if (employees.length === 0) {
        alert("لا يوجد موظفين في قاعدة البيانات للطباعة!");
        return;
    }

    const container = document.getElementById('bulk-print-container');
    container.innerHTML = '';

    employees.forEach(emp => {
        container.innerHTML += generateS1FormHTML(emp, company);
    });

    window.print();
}
