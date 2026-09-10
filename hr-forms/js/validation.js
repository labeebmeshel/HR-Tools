// Validation Engine & Field Readiness Checker
const HR_Validation = {
    validateEmployee(employee) {
        const errors = [];
        if (!employee.name) errors.push('الاسم مطلوب');
        if (!employee.nationalId || employee.nationalId.length !== 14) {
            errors.push('الرقم القومي يجب أن يتكون من 14 رقمًا');
        }
        if (!employee.insuranceNo) errors.push('الرقم التأميني مطلوب');
        return errors;
    },

    checkFormReadiness(employee, template) {
        const missingRequired = [];
        const missingOptional = [];

        template.fieldsMapping.forEach(mapping => {
            const val = employee[mapping.fieldKey];
            if (!val || val.trim() === '') {
                if (mapping.required) {
                    missingRequired.push(mapping.targetLabel);
                } else {
                    missingOptional.push(mapping.targetLabel);
                }
            }
        });

        let status = 'Green';
        if (missingRequired.length > 0) {
            status = 'Red';
        } else if (missingOptional.length > 0) {
            status = 'Yellow';
        }

        return {
            status: status,
            missingRequired: missingRequired,
            missingOptional: missingOptional
        };
    }
};