document.addEventListener("DOMContentLoaded", () => {
    // === 1. LOGIKA UTAMA PERPINDAHAN TAB ===
    const navItems = document.querySelectorAll(".nav-item");
    const tabContents = document.querySelectorAll(".tab-content");

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

    // === 2. INTERAKSI TOMBOL FILTER KATEGORI KAPSUL ===
    const categoryPills = document.querySelectorAll(".category-pill");
    categoryPills.forEach(pill => {
        pill.addEventListener("click", () => {
            categoryPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
        });
    });

    // === 3. PERSISTENSI POIN SAAT WEBSITE PERTAMA KALI DIBUKA ===
    let poinAwal = localStorage.getItem('poinChronica') ? parseInt(localStorage.getItem('poinChronica')) : 120;
    document.getElementById('display-poin').innerText = poinAwal + " Poin";
});

// === 4. FUNGSI HADIAH SKRIP POIN (GAMIFIKASI) ===
function tambahPoin() {
    let poinSekarang = localStorage.getItem('poinChronica') ? parseInt(localStorage.getItem('poinChronica')) : 120;
    poinSekarang += 10;
    
    // Simpan ke storage lokal browser
    localStorage.setItem('poinChronica', poinSekarang);
    
    // Perbarui angka di UI langsung
    document.getElementById('display-poin').innerText = poinSekarang + " Poin";
    
    alert("🎉 Selamat! Kamu membaca artikel dan berhasil mendapatkan +10 Poin Chronica.");
}
// ISI DENGAN KONFIGURASI DARI FIREBASE CONSOLE KAMU
const firebaseConfig = {
    apiKey: "AIzaSyA1...",
    authDomain: "chronica-web.firebaseapp.com",
    projectId: "chronica-web",
    storageBucket: "chronica-web.appspot.com",
    messagingSenderId: "12345678",
    appId: "1:123456:web:abcd"
};

// Hubungkan ke layanan Firebase & Google Provider via modul CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM Elements
const loggedOutDiv = document.getElementById("auth-logged-out");
const loggedInDiv = document.getElementById("auth-logged-in");
const btnLogin = document.getElementById("btn-login-google");
const btnLogout = document.getElementById("btn-logout");

// 1. Aksi Tombol Login Google
btnLogin.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Berhasil Login:", result.user);
        }).catch((error) => {
            console.error("Gagal Login:", error);
        });
});

// 2. Aksi Tombol Keluar (Logout)
btnLogout.addEventListener("click", () => {
    signOut(auth);
});

// 3. Memantau Status Pengguna (Apakah sedang login atau tidak)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Jika Pengguna Terdeteksi Login:
        loggedOutDiv.classList.add("hidden");
        loggedInDiv.classList.remove("hidden");
        
        // Pasang data Google ke UI Website
        document.getElementById("user-name").innerText = user.displayName;
        document.getElementById("user-email").innerText = user.email;
        document.getElementById("user-photo").src = user.photoURL;
        
        // Mengubah text greeting di BERANDA sesuai nama Google user
        document.querySelector(".greeting").innerText = `Halo, ${user.displayName.split(' ')[0]}! 👋`;
    } else {
        // Jika Pengguna Logout / Belum Login:
        loggedOutDiv.classList.remove("hidden");
        loggedInDiv.classList.add("hidden");
        
        // Kembalikan text greeting beranda ke semula
        document.querySelector(".greeting").innerText = "Halo, Pembaca Setia!";
    }
});
