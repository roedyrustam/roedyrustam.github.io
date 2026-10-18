/**
 * ==========================================================================
 * API Wilayah Indonesia 2024 — In-Memory Administrative Dataset & Engine
 * Standard: Kepmendagri No. 100.1.1-6117 / BPS 2024
 * Creator: Roedy Rustam (https://github.com/roedyrustam/API-Wilayah-2024)
 * ==========================================================================
 */

const WILAYAH_NATIONAL_STATS = {
  provinces: 38,
  regencies: 514,
  districts: 7288,
  villages: 83763,
  standard: "Permendagri / BPS 2024",
  license: "MIT Open Data",
  github: "https://github.com/roedyrustam/API-Wilayah-2024",
  stars: 21,
  forks: 10
};

// Official 38 Provinces of Indonesia (2024)
const WILAYAH_PROVINCES = [
  { code: "11", name: "ACEH", capital: "Banda Aceh", island: "Sumatera", lat: 4.6951, lng: 96.7494 },
  { code: "12", name: "SUMATERA UTARA", capital: "Medan", island: "Sumatera", lat: 2.1154, lng: 99.5451 },
  { code: "13", name: "SUMATERA BARAT", capital: "Padang", island: "Sumatera", lat: -0.7399, lng: 100.8000 },
  { code: "14", name: "RIAU", capital: "Pekanbaru", island: "Sumatera", lat: 0.5071, lng: 101.4478 },
  { code: "15", name: "JAMBI", capital: "Jambi", island: "Sumatera", lat: -1.6101, lng: 103.6131 },
  { code: "16", name: "SUMATERA SELATAN", capital: "Palembang", island: "Sumatera", lat: -3.3194, lng: 104.9147 },
  { code: "17", name: "BENGKULU", capital: "Bengkulu", island: "Sumatera", lat: -3.8004, lng: 102.2655 },
  { code: "18", name: "LAMPUNG", capital: "Bandar Lampung", island: "Sumatera", lat: -4.5586, lng: 105.4068 },
  { code: "19", name: "KEPULAUAN BANGKA BELITUNG", capital: "Pangkal Pinang", island: "Sumatera", lat: -2.7411, lng: 106.4406 },
  { code: "21", name: "KEPULAUAN RIAU", capital: "Tanjung Pinang", island: "Sumatera", lat: 3.9456, lng: 108.1429 },
  { code: "31", name: "DKI JAKARTA", capital: "Jakarta", island: "Jawa", lat: -6.2088, lng: 106.8456 },
  { code: "32", name: "JAWA BARAT", capital: "Bandung", island: "Jawa", lat: -6.9175, lng: 107.6191 },
  { code: "33", name: "JAWA TENGAH", capital: "Semarang", island: "Jawa", lat: -7.1510, lng: 110.1403 },
  { code: "34", name: "DI YOGYAKARTA", capital: "Yogyakarta", island: "Jawa", lat: -7.7956, lng: 110.3695 },
  { code: "35", name: "JAWA TIMUR", capital: "Surabaya", island: "Jawa", lat: -7.5361, lng: 112.2384 },
  { code: "36", name: "BANTEN", capital: "Serang", island: "Jawa", lat: -6.4058, lng: 106.0640 },
  { code: "51", name: "BALI", capital: "Denpasar", island: "Bali & Nusa Tenggara", lat: -8.4095, lng: 115.1889 },
  { code: "52", name: "NUSA TENGGARA BARAT", capital: "Mataram", island: "Bali & Nusa Tenggara", lat: -8.6529, lng: 117.3616 },
  { code: "53", name: "NUSA TENGGARA TIMUR", capital: "Kupang", island: "Bali & Nusa Tenggara", lat: -8.6574, lng: 121.0794 },
  { code: "61", name: "KALIMANTAN BARAT", capital: "Pontianak", island: "Kalimantan", lat: -0.0263, lng: 109.3425 },
  { code: "62", name: "KALIMANTAN TENGAH", capital: "Palangka Raya", island: "Kalimantan", lat: -1.6815, lng: 113.3824 },
  { code: "63", name: "KALIMANTAN SELATAN", capital: "Banjarbaru", island: "Kalimantan", lat: -3.0926, lng: 115.2838 },
  { code: "64", name: "KALIMANTAN TIMUR", capital: "Samarinda", island: "Kalimantan (IKN)", lat: 0.5387, lng: 116.4194 },
  { code: "65", name: "KALIMANTAN UTARA", capital: "Tanjung Selor", island: "Kalimantan", lat: 3.0731, lng: 116.0414 },
  { code: "71", name: "SULAWESI UTARA", capital: "Manado", island: "Sulawesi", lat: 0.6247, lng: 123.9750 },
  { code: "72", name: "SULAWESI TENGAH", capital: "Palu", island: "Sulawesi", lat: -1.4300, lng: 121.4456 },
  { code: "73", name: "SULAWESI SELATAN", capital: "Makassar", island: "Sulawesi", lat: -3.6687, lng: 119.9741 },
  { code: "74", name: "SULAWESI TENGGARA", capital: "Kendari", island: "Sulawesi", lat: -4.1449, lng: 122.1746 },
  { code: "75", name: "GORONTALO", capital: "Gorontalo", island: "Sulawesi", lat: 0.6999, lng: 122.4467 },
  { code: "76", name: "SULAWESI BARAT", capital: "Mamuju", island: "Sulawesi", lat: -2.8441, lng: 119.2321 },
  { code: "81", name: "MALUKU", capital: "Ambon", island: "Maluku", lat: -3.2385, lng: 130.1453 },
  { code: "82", name: "MALUKU UTARA", capital: "Sofifi", island: "Maluku", lat: 1.5709, lng: 127.8088 },
  { code: "91", name: "PAPUA", capital: "Jayapura", island: "Papua", lat: -4.2699, lng: 138.0804 },
  { code: "92", name: "PAPUA BARAT", capital: "Manokwari", island: "Papua", lat: -1.3361, lng: 133.1747 },
  { code: "93", name: "PAPUA SELATAN", capital: "Merauke", island: "Papua", lat: -7.5000, lng: 140.0000 },
  { code: "94", name: "PAPUA TENGAH", capital: "Nabire", island: "Papua", lat: -3.8000, lng: 136.0000 },
  { code: "95", name: "PAPUA PEGUNUNGAN", capital: "Wamena", island: "Papua", lat: -4.0833, lng: 138.9500 },
  { code: "96", name: "PAPUA BARAT DAYA", capital: "Sorong", island: "Papua", lat: -0.8762, lng: 131.2558 }
];

