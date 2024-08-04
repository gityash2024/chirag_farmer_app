import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { typography } from '../styles/Typography';

const WalletScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={[styles.backButtonText, typography['sans-medium']]}>← Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, typography['sans-bold']]}>Wallet</Text>
      <View style={styles.balanceContainer}>
        <Text style={[styles.balanceLabel, typography['sans-medium']]}>Available Balance</Text>
        <Text style={[styles.balanceAmount, typography['sans-bold']]}>₹5,000</Text>
      </View>
      <TouchableOpacity style={styles.addMoneyButton}>
        <Text style={[styles.addMoneyButtonText, typography['sans-bold']]}>Add Money</Text>
      </TouchableOpacity>
      <Text style={[styles.transactionTitle, typography['sans-medium']]}>Recent Transactions</Text>
      <ScrollView style={styles.transactionList}>
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles.transactionItem}>
            <View>
              <Text style={[styles.transactionName, typography['sans-medium']]}>Service Payment</Text>
              <Text style={[styles.transactionDate, typography['sans-regular']]}>24 Aug 2023</Text>
            </View>
            <Text style={[styles.transactionAmount, typography['sans-bold']]}>-₹1,200</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000',
  },
  balanceContainer: {
    backgroundColor: '#F6F6FE',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    color: '#000000',
  },
  addMoneyButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addMoneyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  transactionTitle: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  transactionName: {
    fontSize: 16,
    color: '#000000',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#FF0000',
  },
});

export default WalletScreen;