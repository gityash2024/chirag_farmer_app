import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { typography } from '../styles/Typography';

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      avatar: require('../../assets/notification-avatar-1.png'),
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '2h ago',
    },
    {
      id: '2',
      avatar: require('../../assets/notification-avatar-2.png'),
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '3h ago',
    },
    {
      id: '3',
      avatar: require('../../assets/notification-avatar-3.png'),
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '5h ago',
    },
    {
      id: '4',
      avatar: require('../../assets/notification-avatar-4.png'),
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1d ago',
    },
    {
      id: '5',
      avatar: require('../../assets/notification-avatar-5.png'),
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '2d ago',
    },
  ]);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.notificationContent}>
        <Text style={[styles.message, typography['sans-regular']]}>{item.message}</Text>
        <Text style={[styles.time, typography['sans-regular']]}>{item.time}</Text>
      </View>
      <TouchableOpacity onPress={() => removeNotification(item.id)} style={styles.removeButton}>
        <Text style={styles.removeIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image
        source={require('../../assets/empty-notifications-bg.png')}
        style={styles.emptyStateBackgroundIcon}
      />
      <Image
        source={require('../../assets/empty-notifications-icon.png')}
        style={styles.emptyStateIcon}
      />
      <Text style={[styles.emptyStateText, typography['sans-bold']]}>No notifications yet</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/arrow-right-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, typography['sans-bold']]}>Notifications</Text>
      </View>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 15,
  },
  listContent: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#6F6F6F',
    fontWeight: 'bold',
    
  },
  removeButton: {
    padding: 5,
  },
  removeIcon: {
    fontSize: 16,
    color: '#000000',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60, // Adjust as needed to control how far down the icon is positioned
  },
  emptyStateBackgroundIcon: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    opacity: 0.3,
    zIndex: 1,
  },
  emptyStateIcon: {
    width: 150, // Increase the width
    height: 150, // Increase the height
    marginBottom: 20,
    zIndex: 2,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#000000',
    zIndex: 2,
  },
});

export default NotificationsScreen;