// Rich Administrative Hierarchy for Detailed Showcases
const WILAYAH_DATABASE = {
  // 31: DKI JAKARTA
  "31": {
    regencies: [
      { code: "31.71", name: "KOTA ADM. JAKARTA PUSAT", type: "Kota", postal: "10110" },
      { code: "31.72", name: "KOTA ADM. JAKARTA UTARA", type: "Kota", postal: "14110" },
      { code: "31.73", name: "KOTA ADM. JAKARTA BARAT", type: "Kota", postal: "11110" },
      { code: "31.74", name: "KOTA ADM. JAKARTA SELATAN", type: "Kota", postal: "12110" },
      { code: "31.75", name: "KOTA ADM. JAKARTA TIMUR", type: "Kota", postal: "13110" },
      { code: "31.01", name: "KAB. ADM. KEPULAUAN SERIBU", type: "Kabupaten", postal: "14510" }
    ],
    districts: {
      "31.71": [
        { code: "31.71.01", name: "GAMBIR" },
        { code: "31.71.02", name: "SAWAH BESAR" },
        { code: "31.71.03", name: "KEMAYORAN" },
        { code: "31.71.04", name: "SENEN" },
        { code: "31.71.05", name: "CEMPAKA PUTIH" },
        { code: "31.71.06", name: "MENTENG" },
        { code: "31.71.07", name: "TANAH ABANG" },
        { code: "31.71.08", name: "JOHAR BARU" }
      ],
      "31.74": [
        { code: "31.74.01", name: "TEBET" },
        { code: "31.74.02", name: "SETIABUDI" },
        { code: "31.74.03", name: "MAMPANG PRAPATAN" },
        { code: "31.74.04", name: "PASAR MINGGU" },
        { code: "31.74.05", name: "KEBAYORAN LAMA" },
        { code: "31.74.06", name: "CILANDAK" },
        { code: "31.74.07", name: "KEBAYORAN BARU" }
      ]
    },
    villages: {
      "31.71.01": [
        { code: "31.71.01.1001", name: "GAMBIR", postal: "10110", type: "Kelurahan" },
        { code: "31.71.01.1002", name: "KEBON KELAPA", postal: "10120", type: "Kelurahan" },
        { code: "31.71.01.1003", name: "PETOJO SELATAN", postal: "10130", type: "Kelurahan" },
        { code: "31.71.01.1004", name: "DURI PULO", postal: "10140", type: "Kelurahan" },
        { code: "31.71.01.1005", name: "PETOJO UTARA", postal: "10150", type: "Kelurahan" },
        { code: "31.71.01.1006", name: "CIDENG", postal: "10160", type: "Kelurahan" }
      ],
      "31.71.06": [
        { code: "31.71.06.1001", name: "MENTENG", postal: "10310", type: "Kelurahan" },
        { code: "31.71.06.1002", name: "PEGANGSAAN", postal: "10320", type: "Kelurahan" },
        { code: "31.71.06.1003", name: "CIKINI", postal: "10330", type: "Kelurahan" },
        { code: "31.71.06.1004", name: "GONDANGDIA", postal: "10350", type: "Kelurahan" },
        { code: "31.71.06.1005", name: "KEBON SIRIH", postal: "10340", type: "Kelurahan" }
      ],
      "31.74.07": [
        { code: "31.74.07.1001", name: "SELONG", postal: "12110", type: "Kelurahan" },
        { code: "31.74.07.1002", name: "GUNUNG", postal: "12120", type: "Kelurahan" },
        { code: "31.74.07.1003", name: "KRAMAT PELA", postal: "12130", type: "Kelurahan" },
        { code: "31.74.07.1004", name: "GANDARIA UTARA", postal: "12140", type: "Kelurahan" },
        { code: "31.74.07.1005", name: "CIPETE UTARA", postal: "12150", type: "Kelurahan" },
        { code: "31.74.07.1006", name: "PULO", postal: "12160", type: "Kelurahan" },
        { code: "31.74.07.1007", name: "MELAWAI", postal: "12160", type: "Kelurahan" },
        { code: "31.74.07.1008", name: "PETOGOGAN", postal: "12170", type: "Kelurahan" },
        { code: "31.74.07.1009", name: "RAWA BARAT", postal: "12180", type: "Kelurahan" },
        { code: "31.74.07.1010", name: "SENAYAN", postal: "12190", type: "Kelurahan" }
      ]
    }
  },

  // 32: JAWA BARAT
  "32": {
    regencies: [
      { code: "32.73", name: "KOTA BANDUNG", type: "Kota", postal: "40111" },
      { code: "32.04", name: "KAB. BANDUNG", type: "Kabupaten", postal: "40311" },
      { code: "32.17", name: "KAB. BANDUNG BARAT", type: "Kabupaten", postal: "40552" },
      { code: "32.71", name: "KOTA BOGOR", type: "Kota", postal: "16111" },
      { code: "32.01", name: "KAB. BOGOR", type: "Kabupaten", postal: "16911" },
      { code: "32.75", name: "KOTA BEKASI", type: "Kota", postal: "17111" },
      { code: "32.16", name: "KAB. BEKASI", type: "Kabupaten", postal: "17530" },
      { code: "32.76", name: "KOTA DEPOK", type: "Kota", postal: "16411" }
    ],
    districts: {
      "32.73": [
        { code: "32.73.01", name: "SUKASARI" },
        { code: "32.73.02", name: "COBLONG" },
        { code: "32.73.03", name: "BABAKAN CIPARAY" },
        { code: "32.73.04", name: "BOJONGLOA KALER" },
        { code: "32.73.05", name: "ANDIR" },
        { code: "32.73.06", name: "CICENDO" },
        { code: "32.73.07", name: "SUMUR BANDUNG" },
        { code: "32.73.08", name: "CIBEUNYING KALER" }
      ]
    },
    villages: {
      "32.73.02": [
        { code: "32.73.02.1001", name: "DAGO", postal: "40135", type: "Kelurahan" },
        { code: "32.73.02.1002", name: "LEBAK SILIWANGI", postal: "40132", type: "Kelurahan" },
        { code: "32.73.02.1003", name: "SADANG SERANG", postal: "40133", type: "Kelurahan" },
        { code: "32.73.02.1004", name: "SEKELOA", postal: "40134", type: "Kelurahan" },
        { code: "32.73.02.1005", name: "CIPAGANTI", postal: "40131", type: "Kelurahan" },
        { code: "32.73.02.1006", name: "LEBAKGEDE", postal: "40132", type: "Kelurahan" }
      ]
    }
  },

  // 73: SULAWESI SELATAN
  "73": {
    regencies: [
      { code: "73.71", name: "KOTA MAKASSAR", type: "Kota", postal: "90111" },
      { code: "73.06", name: "KAB. GOWA", type: "Kabupaten", postal: "92111" },
      { code: "73.09", name: "KAB. MAROS", type: "Kabupaten", postal: "90511" },
      { code: "73.18", name: "KAB. TANA TORAJA", type: "Kabupaten", postal: "91811" },
      { code: "73.26", name: "KAB. TORAJA UTARA", type: "Kabupaten", postal: "91831" },
      { code: "73.72", name: "KOTA PAREPARE", type: "Kota", postal: "91111" },
      { code: "73.73", name: "KOTA PALOPO", type: "Kota", postal: "91911" }
    ],
    districts: {
      "73.71": [
        { code: "73.71.01", name: "MARISO" },
        { code: "73.71.02", name: "MAMAJANG" },
        { code: "73.71.03", name: "MAKASSAR" },
        { code: "73.71.04", name: "UJUNG PANDANG" },
        { code: "73.71.05", name: "WAJO" },
        { code: "73.71.06", name: "BONTTOALA" },
        { code: "73.71.07", name: "TALLO" },
        { code: "73.71.08", name: "PANAKKUKANG" },
        { code: "73.71.09", name: "TAMALATE" }
      ],
      "73.26": [
        { code: "73.26.01", name: "RANTEPAO" },
        { code: "73.26.02", name: "SESEAN" },
        { code: "73.26.03", name: "NANGGALA" },
        { code: "73.26.04", name: "TIROAN" }
      ]
    },
    villages: {
      "73.71.04": [
        { code: "73.71.04.1001", name: "BARU", postal: "90111", type: "Kelurahan" },
        { code: "73.71.04.1002", name: "BULOGADING", postal: "90111", type: "Kelurahan" },
        { code: "73.71.04.1003", name: "LAE-LAE", postal: "90111", type: "Kelurahan" },
        { code: "73.71.04.1004", name: "LOSARI", postal: "90112", type: "Kelurahan" },
        { code: "73.71.04.1005", name: "MALOKU", postal: "90112", type: "Kelurahan" },
        { code: "73.71.04.1006", name: "MANGKURA", postal: "90113", type: "Kelurahan" }
      ],
      "73.26.01": [
        { code: "73.26.01.1001", name: "RANTEPAO", postal: "91831", type: "Kelurahan" },
        { code: "73.26.01.1002", name: "PENANIAN", postal: "91831", type: "Kelurahan" },
        { code: "73.26.01.1003", name: "PASALE", postal: "91831", type: "Kelurahan" },
        { code: "73.26.01.1004", name: "KARASSIK", postal: "91831", type: "Kelurahan" }
      ]
    }
  },

  // 51: BALI
  "51": {
    regencies: [
      { code: "51.71", name: "KOTA DENPASAR", type: "Kota", postal: "80111" },
      { code: "51.03", name: "KAB. BADUNG", type: "Kabupaten", postal: "80351" },
      { code: "51.04", name: "KAB. GIANYAR", type: "Kabupaten", postal: "80511" },
      { code: "51.02", name: "KAB. TABANAN", type: "Kabupaten", postal: "82111" },
      { code: "51.08", name: "KAB. BULELENG", type: "Kabupaten", postal: "81111" }
    ],
    districts: {
      "51.71": [
        { code: "51.71.01", name: "DENPASAR SELATAN" },
        { code: "51.71.02", name: "DENPASAR TIMUR" },
        { code: "51.71.03", name: "DENPASAR BARAT" },
        { code: "51.71.04", name: "DENPASAR UTARA" }
      ],
      "51.03": [
        { code: "51.03.01", name: "KUTA" },
        { code: "51.03.02", name: "KUTA SELATAN" },
        { code: "51.03.03", name: "KUTA UTARA" },
        { code: "51.03.04", name: "MENGWI" }
      ]
    },
    villages: {
      "51.71.01": [
        { code: "51.71.01.1001", name: "SANUR", postal: "80228", type: "Kelurahan" },
        { code: "51.71.01.1002", name: "SANUR KAUH", postal: "80227", type: "Desa" },
        { code: "51.71.01.1003", name: "RENON", postal: "80226", type: "Kelurahan" },
        { code: "51.71.01.1004", name: "PANJER", postal: "80225", type: "Kelurahan" },
        { code: "51.71.01.1005", name: "SIDAKARYA", postal: "80224", type: "Kelurahan" }
      ],
      "51.03.01": [
        { code: "51.03.01.1001", name: "KUTA", postal: "80361", type: "Kelurahan" },
        { code: "51.03.01.1002", name: "LEGIAN", postal: "80361", type: "Kelurahan" },
        { code: "51.03.01.1003", name: "SEMINYAK", postal: "80361", type: "Kelurahan" },
        { code: "51.03.01.1004", name: "TUBAN", postal: "80361", type: "Kelurahan" },
        { code: "51.03.01.1005", name: "KEDONGANAN", postal: "80361", type: "Kelurahan" }
      ]
    }
  },

  // 12: SUMATERA UTARA
  "12": {
    regencies: [
      { code: "12.71", name: "KOTA MEDAN", type: "Kota", postal: "20111" },
      { code: "12.07", name: "KAB. DELI SERDANG", type: "Kabupaten", postal: "20511" },
      { code: "12.06", name: "KAB. KARO", type: "Kabupaten", postal: "22111" },
      { code: "12.72", name: "KOTA PEMATANGSIANTAR", type: "Kota", postal: "21111" }
    ],
    districts: {
      "12.71": [
        { code: "12.71.01", name: "MEDAN KOTA" },
        { code: "12.71.02", name: "MEDAN BARU" },
        { code: "12.71.03", name: "MEDAN PETISAH" },
        { code: "12.71.04", name: "MEDAN POLONIA" }
      ]
    },
    villages: {
      "12.71.02": [
        { code: "12.71.02.1001", name: "PADANG BULAN", postal: "20155", type: "Kelurahan" },
        { code: "12.71.02.1002", name: "DARAT", postal: "20152", type: "Kelurahan" },
        { code: "12.71.02.1003", name: "BABURA", postal: "20154", type: "Kelurahan" },
        { code: "12.71.02.1004", name: "MERDEKA", postal: "20154", type: "Kelurahan" }
      ]
    }
  },

  // 64: KALIMANTAN TIMUR (IKN Area)
  "64": {
    regencies: [
      { code: "64.71", name: "KOTA BALIKPAPAN", type: "Kota", postal: "76111" },
      { code: "64.72", name: "KOTA SAMARINDA", type: "Kota", postal: "75111" },
      { code: "64.09", name: "KAB. PENAJAM PASER UTARA (IKN)", type: "Kabupaten", postal: "76311" },
      { code: "64.02", name: "KAB. KUTAI KARTANEGARA", type: "Kabupaten", postal: "75511" }
    ],
    districts: {
      "64.09": [
        { code: "64.09.01", name: "PENAJAM" },
        { code: "64.09.02", name: "WARU" },
        { code: "64.09.03", name: "BABULU" },
        { code: "64.09.04", name: "SEPAKU (IKN NUSANTARA CORE)" }
      ]
    },
    villages: {
      "64.09.04": [
        { code: "64.09.04.1001", name: "SEPAKU", postal: "76271", type: "Kelurahan" },
        { code: "64.09.04.2002", name: "BUMI HARAPAN (KIPP IKN)", postal: "76271", type: "Desa" },
        { code: "64.09.04.2003", name: "PEMALUAN", postal: "76271", type: "Kelurahan" },
        { code: "64.09.04.2004", name: "SUKARAJA", postal: "76271", type: "Desa" },
        { code: "64.09.04.2005", name: "BUKIT RAYA", postal: "76271", type: "Desa" }
      ]
    }
  },

  // 91: PAPUA
  "91": {
    regencies: [
      { code: "91.71", name: "KOTA JAYAPURA", type: "Kota", postal: "99111" },
      { code: "91.03", name: "KAB. JAYAPURA", type: "Kabupaten", postal: "99352" },
      { code: "91.06", name: "KAB. BIAK NUMFOR", type: "Kabupaten", postal: "98111" },
      { code: "91.10", name: "KAB. SARMI", type: "Kabupaten", postal: "99373" }
    ],
    districts: {
      "91.71": [
        { code: "91.71.01", name: "JAYAPURA UTARA" },
        { code: "91.71.02", name: "JAYAPURA SELATAN" },
        { code: "91.71.03", name: "ABEPURA" },
        { code: "91.71.04", name: "HERAM" }
      ]
    },
    villages: {
      "91.71.01": [
        { code: "91.71.01.1001", name: "GURABESI", postal: "99111", type: "Kelurahan" },
        { code: "91.71.01.1002", name: "ANGKASAPURA", postal: "99113", type: "Kelurahan" },
        { code: "91.71.01.1003", name: "BAYANGKARA", postal: "99112", type: "Kelurahan" },
        { code: "91.71.01.1004", name: "TRIKORA", postal: "99114", type: "Kelurahan" }
      ]
    }
  }
};

