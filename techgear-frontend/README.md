### 2. File README cho Frontend (`techgear-frontend/README.md`)

File này tập trung vào cách cài node modules và chạy giao diện.

```markdown
# TechGear Store - Frontend (Client)

## 1. Giới thiệu (Overview)
Đây là giao diện người dùng (Client-side) của dự án **TechGear Store**.
Ứng dụng cho phép người dùng xem sản phẩm, đặt hàng và Admin quản lý hệ thống.

## 2. Công nghệ sử dụng (Tech Stack)
- **Framework:** ReactJS (Build tool: Vite)
- **UI Library:** Ant Design (Antd)
- **Routing:** React Router Dom v6
- **HTTP Client:** Axios
- **State Management:** React Hooks / Redux (Tùy chọn)

## 3. Yêu cầu hệ thống
- Node.js (Phiên bản 16 trở lên).
- npm (đi kèm với Node.js).

## 4. Hướng dẫn cài đặt & Chạy (Installation & Run)

### Bước 1: Cài đặt thư viện
Mở Terminal tại thư mục gốc của dự án frontend và chạy:
```bash
npm install

### Bước 2: Cấu hình môi trường (Optional)
Nếu Backend không chạy ở cổng 8080, hãy vào file cấu hình (ví dụ src/api/axiosClient.js) để chỉnh lại BASE_URL
### Bước 3: Chạy ứng dụng (Development Mode)
npm run dev

Sau khi chạy, truy cập vào đường link hiển thị trên terminal (thường là http://localhost:5173).

## 5. Cấu trúc thư mục
/src/components: Các thành phần tái sử dụng (Header, Footer...).

/src/pages: Các trang chính (Home, Login, ProductDetail...).

/src/services: Cấu hình gọi API sang Backend.