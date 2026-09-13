// IMPORT WAJIB DI BARIS PALING ATAS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
/* =========================================
   1. RUPO BASAMO (Live Translation)
   ========================================= */
const inputArea = document.getElementById('inputText');
const outputArea = document.getElementById('outputText');
const downloadBtn = document.getElementById('downloadBtn');

if (inputArea && outputArea) {
  inputArea.addEventListener('input', function() {
    outputArea.textContent = inputArea.value;
  });
}

if (downloadBtn && outputArea) {
  downloadBtn.addEventListener('click', function() {
    if (outputArea.textContent.trim() === "") {
      alert("Ketik sesuatu terlebih dahulu sebelum mengunduh!");
      return;
    }
    html2canvas(outputArea, { backgroundColor: "#E1EDF7", scale: 2 }).then(canvas => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = 'Aksara-Incung-SERAMBI.png';
      link.href = image;
      link.click();
    });
  });
}

/* =========================================
   2. JEJAK BASAMO (Image Carousel)
   ========================================= */
const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (track && nextBtn && prevBtn) {
  const scrollAmount = 374; 
  nextBtn.addEventListener('click', () => { track.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
  prevBtn.addEventListener('click', () => { track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
}

/* =========================================
   3. MOBILE NAVBAR TOGGLE (Hamburger Menu)
   ========================================= */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => { navMenu.classList.toggle('active-menu'); });
}

/* =========================================
   4. KONFIGURASI FIREBASE
   ========================================= */
const firebaseConfig = {
  apiKey: "AIzaSyC77RKmzmnk5SFhjyCG63qxwUA7yHEWEg",
  authDomain: "serambi-c8c21.firebaseapp.com",
  projectId: "serambi-c8c21",
  storageBucket: "serambi-c8c21.firebasestorage.app",
  messagingSenderId: "864848968670",
  appId: "1:864848968670:web:a445025c59cb7db924bb4f",
  measurementId: "G-B6F8JENLEN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* =========================================
   5. PESAN KANTI FORM SUBMISSION
   ========================================= */
const pesanForm = document.getElementById('pesanKantiForm');

if (pesanForm) {
  pesanForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const namaPengirim = document.getElementById('namaInput').value;
    const asalInstansi = document.getElementById('instansiInput').value;
    const isiPesan = document.getElementById('pesanInput').value;

    try {
      await addDoc(collection(db, "pesan-kanti"), {
        nama: namaPengirim,
        instansi: asalInstansi,
        pesan: isiPesan,
        waktu: new Date()
      });
      alert("Pesan dan Asal Instansi berhasil dikirim ke database!");
      pesanForm.reset(); 
    } catch (error) {
      console.error("Gagal mengirim pesan: ", error);
      alert("Terjadi kesalahan, pesan gagal dikirim.");
    }
  });
}

/* =========================================
   6. TAMPILKAN DATA DARI FIREBASE (KEEP NOTES)
   ========================================= */
const notesContainer = document.getElementById('notesContainer');

if (notesContainer) {
  // Membuat urutan pengambilan data dari waktu yang paling baru (descending)
  const q = query(collection(db, "pesan-kanti"), orderBy("waktu", "desc"));

  // onSnapshot akan mendengarkan perubahan data secara real-time
  onSnapshot(q, (snapshot) => {
    notesContainer.innerHTML = ''; // Kosongkan kontainer sebelum diisi ulang
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      
      // Template HTML berbentuk kartu untuk setiap pesan
      const noteHTML = `
        <div class="testimonial-wrapper">
          <div class="speech-bubble">
            <p>"${data.pesan}"</p>
          </div>
          <div class="avatar-group">
            <div class="avatar-info">
              <h4>${data.nama}</h4>
              <span>${data.instansi || 'Pengguna SERAMBI'}</span>
            </div>
          </div>
        </div>
      `;
      // Cetak kartu ke dalam layar
      notesContainer.innerHTML += noteHTML;
    });
  });
}

/* =========================================
   7. HALAMAN DETAIL AKSARA (DINAMIS)
   ========================================= */
