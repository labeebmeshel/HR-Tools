document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    refreshUI();
});

function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });
}

function refreshUI() {
    const employees = getStoredEmployees();
    const company = getStoredCompany();

    document.getElementById('stat-total-emp').innerText = employees.length;
    document.getElementById('stat-valid-emp').innerText = employees.filter(e => e.nationalId && e.insuranceNo).length;
    document.getElementById('stat-missing-emp').innerText = employees.filter(e => !e.nationalId || !e.insuranceNo).length;

    document.getElementById('comp_name').value = company.name || '';
    document.getElementById('comp_id').value = company.compId || '';
    document.getElementById('comp_gov').value = company.gov || '';
    document.getElementById('comp_sec').value = company.sec || '';
    document.getElementById('comp_village').value = company.village || '';
    document.getElementById('comp_street').value = company.street || '';
    document.getElementById('comp_building').value = company.building || '';
    document.getElementById('comp_phone').value = company.phone || '';
    document.getElementById('comp_manager').value = company.manager || '';
    document.getElementById('comp_applicant').value = company.applicant || '';

    renderEmployeesTable(employees);

    if (employees.length > 0) {
        renderSingleS1(0);
    }
}

function renderEmployeesTable(list) {
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = '';

    list.forEach((emp, index) => {
        const isComplete = emp.nationalId && emp.insuranceNo;
        const qualityBadge = isComplete 
            ? `<span style="color: green; font-weight: bold;"><i class="fas fa-check-circle"></i> 100%</span>`
            : `<span style="color: orange; font-weight: bold;"><i class="fas fa-exclamation-triangle"></i> ناقص</span>`;

        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${emp.name}</strong></td>
                <td>${emp.nationalId}</td>
                <td>${emp.insuranceNo}</td>
                <td>${emp.job}</td>
                <td>${emp.startDate}</td>
                <td>${qualityBadge}</td>
                <td>
                    <button class="btn btn-primary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="generateS1ForEmployee(${index})"><i class="fas fa-file-contract"></i> إنشاء س1</button>
                    <button class="btn btn-warning" style="padding: 4px 8px; font-size: 0.8rem;" onclick="openEditEmployeeModal(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger" style="padding: 4px 8px; font-size: 0.8rem; background: var(--danger); color: white;" onclick="deleteEmployee(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function generateS1ForEmployee(index) {
    renderSingleS1(index);
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="tab-form-preview"]').classList.add('active');
    document.getElementById('tab-form-preview').classList.add('active');
}

function renderSingleS1(index) {
    const employees = getStoredEmployees();
    const company = getStoredCompany();
    const target = document.getElementById('s1-form-render-target');
    target.innerHTML = generateS1FormHTML(employees[index], company);
}

function filterEmployees() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const employees = getStoredEmployees();
    const filtered = employees.filter(e => 
        (e.name && e.name.toLowerCase().includes(query)) ||
        (e.nationalId && e.nationalId.includes(query)) ||
        (e.insuranceNo && e.insuranceNo.includes(query))
    );
    renderEmployeesTable(filtered);
}

function saveCompanyData(e) {
    e.preventDefault();
    const companyObj = {
        name: document.getElementById('comp_name').value,
        compId: document.getElementById('comp_id').value,
        sector: document.getElementById('comp_sector').value,
        gov: document.getElementById('comp_gov').value,
        sec: document.getElementById('comp_sec').value,
        village: document.getElementById('comp_village').value,
        street: document.getElementById('comp_street').value,
        building: document.getElementById('comp_building').value,
        phone: document.getElementById('comp_phone').value,
        manager: document.getElementById('comp_manager').value,
        applicant: document.getElementById('comp_applicant').value,
        applicantTitle: document.getElementById('comp_applicant_title').value
    };
    saveCompanyDataLocal(companyObj);
    alert("تم حفظ بيانات المنشأة الثابتة بنجاح!");
    refreshUI();
}

function deleteEmployee(index) {
    if (confirm("هل أنت تأكد من حذف هذا الموظف من قاعدة البيانات؟")) {
        const employees = getStoredEmployees();
        employees.splice(index, 1);
        saveEmployeesData(employees);
        refreshUI();
    }
}

function backupDatabase() {
    const data = {
        employees: getStoredEmployees(),
        company: getStoredCompany()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `HR_Platform_Backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
}

function restoreDatabase(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const data = JSON.parse(evt.target.result);
            if (data.employees) saveEmployeesData(data.employees);
            if (data.company) saveCompanyDataLocal(data.company);
            alert("تم استرجاع النسخة الاحتياطية بنجاح!");
            refreshUI();
        } catch (err) {
            alert("ملف غير صالح!");
        }
    };
    reader.readAsText(file);
}

function openAddEmployeeModal() {
    document.getElementById('modalTitle').innerText = "إضافة موظف جديد";
    document.getElementById('emp_index').value = "-1";
    renderModalForm({});
    document.getElementById('employeeModal').style.display = 'flex';
}

function openEditEmployeeModal(index) {
    const employees = getStoredEmployees();
    document.getElementById('modalTitle').innerText = "تعديل بيانات الموظف";
    document.getElementById('emp_index').value = index;
    renderModalForm(employees[index]);
    document.getElementById('employeeModal').style.display = 'flex';
}

function renderModalForm(emp) {
    const container = document.getElementById('modalFormFields');
    container.innerHTML = `
        <div class="form-group"><label>الاسم الكامل</label><input type="text" id="m_name" value="${emp.name || ''}"></div>
        <div class="form-group"><label>الرقم القومي</label><input type="text" id="m_nationalId" value="${emp.nationalId || ''}"></div>
        <div class="form-group"><label>الرقم التأميني</label><input type="text" id="m_insuranceNo" value="${emp.insuranceNo || ''}"></div>
        <div class="form-group"><label>المهنة</label><input type="text" id="m_job" value="${emp.job || ''}"></div>
        <div class="form-group"><label>تاريخ بدء الاشتراك</label><input type="date" id="m_startDate" value="${emp.startDate || ''}"></div>
        <div class="form-group"><label>أجر الاشتراك التأميني</label><input type="number" id="m_salaryIns" value="${emp.salaryIns || ''}"></div>
        <div class="form-group"><label>الأجر الشامل</label><input type="number" id="m_salaryTotal" value="${emp.salaryTotal || ''}"></div>
        <div class="form-group"><label>المؤهل</label><input type="text" id="m_qualification" value="${emp.qualification || ''}"></div>
    `;
}

function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
}

function saveEmployeeForm(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('emp_index').value);
    const employees = getStoredEmployees();

    const empObj = {
        name: document.getElementById('m_name').value,
        nationalId: document.getElementById('m_nationalId').value,
        insuranceNo: document.getElementById('m_insuranceNo').value,
        job: document.getElementById('m_job').value,
        startDate: document.getElementById('m_startDate').value,
        salaryIns: document.getElementById('m_salaryIns').value,
        salaryTotal: document.getElementById('m_salaryTotal').value,
        qualification: document.getElementById('m_qualification').value,
        nationality: "مصري"
    };

    if (index === -1) {
        employees.push(empObj);
    } else {
        employees[index] = { ...employees[index], ...empObj };
    }

    saveEmployeesData(employees);
    closeModal();
    refreshUI();
}
