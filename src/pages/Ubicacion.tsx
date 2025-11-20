import React, { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GoogleMap, Marker } from '@react-google-maps/api';
import '../styles/ubicacion.css';

const containerStyle = {
  width: '100%',
  height: '400px',
};

// ✅ Coordenadas del punto en Suiza
const swissCenter = {
  lat: 47.0502,
  lng: 8.3093,
};

const Ubicacion: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!window.google || !google.maps) return;
  }, []);

  // ✅ Abrir el mismo punto en Google Maps
  const handleOpenInMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${swissCenter.lat},${swissCenter.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Container maxWidth="lg" className="ubicacion-section">
      <Typography
        variant="h3"
        className="galeria-title"
        sx={{
          fontSize: { xs: '2.2rem', md: '2.7rem' },
          fontFamily: 'var(--font-section)',
          fontWeight: 'bold',
          color: 'var(--color-terracota)',
        }}
      >
        Dónde estamos
      </Typography>

      <Box className="map-container">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={swissCenter} // 👈 usa Suiza
          zoom={17}
          onLoad={(map) => {
            mapRef.current = map;
            setMapLoaded(true);
          }}
        >
          {mapLoaded && <Marker position={swissCenter} />}{' '}
          {/* 👈 marcador en Suiza */}
        </GoogleMap>

        <Button onClick={handleOpenInMaps} className="ubicacion-btn">
          Cómo llegar
        </Button>
      </Box>
    </Container>
  );
};

export default Ubicacion;
