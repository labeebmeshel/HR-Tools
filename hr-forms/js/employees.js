// Employee Data Management with Company/Branch Filtering
const HR_Employees = {
    renderList(containerId) {
        const allEmployees = HR_Database.get(DB_KEYS.EMPLOYEES);
        const companies = HR_Database.get(DB_KEYS.COMPANIES);
        const container = document.getElementById(containerId);
        
        if (!container) return;
        container.innerHTML = '';

        const activeCompId = localStorage.getItem('ACTIVE_COMPANY_ID') || (companies[0] ? companies[0].id : '');
        const activeBranch = localStorage.getItem('ACTIVE_BRANCH_NAME') || 'ALL';

        // Filter by selected company and branch
        const filtered = allEmployees.filter(e => {
            const matchComp = !activeCompId || e.companyId === activeCompId;
            const matchBranch = activeBranch === 'ALL' || e.branch === activeBranch;
            return matchComp && matchBranch;
        });

        filtered.forEach(emp => {
            const comp = companies.find(c => c.id === emp.companyId) || { name: 'غير محدد' };
            container.innerHTML += `
                <tr>
                    <td><strong>${emp.id}</strong></td>
                    <td>${emp.name}</td>
                    <td><code>${emp.nationalId}</code></td>
                    <td><code>${emp.insuranceNo}</code></td>
                    <td>${comp.name}</td>
                    <td><span class="badge badge-yellow">${emp.branch || 'الرئيسي'}</span></td>
                    <td>${emp.jobTitle}</td>
                    <td>${emp.hireDate}</td>
                    <td>
                        <button class="btn btn-warning" onclick="HR_Employees.edit('${emp.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger" onclick="HR_Employees.delete('${emp.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
    },

    save(employeeData) {
        const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
        
        const duplicate = employees.find(e => 
            (e.nationalId === employeeData.nationalId || e.insuranceNo === employeeData.insuranceNo) &&
            e.id !== employeeData.id
        );

        if (duplicate) {
            alert(`⚠️ تنبيه: الموظف موجود بالفعل برقم قومي أو تأميني مماثل (${duplicate.name})`);
            return false;
        }

        const index = employees.findIndex(e => e.id === employeeData.id);
        if (index > -1) {
            employees[index] = employeeData;
            HR_Database.log('تعديل موظف', `تم تعديل بيانات الموظف ${employeeData.name}`);
        } else {
            employeeData.id = 'EMP-' + Date.now().toString().slice(-4);
            employees.push(employeeData);
            HR_Database.log('إضافة موظف', `تمت إضافة الموظف ${employeeData.name}`);
        }

        HR_Database.set(DB_KEYS.EMPLOYEES, employees);
        this.renderList('employeesTableBody');
        return true;
    },

    delete(empId) {
        if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
            let employees = HR_Database.get(DB_KEYS.EMPLOYEES);
            employees = employees.filter(e => e.id !== empId);
            HR_Database.set(DB_KEYS.EMPLOYEES, employees);
            HR_Database.log('حذف موظف', `تم حذف الموظف برقم: ${empId}`);
            this.renderList('employeesTableBody');
        }
    }
};
