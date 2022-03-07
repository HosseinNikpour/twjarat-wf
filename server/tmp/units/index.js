//debugger;
var error = false, message = '';

if ($('#ContentPlaceHolder1_ASPxRoundPanel2_chb1')[0].checked)
    if ($('#ctl00_ContentPlaceHolder1_ASPxRoundPanel2_RadUpload1file0').val() == '') {
        error = true;
        message = 'مستندات لازم برای پروفایل حفاظتی را وارد نمایید'
    }
if ($('#ContentPlaceHolder1_ASPxRoundPanel2_chb2')[0].checked)
    if ($('#ctl00_ContentPlaceHolder1_ASPxRoundPanel2_RadUpload2file0').val() == '') {
        error = true;
        message = 'مستندات لازم برای شناسنامه توصیفی را وارد نمایید'
    }
if ($('#ContentPlaceHolder1_ASPxRoundPanel2_chb3')[0].checked)
    if ($('#ctl00_ContentPlaceHolder1_ASPxRoundPanel2_RadUpload3file0').val() == '') {
        error = true;
        message = 'مستندات لازم برای لیست دارایی ها را وارد نمایید'
    }
if ($('#ContentPlaceHolder1_ASPxRoundPanel2_chb4')[0].checked)
    if ($('#ctl00_ContentPlaceHolder1_ASPxRoundPanel2_RadUpload4file0').val() == '') {
        error = true;
        message = 'مستندات لازم برای ارزش گذاری اولیه را وارد نمایید'
    }

if ($('#ContentPlaceHolder1_ASPxRoundPanel1_letterShenase').val() == '' ||
    $('#ContentPlaceHolder1_ASPxRoundPanel1_letterNo').val() == '' ||
    $('#ContentPlaceHolder1_ASPxRoundPanel1_letterDate').val() == '') {
    error = true;
    message = 'شناسه ، شماره ، تاریخ نامه الزامی است'
}

var msg = $(".chbBox input:checkbox:not(:checked)").siblings('label').map(function () {
    return $(this).text();
}).get().join(" , ");
$('#ContentPlaceHolder1_hdf1').val(msg);
if (msg) {
    var text = `تمامى مستندات به جز سند ${msg} دريافت نشده أست`;
    if (confirm(text) == true) {

    } else {
        e.processOnServer = false;
    }
}
if (error) {
    alert(message)
    e.processOnServer = !error;
}