// Database informasi aksara
const dataAksara = {
  "ka": {
    nama: "Ka",
    aksara: "k", // Ketikan di font incung.ttf yang menghasilkan huruf 'Ka'
    audio: "audio/ka.MP3", // Pastikan kamu menyiapkan file audio ini di folder 'audio'
    diakritik: [
      { vokal: "a", hasil: "k", romaji: "ka" },
      { vokal: "i", hasil: "ki/kL/ki", romaji: "ki" },
      { vokal: "u", hasil: "ku", romaji: "ku" },
      { vokal: "e", hasil: "ke", romaji: "ke" },
      { vokal: "o", hasil: "ko", romaji: "ko" },
      { vokal: "mati", hasil: "kx/kX", romaji: "k" }, 
      { vokal: "ng", hasil: "kM", romaji: "kang" },
      { vokal: "ah", hasil: "kH", romaji: "kah" },
      { vokal: "ih", hasil: "kHi", romaji: "kih" }
    ],
    contoh: [
      { incung: "kLpMe", latin: "Kipeng", arti: "Uang" },
      { incung: "klu", latin: "Kalu", arti: "Kalau" }
    ]
  },
  "ga": {
    nama: "Ga", aksara: "g", audio: "audio/ga.MP3",
    diakritik: [
      { vokal: "a", hasil: "g", romaji: "ga" },
      { vokal: "i", hasil: "gi/gL/gl", romaji: "gi" },
      { vokal: "u", hasil: "gu", romaji: "gu" },
      { vokal: "e", hasil: "ge", romaji: "ge" },
      { vokal: "o", hasil: "go", romaji: "go" },
      { vokal: "mati", hasil: "gx/gX", romaji: "g" },
      { vokal: "ang", hasil: "gM", romaji: "gang" },
      { vokal: "ah", hasil: "gH", romaji: "gah" },
      { vokal: "ih", hasil: "gHi", romaji: "gih" }
    ],
    contoh: [
      { incung: "guDrX", latin: "Gundar", arti: "Sikat" },
      { incung: "gLlLnX", latin: "Gilin", arti: "Roda" }
    ]
  },
  "nga": {
    nama: "Nga", aksara: "N", audio: "audio/nga.MP3",
    diakritik: [
      { vokal: "a", hasil: "N", romaji: "nga" },
      { vokal: "i", hasil: "Ni/NL/Nl", romaji: "ngi" },
      { vokal: "u", hasil: "Nu", romaji: "ngu" },
      { vokal: "e", hasil: "Ne", romaji: "nge" },
      { vokal: "o", hasil: "No", romaji: "ngo" },
      { vokal: "mati", hasil: "Nx/NX", romaji: "ng" },
      { vokal: "ang", hasil: "NM", romaji: "ngang" },
      { vokal: "ah", hasil: "NH", romaji: "ngah" },
      { vokal: "ih", hasil: "NHi", romaji: "ngih" }
    ],
    contoh: [
      { incung: "Ncwu", latin: "Ngacau", arti: "Ganggu" },
      { incung: "NLGuM", latin: "Nginggung", arti: "Oleng" }
    ]
  },
  "ta": {
    nama: "Ta", aksara: "t", audio: "audio/ta.MP3",
    diakritik: [
      { vokal: "a", hasil: "t", romaji: "ta" },
      { vokal: "i", hasil: "ti/tL/tl", romaji: "ti" },
      { vokal: "u", hasil: "tu", romaji: "tu" },
      { vokal: "e", hasil: "te", romaji: "te" },
      { vokal: "o", hasil: "to", romaji: "to" },
      { vokal: "mati", hasil: "tx/tX", romaji: "t" },
      { vokal: "ang", hasil: "tM", romaji: "tang" },
      { vokal: "ah", hasil: "tH", romaji: "tah" },
      { vokal: "ih", hasil: "tHi", romaji: "tih" }
    ],
    contoh: [
      { incung: "tTLkX", latin: "Tantik", arti: "Tunggu" },
      { incung: "tuluM", latin: "Tulung", arti: "Tolong" }
    ]
  },
  "da": {
    nama: "Da", aksara: "d", audio: "audio/da.MP3",
    diakritik: [
      { vokal: "a", hasil: "d", romaji: "da" },
      { vokal: "i", hasil: "di/dL/dl", romaji: "di" },
      { vokal: "u", hasil: "du", romaji: "du" },
      { vokal: "e", hasil: "de", romaji: "de" },
      { vokal: "o", hasil: "do", romaji: "do" },
      { vokal: "mati", hasil: "dx/dX", romaji: "d" },
      { vokal: "ang", hasil: "dM", romaji: "dang" },
      { vokal: "ah", hasil: "dH", romaji: "dah" },
      { vokal: "ih", hasil: "dHi", romaji: "dih" }
    ],
    contoh: [
      { incung: "pdLye", latin: "Padie", arti: "Sepupu" },
      { incung: "dLNnX", latin: "Dingan", arti: "Dengan" }
    ]
  },

  // ================= ROW 2 =================
  "na": {
    nama: "Na", aksara: "n", audio: "audio/na.MP3",
    diakritik: [
      { vokal: "a", hasil: "n", romaji: "na" },
      { vokal: "i", hasil: "ni/nL/nl", romaji: "ni" },
      { vokal: "u", hasil: "nu", romaji: "nu" },
      { vokal: "e", hasil: "ne", romaji: "ne" },
      { vokal: "o", hasil: "no", romaji: "no" },
      { vokal: "mati", hasil: "nx/nX", romaji: "n" },
      { vokal: "ang", hasil: "nM", romaji: "nang" },
      { vokal: "ah", hasil: "nH", romaji: "nah" },
      { vokal: "ih", hasil: "nHi", romaji: "nih" }
    ],
    contoh: [
      { incung: "nlkX", latin: "Nalak", arti: "Mencari" },
      { incung: "nujH", latin: "Nujah", arti: "Tusuk" }
    ]
  },
  "pa": {
    nama: "Pa", aksara: "p", audio: "audio/pa.MP3",
    diakritik: [
      { vokal: "a", hasil: "p", romaji: "pa" },
      { vokal: "i", hasil: "pi/pL/pl", romaji: "pi" },
      { vokal: "u", hasil: "pu", romaji: "pu" },
      { vokal: "e", hasil: "pe", romaji: "pe" },
      { vokal: "o", hasil: "po", romaji: "po" },
      { vokal: "mati", hasil: "px/pX", romaji: "p" },
      { vokal: "ang", hasil: "pM", romaji: "pang" },
      { vokal: "ah", hasil: "pH", romaji: "pah" },
      { vokal: "ih", hasil: "pHi", romaji: "pih" }
    ],
    contoh: [
      { incung: "pmlL", latin: "Pamali", arti: "Kembalian" },
      { incung: "pLyo", latin: "Pio", arti: "Kenapa" }
    ]
  },
  "ba": {
    nama: "Ba", aksara: "b", audio: "audio/ba.MP3",
    diakritik: [
      { vokal: "a", hasil: "b", romaji: "ba" },
      { vokal: "i", hasil: "bi/bL/bl", romaji: "bi" },
      { vokal: "u", hasil: "bu", romaji: "bu" },
      { vokal: "e", hasil: "be", romaji: "be" },
      { vokal: "o", hasil: "bo", romaji: "bo" },
      { vokal: "mati", hasil: "bx/bX", romaji: "b" },
      { vokal: "ang", hasil: "bM", romaji: "bang" },
      { vokal: "ah", hasil: "bH", romaji: "bah" },
      { vokal: "ih", hasil: "bHi", romaji: "bih" }
    ],
    contoh: [
      { incung: "bLnL", latin: "Bini", arti: "Istri" },
      { incung: "budkX", latin: "Budak", arti: "Anak" }
    ]
  },
  "ma": {
    nama: "Ma", aksara: "m", audio: "audio/ma.MP3",
    diakritik: [
      { vokal: "a", hasil: "m", romaji: "ma" },
      { vokal: "i", hasil: "mi/mL/ml", romaji: "mi" },
      { vokal: "u", hasil: "mu", romaji: "mu" },
      { vokal: "e", hasil: "me", romaji: "me" },
      { vokal: "o", hasil: "mo", romaji: "mo" },
      { vokal: "mati", hasil: "mx/mX", romaji: "m" },
      { vokal: "ang", hasil: "mM", romaji: "mang" },
      { vokal: "ah", hasil: "mH", romaji: "mah" },
      { vokal: "ih", hasil: "mHi", romaji: "mih" }
    ],
    contoh: [
      { incung: "maHi", latin: "Maih", arti: "Mari" },
      { incung: "meNHi", latin: "Mengih", arti: "Marah" }
    ]
  },
  "ca": {
    nama: "Ca", aksara: "c", audio: "audio/ca.MP3",
    diakritik: [
      { vokal: "a", hasil: "c/Q", romaji: "ca" },
      { vokal: "i", hasil: "ci/cL/cl", romaji: "ci" },
      { vokal: "u", hasil: "cu", romaji: "cu" },
      { vokal: "e", hasil: "ce", romaji: "ce" },
      { vokal: "o", hasil: "co", romaji: "co" },
      { vokal: "mati", hasil: "cx/cX", romaji: "c" },
      { vokal: "ang", hasil: "cM", romaji: "cang" },
      { vokal: "ah", hasil: "cH", romaji: "cah" },
      { vokal: "ih", hasil: "cHi", romaji: "cih" }
    ],
    contoh: [
      { incung: "cgLnX", latin: "Cagin", arti: "Nanti" },
      { incung: "cucuM", latin: "Cucung", arti: "Cucu" }
    ]
  },
  // ================= ROW 3 =================
  "ja": {
    nama: "Ja", aksara: "j", audio: "audio/ja.MP3",
    diakritik: [
      { vokal: "a", hasil: "j", romaji: "ja" },
      { vokal: "i", hasil: "ji/jL/jl", romaji: "ji" },
      { vokal: "u", hasil: "ju", romaji: "ju" },
      { vokal: "e", hasil: "je", romaji: "je" },
      { vokal: "o", hasil: "jo", romaji: "jo" },
      { vokal: "mati", hasil: "jx/jX", romaji: "j" },
      { vokal: "ang", hasil: "jM", romaji: "jang" },
      { vokal: "ah", hasil: "jH", romaji: "jah" },
      { vokal: "ih", hasil: "jHi", romaji: "jih" }
    ],
    contoh: [
      { incung: "jLlenX", latin: "Jilen", arti: "Jilat" },
      { incung: "jerLM", latin: "Jering", arti: "Jengkol" }
    ]
  },
  "nya": {
    nama: "Nya", aksara: "Y", audio: "audio/nya.MP3",
    diakritik: [
      { vokal: "a", hasil: "Y", romaji: "nya" },
      { vokal: "i", hasil: "Yi/YL/Yl", romaji: "nyi" },
      { vokal: "u", hasil: "Yu", romaji: "nyu" },
      { vokal: "e", hasil: "Ye", romaji: "nye" },
      { vokal: "o", hasil: "Yo", romaji: "nyo" },
      { vokal: "mati", hasil: "Yx/YX", romaji: "ny" },
      { vokal: "ang", hasil: "YM", romaji: "nyang" },
      { vokal: "ah", hasil: "YH", romaji: "nyah" },
      { vokal: "ih", hasil: "YHi", romaji: "nyih" }
    ],
    contoh: [
      { incung: "aLyoYnX", latin: "Iyonyan", arti: "Pasti" },
      { incung: "YuhuH", latin: "Nyuhuh", arti: "Menyuruh" }
    ]
  },
  "sa": {
    nama: "Sa", aksara: "s", audio: "audio/sa.MP3",
    diakritik: [
      { vokal: "a", hasil: "s", romaji: "sa" },
      { vokal: "i", hasil: "si/sL/sl", romaji: "si" },
      { vokal: "u", hasil: "su", romaji: "su" },
      { vokal: "e", hasil: "se", romaji: "se" },
      { vokal: "o", hasil: "so", romaji: "so" },
      { vokal: "mati", hasil: "sx/sX", romaji: "s" },
      { vokal: "ang", hasil: "sM", romaji: "sang" },
      { vokal: "ah", hasil: "sH", romaji: "sah" },
      { vokal: "ih", hasil: "sHi", romaji: "sih" }
    ],
    contoh: [
      { incung: "subM", latin: "Subang", arti: "Anting" },
      { incung: "sLNemX", latin: "Singem", arti: "Jendela" }
    ]
  },

  "ra": {
    nama: "Ra", aksara: "r", audio: "audio/ra.MP3",
    diakritik: [
      { vokal: "a", hasil: "r/R", romaji: "ra" },
      { vokal: "i", hasil: "ri/rL/rI", romaji: "ri" },
      { vokal: "u", hasil: "ru", romaji: "ru" },
      { vokal: "e", hasil: "re", romaji: "re" },
      { vokal: "o", hasil: "ro", romaji: "ro" },
      { vokal: "mati", hasil: "rx/rX", romaji: "r" },
      { vokal: "ang", hasil: "rM", romaji: "rang" },
      { vokal: "ah", hasil: "rH", romaji: "rah" },
      { vokal: "ih", hasil: "rHi", romaji: "rih" }
    ],
    contoh: [
      { incung: "tXkorX", latin: "Tkor", arti: "Rugi" },
      { incung: "sirg", latin: "Siraga", arti: "Saudagar" }
    ]
  },

  "la": {
    nama: "La (Varian)", aksara: "l", audio: "audio/ra.MP3",
    diakritik: [
      { vokal: "a", hasil: "l", romaji: "la" },
      { vokal: "i", hasil: "li/lL/lI", romaji: "li" },
      { vokal: "u", hasil: "lu", romaji: "lu" },
      { vokal: "e", hasil: "le", romaji: "le" },
      { vokal: "o", hasil: "lo", romaji: "lo" },
      { vokal: "mati", hasil: "lx/lX", romaji: "l" },
      { vokal: "ang", hasil: "lM", romaji: "lang" },
      { vokal: "ah", hasil: "lH", romaji: "lah" },
      { vokal: "ih", hasil: "lHi", romaji: "lih" }
    ],
    contoh: [
      { incung: "klXpkX", latin: "Kalpak", arti: "Sayap" },
      { incung: "aLlukX", latin: "Iluk", arti: "Bagus" }
    ]
  },

  // ================= ROW 4 =================
  "wa": {
    nama: "Wa", aksara: "w", audio: "audio/wa.MP3",
    diakritik: [
      { vokal: "a", hasil: "w", romaji: "wa" },
      { vokal: "i", hasil: "wi/wL/wl", romaji: "wi" },
      { vokal: "u", hasil: "wu", romaji: "wu" },
      { vokal: "e", hasil: "we", romaji: "we" },
      { vokal: "o", hasil: "wo", romaji: "wo" },
      { vokal: "mati", hasil: "wx/wX", romaji: "w" },
      { vokal: "ang", hasil: "wM", romaji: "wang" },
      { vokal: "ah", hasil: "wH", romaji: "wah" },
      { vokal: "ih", hasil: "wHi", romaji: "wih" }
    ],
    contoh: [
      { incung: "auwo", latin: "Uwo", arti: "Kakak" },
      { incung: "suwyL", latin: "Suai", arti: "Sesuai" }
    ]
  },
  "ya": {
    nama: "Ya", aksara: "y", audio: "audio/ya.MP3",
    diakritik: [
      { vokal: "a", hasil: "y", romaji: "ya" },
      { vokal: "i", hasil: "yi/yL/yl", romaji: "yi" },
      { vokal: "u", hasil: "yu", romaji: "yu" },
      { vokal: "e", hasil: "ye", romaji: "ye" },
      { vokal: "o", hasil: "yo", romaji: "yo" },
      { vokal: "mati", hasil: "yx/yX", romaji: "y" },
      { vokal: "ang", hasil: "yM", romaji: "yang" },
      { vokal: "ah", hasil: "yH", romaji: "yah" },
      { vokal: "ih", hasil: "yHi", romaji: "yih" }
    ],
    contoh: [
      { incung: "kyo", latin: "Kayo", arti: "Kamu" }
    ]
  },
  "ha": {
    nama: "Ha", aksara: "h", audio: "audio/ha.MP3",
    diakritik: [
      { vokal: "a", hasil: "h", romaji: "ha" },
      { vokal: "i", hasil: "hi/hL/hl", romaji: "hi" },
      { vokal: "u", hasil: "hu", romaji: "hu" },
      { vokal: "e", hasil: "he", romaji: "he" },
      { vokal: "o", hasil: "ho", romaji: "ho" },
      { vokal: "mati", hasil: "hx/hX", romaji: "h" },
      { vokal: "ang", hasil: "hM", romaji: "hang" },
      { vokal: "ah", hasil: "hH", romaji: "hah" },
      { vokal: "ih", hasil: "hHi", romaji: "hih" }
    ],
    contoh: [
      { incung: "uhM", latin: "Uhang", arti: "Orang" },
      { incung: "buhukX", latin: "Buhuk", arti: "Burung" }
    ]
  },
  "a": {
    nama: "A", aksara: "a", audio: "audio/a.MP3",
    diakritik: [
      { vokal: "a", hasil: "a", romaji: "a" },
      { vokal: "i", hasil: "ai/aL/aI", romaji: "i" },
      { vokal: "u", hasil: "au", romaji: "u" },
      { vokal: "e", hasil: "ae", romaji: "e" },
      { vokal: "o", hasil: "ao", romaji: "o" },
      { vokal: "ang", hasil: "aM", romaji: "ang" },
      { vokal: "ah", hasil: "aH", romaji: "ah" },
      { vokal: "ih", hasil: "aHi", romaji: "ih" }
    ],
    contoh: [
      { incung: "abHi", latin: "Abih", arti: "Habis" },
      { incung: "ademx", latin: "Adem", arti: "Hadap" }
    ]
  },
  "mba": {
    nama: "Mba", aksara: "B", audio: "audio/mba.MP3",
    diakritik: [
      { vokal: "a", hasil: "B", romaji: "mba" },
      { vokal: "i", hasil: "Bi/BL/Bl", romaji: "mbi" },
      { vokal: "u", hasil: "Bu", romaji: "mbu" },
      { vokal: "e", hasil: "Be", romaji: "mbe" },
      { vokal: "o", hasil: "Bo", romaji: "mbo" },
      { vokal: "mati", hasil: "Bx/BX", romaji: "mb" },
      { vokal: "ang", hasil: "BM", romaji: "mbang" },
      { vokal: "ah", hasil: "BH", romaji: "mbah" },
      { vokal: "ih", hasil: "BHi", romaji: "mbih" }
    ],
    contoh: [
      { incung: "aB", latin: "Amba", arti: "Hambar" },
      { incung: "aBu", latin: "Ambu", arti: "Hambur" }
    ]
  },

  // ================= ROW 5 =================
  "ngga": {
    nama: "Ngga", aksara: "G", audio: "audio/ngga.MP3",
    diakritik: [
      { vokal: "a", hasil: "G", romaji: "ngga" },
      { vokal: "i", hasil: "Gi/GL/Gl", romaji: "nggi" },
      { vokal: "u", hasil: "Gu", romaji: "nggu" },
      { vokal: "e", hasil: "Ge", romaji: "ngge" },
      { vokal: "o", hasil: "Go", romaji: "nggo" },
      { vokal: "mati", hasil: "Gx/GX", romaji: "ngg" },
      { vokal: "ang", hasil: "GM", romaji: "nggang" },
      { vokal: "ah", hasil: "GH", romaji: "nggah" },
      { vokal: "ih", hasil: "GHi", romaji: "nggih" }
    ],
    contoh: [
      { incung: "tLGL", latin: "Tinggi", arti: "Tinggi" },
    ]
  },
  "nda": {
    nama: "Nda", aksara: "D", audio: "audio/nda.MP3",
    diakritik: [
      { vokal: "a", hasil: "D", romaji: "nda" },
      { vokal: "i", hasil: "Di/DL/Dl", romaji: "ndi" },
      { vokal: "u", hasil: "Du", romaji: "ndu" },
      { vokal: "e", hasil: "De", romaji: "nde" },
      { vokal: "o", hasil: "Do", romaji: "ndo" },
      { vokal: "mati", hasil: "Dx/DX", romaji: "nd" },
      { vokal: "ang", hasil: "DM", romaji: "ndang" },
      { vokal: "ah", hasil: "DH", romaji: "ndah" },
      { vokal: "ih", hasil: "DHi", romaji: "ndih" }
    ],
    contoh: [
      { incung: "mDnX", latin: "Mandan", arti: "Sahabat" },
      { incung: "beDL", latin: "Bendi", arti: "Delman" }
    ]
  },
  "nja": {
    nama: "Nja", aksara: "J", audio: "audio/nja.MP3",
    diakritik: [
      { vokal: "a", hasil: "J", romaji: "nja" },
      { vokal: "i", hasil: "Ji/JL/Jl", romaji: "nji" },
      { vokal: "u", hasil: "Ju", romaji: "nju" },
      { vokal: "e", hasil: "Je", romaji: "nje" },
      { vokal: "o", hasil: "Jo", romaji: "njo" },
      { vokal: "mati", hasil: "Jx/JX", romaji: "nj" },
      { vokal: "ang", hasil: "JM", romaji: "njang" },
      { vokal: "ah", hasil: "JH", romaji: "njah" },
      { vokal: "ih", hasil: "JHi", romaji: "njih" }
    ],
    contoh: [
      { incung: "lJo", latin: "Lanjo", arti: "Uang Saku" }
    ]
  },
  "mpa": {
    nama: "Mpa", aksara: "P", audio: "audio/mpa.MP3",
    diakritik: [
      { vokal: "a", hasil: "P", romaji: "mpa" },
      { vokal: "i", hasil: "Pi/PL/Pl", romaji: "mpi" },
      { vokal: "u", hasil: "Pu", romaji: "mpu" },
      { vokal: "e", hasil: "Pe", romaji: "mpe" },
      { vokal: "o", hasil: "Po", romaji: "mpo" },
      { vokal: "mati", hasil: "Px/PX", romaji: "mp" },
      { vokal: "ang", hasil: "PM", romaji: "mpang" },
      { vokal: "ah", hasil: "PH", romaji: "mpah" },
      { vokal: "ih", hasil: "PHi", romaji: "mpih" }
    ],
    contoh: [
      { incung: "PunX", latin: "Mpun", arti: "Kamu" }
    ]
  },
  "ngka": {
    nama: "Ngka", aksara: "K", audio: "audio/ngka.MP3",
    diakritik: [
      { vokal: "a", hasil: "K", romaji: "ngka" },
      { vokal: "i", hasil: "Ki/KL/Kl", romaji: "ngki" },
      { vokal: "u", hasil: "Ku", romaji: "ngku" },
      { vokal: "e", hasil: "Ke", romaji: "ngke" },
      { vokal: "o", hasil: "Ko", romaji: "ngko" },
      { vokal: "mati", hasil: "Kx/KX", romaji: "ngk" },
      { vokal: "ang", hasil: "KM", romaji: "ngkang" },
      { vokal: "ah", hasil: "KH", romaji: "ngkah" },
      { vokal: "ih", hasil: "KHi", romaji: "ngkih" }
    ],
    contoh: [
      { incung: "jKL", latin: "Jangki", arti: "Bakul Gendong" }
    ]
  },

  // ================= ROW 6 =================
  "nta": {
    nama: "Nta", aksara: "T", audio: "audio/nta.MP3",
    diakritik: [
      { vokal: "a", hasil: "T", romaji: "nta" },
      { vokal: "i", hasil: "Ti/TL/Tl", romaji: "nti" },
      { vokal: "u", hasil: "Tu", romaji: "ntu" },
      { vokal: "e", hasil: "Te", romaji: "nte" },
      { vokal: "o", hasil: "To", romaji: "nto" },
      { vokal: "mati", hasil: "Tx/TX", romaji: "nt" },
      { vokal: "ang", hasil: "TM", romaji: "ntang" },
      { vokal: "ah", hasil: "TH", romaji: "ntah" },
      { vokal: "ih", hasil: "THi", romaji: "ntih" }
    ],
    contoh: [
      { incung: "bT", latin: "Banta", arti: "Bantal" }
    ]
  },
  "nca": {
    nama: "Nca", aksara: "C", audio: "audio/nca.MP3",
    diakritik: [
      { vokal: "a", hasil: "C", romaji: "nca" },
      { vokal: "i", hasil: "Ci/CL/Cl", romaji: "nci" },
      { vokal: "u", hasil: "Cu", romaji: "ncu" },
      { vokal: "e", hasil: "Ce", romaji: "nce" },
      { vokal: "o", hasil: "Co", romaji: "nco" },
      { vokal: "mati", hasil: "Cx/CX", romaji: "nc" },
      { vokal: "ang", hasil: "CM", romaji: "ncang" },
      { vokal: "ah", hasil: "CH", romaji: "ncah" },
      { vokal: "ih", hasil: "CHi", romaji: "ncih" }
    ],
    contoh: [
      { incung: "aCu", latin: "Ancu", arti: "Hancur" }
    ]
  },
  "ngsa": {
    nama: "Ngsa", aksara: "S", audio: "audio/ngsa.MP3",
    diakritik: [
      { vokal: "a", hasil: "S", romaji: "ngsa" },
      { vokal: "i", hasil: "Si/SL/Sl", romaji: "ngsi" },
      { vokal: "u", hasil: "Su", romaji: "ngsu" },
      { vokal: "e", hasil: "Se", romaji: "ngse" },
      { vokal: "o", hasil: "So", romaji: "ngso" },
      { vokal: "mati", hasil: "Sx/SX", romaji: "ngs" },
      { vokal: "ang", hasil: "SM", romaji: "ngsang" },
      { vokal: "ah", hasil: "SH", romaji: "ngsah" },
      { vokal: "ih", hasil: "SHi", romaji: "ngsih" }
    ],
    contoh: [
      { incung: "bS", latin: "Bangsa", arti: "Negara/Bangsa" }
    ]
  }
};

