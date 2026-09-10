const HR_Employees = {
    renderList(containerId) {
        const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
        const companies = HR_Database.get(DB_KEYS.COMPANIES);
        const branches = HR_Database.get(DB_KEYS.BRANCHES);
        const templates = HR_Database.get(DB_KEYS.TEMPLATES);
        const container = document.getElementById(containerId);

        if (!container) return;
        container.innerHTML = '';

        const activeCompId = localStorage.getItem('ACTIVE_COMPANY_ID');
        const activeBranchId = localStorage.getItem('ACTIVE_BRANCH_ID');

        const filtered = employees.filter(e => {
            const matchComp = !activeCompId || e.companyId === activeCompId;
            const matchBranch = !activeBranchId || activeBranchId === 'ALL' || e.branchId === activeBranchId;
            return matchComp && matchBranch;
        });

        filtered.forEach(emp => {
            const comp = companies.find(c => c.id === emp.companyId) || { name: 'غير محدد' };
            const branch = branches.find(b => b.id === emp.branchId) || { name: 'الرئيسي' };

            let optionsHtml = '<option value="">-- طباعة نموذج --</option>';
            templates.forEach(t => {
                optionsHtml += `<option value="${t.id}">${t.name}</option>`;
            });

            container.innerHTML += `
                <tr>
                    <td><strong>${emp.code || emp.id}</strong></td>
                    <td>${emp.name}</td>
                    <td><code>${emp.nationalId}</code></td>
                    <td><code>${emp.insuranceNo}</code></td>
                    <td>${comp.name} (${branch.name})</td>
                    <td>${emp.jobTitle}</td>
                    <td>${emp.grossSalary} ج.م</td>
                    <td>
                        <select class="form-control" style="padding: 4px; font-size: 0.8rem; display: inline-block; width: auto;" onchange="HR_Print.quickPrint('${emp.id}', this.value)">
                            ${optionsHtml}
                        </select>
                    </td>
                </tr>
            `;
        });
    }
};
