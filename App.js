import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {
  Gamepad2, Wallet, RefreshCw, CheckCircle2, Clock, XCircle, AlertCircle,
  Gift, ShoppingBag, ShieldCheck, TrendingUp, Layers, Plus, QrCode, Upload,
  ArrowRight, Sparkles, ChevronRight, User, Zap, FileText, RotateCcw, BarChart3
} from 'lucide-react-native';

// --- INITIAL MOCK DATA ---
const INITIAL_GAMES = [
  {
    id: 'rov',
    name: 'Arena of Valor (ROV)',
    category: 'MOBA',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=60',
    tag: 'HOT',
    packages: [
      { id: 'rov-1', name: '35 Coupon', price: 35, originalPrice: 35, points: 3 },
      { id: 'rov-2', name: '175 Coupon', price: 150, originalPrice: 175, tag: 'Popular', points: 15 },
      { id: 'rov-3', name: '360 Coupon + Bonus', price: 300, originalPrice: 350, tag: '14% OFF', points: 30 },
      { id: 'rov-4', name: '1,200 Coupon', price: 1000, originalPrice: 1150, tag: 'BEST VALUE', points: 100 }
    ]
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    category: 'Battle Royale',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&auto=format&fit=crop&q=60',
    tag: 'POPULAR',
    packages: [
      { id: 'ff-1', name: '100 Diamonds', price: 33, originalPrice: 35, points: 3 },
      { id: 'ff-2', name: '520 Diamonds', price: 160, originalPrice: 175, points: 16 },
      { id: 'ff-3', name: '1,060 Diamonds', price: 310, originalPrice: 350, tag: '10% OFF', points: 31 }
    ]
  }
];

