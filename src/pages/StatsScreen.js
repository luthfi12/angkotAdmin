import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export default function StatsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ganti dengan alamat dan token Matomo kamu
  const TOKEN_AUTH = '928a5c33be4b24a0d30b17f26f720687';
  const API_URL = 'http://192.168.89.183/matomo/index.php?' +
    'module=API&method=Events.getCategory' +
    '&idSite=1&period=day&date=today&format=JSON' +
    `&token_auth=${TOKEN_AUTH}`;

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistik Event Hari Ini</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.label}>Kategori: {item.label}</Text>
            <Text>Jumlah Event: {item.nb_events}</Text>
            <Text>Jumlah Pengunjung: {item.nb_visits}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  item: { backgroundColor: '#f0f0f0', marginVertical: 8, padding: 12, borderRadius: 8 },
  label: { fontWeight: 'bold' },
});
