document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const tabContents = document.querySelectorAll(".tab-content");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            // 1. Hapus status aktif dari semua tombol navigasi
            navItems.forEach(nav => nav.classList.remove("active"));
            
            // 2. Tambahkan status aktif ke tombol yang diklik
            item.classList.add("active");

            // 3. Sembunyikan semua konten seksi terlebih dahulu
            tabContents.forEach(content => {
                content.classList.remove("active");
                content.classList.add("hidden");
            });

            // 4. Tampilkan konten seksi yang sesuai dengan data-tab target
            const targetTabId = item.getAttribute("data-tab");
            const targetTabContent = document.getElementById(targetTabId);
            
            if (targetTabContent) {
                targetTabContent.classList.remove("hidden");
                targetTabContent.classList.add("active");
            }
        });
    });
});
