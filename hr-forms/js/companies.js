// Companies & Branches Management Logic
const HR_Companies = {
    init() {
        this.renderGlobalDropdowns();
        this.renderTable();
    },

    getCompanies() {
        return HR_Database.get(DB_KEYS.COMPANIES);
    },

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

        if (activeCompId) {
            this.populateBranchesDropdown(activeCompId);
        }
    },

    populateBranchesDropdown(compId) {
        const companies = this.getCompanies();
        const comp = companies.find(c => c.id === compId);
        const branchSelect = document.getElementById('globalBranchSelect');
        if (!branchSelect) return;

        branchSelect.innerHTML = '<option value="ALL">جميع الفروع / المركز الرئيسي</option>';
        if (comp && comp.branches) {
            const branchesArr = comp.branches.split(',').map(b => b.trim());
            branchesArr.forEach(b => {
                if(b) branchSelect.innerHTML += `<option value="${b}">${b}</option>`;
            });
        }
    },

    onGlobalCompanyChange(compId) {
        localStorage.setItem('ACTIVE_COMPANY_ID', compId);
        this.populateBranchesDropdown(compId);
        HR_Employees.renderList('employeesTableBody');
        HR_Print.populateEmployeeDropdown();
        HR_App.renderStats();
    },

    onGlobalBranchChange(branchName) {
        localStorage.setItem('ACTIVE_BRANCH_NAME', branchName);
        HR_Employees.renderList('employeesTableBody');
        HR_Print.populateEmployeeDropdown();
    },

    renderTable() {
        const companies = this.getCompanies();
        const tbody = document.getElementById('companiesTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';
        companies.forEach(c => {
            tbody.innerHTML += `
                <tr>
                    <td><strong>${c.name}</strong></td>
                    <td><code>${c.regNo || '-'}</code></td>
                    <td><code>${c.insuranceNo || '-'}</code></td>
                    <td>${c.owner || '-'}</td>
                    <td><small>${c.branches || 'المركز الرئيسي'}</small></td>
                    <td>
                        <button class="btn btn-warning" onclick="HR_Companies.edit('${c.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger" onclick="HR_Companies.delete('${c.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
    },

    saveCompany(e) {
        e.preventDefault();
        const companies = this.getCompanies();
        const idInput = document.getElementById('compId').value;

        const companyData = {
            id: idInput || 'COMP-' + Date.now().toString().slice(-4),
            name: document.getElementById('compName').value,
            regNo: document.getElementById('compRegNo').value,
            taxNo: document.getElementById('compTaxNo').value,
            insuranceNo: document.getElementById('compInsuranceNo').value,
            owner: document.getElementById('compOwner').value,
            deputy: document.getElementById('compDeputy').value,
            branches: document.getElementById('compBranches').value,
            address: document.getElementById('compAddress').value
        };

        const index = companies.findIndex(c => c.id === companyData.id);
        if (index > -1) {
            companies[index] = companyData;
            HR_Database.log('تعديل شركة', `تم تعديل بيانات شركة ${companyData.name}`);
        } else {
            companies.push(companyData);
            HR_Database.log('إضافة شركة', `تم إضافة شركة جديدة: ${companyData.name}`);
        }

        HR_Database.set(DB_KEYS.COMPANIES, companies);
        this.resetForm();
        this.renderTable();
        this.renderGlobalDropdowns();
        HR_App.renderStats();
        alert('تم حفظ بيانات الشركة بنجاح!');
    },

    edit(compId) {
        const companies = this.getCompanies();
        const comp = companies.find(c => c.id === compId);
        if (!comp) return;

        document.getElementById('compId').value = comp.id;
        document.getElementById('compName').value = comp.name || '';
        document.getElementById('compRegNo').value = comp.regNo || '';
        document.getElementById('compTaxNo').value = comp.taxNo || '';
        document.getElementById('compInsuranceNo').value = comp.insuranceNo || '';
        document.getElementById('compOwner').value = comp.owner || '';
        document.getElementById('compDeputy').value = comp.deputy || '';
        document.getElementById('compBranches').value = comp.branches || '';
        document.getElementById('compAddress').value = comp.address || '';

        document.getElementById('compFormTitle').innerHTML = '<i class="fas fa-edit"></i> تعديل بيانات الشركة';
    },

    resetForm() {
        document.getElementById('companyForm').reset();
        document.getElementById('compId').value = '';
        document.getElementById('compFormTitle').innerHTML = '<i class="fas fa-plus-circle"></i> إضافة / تعديل شركة';
    },

    delete(compId) {
        if (confirm('هل أنت متأكد من حذف هذه الشركة؟')) {
            let companies = this.getCompanies();
            companies = companies.filter(c => c.id !== compId);
            HR_Database.set(DB_KEYS.COMPANIES, companies);
            HR_Database.log('حذف شركة', `تم حذف الشركة برقم: ${compId}`);
            this.renderTable();
            this.renderGlobalDropdowns();
            HR_App.renderStats();
        }
    }
};