// screens/AdminUsersScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, TextInput, Modal, ScrollView } from 'react-native';
import { useTheme } from '../styles/theme';
import { adminService } from '../services/adminService';
import { Ionicons } from '@expo/vector-icons';
import { createScreenStyles } from "../styles/screens/screenStyles";
import { createAdminStyles } from '../styles/screens/adminStyles';
import { RadioButton } from 'react-native-paper';

export default function AdminUsersScreen() {
    const theme = useTheme();
    const styles = createScreenStyles(theme);
    const adminStyles = createAdminStyles(theme);

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await adminService.getAllUsers(page, 5);
            setUsers(response.items);
            setTotal(response.total);
            setTotalPages(response.pages);
        } catch (error) {
            Alert.alert('Error', 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = (userId, userName) => {
        Alert.alert(
            'Delete User',
            `Are you sure you want to delete ${userName}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await adminService.deleteUser(userId);
                            Alert.alert('Success', 'User deleted');

                            if (users.length === 1 && page > 1) {
                                setPage(page - 1);
                            } else {
                                fetchUsers();
                            }
                        } catch (error) {
                            Alert.alert('Error', error.message || 'Failed to delete user');
                        }
                    },
                },
            ]
        );
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
        setEditModalVisible(true);
    };

    const handleUpdateUser = async () => {
        try {
            await adminService.updateUser(selectedUser._id, editForm);
            Alert.alert('Success', 'User updated');
            setEditModalVisible(false);
            fetchUsers();
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to update user');
        }
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin': return theme.colors.primary;
            default: return theme.colors.success;
        }
    };

    if (loading && users.length === 0) {
        return (
            <View style={[adminStyles.container, adminStyles.centered]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={{ color: theme.colors.textSecondary, marginTop: 16 }}>
                    Loading users...
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={adminStyles.headerTitle}>
                    Admin Users
                </Text>
                <Text style={{
                    ...theme.typography.body,
                    color: theme.colors.textPrimary,
                }}>
                    {total} {total === 1 ? 'user' : 'users'}
                </Text>
            </View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
                showsVerticalScrollIndicator={false}
            >
                {totalPages > 1 && (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16
                    }}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: theme.colors.border,
                                borderRadius: 20,
                                padding: 8,
                                marginHorizontal: 4,
                                opacity: page === 1 ? 0.5 : 1
                            }}
                            onPress={() => setPage(page - 1)}
                            disabled={page === 1 || loading}
                        >
                            <Ionicons name="chevron-back" size={20} color={theme.colors.textSecondary} />
                        </TouchableOpacity>

                        <Text style={{
                            fontSize: 14,
                            color: theme.colors.textSecondary,
                            marginHorizontal: 8
                        }}>
                            {page} / {totalPages}
                        </Text>

                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: theme.colors.border,
                                borderRadius: 20,
                                padding: 8,
                                marginHorizontal: 4,
                                opacity: page === totalPages ? 0.5 : 1
                            }}
                            onPress={() => setPage(page + 1)}
                            disabled={page === totalPages || loading}
                        >
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                )}

                {/* users list */}
                <View>
                    {users.map((user) => (
                        <View
                            key={user._id}
                            style={adminStyles.userCard}
                        >
                            <View style={adminStyles.userHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text style={adminStyles.userName}>
                                        {user.firstName} {user.lastName}
                                    </Text>
                                    <Text style={adminStyles.userEmail}>
                                        {user.email}
                                    </Text>
                                </View>

                                <View style={[adminStyles.roleBadge, { backgroundColor: getRoleBadgeColor(user.role) }]}>
                                    <Text style={adminStyles.roleText}>{user.role}</Text>
                                </View>
                            </View>

                            <Text style={adminStyles.createdAt}>
                                Created: {new Date(user.created_at).toLocaleDateString()}
                            </Text>

                            <View style={adminStyles.actions}>
                                <TouchableOpacity
                                    onPress={() => openEditModal(user)}
                                    style={[adminStyles.actionButton, { backgroundColor: theme.colors.primary }]}
                                >
                                    <Ionicons name="pencil" size={16} color="#fff" />
                                    <Text style={adminStyles.actionText}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleDeleteUser(user._id, `${user.firstName} ${user.lastName}`)}
                                    style={[adminStyles.actionButton, { backgroundColor: theme.colors.error }]}
                                >
                                    <Ionicons name="trash" size={16} color="#fff" />
                                    <Text style={adminStyles.actionText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                    
                {loading && users.length > 0 && (
                    <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                        <ActivityIndicator size="small" color={theme.colors.primary} />
                    </View>
                )}
            </ScrollView>


            <Modal
                visible={editModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={adminStyles.modalOverlay}>
                    <View style={adminStyles.modalContent}>
                        <Text style={adminStyles.modalTitle}>
                            Edit User
                        </Text>

                        <TextInput
                            style={adminStyles.input}
                            placeholder="First Name"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={editForm.firstName}
                            onChangeText={(text) => setEditForm({ ...editForm, firstName: text })}
                        />

                        <TextInput
                            style={adminStyles.input}
                            placeholder="Last Name"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={editForm.lastName}
                            onChangeText={(text) => setEditForm({ ...editForm, lastName: text })}
                        />

                        <TextInput
                            style={adminStyles.input}
                            placeholder="Email"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={editForm.email}
                            onChangeText={(text) => setEditForm({ ...editForm, email: text })}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <View style={{ marginVertical: 12 }}>
                            <Text style={{
                                color: theme.colors.textPrimary,
                                marginBottom: 8,
                                fontFamily: 'Poppins_500Medium'
                            }}>
                                Role
                            </Text>

                            {/* USER */}
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => setEditForm({ ...editForm, role: 'user' })}
                            >
                                <RadioButton
                                    value="user"
                                    status={editForm.role === 'user' ? 'checked' : 'unchecked'}
                                    onPress={() => setEditForm({ ...editForm, role: 'user' })}
                                />
                                <Text style={{ color: theme.colors.textPrimary }}>User</Text>
                            </TouchableOpacity>

                            {/* ADMIN */}
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => setEditForm({ ...editForm, role: 'admin' })}
                            >
                                <RadioButton
                                    value="admin"
                                    status={editForm.role === 'admin' ? 'checked' : 'unchecked'}
                                    onPress={() => setEditForm({ ...editForm, role: 'admin' })}
                                />
                                <Text style={{ color: theme.colors.textPrimary }}>Admin</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={adminStyles.modalButtons}>
                            <TouchableOpacity
                                onPress={() => setEditModalVisible(false)}
                                style={[adminStyles.modalButton, {backgroundColor: theme.colors.error}]}
                            >
                                <Text style={adminStyles.modalButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleUpdateUser}
                                style={[adminStyles.modalButton, { backgroundColor: theme.colors.success }]}
                            >
                                <Text style={adminStyles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

