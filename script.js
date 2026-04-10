// ==========================================
// 1. DATABASE PRODUK (MINI)
// ==========================================
const productsDatabase = [
    {
        id: 1,
        title: "Los Angeles Lakers Team",
        subtitle: "Color 59FIFTY Fitted",
        price: "$40.99",
        description: "The Los Angeles Lakers Team Color 59FIFTY Fitted Cap features an embroidered Lakers logo at the front panels and the official NBA logo at the rear.",

        images: [
            "assets/images/lakers-depan.png",
            "assets/images/lakers.png", 
            "assets/images/lakers-samping-kiri.png",
            "assets/images/lakers-samping-kanan.png",
            "assets/images/lakers-belakang.png"
        ]
    },
    {
        id: 2,
        title: "New York Yankees Black and White",
        subtitle: "Classic 59FIFTY Fitted",
        price: "$39.99",
        description: "Rep the Yankees with this classic black and white fitted cap. Essential for any streetwear enthusiast.",
        images: [
            "assets/images/yankees-bw-depan.png",
            "assets/images/yankees-bw.png",
            "assets/images/yankees-bw-samping-kiri.png",
            "assets/images/yankees-bw-samping-kanan.png",
            "assets/images/yankees-bw-belakang.png"
        ]
    },
    {
        id: 3,
        title: "Chicago Bulls Core Classic Gray",
        subtitle: "Adjustable Snapback",
        price: "$31.99",
        description: "Show your Bulls pride with this comfortable core classic snapback cap in neutral gray.",
        images: [
            "assets/images/bulls.png",
            "assets/images/bulls.png",
            "assets/images/bulls.png",
            "assets/images/bulls.png",
            "assets/images/bulls-model.png"
        ]
    },
    {
        id: 10,
        title: "New York Knicks 2024",
        subtitle: "Color 59FIFTY Fitted",
        price: "$36.99",
        description: "The Los Angeles Lakers Team Color 59FIFTY Fitted Cap features an embroidered Lakers logo at the front panels and the official NBA logo at the rear.",

        images: [
            "assets/images/knicks-depan.png",
            "assets/images/knicks.png", 
            "assets/images/knicks-samping-kiri.png",
            "assets/images/knicks-samping-kanan.png",
            "assets/images/knicks-belakang.png"
        ]
    },
    {
        id: 11,
        title: "New York Yankees Black and White",
        subtitle: "Classic 59FIFTY Fitted",
        price: "$39.99",
        description: "Rep the Yankees with this classic black and white fitted cap. Essential for any streetwear enthusiast.",
        images: [
            "assets/images/yankees-bw-depan.png",
            "assets/images/yankees-bw.png",
            "assets/images/yankees-bw-samping-kiri.png",
            "assets/images/yankees-bw-samping-kanan.png",
            "assets/images/yankees-bw-belakang.png"
        ]
    },
    {
        id: 12,
        title: "Chicago Bulls Core Classic Gray",
        subtitle: "Adjustable Snapback",
        price: "$31.99",
        description: "Show your Bulls pride with this comfortable core classic snapback cap in neutral gray.",
        images: [
            "assets/images/bulls.png",
            "assets/images/bulls.png",
            "assets/images/bulls.png",
            "assets/images/bulls.png",
            "assets/images/bulls-model.png"
        ]
    }
];

// ==========================================
// 2. FUNGSI PINDAH HALAMAN DARI HOME
// ==========================================
function goToDetail(productId) {
    // Membawa user ke halaman detail beserta ID produknya
    window.location.href = `detail.html?id=${productId}`;
}

