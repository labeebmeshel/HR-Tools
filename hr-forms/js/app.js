// Main Application Controller
document.addEventListener('DOMContentLoaded', () => {
    HR_Companies.init();
    HR_Employees.renderList('employeesTableBody');
    HR_Print.init();
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
        
        const activeCompId = localStorage.getItem('ACTIVE_COMPANY_ID') || (companies[0] ? companies[0].id : '');
        const activeComp = companies.find(c => c.id === activeCompId);

        const filteredEmp = employees.filter(e => !activeCompId || e.companyId === activeCompId);
        const branchesCount = activeComp && activeComp.branches ? activeComp.branches.split(',').length : 1;

        document.getElementById('statEmpCount').innerText = filteredEmp.length;
        document.getElementById('statCompCount').innerText = companies.length;
        document.getElementById('statBranchCount').innerText = branchesCount;
    }
};
