/* ==========================================
   CHRONICA - Jurnalistik SMAN 3 Banjarbaru
   Core Scripting - FULL INTEGRATED VERSION (FIXED)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. LOGIKA PRELOADER (DENGAN JEDA TAMBAHAN) ---
    const loader = document.getElementById('loader-wrapper');
    
    if (loader) {
        const removeLoader = () => {
            // Cek agar fungsi hanya berjalan jika class fade-out belum ada
            if (!loader.classList.contains('fade-out')) {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800); // Harus sama dengan durasi transition di CSS
            }
        };

        // Menunggu halaman selesai dimuat sepenuhnya
        window.addEventListener('load', () => {
            // Menambah jeda 2000ms (2 detik) sebelum loader menghilang
            // Kamu bisa mengganti angka 2000 sesuai keinginan (misal: 3000 untuk 3 detik)
            setTimeout(removeLoader, 2000); 
        });

        // Failsafe: Jika halaman sangat berat, loader akan dipaksa hilang setelah 5 detik
        setTimeout(removeLoader, 5000); 
    }

    // --- 1. LOGIKA NAVIGASI HAMBURGER ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active'); 
            hamburger.classList.toggle('is-active');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active'); 
                hamburger.classList.remove('is-active');
            }
        });

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active'); 
                hamburger.classList.remove('is-active');
            });
        });
    }

    // --- 2. LOGIKA TOGGLE ANGGOTA DIVISI ---
    const toggleButtons = document.querySelectorAll('.toggle-btn, .toggle-anggota');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const list = this.nextElementSibling; 
            if (!list) return; 

            list.classList.toggle('active');
            const isShowing = list.classList.contains('active');
            
            if (isShowing) {
                list.style.display = 'block';
                list.style.maxHeight = '1000px'; 
                this.textContent = 'Sembunyikan Anggota';
                this.style.backgroundColor = '#C0C0C0';
                this.style.color = '#000000';
                this.style.borderColor = '#600000';
            } else {
                list.style.display = 'none';
                list.style.maxHeight = '0';
                this.textContent = 'Lihat Anggota';
                this.style.backgroundColor = '#600000';
                this.style.color = '#ffffff';
                this.style.borderColor = '#C0C0C0';
            }
        });
    });

    // --- 3. LOGIKA SLIDER KEGIATAN ---
    const wrapper = document.getElementById('slider-wrapper');
    const slides = document.querySelectorAll('.slider-item');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (wrapper && slides.length > 0) {
        let index = 0;
        const total = slides.length;
        
        const updateSlider = () => {
            wrapper.style.transform = `translateX(${-index * 100}%)`;
        };
        
        const nextSlide = () => {
            index = (index + 1) % total;
            updateSlider();
        };
        
        const prevSlide = () => {
            index = (index - 1 + total) % total;
            updateSlider();
        };

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

        let autoSlideInterval = setInterval(nextSlide, 5000);
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
    }

    // --- 4. LOGIKA FAQ ACCORDION ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.onclick = function(e) {
            e.preventDefault(); 
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Menutup semua item lain sebelum membuka yang baru
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const ans = item.querySelector('.faq-answer');
                if (ans) {
                    ans.style.display = 'none';
                }
            });
            
            // Jika item yang diklik tidak aktif, aktifkan
            if (!isActive) {
                faqItem.classList.add('active');
                const ans = faqItem.querySelector('.faq-answer');
                if (ans) ans.style.display = 'block';
            }
        };
    });
});

/* ==========================================
   SCRIPT JAM & TANGGAL REAL-TIME (INDONESIA)
   ========================================== */
function updateClock() {
    const now = new Date();
    
    // 1. Format Hari & Tanggal (Contoh: Senin, 25 Oktober 2025)
    const optionsDate = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('id-ID', optionsDate);
    
    // 2. Format Jam (Contoh: 14:30:05)
    // Menggunakan 'en-GB' agar formatnya 24 jam (HH:MM:SS) tapi tetap bersih
    const formattedTime = now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });

    // 3. Masukkan ke HTML
    const dateElement = document.getElementById('clock-day-date');
    const timeElement = document.getElementById('clock-time');

    if (dateElement && timeElement) {
        dateElement.textContent = formattedDate;
        // Tambahkan 'WITA' secara manual jika target audiens adalah SMAN 3 Banjarbaru
        timeElement.textContent = formattedTime + " WITA"; 
    }
}

// Jalankan fungsi setiap 1 detik (1000ms)
setInterval(updateClock, 1000);

// Jalankan sekali saat halaman pertama kali dimuat agar tidak ada delay 1 detik
updateClock();