export default function App() {
  const [activeRole, setActiveRole] = useState('customer'); // 'customer' | 'admin'
  const [walletBalance, setWalletBalance] = useState(450);
  const [gachaPoints, setGachaPoints] = useState(70);
  const maxGachaPoints = 100;
  const pointsPerTHB = 0.1;

  const [gamesList] = useState(INITIAL_GAMES);
  const [orders, setOrders] = useState([
    {
      id: 'ORD-9821',
      gameId: 'rov',
      gameName: 'Arena of Valor (ROV)',
      packageName: '175 Coupon',
      price: 150,
      uid: 'ROV-987654321',
      status: 'Processing',
      paymentMethod: 'PromptPay QR',
      timestamp: '10:30 AM'
    }
  ]);

  const [selectedGame, setSelectedGame] = useState(INITIAL_GAMES[0]);
  const [selectedPackage, setSelectedPackage] = useState(INITIAL_GAMES[0].packages[0]);
  const [playerUid, setPlayerUid] = useState('');
  const [paymentType, setPaymentType] = useState('qr');

  const handlePlaceOrder = () => {
    if (!playerUid.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอก Player UID ก่อนทำรายการ');
      return;
    }
    if (paymentType === 'wallet' && walletBalance < selectedPackage.price) {
      Alert.alert('ข้อผิดพลาด', 'ยอดเงินใน Wallet ไม่เพียงพอ');
      return;
    }

    const newId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newId,
      gameId: selectedGame.id,
      gameName: selectedGame.name,
      packageName: selectedPackage.name,
      price: selectedPackage.price,
      uid: playerUid,
      status: 'Queued',
      paymentMethod: paymentType === 'wallet' ? 'Wallet Credit' : 'PromptPay QR',
      timestamp: new Date().toLocaleTimeString('th-TH')
    };

    if (paymentType === 'wallet') {
      setWalletBalance(prev => prev - selectedPackage.price);
    }
    setGachaPoints(prev => Math.min(maxGachaPoints, prev + Math.floor(selectedPackage.price * pointsPerTHB)));
    setOrders(prev => [newOrder, ...prev]);
    setPlayerUid('');
    Alert.alert('สำเร็จ', `สร้างคำสั่งซื้อ #${newId} เรียบร้อยแล้ว`);
  };

  const handleCancelOrder = (orderId) => {
    const target = orders.find(o => o.id === orderId);
    if (!target || target.status !== 'Queued') return;

    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
    setWalletBalance(prev => prev + target.price);
    Alert.alert('ยกเลิกสำเร็จ', `คืนเงิน ฿${target.price} เข้า Wallet แล้ว`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header Bar */}
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Gamepad2 size={20} color="#06b6d4" />
          <Text style={styles.logoText}>NEXUSTOPUP</Text>
        </View>

        <View style={styles.roleToggle}>
          <TouchableOpacity
            style={[styles.roleBtn, activeRole === 'customer' && styles.roleBtnActive]}
            onPress={() => setActiveRole('customer')}
          >
            <User size={14} color={activeRole === 'customer' ? '#fff' : '#94a3b8'} />
            <Text style={[styles.roleBtnText, activeRole === 'customer' && styles.roleBtnTextActive]}>Customer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleBtn, activeRole === 'admin' && styles.roleBtnActiveAdmin]}
            onPress={() => setActiveRole('admin')}
          >
            <ShieldCheck size={14} color={activeRole === 'admin' ? '#fff' : '#94a3b8'} />
            <Text style={[styles.roleBtnText, activeRole === 'admin' && styles.roleBtnTextActive]}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeRole === 'customer' ? (
          <View style={styles.section}>
            {/* Wallet Info */}
            <View style={styles.walletCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Wallet size={24} color="#818cf8" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.subText}>Wallet Credit</Text>
                  <Text style={styles.walletBalance}>฿{walletBalance}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.addMoneyBtn} onPress={() => setWalletBalance(b => b + 100)}>
                <Plus size={14} color="#818cf8" />
                <Text style={{ color: '#818cf8', fontSize: 12, fontWeight: '600' }}>+100</Text>
              </TouchableOpacity>
            </View>

            {/* Step 1: Select Game */}
            <Text style={styles.heading}>1. เลือกเกม</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {gamesList.map((g) => (
                <TouchableOpacity
                  key={g.id}
                  style={[styles.gameCard, selectedGame.id === g.id && styles.selectedBorder]}
                  onPress={() => { setSelectedGame(g); setSelectedPackage(g.packages[0]); }}
                >
                  <Image source={{ uri: g.image }} style={styles.gameImg} />
                  <Text style={styles.gameName}>{g.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Step 2: Input Player UID */}
            <Text style={styles.heading}>2. กรอก Player UID</Text>
            <TextInput
              style={styles.input}
              placeholder="ระบุ Player ID / UID"
              placeholderTextColor="#64748b"
              value={playerUid}
              onChangeText={setPlayerUid}
            />

            {/* Step 3: Select Package */}
            <Text style={styles.heading}>3. เลือกแพ็กเกจ</Text>
            {selectedGame.packages.map((pkg) => (
              <TouchableOpacity
                key={pkg.id}
                style={[styles.pkgCard, selectedPackage?.id === pkg.id && styles.selectedBorder]}
                onPress={() => setSelectedPackage(pkg)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>{pkg.name}</Text>
                <Text style={{ color: '#22d3ee', fontWeight: 'bold' }}>฿{pkg.price}</Text>
              </TouchableOpacity>
            ))}

            {/* Place Order Button */}
            <TouchableOpacity style={styles.submitBtn} onPress={handlePlaceOrder}>
              <Text style={styles.submitBtnText}>ชำระเงิน ฿{selectedPackage?.price}</Text>
            </TouchableOpacity>

            {/* Active Queue List */}
            <Text style={[styles.heading, { marginTop: 24 }]}>รายการคิวคำสั่งซื้อ</Text>
            {orders.map((o) => (
              <View key={o.id} style={styles.orderItem}>
                <View style={{ flexDirection: 'row', justifyContext: 'space-between' }}>
                  <Text style={{ color: '#06b6d4', fontWeight: 'bold' }}>{o.id}</Text>
                  <Text style={{ color: o.status === 'Queued' ? '#f59e0b' : o.status === 'Completed' ? '#10b981' : '#f43f5e' }}>
                    {o.status}
                  </Text>
                </View>
                <Text style={{ color: '#fff' }}>{o.gameName} ({o.packageName})</Text>
                <Text style={{ color: '#94a3b8', fontSize: 12 }}>UID: {o.uid}</Text>
                {o.status === 'Queued' && (
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => handleCancelOrder(o.id)}>
                    <Text style={{ color: '#f43f5e', fontSize: 12, fontWeight: 'bold' }}>กดยกเลิกและคืนเครดิต</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ) : (
          /* Admin View */
          <View style={styles.section}>
            <Text style={styles.heading}>Admin Queue Management</Text>
            {orders.map((o) => (
              <View key={o.id} style={styles.orderItem}>
                <Text style={{ color: '#c084fc', fontWeight: 'bold' }}>{o.id} ({o.status})</Text>
                <Text style={{ color: '#fff' }}>{o.gameName} - ฿{o.price}</Text>
                <Text style={{ color: '#fbbf24' }}>UID: {o.uid}</Text>

                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                  {o.status === 'Queued' && (
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => setOrders(prev => prev.map(item => item.id === o.id ? { ...item, status: 'Processing' } : item))}
                    >
                      <Text style={styles.actionBtnText}>เริ่มดำเนินการ</Text>
                    </TouchableOpacity>
                  )}
                  {o.status === 'Processing' && (
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#059669' }]}
                      onPress={() => setOrders(prev => prev.map(item => item.id === o.id ? { ...item, status: 'Completed' } : item))}
                    >
                      <Text style={styles.actionBtnText}>เสร็จสิ้น</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  logoBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoText: { color: '#06b6d4', fontWeight: 'bold', fontSize: 16 },
  roleToggle: { flexDirection: 'row', backgroundColor: '#0f172a', padding: 2, borderRadius: 8 },
  roleBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  roleBtnActive: { backgroundColor: '#2563eb' },
  roleBtnActiveAdmin: { backgroundColor: '#9333ea' },
  roleBtnText: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  roleBtnTextActive: { color: '#ffffff' },
  scrollContent: { padding: 16 },
  section: { gap: 12 },
  walletCard: { backgroundColor: '#0f172a', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1e293b', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subText: { color: '#94a3b8', fontSize: 12 },
  walletBalance: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  addMoneyBtn: { backgroundColor: '#1e1b4b', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 4 },
  heading: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginTop: 8 },
  gameCard: { backgroundColor: '#0f172a', padding: 8, borderRadius: 12, borderWidth: 1, borderColor: '#1e293b', marginRight: 10, alignItems: 'center', width: 100 },
  gameImg: { width: 60, height: 60, borderRadius: 8, marginBottom: 6 },
  gameName: { color: '#fff', fontSize: 11, textAlign: 'center', fontWeight: 'bold' },
  selectedBorder: { borderColor: '#06b6d4', borderWidth: 2 },
  input: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#1e293b', borderRadius: 10, padding: 12, color: '#fff', fontSize: 14 },
  pkgCard: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#1e293b', padding: 14, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  submitBtn: { backgroundColor: '#0891b2', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  orderItem: { backgroundColor: '#0f172a', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#1e293b', marginBottom: 8, gap: 4 },
  cancelBtn: { marginTop: 6, paddingVertical: 6, alignItems: 'center', backgroundColor: '#3f1219', borderRadius: 6 },
  actionBtn: { backgroundColor: '#2563eb', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  actionBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});