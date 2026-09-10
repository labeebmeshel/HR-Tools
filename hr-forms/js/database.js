// Local Database Engine & Seeder
const DB_KEYS = {
    COMPANIES: 'HR_DB_COMPANIES',
    EMPLOYEES: 'HR_DB_EMPLOYEES',
    TEMPLATES: 'HR_DB_TEMPLATES',
    FIELDS: 'HR_DB_FIELDS',
    FORM_DATA: 'HR_DB_FORM_DATA',
    LOGS: 'HR_DB_LOGS'
};

const HR_Database = {
    init() {
        if (!localStorage.getItem(DB_KEYS.COMPANIES)) {
            const initialCompanies = [
                {
                    id: 'COMP-01',
                    name: 'أكاديمية براكسي (PRAXI Academy)',
                    regNo: '100293',
                    taxNo: '987-654-321',
                    insuranceNo: '77889900',
                    owner: 'أ. د/ لبيب ميشيل',
                    deputy: 'أ/ نورا سيد الملا',
                    branches: 'الفرع الرئيسي, فرع مدينة نصر, فرع الإسكندرية',
                    address: 'القاهرة - مدينة نصر - الشارع الرئيسي'
                }
            ];
            localStorage.setItem(DB_KEYS.COMPANIES, JSON.stringify(initialCompanies));
        }

        if (!localStorage.getItem(DB_KEYS.EMPLOYEES)) {
            const initialEmployees = [
                { id: 'EMP-001', companyId: 'COMP-01', branch: 'فرع مدينة نصر', name: 'أحمد محمد علي', nationalId: '29501011201234', insuranceNo: '123456789', jobTitle: 'أخصائي موارد بشرية', hireDate: '2022-01-15', phone: '01012345678', status: 'Active' },
                { id: 'EMP-002', companyId: 'COMP-01', branch: 'الفرع الرئيسي', name: 'محمود حسن مصطفى', nationalId: '29205121509876', insuranceNo: '987654321', jobTitle: 'محاسب أجور', hireDate: '2023-03-01', phone: '01198765432', status: 'Active' },
                { id: 'EMP-003', companyId: 'COMP-01', branch: 'فرع الإسكندرية', name: 'لبيب ميشيل فؤاد', nationalId: '28809201405566', insuranceNo: '556677889', jobTitle: 'استشاري HR', hireDate: '2021-06-10', phone: '01255667788', status: 'Active' }
            ];
            localStorage.setItem(DB_KEYS.EMPLOYEES, JSON.stringify(initialEmployees));
        }

        if (!localStorage.getItem(DB_KEYS.TEMPLATES)) {
            const initialTemplates = [
                {
                    id: 'TMPL-S1',
                    code: 'S1',
                    name: 'نموذج س1 - إخطار بدء اشتراك مؤمن عليه',
                    pages: 2,
                    isDuplex: true,
                    fieldsMapping: [
                        { fieldKey: 'name', targetLabel: 'اسم المؤمن عليه', required: true },
                        { fieldKey: 'nationalId', targetLabel: 'الرقم القومي', required: true },
                        { fieldKey: 'insuranceNo', targetLabel: 'الرقم التأميني', required: true },
                        { fieldKey: 'jobTitle', targetLabel: 'المهنة / الوظيفة', required: false },
                        { fieldKey: 'hireDate', targetLabel: 'تاريخ بدء الاشتراك', required: true }
                    ]
                }
            ];
            localStorage.setItem(DB_KEYS.TEMPLATES, JSON.stringify(initialTemplates));
        }

        if (!localStorage.getItem(DB_KEYS.LOGS)) {
            localStorage.setItem(DB_KEYS.LOGS, JSON.stringify([]));
        }
    },

    get(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },

    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    log(action, details) {
        const logs = this.get(DB_KEYS.LOGS);
        logs.unshift({
            timestamp: new Date().toLocaleString('ar-EG'),
            user: sessionStorage.getItem('LOGGED_USER') || 'Admin',
            action: action,
            details: details
        });
        this.set(DB_KEYS.LOGS, logs);
    }
};

HR_Database.init();
