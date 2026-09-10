// Dynamic Template Manager Engine
const HR_Templates = {
    getTemplates() {
        return HR_Database.get(DB_KEYS.TEMPLATES);
    },

    renderDropdown(selectId) {
        const templates = this.getTemplates();
        const select = document.getElementById(selectId);
        if (!select) return;
        
        select.innerHTML = '<option value="">-- اختر النموذج المطلوبة طباعته --</option>';
        templates.forEach(t => {
            select.innerHTML += `<option value="${t.id}">${t.name} (${t.code})</option>`;
        });
    },

    addTemplate(templateObj) {
        const templates = this.getTemplates();
        templates.push(templateObj);
        HR_Database.set(DB_KEYS.TEMPLATES, templates);
        HR_Database.log('إضافة قالب جديد', `تم تعريفه باسم: ${templateObj.name}`);
    }
};