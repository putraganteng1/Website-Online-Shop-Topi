// Fungsi untuk pindah ke halaman detail produk
function goToDetail(productId) {
    // Menyimpan ID produk ke Local Storage (berguna nanti untuk menampilkan detail yang sesuai)
    localStorage.setItem('selectedProductId', productId);
    
    // Pindah halaman
    window.location.href = 'detail.html';
}