// ==========================================
// 3. FUNGSI UNTUK MERENDER & LOGIKA HALAMAN DETAIL
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    if (window.location.pathname.includes('detail.html')) {
        
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = productsDatabase.find(p => p.id === productId);

        if (product) {
            // Render Info Produk
            document.getElementById('detail-title').innerText = product.title;
            document.getElementById('detail-subtitle').innerText = product.subtitle;
            document.getElementById('detail-price').innerText = product.price;
            document.getElementById('detail-description').innerText = product.description;

            // --- LOGIKA GALERI GAMBAR & PANAH ---
            let currentImgIndex = 0; 
            const mainImgElement = document.getElementById('main-product-image');
            const thumbContainer = document.getElementById('thumbnail-container');
            
            // Fungsi untuk update gambar utama & status aktif thumbnail
            function updateMainImage(index) {
                currentImgIndex = index;
                mainImgElement.src = product.images[currentImgIndex];
                
                // Update class "active" pada thumbnail
                const thumbs = document.querySelectorAll('.gallery-thumbnails img');
                thumbs.forEach((thumb, i) => {
                    if(i === currentImgIndex) thumb.classList.add('active');
                    else thumb.classList.remove('active');
                });
            }

            // Render Thumbnails
            thumbContainer.innerHTML = ''; 
            product.images.forEach((imgSrc, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                if (index === 0) imgElement.classList.add('active'); 
                
                // Jika thumbnail diklik
                imgElement.onclick = () => updateMainImage(index);
                thumbContainer.appendChild(imgElement);
            });

            // PENTING: Panggil fungsi ini agar saat pertama kali buka halaman, gambar utama langsung di-set sesuai produk yang dipilih!
            updateMainImage(0);

            // Logika Panah Kiri & Kanan
            document.querySelector('.left-arrow').onclick = () => {
                let newIndex = (currentImgIndex - 1 + product.images.length) % product.images.length;
                updateMainImage(newIndex);
            };

            document.querySelector('.right-arrow').onclick = () => {
                let newIndex = (currentImgIndex + 1) % product.images.length;
                updateMainImage(newIndex);
            };


            // --- LOGIKA PILIH UKURAN (S, M, L, XL) ---
            const sizeBtns = document.querySelectorAll('.size-btn');
            sizeBtns.forEach(btn => {
                btn.onclick = () => {
                    // Hapus active dari semua tombol ukuran
                    sizeBtns.forEach(b => b.classList.remove('active'));
                    // Tambahkan active ke tombol yang sedang diklik
                    btn.classList.add('active');
                };
            });


            // --- LOGIKA TOMBOL QUANTITY (- dan +) ---
            const qtyInput = document.querySelector('.qty-input');
            const btnMinus = document.querySelectorAll('.qty-btn')[0]; // Tombol Minus
            const btnPlus = document.querySelectorAll('.qty-btn')[1];  // Tombol Plus

            btnMinus.onclick = () => {
                let currentValue = parseInt(qtyInput.value);
                // Jangan biarkan angka di bawah 1
                if (currentValue > 1) {
                    qtyInput.value = currentValue - 1;
                }
            };

            btnPlus.onclick = () => {
                let currentValue = parseInt(qtyInput.value);
                qtyInput.value = currentValue + 1;
            };

            // --- LOGIKA ADD TO CART & SIMPAN DATA KE LOCALSTORAGE ---
            const btnAddCart = document.querySelector('.btn-add-cart');
            
            if (btnAddCart) {
                btnAddCart.onclick = () => {
                    // 1. Ambil Size yang sedang aktif
                    const activeSizeBtn = document.querySelector('.size-btn.active');
                    const selectedSize = activeSizeBtn ? activeSizeBtn.innerText : 'S'; // Default S jika kosong

                    // 2. Ambil Quantity
                    const selectedQty = parseInt(qtyInput.value);

                    // 3. Buat objek data yang akan dimasukkan ke keranjang
                    const cartItem = {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.images[0], // Ambil gambar utama
                        size: selectedSize,
                        quantity: selectedQty
                    };

                    // 4. Cek apakah di browser sudah ada keranjang sebelumnya
                    let cart = JSON.parse(localStorage.getItem('caps_cart')) || [];

                    // 5. Cek apakah item dengan ukuran yang sama sudah ada di keranjang
                    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id && item.size === cartItem.size);
                    
                    if (existingItemIndex > -1) {
                        // Jika sudah ada, tambahkan quantity-nya
                        cart[existingItemIndex].quantity += selectedQty;
                    } else {
                        // Jika belum ada, masukkan sebagai item baru
                        cart.push(cartItem);
                    }

                    // 6. Simpan kembali ke browser (Local Storage)
                    localStorage.setItem('caps_cart', JSON.stringify(cart));

                    // 7. Munculkan Pop-Up Animasi (Toast)
                    const toast = document.getElementById('toast');
                    const toastMsg = document.getElementById('toast-message');
                    
                    if (toast && toastMsg) {
                        toastMsg.innerText = `Berhasil menambah ${selectedQty}x ${product.title} (Size: ${selectedSize}) ke keranjang!`;
                        toast.classList.add('show');

                        // Sembunyikan otomatis setelah 3 detik
                        setTimeout(() => {
                            toast.classList.remove('show');
                        }, 3000);
                    } else {
                        // Fallback aman jika Anda belum menambahkan kode HTML <div id="toast"> di detail.html
                        alert(`Berhasil menambah ${selectedQty}x ${product.title} (Size: ${selectedSize}) ke keranjang!`);
                    }
                };
            }

            // --- LOGIKA MODAL SIZE GUIDE OVERLAY ---
            const btnSizeGuide = document.getElementById('btn-size-guide');
            const modalOverlay = document.getElementById('size-guide-modal');
            const closeModalBtn = document.querySelector('.close-modal');

            if (btnSizeGuide && modalOverlay) {
                // Saat tombol Size Guide diklik, munculkan overlay
                btnSizeGuide.onclick = () => {
                    modalOverlay.classList.add('show');
                };

                // Saat tombol X diklik, sembunyikan overlay
                if(closeModalBtn) {
                    closeModalBtn.onclick = () => {
                        modalOverlay.classList.remove('show');
                    };
                }

                // Opsional tapi keren: Klik di area gelap luar gambar juga akan menutup overlay
                modalOverlay.onclick = (event) => {
                    if (event.target === modalOverlay) {
                        modalOverlay.classList.remove('show');
                    }
                };
            }

        } else {
            document.getElementById('detail-title').innerText = "Produk Tidak Ditemukan";
        }
    }

    // ==========================================
    // 4. LOGIKA UNTUK HALAMAN KERANJANG (CART)
    // ==========================================
    if (window.location.pathname.includes('cart.html')) {
        const cartItemsList = document.getElementById('cart-items-list');
        const summaryItemsList = document.getElementById('summary-items-list');
        const summarySubtotal = document.getElementById('summary-subtotal');

        // Ambil data keranjang dari browser
        let cart = JSON.parse(localStorage.getItem('caps_cart')) || [];

        // Jika keranjang kosong
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: gray;">
                    Belum ada produk di keranjang Anda.
                </div>
            `;
            return;
        }

        let cartHTML = '';
        let summaryHTML = '';
        let subtotal = 0;

        // Looping setiap produk di dalam keranjang
        cart.forEach(item => {
            // Bersihkan string harga (hilangkan '$') untuk perhitungan matematika
            let priceNum = parseFloat(item.price.replace('$', ''));
            let itemTotal = priceNum * item.quantity;
            subtotal += itemTotal;

            // Render baris produk (Kiri)
            cartHTML += `
                <div class="cart-item-row cart-grid-layout">
                    <div class="item-info">
                        <div class="item-img-box">
                            <img src="${item.image}" alt="${item.title}">
                        </div>
                        <div class="item-details">
                            <h4>${item.title}</h4>
                            <p>${item.subtitle ? item.subtitle : ''} | Size: ${item.size}</p>
                        </div>
                    </div>
                    <div class="text-center item-qty">
                        ${item.quantity}
                    </div>
                    <div class="text-center item-price">
                        $${itemTotal.toFixed(2)}
                    </div>
                </div>
            `;

            // Render baris untuk Order Summary (Kanan)
            summaryHTML += `
                <div class="summary-item">
                    <span>${item.title}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            `;
        });

        // Masukkan HTML yang sudah dibuat ke halaman
        cartItemsList.innerHTML = cartHTML;
        summaryItemsList.innerHTML = summaryHTML;
        
        // Update Subtotal (menggunakan format 2 desimal)
        summarySubtotal.innerText = `$${subtotal.toFixed(2)}`;
    }

    // ==========================================
    // 5. LOGIKA HALAMAN PEMBAYARAN (PAYMENT/CHECKOUT)
    // ==========================================
    if (window.location.pathname.includes('payment.html')) {
        // Ambil data keranjang dari Local Storage
        let cart = JSON.parse(localStorage.getItem('caps_cart')) || [];
        
        // Variabel untuk menghitung
        let subtotal = 0;
        const postage = 8.00;
        const handling = 2.00;

        // Hitung Subtotal berdasarkan isi keranjang
        cart.forEach(item => {
            let priceNum = parseFloat(item.price.replace('$', ''));
            subtotal += (priceNum * item.quantity);
        });

        // Hitung Total Keseluruhan
        const total = subtotal + postage + handling;

        // Update teks harga di HTML
        document.getElementById('checkout-subtotal').innerText = `$${subtotal.toFixed(2)}`;
        
        // Jika keranjang kosong, set total ke 0 agar biaya tambahan tidak dihitung sembarangan
        if (cart.length === 0) {
            document.getElementById('checkout-total').innerText = `$0.00`;
        } else {
            document.getElementById('checkout-total').innerText = `$${total.toFixed(2)}`;
        }

        // Logika Pilih Bank (Active class)
        const bankBtns = document.querySelectorAll('.bank-btn');
        bankBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Hapus efek aktif dari semua bank
                bankBtns.forEach(b => b.classList.remove('active'));
                // Tambahkan ke yang diklik
                btn.classList.add('active');
            });
        });

        // Logika Tombol Checkout ke Order Confirmation
        const btnProcess = document.getElementById('btn-process-checkout');
        if (btnProcess) {
            btnProcess.addEventListener('click', () => {
                const name = document.getElementById('rec-name').value;
                const contact = document.getElementById('rec-contact').value;
                const address = document.getElementById('rec-address').value;

                // Validasi: Pastikan form diisi
                if (name === "" || contact === "" || address === "") {
                    alert("Mohon lengkapi data penerima (Nama, Kontak, dan Alamat) terlebih dahulu!");
                    return;
                }

                // Validasi: Pastikan keranjang tidak kosong
                if (cart.length === 0) {
                    alert("Keranjang Anda kosong, tidak ada yang bisa di-checkout!");
                    return;
                }

                // 1. Buat objek data pesanan untuk dipindah ke halaman konfirmasi
                const latestOrder = {
                    items: cart,
                    summary: {
                        subtotal: subtotal,
                        postage: postage,
                        handling: handling,
                        total: total
                    },
                    shipping: {
                        name: name,
                        address: address
                    }
                };
                
                // 2. Simpan di sessionStorage sementara
                sessionStorage.setItem('last_caps_order', JSON.stringify(latestOrder));
                
                // 3. Kosongkan keranjang di localStorage utama
                localStorage.removeItem('caps_cart');
                
                // 4. Pindahkan user ke halaman konfirmasi MANTAP Anda
                window.location.href = 'order-confirmation.html';
            });
        }
    }

    // ==========================================
    // 6. LOGIKA HALAMAN KONFIRMASI (ORDER CONFIRMATION)
    // ==========================================
    if (window.location.pathname.includes('order-confirmation.html')) {
        const confItemsList = document.getElementById('confirmation-items-list');
        const confSubtotal = document.getElementById('conf-subtotal');
        const confTotal = document.getElementById('conf-total');

        // Ambil data pesanan terakhir dari session storage
        const latestOrder = JSON.parse(sessionStorage.getItem('last_caps_order'));

        // Jika tidak ada data pesanan (misalnya user me-refresh atau langsung ketik URL)
        if (!latestOrder) {
            confItemsList.innerHTML = `
                <div style="text-align: center; padding: 20px; color: gray;">
                    Detail pesanan tidak ditemukan. Silakan berbelanja kembali.
                </div>
            `;
            return;
        }

        let itemsHTML = '';

        // Looping setiap produk di dalam pesanan terakhir
        latestOrder.items.forEach((item, index) => {
            // Hitung harga total produk (price * qty)
            let priceNum = parseFloat(item.price.replace('$', ''));
            let itemTotal = priceNum * item.quantity;

            // Render baris produk oranye sesuai desain Anda
            itemsHTML += `
                <div class="conf-item-row">
                    <div class="conf-item-info">
                        <div class="conf-item-img-box">
                            <img src="${item.image}" alt="${item.title}">
                        </div>
                        <div class="conf-item-details">
                            <h4>${item.title}</h4>
                            <p>${item.subtitle ? item.subtitle : '39THIRTY Stretch Fit'}</p> 
                        </div>
                    </div>
                    <div class="conf-item-price">
                        $${itemTotal.toFixed(2)}
                    </div>
                </div>
            `;

            // Tambahkan garis pembatas abu-abu di antara produk (kecuali produk terakhir)
            if (index < latestOrder.items.length - 1) {
                itemsHTML += `<hr class="conf-divider">`;
            }
        });

        // Masukkan HTML yang sudah dibuat ke halaman
        confItemsList.innerHTML = itemsHTML;
        
        // Update Summary Harga
        if (confSubtotal) confSubtotal.innerText = `$${latestOrder.summary.subtotal.toFixed(2)}`;
        if (confTotal) confTotal.innerText = `$${latestOrder.summary.total.toFixed(2)}`;

        // Hapus data session storage agar tidak numpuk (opsional)
        // sessionStorage.removeItem('last_caps_order'); 
    }
});