# Hướng dẫn nối form landing page → Google Sheet

Mất khoảng 5 phút, làm 1 lần duy nhất.

1. Tạo Google Sheet mới (đặt tên ví dụ "Leads - Landing The Ten"): https://sheets.new
2. Trong Sheet: menu **Tiện ích mở rộng (Extensions) → Apps Script**
3. Xoá code mẫu, dán toàn bộ nội dung file `apps-script.gs` vào, bấm **Lưu** (Ctrl+S)
4. Bấm **Triển khai (Deploy) → Tùy chọn triển khai mới (New deployment)**
   - Loại: **Ứng dụng web (Web app)**
   - Thực thi với tư cách (Execute as): **Tôi (Me)**
   - Ai có quyền truy cập (Who has access): **Bất kỳ ai (Anyone)**  ← quan trọng
   - Bấm **Triển khai**, cấp quyền khi Google hỏi
5. Copy **URL Web app** (dạng https://script.google.com/macros/s/XXXX/exec)
6. Mở `assets/js/main.js`, dán URL vào dòng đầu tiên:
   `const LEAD_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec';`

## Kiểm tra
Mở landing page, điền form thử → mở Sheet, tab "Leads" phải có dòng mới
(kèm cột UTM để biết lead đến từ quảng cáo nào — khớp với plan tracking).

## Lưu ý
- Mỗi lần SỬA code Apps Script phải Deploy lại (Manage deployments → Edit → New version).
- SĐT được lưu dạng text để không mất số 0 đầu.
- Form vẫn hiện vé thành công khi chưa dán URL, nhưng lead KHÔNG được lưu —
  bắt buộc hoàn thành bước 6 trước khi chạy quảng cáo.
