import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Yönlendirme verilerini almak için
import axios from 'axios';
import './Analizer.css';

function Analizer() {
  const [results, setResults] = useState([]); // Başlangıçta boş dizi
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Yönlendirme verilerini alıyoruz

  useEffect(() => {
    // Yönlendirme ile gelen results verisini alıyoruz
    if (location.state && location.state.results && Array.isArray(location.state.results.analyze_results)) {
      // Eğer results verisi varsa ve dizi formatında ise
      setResults(location.state.results.analyze_results);
      setLoading(false);
    } else {
      // API'den veriyi almak isterseniz, burada daha önce yapılan kontrolü sağlamlaştırıyoruz
      axios.get('http://127.0.0.1:8000') // İlgili API endpointine GET isteği gönderiliyor
        .then((response) => {
          // Eğer veri gelirse
          setResults(response.data.analyze_results || []); // Gelen veri, analyze_results içinde olacak şekilde işleniyor
          setLoading(false);
        })
        .catch((error) => {
          console.error("Bir hata oluştu:", error);
          setLoading(false);
        });
    }
  }, [location]); // location değiştiğinde yeniden çalışacak

  if (loading) {
    return <div>Yükleniyor...</div>;  // Yüklenme durumu
  }

  if (results.length === 0) {
    return <div>Henüz analiz yapılmamış.</div>;  // Sonuç yoksa mesaj
  }

  return (
    <div className="container">
      <h1>Analiz Sonuçları</h1>
      <ul style={{
        display: 'flex', 
        flexWrap: 'wrap', 
        listStyleType: 'none', 
        padding: 0, 
        justifyContent: 'center',
        gap: '20px' // Kartlar arasına boşluk ekler
      }}>
        {results.map((result, index) => (
          <li 
            key={index} 
            style={{
              border: '1px solid #ccc', 
              borderRadius: '10px', 
              padding: '15px', 
              width: '200px', 
              textAlign: 'left', 
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <strong>Tür:</strong> {result.tur} <br />
            <strong>TCK Maddesi:</strong> {result.tck} <br />
            <strong>Açıklama:</strong> {result.aciklama} <br />
            <strong>Skor:</strong> {result.skor.toFixed(1)}
          </li>
        ))}
      </ul>
    </div>
  );  
}

export default Analizer;