// Logika untuk menampilkan data di halaman detail-aksara.html
const urlParams = new URLSearchParams(window.location.search);
const hurufAktif = urlParams.get('huruf'); // Mengambil tulisan ?huruf=ka dari link

if (hurufAktif && dataAksara[hurufAktif] && document.getElementById('aksaraUtama')) {
  const data = dataAksara[hurufAktif];

  // 1. Isi Header (Huruf Besar & Nama)
  document.getElementById('aksaraUtama').textContent = data.aksara;
  document.getElementById('namaAksara').textContent = data.nama;

  // 2. Setup Audio
  const audioEl = document.getElementById('audioAksara');
  audioEl.src = data.audio;
  
  document.getElementById('playAudioBtn').addEventListener('click', () => {
    audioEl.play().catch(e => alert("File audio belum tersedia."));
  });

  // 3. Render Grid Diakritik
  const grid = document.getElementById('diakritikGrid');
  data.diakritik.forEach(item => {
    grid.innerHTML += `
      <div class="diakritik-card">
        <div class="incung-text" style="font-family: 'Incung', sans-serif;">${item.hasil}</div>
        <div style="font-weight: bold;">${item.romaji}</div>
      </div>
    `;
  });

  // 4. Render Contoh Kata
  const listContoh = document.getElementById('contohList');
  data.contoh.forEach(item => {
    listContoh.innerHTML += `
      <div class="contoh-card">
        <div class="incung-word" style="font-family: 'Incung', sans-serif;">${item.incung}</div>
        <div>
          <div class="latin-word">${item.latin}</div>
          <div style="color: #666;">Arti: ${item.arti}</div>
        </div>
      </div>
    `;
  });
}
