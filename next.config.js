module.exports = {
    // Cấu hình một redirect để chuyển hướng từ trang gốc đến trang khác
    async redirects() {
      return [
        {
          source: '/',
          destination: '/sigin', // Thay đổi '/your-page' thành đường dẫn của trang bạn muốn chạy mặc định
          permanent: true,
        },
      ];
    },
  };