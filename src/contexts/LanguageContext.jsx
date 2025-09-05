import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'id' ? 'en' : 'id';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = key => {
    if (language === 'en') {
      return translations.en[key] || translations.id[key] || key;
    }
    return translations.id[key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  id: {
    // Navigation
    Beranda: 'Beranda',
    'Kalkulator Dasar': 'Kalkulator Dasar',
    'Kalkulator Ilmiah': 'Kalkulator Ilmiah',
    'Kalkulator Grafik': 'Kalkulator Grafik',
    'Rumus Matematika': 'Rumus Matematika',
    'Penyelesaian Persamaan': 'Penyelesaian Persamaan',
    'Kalkulator Kalkulus': 'Kalkulator Kalkulus',
    'Soal Latihan': 'Soal Latihan',
    'Kesehatan & Medis': 'Kesehatan & Medis',
    'Warung & UKM': 'Warung & UKM',
    'Pertanian & Peternakan': 'Pertanian & Peternakan',
    'Social Media Analytics': 'Social Media Analytics',
    'Gaming & Probability': 'Gaming & Probability',
    'AI & Machine Learning': 'AI & Machine Learning',
    'Kalkulator Geospasial': 'Kalkulator Geospasial',
    'Rumus Fisika': 'Rumus Fisika',
    'Rumus Kimia': 'Rumus Kimia',
    'Konversi Satuan': 'Konversi Satuan',
    'Kalkulator Finansial': 'Kalkulator Finansial',
    'Finansial Advanced': 'Finansial Advanced',
    Statistik: 'Statistik',
    'Konversi Mata Uang': 'Konversi Mata Uang',

    // Common terms
    Hitung: 'Hitung',
    Reset: 'Reset',
    Hasil: 'Hasil',
    Contoh: 'Contoh',
    atau: 'atau',

    // Units
    kg: 'kg',
    cm: 'cm',
    m: 'm',
    mmHg: 'mmHg',
    bpm: 'bpm',
    '°C': '°C',
    Rp: 'Rp',
    '%': '%',
    tahun: 'tahun',
    hari: 'hari',
    minggu: 'minggu',
    ekor: 'ekor',
    'tanaman/ha': 'tanaman/ha',
    'm³': 'm³',
    'kg/ha': 'kg/ha',

    // Months
    Januari: 'Januari',
    Februari: 'Februari',
    Maret: 'Maret',
    April: 'April',
    Mei: 'Mei',
    Juni: 'Juni',
    Juli: 'Juli',
    Agustus: 'Agustus',
    September: 'September',
    Oktober: 'Oktober',
    November: 'November',
    Desember: 'Desember',
  },
  en: {
    // Navigation
    Beranda: 'Home',
    'Kalkulator Dasar': 'Basic Calculator',
    'Kalkulator Ilmiah': 'Scientific Calculator',
    'Kalkulator Grafik': 'Graphing Calculator',
    'Rumus Matematika': 'Math Formulas',
    'Penyelesaian Persamaan': 'Equation Solver',
    'Kalkulator Kalkulus': 'Calculus Calculator',
    'Soal Latihan': 'Practice Problems',
    'Kesehatan & Medis': 'Health & Medical',
    'Warung & UKM': 'Warung & SME',
    'Pertanian & Peternakan': 'Agriculture & Livestock',
    'Social Media Analytics': 'Social Media Analytics',
    'Gaming & Probability': 'Gaming & Probability',
    'AI & Machine Learning': 'AI & Machine Learning',
    'Kalkulator Geospasial': 'Geospatial Calculator',
    'Rumus Fisika': 'Physics Formulas',
    'Rumus Kimia': 'Chemistry Formulas',
    'Konversi Satuan': 'Unit Converter',
    'Kalkulator Finansial': 'Financial Calculator',
    'Finansial Advanced': 'Advanced Financial',
    Statistik: 'Statistics',
    'Konversi Mata Uang': 'Currency Converter',

    // Common terms
    Hitung: 'Calculate',
    Reset: 'Reset',
    Hasil: 'Result',
    Contoh: 'Example',
    atau: 'or',

    // Units
    kg: 'kg',
    cm: 'cm',
    m: 'm',
    mmHg: 'mmHg',
    bpm: 'bpm',
    '°C': '°C',
    Rp: '$',
    '%': '%',
    tahun: 'years',
    hari: 'days',
    minggu: 'weeks',
    ekor: 'heads',
    'tanaman/ha': 'plants/ha',
    'm³': 'm³',
    'kg/ha': 'kg/ha',

    // Months
    Januari: 'January',
    Februari: 'February',
    Maret: 'March',
    April: 'April',
    Mei: 'May',
    Juni: 'June',
    Juli: 'July',
    Agustus: 'August',
    September: 'September',
    Oktober: 'October',
    November: 'November',
    Desember: 'December',
  },
};

export default LanguageContext;