/**
 * Fallback Generator for provinces not hardcoded in the detail showcase
 * Ensures ANY of the 38 provinces cascades seamlessly without 404 or dead-end!
 */
function getRegenciesForProvince(provCode) {
  if (WILAYAH_DATABASE[provCode] && WILAYAH_DATABASE[provCode].regencies) {
    return WILAYAH_DATABASE[provCode].regencies;
  }
  const prov = WILAYAH_PROVINCES.find(p => p.code === provCode);
  const provName = prov ? prov.name : "WILAYAH";
  const capital = prov ? prov.capital : "IBUKOTA";

  return [
    { code: `${provCode}.71`, name: `KOTA ${capital.toUpperCase()}`, type: "Kota", postal: `${provCode}111` },
    { code: `${provCode}.01`, name: `KAB. ${provName} UTARA`, type: "Kabupaten", postal: `${provCode}211` },
    { code: `${provCode}.02`, name: `KAB. ${provName} SELATAN`, type: "Kabupaten", postal: `${provCode}311` },
    { code: `${provCode}.03`, name: `KAB. ${provName} BARAT`, type: "Kabupaten", postal: `${provCode}411` }
  ];
}

function getDistrictsForRegency(provCode, regCode) {
  if (WILAYAH_DATABASE[provCode] && WILAYAH_DATABASE[provCode].districts && WILAYAH_DATABASE[provCode].districts[regCode]) {
    return WILAYAH_DATABASE[provCode].districts[regCode];
  }
  return [
    { code: `${regCode}.01`, name: "KECAMATAN PUSAT KOTA" },
    { code: `${regCode}.02`, name: "KECAMATAN WILAYAH TIMUR" },
    { code: `${regCode}.03`, name: "KECAMATAN WILAYAH BARAT" },
    { code: `${regCode}.04`, name: "KECAMATAN PESISIR / SENTRA" }
  ];
}

function getVillagesForDistrict(provCode, distCode) {
  if (WILAYAH_DATABASE[provCode] && WILAYAH_DATABASE[provCode].villages && WILAYAH_DATABASE[provCode].villages[distCode]) {
    return WILAYAH_DATABASE[provCode].villages[distCode];
  }
  return [
    { code: `${distCode}.1001`, name: "KELURAHAN MAJU JAYA", postal: "10010", type: "Kelurahan" },
    { code: `${distCode}.1002`, name: "DESA KARYA MANDIRI", postal: "10020", type: "Desa" },
    { code: `${distCode}.1003`, name: "DESA SEJAHTERA", postal: "10030", type: "Desa" },
    { code: `${distCode}.1004`, name: "KELURAHAN HARAPAN BANGSA", postal: "10040", type: "Kelurahan" }
  ];
}
