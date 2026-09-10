const HR_Excel = {
    downloadTemplate() {
        const data = [
            {
                "أسم الشركة": "شركة النور لتوريدات الخضار والفاكهة",
                "أسم الفرع": "الفرع الرئيسي - العبور",
                "كود الموظف": "1002",
                "الأسم": "محمود حسن علي",
                "الرقم التأميني": "987654321",
                "الوظيفة بالتأمينات": "سائق مبيعات",
                "كود الوظيفة": "JOB-202",
                "الرقم القومي": "29205121509876",
                "الشارع": "شارع الجيش",
                "قسم / مركز": "العبور",
                "محافظة": "القليوبية",
                "رقم التليفون": "01198765432",
                "الجنسية": "مصري",
                "المؤهل": "دبلوم ثانوي",
                "تاريخ التأمين": "2023-03-01",
                "الأجر التأمينى": "3500",
                "الأجر الشامل": "6000"
            }
        ];

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "الموظفين");
        XLSX.writeFile(workbook, "Employees_Template.xlsx");
    },

    importExcel(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            const employees = HR_Database.get(DB_KEYS.EMPLOYEES);
            const companies = HR_Database.get(DB_KEYS.COMPANIES);
            const branches = HR_Database.get(DB_KEYS.BRANCHES);

            rows.forEach(row => {
                const compName = row["أسم الشركة"];
                const branchName = row["أسم الفرع"];

                let company = companies.find(c => c.name === compName) || companies[0];
                let branch = branches.find(b => b.name === branchName) || branches[0];

                const newEmp = {
                    id: 'EMP-' + Date.now().toString().slice(-4) + Math.floor(Math.random() * 10),
                    code: String(row["كود الموظف"] || ''),
                    companyId: company ? company.id : '',
                    branchId: branch ? branch.id : '',
                    name: row["الأسم"] || '',
                    insuranceNo: String(row["الرقم التأميني"] || ''),
                    jobTitle: row["الوظيفة بالتأمينات"] || '',
                    jobCode: String(row["كود الوظيفة"] || ''),
                    nationalId: String(row["الرقم القومي"] || ''),
                    street: row["الشارع"] || '',
                    section: row["قسم / مركز"] || '',
                    governorate: row["محافظة"] || '',
                    phone: String(row["رقم التليفون"] || ''),
                    nationality: row["الجنسية"] || '',
                    qualification: row["المؤهل"] || '',
                    insuranceDate: row["تاريخ التأمين"] || '',
                    insuredSalary: String(row["الأجر التأمينى"] || ''),
                    grossSalary: String(row["الأجر الشامل"] || '')
                };

                employees.push(newEmp);
            });

            HR_Database.set(DB_KEYS.EMPLOYEES, employees);
            HR_Employees.renderList('employeesTableBody');
            alert(`تم رفع وتثبيت ${rows.length} موظف بنجاح في قاعدة البيانات!`);
        };
        reader.readAsArrayBuffer(file);
    }
};
