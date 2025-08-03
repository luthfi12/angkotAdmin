import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from "@react-google-maps/api";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseApp } from "../firebaseConfig";

const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};

const center = {
  lat: -6.973,
  lng: 107.56,
};

const Peta = () => {
  const [trayek, setTrayek] = useState([]);
  const [penumpangLocation, setPenumpangLocation] = useState(null);
  const [angkotLocations, setAngkotLocations] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const db = getDatabase(firebaseApp);

    // Ambil data trayek
    const trayekRef = ref(db, "trayek/soreang_leuwipanjang");
    onValue(trayekRef, (snapshot) => {
      const data = snapshot.val();
      if (Array.isArray(data)) {
        setTrayek(data);
      } else if (typeof data === "object") {
        const arrayData = Object.values(data).filter(
          (item) => item.latitude && item.longitude
        );
        setTrayek(arrayData);
      } else {
        setTrayek([]);
      }
    });

    // Ambil lokasi penumpang
    const penumpangRef = ref(db, "penumpang/location");
    onValue(penumpangRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.latitude && data.longitude) {
        setPenumpangLocation({ lat: data.latitude, lng: data.longitude });
      }
    });

    // Ambil semua lokasi angkot
    const angkotRef = ref(db, "angkot");
    onValue(angkotRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((platNomor) => {
          const lokasi = data[platNomor].location;
          return lokasi && lokasi.latitude && lokasi.longitude
            ? {
                platNomor,
                lat: lokasi.latitude,
                lng: lokasi.longitude,
              }
            : null;
        }).filter(Boolean);
        setAngkotLocations(list);
      }
    });
  }, []);

  return (
    <div>
      <h2 style={{ margin: "20px" }}>Peta Keberadaan Angkot & Penumpang</h2>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
          {/* Polyline trayek */}
          {trayek.length > 0 && (
            <Polyline
              path={trayek.map((point) => ({ lat: point.latitude, lng: point.longitude }))}
              options={{
                strokeColor: "#17c43d",
                strokeOpacity: 1,
                strokeWeight: 4,
              }}
            />
          )}

          {/* Marker penumpang */}
          {penumpangLocation && (
            <Marker
              position={penumpangLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
              onClick={() => setSelectedMarker({ type: "penumpang" })}
            />
          )}

          {/* Marker angkot */}
          {angkotLocations.map((angkot, index) => (
            <Marker
              key={index}
              position={{ lat: angkot.lat, lng: angkot.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
              onClick={() =>
                setSelectedMarker({ type: "angkot", platNomor: angkot.platNomor, lat: angkot.lat, lng: angkot.lng })
              }
            />
          ))}

          {/* InfoWindow */}
          {selectedMarker && selectedMarker.type === "penumpang" && (
            <InfoWindow
              position={penumpangLocation}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div><strong>Penumpang</strong></div>
            </InfoWindow>
          )}

          {selectedMarker && selectedMarker.type === "angkot" && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>Plat: {selectedMarker.platNomor}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Peta;
