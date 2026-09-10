const HR_Print = {
    init() {
        this.populateDropdowns();
    },

    populateDropdowns() {
        const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
        const templates = HR_Database.get(DB_KEYS.TEMPLATES);
        const empSelect = document.getElementById('printEmployeeSelect');
        const tmplSelect = document.getElementById('printTemplateSelect');

        if (empSelect) {
            empSelect.innerHTML = '<option value="">-- اختر الموظف --</option>';
            employees.forEach(e => {
                empSelect.innerHTML += `<option value="${e.id}">${e.name} - (قومي: ${e.nationalId})</option>`;
            });
        }

        if (tmplSelect) {
            tmplSelect.innerHTML = '<option value="">-- اختر النموذج --</option>';
            templates.forEach(t => {
                tmplSelect.innerHTML += `<option value="${t.id}">${t.name}</option>`;
            });
        }
    },

    quickPrint(employeeId, templateId) {
        if (!templateId) return;
        HR_App.switchTab('print-center-view');
        document.getElementById('printEmployeeSelect').value = employeeId;
        document.getElementById('printTemplateSelect').value = templateId;
        this.generatePreview(employeeId, templateId, 'printPreviewBox');
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
        const container = document.getElementById(targetContainerId);

        const employee = employees.find(e => e.id === employeeId);
        const template = templates.find(t => t.id === templateId);
        if (!employee || !template || !container) return;

        const company = companies.find(c => c.id === employee.companyId) || { name: 'شركة النور لتوريدات الخضار والفاكهة' };

        // دمج البيانات آلياً بالنص المرفق لـ "إقرار استلام عمل"[cite: 1]
        let parsedContent = template.content
            .replace(/{{EMPLOYEE_NAME}}/g, `<strong>${employee.name}</strong>`)
            .replace(/{{COMPANY_NAME}}/g, `<strong>${company.name}</strong>`)
            .replace(/{{JOB_TITLE}}/g, `<strong>${employee.jobTitle}</strong>`)
            .replace(/{{INSURANCE_DATE}}/g, `<strong>${employee.insuranceDate || 'تاريخ الاستلام'}</strong>`);

        const html = `
            <div class="no-print" style="margin-bottom: 15px; background: #e0f2fe; padding: 12px; border-radius: 8px;">
                <i class="fas fa-edit"></i> <strong>محرر النصوص التفاعلي (مثل Word):</strong> يمكنك تعديل نص الإقرار أدناه مباشرة قبل الطباعة.
            </div>

            <div class="print-preview-container">
                <div class="a4-page">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="font-size: 1.8rem; font-weight: bold; text-decoration: underline;">إقرار إستلام عمل</h2>
                    </div>

                    <!-- صندوق النص التفاعلي التعديل مثل ملف الوورد -->
                    <div id="editableWordContent" class="word-editor-box" contenteditable="true">
                        ${parsedContent.replace(/\n/g, '<br>')}
                    </div>

                    <div style="margin-top: 40px; font-size: 1.05rem; line-height: 2;">
                        <p><strong>المقر بما فيه:</strong></p>
                        <p>الأسم: <strong>${employee.name}</strong></p>
                        <p>التوقيع: .........................................</p>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    },

    executePrint() {
        window.print();
    }
};
