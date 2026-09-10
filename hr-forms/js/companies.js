const HR_Companies = {
    init() {
        this.renderGlobalDropdowns();
        this.renderCompanySelectInBranchForm();
    },

    getCompanies() { return HR_Database.get(DB_KEYS.COMPANIES); },
    getBranches() { return HR_Database.get(DB_KEYS.BRANCHES); },

    renderGlobalDropdowns() {
        const companies = this.getCompanies();
        const globalCompSelect = document.getElementById('globalCompanySelect');
        if (!globalCompSelect) return;

        const activeCompId = localStorage.getItem('ACTIVE_COMPANY_ID') || (companies[0] ? companies[0].id : '');

        globalCompSelect.innerHTML = '<option value="">-- اختر الشركة --</option>';
        companies.forEach(c => {
            const isSelected = c.id === activeCompId ? 'selected' : '';
            globalCompSelect.innerHTML += `<option value="${c.id}" ${isSelected}>${c.name}</option>`;
        });

        if (activeCompId) this.populateBranchesDropdown(activeCompId);
    },

    populateBranchesDropdown(compId) {
        const branches = this.getBranches().filter(b => b.companyId === compId);
        const branchSelect = document.getElementById('globalBranchSelect');
        if (!branchSelect) return;

        branchSelect.innerHTML = '<option value="ALL">جميع الفروع</option>';
        branches.forEach(b => {
            branchSelect.innerHTML += `<option value="${b.id}">${b.name}</option>`;
        });
    },

    renderCompanySelectInBranchForm() {
        const companies = this.getCompanies();
        const select = document.getElementById('branchCompanySelect');
        if (!select) return;

        select.innerHTML = '<option value="">-- اختر الشركة التابع لها --</option>';
        companies.forEach(c => {
            select.innerHTML += `<option value="${c.id}">${c.name}</option>`;
        });
    },

    onGlobalCompanyChange(compId) {
        localStorage.setItem('ACTIVE_COMPANY_ID', compId);
        this.populateBranchesDropdown(compId);
        HR_Employees.renderList('employeesTableBody');
        HR_Print.populateDropdowns();
    },

    onGlobalBranchChange(branchId) {
        localStorage.setItem('ACTIVE_BRANCH_ID', branchId);
        HR_Employees.renderList('employeesTableBody');
        HR_Print.populateDropdowns();
    },

    saveCompany(e) {
        e.preventDefault();
        const companies = this.getCompanies();
        const id = document.getElementById('compId').value || 'COMP-' + Date.now().toString().slice(-4);

        const companyObj = {
            id,
            name: document.getElementById('compName').value,
            regNo: document.getElementById('compRegNo').value,
            taxNo: document.getElementById('compTaxNo').value,
            owner: document.getElementById('compOwner').value
        };

        const index = companies.findIndex(c => c.id === id);
        if (index > -1) companies[index] = companyObj;
        else companies.push(companyObj);

        HR_Database.set(DB_KEYS.COMPANIES, companies);
        this.renderGlobalDropdowns();
        this.renderCompanySelectInBranchForm();
        alert('تم حفظ بيانات الشركة بنجاح!');
    },

    saveBranch(e) {
        e.preventDefault();
        const branches = this.getBranches();
        const id = document.getElementById('branchId').value || 'BR-' + Date.now().toString().slice(-4);

        const branchObj = {
            id,
            companyId: document.getElementById('branchCompanySelect').value,
            name: document.getElementById('branchName').value,
            insuranceNo: document.getElementById('branchInsuranceNo').value,
            address: document.getElementById('branchAddress').value
        };

        const index = branches.findIndex(b => b.id === id);
        if (index > -1) branches[index] = branchObj;
        else branches.push(branchObj);

        HR_Database.set(DB_KEYS.BRANCHES, branches);
        this.renderGlobalDropdowns();
        alert('تم حفظ بيانات الفرع وتسكينه بنجاح!');
    }
};
