const DB_KEYS = {
    COMPANIES: 'HR_DB_COMPANIES',
    BRANCHES: 'HR_DB_BRANCHES',
    EMPLOYEES: 'HR_DB_EMPLOYEES',
    TEMPLATES: 'HR_DB_TEMPLATES',
    LOGS: 'HR_DB_LOGS'
};

const HR_Database = {
    init() {
        if (!localStorage.getItem(DB_KEYS.COMPANIES)) {
            const initialCompanies = [
                { id: 'COMP-01', name: 'شركة النور لتوريدات الخضار والفاكهة', regNo: '100293', taxNo: '987-654-321', owner: 'أ. د/ لبيب ميشيل' }
            ];
            localStorage.setItem(DB_KEYS.COMPANIES, JSON.stringify(initialCompanies));
        }

        if (!localStorage.getItem(DB_KEYS.BRANCHES)) {
            const initialBranches = [
                { id: 'BR-01', companyId: 'COMP-01', name: 'الفرع الرئيسي - العبور', insuranceNo: '77889900', address: 'العبور - المنطقة الصناعية' },
                { id: 'BR-02', companyId: 'COMP-01', name: 'فرع مدينة نصر', insuranceNo: '77889911', address: 'مدينة نصر - القاهرة' }
            ];
            localStorage.setItem(DB_KEYS.BRANCHES, JSON.stringify(initialBranches));
        }

        if (!localStorage.getItem(DB_KEYS.EMPLOYEES)) {
            const initialEmployees = [
                {
                    id: 'EMP-001',
                    code: '1001',
                    companyId: 'COMP-01',
                    branchId: 'BR-01',
                    name: 'أحمد محمد علي',
                    insuranceNo: '123456789',
                    jobTitle: 'مسؤول مشتريات',
                    jobCode: 'JOB-501',
                    nationalId: '29501011201234',
                    street: 'شارع 15',
                    section: 'العبور',
                    governorate: 'القليوبية',
                    phone: '01012345678',
                    nationality: 'مصري',
                    qualification: 'بكالوريوس تجارة',
                    insuranceDate: '2022-01-15',
                    insuredSalary: '4000',
                    grossSalary: '7000'
                }
            ];
            localStorage.setItem(DB_KEYS.EMPLOYEES, JSON.stringify(initialEmployees));
        }

        if (!localStorage.getItem(DB_KEYS.TEMPLATES)) {
            const initialTemplates = [
                {
                    id: 'TMPL-JOB-ACK',
                    code: 'ACK-01',
                    name: 'إقرار استلام عمل',
                    content: `أقر وأتعهد أنا {{EMPLOYEE_NAME}} ، بأني قد إستلمت العمل بشركة {{COMPANY_NAME}}، بوظيفة {{JOB_TITLE}} إعتباراً من {{INSURANCE_DATE}} .\nكما أنني أقر بأني لا أعمل حالياً بأية وظيفة سواء كانت حكومية أو خاصة ولا أتقاضى أجراً من أي جهة غير الأجر الذي سوف يصرف لي من الشركة المذكورة كما أنني أقر بأنني لن اقوم بتوصيل بطريقة مباشرة أو غير مباشرة إلى أي جهة أو شركة سواء كانت منافسة أو غير منافسة أي محتوى أو مستندات رسمية أو اية معلومات أكون قد حصلت عليها في نطاق عملي بدون إذن رسمي، كما أنه لا يجوز لي الحصور على صورة من أية مستندات أستلمتها عن طريق عملي بالشركة المذكورة.\nأقر وأتعهد أنا الموقع أدناه بالإلتزام بالقيام بواجباتي في الشركة والمحافظة على ممتلكاتها وأسرارها وعدم السماح بالتضارب في المصالح معها.\nكما أقر بأني إتطلعت على لائحة العمل الداخلية وسياسات العمل وأتعهد بالإلتزام بهذه اللوائح إلتزاماُ تاماُ والعمل بموجبها.`
                }
            ];
            localStorage.setItem(DB_KEYS.TEMPLATES, JSON.stringify(initialTemplates));
        }
    },

    get(key) { return JSON.parse(localStorage.getItem(key)) || []; },
    set(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
};

HR_Database.init();
