// Application UI Controller & Navigation
document.addEventListener('DOMContentLoaded', () => {
    HR_Employees.renderList('employeesTableBody');
    HR_Templates.renderDropdown('printTemplateSelect');
    HR_App.renderStats();
});

const HR_App = {
    switchTab(viewId, linkElement) {
        document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        const targetView = document.getElementById(viewId);
        if (targetView) targetView.classList.add('active');
        if (linkElement) linkElement.classList.add('active');
    },

    renderStats() {
        const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
        const companies = HR_Database.get(DB_KEYS.COMPANIES);
        const templates = HR_Database.get(DB_KEYS.TEMPLATES);

        document.getElementById('statEmpCount').innerText = employees.length;
        document.getElementById('statCompCount').innerText = companies.length;
        document.getElementById('statTmplCount').innerText = templates.length;
    }
};