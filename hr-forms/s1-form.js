function renderCharBoxes(str, length) {
    const padded = (str || '').toString().padStart(length, ' ');
    let html = '<div class="char-box-container">';
    for (let i = 0; i < length; i++) {
        const char = padded[i] !== undefined ? padded[i] : '';
        html += `<div class="char-box">${char}</div>`;
    }
    html += '</div>';
    return html;
}

function generateS1FormHTML(emp, comp) {
    const day = emp.startDate ? emp.startDate.split('-')[2] || '' : '';
    const month = emp.startDate ? emp.startDate.split('-')[1] || '' : '';
    const year = emp.startDate ? emp.startDate.split('-')[0] || '' : '';

    return `
    <div class="s1-page">
        <table class="s1-header-table">
            <tr>
                <td style="width: 30%;">
                    <strong>الهيئة القومية للتأمين الاجتماعي</strong><br>
                    منطقة: <input type="text" class="editable-field" style="width: 110px;" value="${comp.gov || ''}"><br>
                    مكتب: <input type="text" class="editable-field" style="width: 110px;" value="${comp.sec || ''}">
                </td>
                <td style="width: 40%; text-align: center;">
                    <div class="s1-title-box">
                        نموذج رقم ( 1 )<br>
                        طلب إشتراك مؤمن عليه
                    </div>
                </td>
                <td style="width: 30%; text-align: left;">
                    <i class="fas fa-building fa-2x"></i>
                </td>
            </tr>
        </table>

        <div style="border: 1px solid #000; padding: 4px; margin-bottom: 6px;">
            <strong>الفئة :</strong>
            <span style="margin-right: 15px;"><span class="checkbox-custom">✔</span> 1. عاملين لدى الغير</span>
            <span style="margin-right: 15px;"><span class="checkbox-custom"></span> 2. أصحاب أعمال</span>
            <span style="margin-right: 15px;"><span class="checkbox-custom"></span> 3. العاملين بالمخابز</span>
        </div>

        <div class="s1-section-header">بيانات مقدم الطلب</div>
        <table class="s1-table">
            <tr>
                <td>مقدم الطلب: <input type="text" class="editable-field" style="width: 180px;" value="${emp.applicantName || comp.applicant || ''}"></td>
                <td>صفته: <input type="text" class="editable-field" style="width: 100px;" value="${emp.applicantTitle || comp.applicantTitle || 'مفوض'}"></td>
                <td>الرقم التأميني: ${renderCharBoxes(emp.insuranceNo, 9)}</td>
            </tr>
            <tr>
                <td colspan="2">الرقم القومي: ${renderCharBoxes(emp.nationalId, 14)}</td>
                <td>رقم التليفون: <input type="text" class="editable-field" style="width: 120px;" value="${emp.phone || comp.phone || ''}"></td>
            </tr>
        </table>

        <div class="s1-section-header">بيانات المؤمن عليه</div>
        <table class="s1-table">
            <tr>
                <td>الرقم التأميني: ${renderCharBoxes(emp.insuranceNo, 9)}</td>
                <td colspan="2">أسم المؤمن عليه: <input type="text" class="editable-field" value="${emp.name || ''}"></td>
            </tr>
            <tr>
                <td colspan="2">الرقم القومي: ${renderCharBoxes(emp.nationalId, 14)}</td>
                <td>الجنسية: <input type="text" class="editable-field" style="width: 100px;" value="${emp.nationality || 'مصري'}"></td>
            </tr>
            <tr>
                <td>المؤهل: <input type="text" class="editable-field" value="${emp.qualification || ''}"></td>
                <td>المهنة: <input type="text" class="editable-field" value="${emp.job || ''}"></td>
                <td>كود المهنة: <input type="text" class="editable-field" style="width: 60px;" value="101"></td>
            </tr>
            <tr>
                <td>تاريخ بدء الإشتراك: ${renderCharBoxes(day, 2)} / ${renderCharBoxes(month, 2)} / ${renderCharBoxes(year, 4)}</td>
                <td>القطاع: <input type="text" class="editable-field" style="width: 80px;" value="${comp.sector || 'خاص'}"></td>
                <td>نوع المدة: <input type="text" class="editable-field" style="width: 80px;" value="نمطي"></td>
            </tr>
            <tr>
                <td>أجر الإشتراك: <input type="text" class="editable-field" style="width: 80px;" value="${emp.salaryIns || '0'}"> جم</td>
                <td colspan="2">الأجر الشامل: <input type="text" class="editable-field" style="width: 80px;" value="${emp.salaryTotal || '0'}"> جم</td>
            </tr>
            <tr>
                <td colspan="3">
                    إستيفاء الكشف الطبي الإبتدائي: 
                    <span class="checkbox-custom">✔</span> نعم 
                    <span class="checkbox-custom"></span> لا
                </td>
            </tr>
        </table>

        <div class="s1-section-header">بيانات المنشأة ومحل الإقامة</div>
        <table class="s1-table">
            <tr>
                <td>أسم المنشأة: <input type="text" class="editable-field" value="${comp.name || ''}"></td>
                <td>رقم المنشأة: ${renderCharBoxes(comp.compId, 9)}</td>
            </tr>
            <tr>
                <td colspan="2">العنوان: <input type="text" class="editable-field" value="${comp.building || ''} ${comp.street || ''} - ${comp.sec || ''} - ${comp.gov || ''}"></td>
            </tr>
        </table>

        <div class="s1-section-header">التوقيعات ومطابقة التوقيع</div>
        <table class="s1-table" style="text-align: center; margin-top: 10px;">
            <tr>
                <td style="width: 50%; height: 50px; vertical-align: bottom;">توقيع المؤمن عليه: ...................................</td>
                <td style="width: 50%; height: 50px; vertical-align: bottom;">توقيع صاحب العمل / المدير المسئول: ...................................</td>
            </tr>
        </table>
    </div>

    <div class="s1-page">
        <div class="s1-section-header" style="font-size: 14px;">إرشــــــــادات وتوجيهات استخدام النموذج (صفحة 2)</div>
        <div style="padding: 10px; font-size: 11px; line-height: 1.8;">
            <p>1. على صاحب العمل أن يرسل هذا النموذج مع طلب اشتراكه في الهيئة خلال أسبوعين على الأكثر من تاريخ التحاق العامل بالعمل لديه.</p>
            <p>2. التوقيع على هذا النموذج يفيد الاطلاع والموافقة على كافة البيانات الواردة به.</p>
            <p>3. يستخدم هذا النموذج كطلب اشتراك في تأمين إصابات العمل وجميع التغطيات التأمينية وفقاً للقانون.</p>
            <p>4. يقتصر استثناء الأجر على الفئات التي يتقاضى فيها المؤمن عليه أجرًا من صاحب العمل وفق الضوابط.</p>
        </div>
    </div>

    <div class="s1-page">
        <div class="s1-section-header" style="font-size: 14px;">إقـــــــــرار صاحب العمل والعامل (صفحة 3)</div>
        <div style="padding: 15px; font-size: 11px; line-height: 2;">
            <p><strong>أقر أنا صاحب العمل / المدير المسئول:</strong> بصلة المنشأة بالعامل المذكور والتزامنا بكافة القوانين واللوائح التأمينية المنظمة، وعرضه على الجهة الطبية المختصة لاستيفاء تقرير اللياقة الطبية.</p>
            <br><br>
            <p style="text-align: left;">توقيع (صاحب العمل): ( ........................................... )</p>
            <hr style="margin: 20px 0;">
            <p><strong>أقر أنا العامل / المؤمن عليه:</strong> بأن البيانات المدونة بهذه الاستمارة صحيحة تماماً وتقع تحت مسؤولياني القانونية.</p>
            <br><br>
            <p style="text-align: left;">توقيع (المؤمن عليه): ( ........................................... )</p>
        </div>
    </div>
    `;
}
