document.addEventListener('DOMContentLoaded', () => {
    HR_Companies.init();
    HR_Employees.renderList('employeesTableBody');
    HR_Print.init();
    HR_App.renderStats();
});

const HR_App = {
    switchTab(viewId, btnElement) {
        document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.submenu-btn').forEach(b => b.classList.remove('active'));

        const target = document.getElementById(viewId);
        if (target) target.classList.add('active');
        if (btnElement) btnElement.classList.add('active');
    },

    toggleSubmenu(id) {
        const el = document.getElementById(id);
        if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
    },

    renderStats() {
        const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
        const companies = HR_Database.get(DB_KEYS.COMPANIES);
        const branches = HR_Database.get(DB_KEYS.BRANCHES);

        document.getElementById('statEmpCount').innerText = employees.length;
        document.getElementById('statCompCount').innerText = companies.length;
        document.getElementById('statBranchCount').innerText = branches.length;
    }
};
