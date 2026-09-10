// Strict Print Engine & Dynamic Company Header Insertion
const HR_Print = {
    init() {
        this.populateEmployeeDropdown();
        HR_Templates.renderDropdown('printTemplateSelect');
    },

    populateEmployeeDropdown() {
        const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
        const companies = HR_Database.get(DB_KEYS.COMPANIES);
        const select = document.getElementById('printEmployeeSelect');
        if (!select) return;

        const activeCompId = localStorage.getItem('ACTIVE_COMPANY_ID') || (companies[0] ? companies[0].id : '');
        const activeBranch = localStorage.getItem('ACTIVE_BRANCH_NAME') || 'ALL';

        const filtered = employees.filter(e => {
            const matchComp = !activeCompId || e.companyId === activeCompId;
            const matchBranch = activeBranch === 'ALL' || e.branch === activeBranch;
            return matchComp && matchBranch;
        });

        select.innerHTML = '<option value="">-- اختر الموظف لطباعة نموذجه --</option>';
        filtered.forEach(e => {
            select.innerHTML += `<option value="${e.id}">${e.name} - (قومي: ${e.nationalId})</option>`;
        });
    },

    onSelectChange() {
        const empId = document.getElementById('printEmployeeSelect').value;
        const tmplId = document.getElementById('printTemplateSelect').value;
        if (empId && tmplId) {
            this.generatePreview(empId, tmplId, 'printPreviewBox');
        }
    },

    generatePreview(employeeId, templateId, targetContainerId) {
        const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
        const templates = HR_Database.get(DB_KEYS.TEMPLATES);
        const companies = HR_Database.get(DB_KEYS.COMPANIES);

        const employee = employees.find(e => e.id === employeeId);
        const template = templates.find(t => t.id === templateId);
        const container = document.getElementById(targetContainerId);

        if (!employee || !template || !container) return;

        const readiness = HR_Validation.checkFormReadiness(employee, template);
        const company = companies.find(c => c.id === employee.companyId) || {};

        let html = `
            <div class="print-preview-container">
                <div class="a4-page">
                    <div class="official-form-template">
                        <table class="form-header-table">
                            <tr>
                                <td><strong>الهيئة القومية للتأمين الاجتماعي</strong></td>
                                <td><h3>${template.name}</h3></td>
                                <td>كود النموذج: <strong>${template.code}</strong></td>
                            </tr>
                        </table>

                        <!-- بيانات المنشأة والصاحب المحدثة تلقائياً -->
                        <div style="margin: 15px 0; border: 1px solid #000; padding: 10px; font-size: 11px;">
                            <table style="width: 100%; text-align: right;">
                                <tr>
                                    <td>اسم المنشأة/الشركة: <strong>${company.name || '-'}</strong></td>
                                    <td>الفرع: <strong>${employee.branch || 'المركز الرئيسي'}</strong></td>
                                </tr>
                                <tr>
                                    <td>رقم السجل التجاري: <strong>${company.regNo || '-'}</strong></td>
                                    <td>رقم البطاقة الضريبية: <strong>${company.taxNo || '-'}</strong></td>
                                </tr>
                                <tr>
                                    <td>الرقم التأميني للمنشأة: <strong>${company.insuranceNo || '-'}</strong></td>
                                    <td>صاحب العمل: <strong>${company.owner || '-'}</strong></td>
                                </tr>
                                <tr>
                                    <td colspan="2">عنوان المقر/الفرع: <strong>${company.address || '-'}</strong></td>
                                </tr>
                            </table>
                        </div>

                        <!-- بيانات المؤمن عليه -->
                        <div style="margin: 15px 0; border: 1px solid #000; padding: 10px;">
                            <h4>بيانات المؤمن عليه:</h4>
                            <p>اسم المؤمن عليه: <span class="editable-field ${readiness.missingRequired.includes('اسم المؤمن عليه') ? 'field-highlight-missing' : ''}">${employee.name || 'غير مدخل'}</span></p>
                            <p>الرقم القومي: <span class="editable-field ${readiness.missingRequired.includes('الرقم القومي') ? 'field-highlight-missing' : ''}">${employee.nationalId || 'غير مدخل'}</span></p>
                            <p>الرقم التأميني: <span class="editable-field ${readiness.missingRequired.includes('الرقم التأميني') ? 'field-highlight-missing' : ''}">${employee.insuranceNo || 'غير مدخل'}</span></p>
                            <p>المهنة / الوظيفة: <span>${employee.jobTitle || 'غير مدخل'}</span></p>
                            <p>تاريخ بدء الاشتراك: <span>${employee.hireDate || 'غير مدخل'}</span></p>
                        </div>

                        <div style="margin-top: 40px; display: flex; justify-content: space-between; font-weight: bold;">
                            <div>توقيع المؤمن عليه: ........................</div>
                            <div>توقيع المدير المسؤول/النائب (${company.deputy || company.owner}): ........................</div>
                        </div>
                    </div>
                </div>
            `;

        if (template.pages > 1) {
            html += `
                <div class="a4-page page-break">
                    <div class="official-form-template">
                        <h3>الوجه الثاني - الإقرارات والتعليمات (صفحة 2)</h3>
                        <p style="margin-top:20px;">يتعهد صاحب العمل (${company.owner}) بصحة البيانات المدونة بهذا النموذج وتقديمها للهيئة القومية للتأمين الاجتماعي.</p>
                    </div>
                </div>
            `;
        }

        html += `</div>`;
        container.innerHTML = html;
        HR_Database.log('معاينة طباعة', `تم توليد معاينة النموذج ${template.code} للموظف ${employee.name}`);
    },

    executePrint() {
        window.print();
        HR_Database.log('طباعة', 'تم تنفيذ أمر الطباعة للنشر على A4');
    }
};
