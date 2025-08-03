import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Button } from 'react-native';

export default function StatsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('last7');

  const TOKEN_AUTH = '1efec1fd90a8d15c1319b99516d18228';
  const BASE_URL = 'http://192.168.1.2/matomo/index.php';

  const getDateParam = () => {
    if (range === 'today') return 'today';
    if (range === 'last7') return 'last7';
    if (range === 'last30') return 'last30';
    return '2024-01-01,today';
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append('module', 'API');
      form.append('method', 'Events.getCategory');
      form.append('idSite', '2');
      form.append('period', 'range');
      form.append('date', getDateParam());
      form.append('format', 'JSON');
      form.append('token_auth', TOKEN_AUTH);

      const res = await fetch(BASE_URL, {
        method: 'POST',
        body: form,
      });

      const json = await res.json();
      console.log('Matomo result:', json);
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [range]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Statistik Event Matomo</Text>
      <View style={styles.buttonRow}>
        <Button title="Hari Ini" onPress={() => setRange('today')} />
        <Button title="7 Hari" onPress={() => setRange('last7')} />
        <Button title="30 Hari" onPress={() => setRange('last30')} />
        <Button title="Refresh" onPress={fetchData} />
      </View>
      {data.length === 0 ? (
        <Text style={styles.noData}>❗ Tidak ada data event untuk periode yang dipilih.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item.label}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.label}>Kategori: {item.label}</Text>
              <Text>Jumlah Event: {item.nb_events}</Text>
              <Text>Jumlah Pengunjung: {item.nb_visits}</Text>
              <Text>Sum Event Value: {item.sum_event_value}</Text>
              <Text>Avg Event Value: {item.avg_event_value}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  item: { backgroundColor: '#f0f0f0', marginVertical: 8, padding: 12, borderRadius: 8 },
  label: { fontWeight: 'bold' },
  noData: { textAlign: 'center', color: 'red', marginTop: 20 },
});
