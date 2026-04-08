// Fungsi untuk pindah ke halaman detail produk
function goToDetail(productId) {
    // Menyimpan ID produk yang dipilih ke localStorage atau URL
    // Untuk versi simpel, kita lewatkan via URL query parameter
    window.location.href = `detail.html?id=${productId}`;
}