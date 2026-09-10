// Strict Print Engine & Duplex Preview
const HR_Print = {
    generatePreview(employeeId, templateId, targetContainerId) {
        const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
        const templates = HR_Database.get(DB_KEYS.TEMPLATES);
        const companies = HR_Database.get(DB_KEYS.COMPANIES);

        const employee = employees.find(e => e.id === employeeId);
        const template = templates.find(t => t.id === templateId);
        const container = document.getElementById(targetContainerId);

        if (!employee || !template || !container) return;

        const readiness = HR_Validation.checkFormReadiness(employee, template);
        const company = companies.find(c => c.id === employee.companyId) || { name: 'غير محدد' };

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

                        <div style="margin: 20px 0; border: 1px solid #000; padding: 10px;">
                            <h4>بيانات المنشأة:</h4>
                            <p>اسم الشركة: <strong>${company.name}</strong></p>
                        </div>

                        <div style="margin: 20px 0; border: 1px solid #000; padding: 10px;">
                            <h4>بيانات المؤمن عليه:</h4>
                            <p>اسم المؤمن عليه: <span class="editable-field ${readiness.missingRequired.includes('اسم المؤمن عليه') ? 'field-highlight-missing' : ''}">${employee.name || 'غير مدخل'}</span></p>
                            <p>الرقم القومي: <span class="editable-field ${readiness.missingRequired.includes('الرقم القومي') ? 'field-highlight-missing' : ''}">${employee.nationalId || 'غير مدخل'}</span></p>
                            <p>الرقم التأميني: <span class="editable-field ${readiness.missingRequired.includes('الرقم التأميني') ? 'field-highlight-missing' : ''}">${employee.insuranceNo || 'غير مدخل'}</span></p>
                            <p>المهنة / الوظيفة: <span>${employee.jobTitle || 'غير مدخل'}</span></p>
                            <p>تاريخ بدء الاشتراك: <span>${employee.hireDate || 'غير مدخل'}</span></p>
                        </div>

                        <div style="margin-top: 50px; display: flex; justify-content: space-between;">
                            <div>توقيع الموظف: ........................</div>
                            <div>توقيع وتختم المدير المسؤول: ........................</div>
                        </div>
                    </div>
                </div>
            `;

        if (template.pages > 1) {
            html += `
                <div class="a4-page page-break">
                    <div class="official-form-template">
                        <h3>الوجه الثاني - الإقرارات والتعليمات (صفحة 2)</h3>
                        <p style="margin-top:20px;">يتعهد صاحب العمل بصحة البيانات المدونة بهذا النموذج وتقديمها للهيئة في المواعيد القانونية.</p>
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