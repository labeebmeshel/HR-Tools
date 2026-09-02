const DB_EMP_KEY = 'HR_PLATFORM_EMPLOYEES_V1';
const DB_COMP_KEY = 'HR_PLATFORM_COMPANY_V1';

const initialTestEmployees = [
    { name: "صلاح محمد أحمد", nationalId: "29801011234568", insuranceNo: "442433", job: "أخصائي موارد بشرية", startDate: "2025-11-17", salaryIns: "11500", salaryTotal: "13000", qualification: "بكالوريوس", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000001", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" },
    { name: "مينا عادل لبيب", nationalId: "29505051234567", insuranceNo: "553211", job: "مهندس برمجيات", startDate: "2026-01-01", salaryIns: "14000", salaryTotal: "16000", qualification: "بكالوريوس هندسة", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000002", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" },
    { name: "إسلام محمود حسن", nationalId: "29203151234569", insuranceNo: "887654", job: "محاسب أول", startDate: "2026-02-15", salaryIns: "9500", salaryTotal: "11000", qualification: "بكالوريوس تجارة", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000003", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" },
    { name: "مريم علي السيد", nationalId: "29908201234511", insuranceNo: "112233", job: "مصمم جرافيك", startDate: "2026-03-01", salaryIns: "8000", salaryTotal: "9500", qualification: "بكالوريوس فنون جميلة", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000004", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" },
    { name: "مصطفى إبراهيم خليل", nationalId: "28811121234522", insuranceNo: "998877", job: "مشرف مبيعات", startDate: "2025-08-01", salaryIns: "10500", salaryTotal: "12000", qualification: "مؤهل عالي", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000005", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" },
    { name: "جورج سامي فتحي", nationalId: "29402101234533", insuranceNo: "334455", job: "مطور أمامي", startDate: "2026-04-01", salaryIns: "13000", salaryTotal: "15000", qualification: "حاسبات ومعلومات", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000006", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" },
    { name: "رانيا سامح فايد", nationalId: "29707071234544", insuranceNo: "667788", job: "مسئول توظيف", startDate: "2026-05-10", salaryIns: "9000", salaryTotal: "10500", qualification: "ليسانس آداب", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000007", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" },
    { name: "كريم حسين عبد الله", nationalId: "29112251234555", insuranceNo: "554433", job: "سائق", startDate: "2025-06-01", salaryIns: "6000", salaryTotal: "7000", qualification: "متوسط", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000008", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" },
    { name: "نورهان هشام مصطفى", nationalId: "29609181234566", insuranceNo: "223344", job: "خدمة عملاء", startDate: "2026-06-01", salaryIns: "7500", salaryTotal: "8500", qualification: "مؤهل عالي", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000009", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" },
    { name: "طارق زياد العبد", nationalId: "29304041234577", insuranceNo: "778899", job: "أخصائي أمن معلومات", startDate: "2026-07-01", salaryIns: "15000", salaryTotal: "18000", qualification: "بكالوريوس هندسة", nationality: "مصري", compName: "أكاديمية براكسي للتدريب", compId: "12345678", phone: "01000000010", applicantName: "أحمد محمود", applicantTitle: "مفوض", sector: "1", medicalStatus: "نعم", disability: "لا" }
];

function getStoredEmployees() {
    const data = localStorage.getItem(DB_EMP_KEY);
    if (!data) {
        localStorage.setItem(DB_EMP_KEY, JSON.stringify(initialTestEmployees));
        return initialTestEmployees;
    }
    return JSON.parse(data);
}

function saveEmployeesData(employees) {
    localStorage.setItem(DB_EMP_KEY, JSON.stringify(employees));
}

function getStoredCompany() {
    const data = localStorage.getItem(DB_COMP_KEY);
    return data ? JSON.parse(data) : {
        name: "أكاديمية براكسي للتدريب",
        compId: "12345678",
        sector: "نمطي",
        gov: "القاهرة",
        sec: "مصر الجديدة",
        village: "الميرغني",
        street: "شارع النهضة",
        building: "15",
        phone: "0225555555",
        manager: "د. لبيب ميشيل",
        applicant: "أحمد محمود",
        applicantTitle: "مفوض"
    };
}

function saveCompanyDataLocal(companyObj) {
    localStorage.setItem(DB_COMP_KEY, JSON.stringify(companyObj));
}