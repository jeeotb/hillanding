/**
 * HUMAN INTERIOR — Nhận lead từ landing page, ghi vào Google Sheet
 * Triển khai: xem HUONG-DAN.md cùng thư mục
 */
var SHEET_NAME = 'Leads';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Thời gian', 'Mã vé', 'Họ tên', 'SĐT', 'Email',
                    'Phân khúc', 'Tình trạng sở hữu',
                    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'Trang']);
      sh.setFrozenRows(1);
    }
    var p = e.parameter || {};
    sh.appendRow([new Date(), p.code || '', p.name || '', "'" + (p.phone || ''),
                  p.email || '', p.segment || '', p.status || '',
                  p.utm_source || '', p.utm_medium || '', p.utm_campaign || '',
                  p.utm_content || '', p.page || '']);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
