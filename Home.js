import './Home.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');
  const navigate = useNavigate(); // Yönlendirme için kullanılır

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Backend'e POST isteği gönderiyoruz
      const response = await axios.post('http://127.0.0.1:8000/analyze', { text:comment });

      // API'den gelen sonucu alıyoruz
      const results = response.data;
      console.log("API Yanıtı:", results); // API yanıtını kontrol etmek için log ekliyoruz

      // Yükleme bittiğinde, analiz sonuçlarını gösteren sayfaya yönlendiriyoruz
      setIsLoading(false);
      navigate('/analizler', { state: { results } }); // Analiz sayfasına yönlendirme

    } catch (error) {
      console.error("Bir hata oluştu:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ marginBottom: '30px' }}>SİBER SUÇ TESPİT UYGULAMASI</h1>
      <h2 style={{ marginBottom: '30px' }}>GÜVENLİYORUM’A HOŞGELDİNİZ!</h2>

      <Box sx={{ width: 500, maxWidth: '100%', margin: '0 auto' }}>
        <TextField
          fullWidth
          label="Yorumu Giriniz"
          variant="outlined"
          margin="normal"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          InputProps={{
            sx: {
              fontSize: '1.5rem',
              padding: '12px 16px',
            },
          }}
          InputLabelProps={{
            style: { fontSize: '1.2rem' },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: '70px',
            },
          }}
        />
      </Box>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleSubmit}
          disabled={isLoading || comment.trim() === ''}
          style={{
            padding: '12px 24px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: isLoading ? '#ccc' : '#1976D2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {isLoading ? 'Yükleniyor...' : 'Siber Suç Tespiti Yap'}
        </button>
      </div>
    </div>
  );
}

export default Home;
