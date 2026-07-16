// =========================================================================
// 1. ATURAN MUTLAK: PERNYATAAN IMPORT HARUS DI BARIS PALING ATAS
// =========================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// =========================================================================
// 2. KODE CONFIG FIREBASE ASLI KAMU SUDAH DI MASUKKAN DI SINI
// =========================================================================
const firebaseConfig = {
    apiKey: "AIzaSyAtxY-hL14W2s_5_R3YfEshyl5q6wz4WeQ",
    authDomain: "chronica-web.firebaseapp.com",
    projectId: "chronica-web",
    storageBucket: "chronica-web.firebasestorage.app",
    messagingSenderId: "733301248448",
    appId: "1:733301248448:web:f113e92a822b2e018c7825",
    measurementId: "G-5XTQ5Y9L21"
};

// Inisialisasi Firebase & Google Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// =========================================================================
// 3. LOGIKA UTAMA YANG BERJALAN SETELAH HTML SELESAI DIMUAT (DOM READY)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Elemen Navigasi & Tab ---
    const navItems = document.querySelectorAll(".nav-item");
    const tabContents = document.querySelectorAll(".tab-content");
    const categoryPills = document.querySelectorAll(".category-pill");

    // --- Elemen Autentikasi/Login ---
    const loggedOutDiv = document.getElementById("auth-logged-out");
    const loggedInDiv = document.getElementById("auth-logged-in");
    const btnLogin = document.getElementById("btn-login-google");
    const btnLogout = document.getElementById("btn-logout");

    // A. LOGIKA PERPINDAHAN TAB MENU BAWAH
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");

            tabContents.forEach(content => {
                content.classList.remove("active");
                content.classList.add("hidden");
            });

            const targetTabId = item.getAttribute("data-tab");
            const targetTabContent = document.getElementById(targetTabId);
            
            if (targetTabContent) {
                targetTabContent.classList.remove("hidden");
                targetTabContent.classList.add("active");
            }
        });
    });

    // B. LOGIKA FILTER KATEGORI KAPSUL
    categoryPills.forEach(pill => {
        pill.addEventListener("click", () => {
            categoryPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
        });
    });

    // C. LOAD POIN PERTAMA KALI SAAT WEB DIBUKA
    let poinAwal = localStorage.getItem('poinChronica') ? parseInt(localStorage.getItem('poinChronica')) : 120;
    updatePoinUI(poinAwal);

    // D. EVENT BINDING: AKSI TOMBOL LOGIN GOOGLE
    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    console.log("Berhasil Login:", result.user);
                }).catch((error) => {
                    console.error("Gagal Login:", error);
                    alert("Gagal terhubung ke Google. Silakan coba lagi.");
                });
        });
    }

    // E. EVENT BINDING: AKSI TOMBOL LOGOUT
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            signOut(auth);
        });
    }

    // F. MONITOR STATUS LOGIN PENGGUNA secara Real-time
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Jika Pengguna Terdeteksi Login:
            if (loggedOutDiv) loggedOutDiv.classList.add("hidden");
            if (loggedInDiv) loggedInDiv.classList.remove("hidden");
            
            // Pasang data Google ke UI Website
            document.getElementById("user-name").innerText = user.displayName;
            document.getElementById("user-email").innerText = user.email;
            document.getElementById("user-photo").src = user.photoURL;
            
            // Mengubah text greeting di BERANDA sesuai nama panggilan Google user
            document.querySelector(".greeting").innerText = `Halo, ${user.displayName.split(' ')[0]}! 👋`;
        } else {
            // Jika Pengguna Logout / Belum Login:
            if (loggedOutDiv) loggedOutDiv.classList.remove("hidden");
            if (loggedInDiv) loggedInDiv.classList.add("hidden");
            
            // Kembalikan text greeting beranda ke semula
            document.querySelector(".greeting").innerText = "Halo, Pembaca Setia!";
        }
    });
});

// =========================================================================
// 4. FUNGSI PENDUKUNG
// =========================================================================

// Fungsi menambah poin saat artikel diklik
function tambahPoin() {
    let poinSekarang = localStorage.getItem('poinChronica') ? parseInt(localStorage.getItem('poinChronica')) : 120;
    poinSekarang += 10;
    
    // Simpan ke storage lokal browser
    localStorage.setItem('poinChronica', poinSekarang);
    
    // Perbarui angka di semua halaman UI langsung
    updatePoinUI(poinSekarang);
    
    alert("🎉 Selamat! Kamu membaca artikel dan berhasil mendapatkan +10 Poin Chronica.");
}

// Fungsi pembantu memperbarui text poin di Beranda dan Profil sekaligus
function updatePoinUI(nilaiPoin) {
    const elPoinBeranda = document.getElementById('display-poin');
    const elPoinProfil = document.getElementById('profile-poin');
    
    if (elPoinBeranda) elPoinBeranda.innerText = nilaiPoin + " Poin";
    if (elPoinProfil) elPoinProfil.innerText = nilaiPoin + " Poin";
}

// EXPOSE GLOBAL ACCESS: Membuka kunci fungsi agar bisa dibaca oleh onclick="..." di HTML
window.tambahPoin = tambahPoin;
