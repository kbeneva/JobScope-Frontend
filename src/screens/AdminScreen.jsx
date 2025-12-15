// screens/AdminUsersScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, TextInput, Modal } from 'react-native';
import { useTheme } from '../styles/theme';
import { adminService } from '../services/adminService';
import { Ionicons } from '@expo/vector-icons';
import { createScreenStyles } from "../styles/screens/screenStyles";
import { createAdminStyles } from '../styles/screens/adminStyles';

export default function AdminUsersScreen() {
    const theme = useTheme();
    const styles = createScreenStyles(theme);
    const adminStyles = createAdminStyles(theme);

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    // Modal pour édition
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

                            // Si la page devient vide, revenir à la page précédente
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

    const renderUser = ({ item }) => (
        <View style={[adminStyles.userCard, { backgroundColor: theme.colors.surface }]}>
            <View style={adminStyles.userHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={[adminStyles.userName, { color: theme.colors.textPrimary }]}>
                        {item.firstName} {item.lastName}
                    </Text>
                    <Text style={[adminStyles.userEmail, { color: theme.colors.textSecondary }]}>
                        {item.email}
                    </Text>
                </View>

                <View style={[adminStyles.roleBadge, { backgroundColor: getRoleBadgeColor(item.role) }]}>
                    <Text style={adminStyles.roleText}>{item.role}</Text>
                </View>
            </View>

            <Text style={[adminStyles.createdAt, { color: theme.colors.textSecondary }]}>
                Created: {new Date(item.created_at).toLocaleDateString()}
            </Text>

            <View style={adminStyles.actions}>
                <TouchableOpacity
                    onPress={() => openEditModal(item)}
                    style={[adminStyles.actionButton, { backgroundColor: theme.colors.primary }]}
                >
                    <Ionicons name="pencil" size={16} color="#fff" />
                    <Text style={adminStyles.actionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleDeleteUser(item._id, `${item.firstName} ${item.lastName}`)}
                    style={[adminStyles.actionButton, { backgroundColor: theme.colors.error }]}
                >
                    <Ionicons name="trash" size={16} color="#fff" />
                    <Text style={adminStyles.actionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

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
            {/* Header */}
            <View style={adminStyles.header}>
                <Text style={[adminStyles.headerTitle, { color: theme.colors.textPrimary }]}>
                    Admin Users
                </Text>
                <Text style={[adminStyles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                    {total} users total
                </Text>
            </View>

            {/* User List */}
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item._id}
                contentContainerStyle={adminStyles.listContent}
                refreshing={loading}
                onRefresh={fetchUsers}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <View style={[adminStyles.pagination, { backgroundColor: theme.colors.surface }]}>
                    <TouchableOpacity
                        disabled={page === 1}
                        onPress={() => setPage(page - 1)}
                        style={[adminStyles.paginationButton, page === 1 && adminStyles.disabled]}
                    >
                        <Ionicons name="chevron-back" size={20} color={page === 1 ? '#ccc' : theme.colors.primary} />
                        <Text style={{ color: page === 1 ? '#ccc' : theme.colors.primary }}>
                            Previous
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ color: theme.colors.textPrimary, fontFamily: 'Poppins_600SemiBold' }}>
                        {page} / {totalPages}
                    </Text>

                    <TouchableOpacity
                        disabled={page === totalPages}
                        onPress={() => setPage(page + 1)}
                        style={[adminStyles.paginationButton, page === totalPages && adminStyles.disabled]}
                    >
                        <Text style={{ color: page === totalPages ? '#ccc' : theme.colors.primary }}>
                            Next
                        </Text>
                        <Ionicons name="chevron-forward" size={20} color={page === totalPages ? '#ccc' : theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Edit Modal */}
            <Modal
                visible={editModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={adminStyles.modalOverlay}>
                    <View style={[adminStyles.modalContent, { backgroundColor: theme.colors.surface }]}>
                        <Text style={[adminStyles.modalTitle, { color: theme.colors.textPrimary }]}>
                            Edit User
                        </Text>

                        <TextInput
                            style={[adminStyles.input, {
                                backgroundColor: theme.colors.background,
                                color: theme.colors.textPrimary,
                            }]}
                            placeholder="First Name"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={editForm.firstName}
                            onChangeText={(text) => setEditForm({ ...editForm, firstName: text })}
                        />

                        <TextInput
                            style={[adminStyles.input, {
                                backgroundColor: theme.colors.background,
                                color: theme.colors.textPrimary,
                            }]}
                            placeholder="Last Name"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={editForm.lastName}
                            onChangeText={(text) => setEditForm({ ...editForm, lastName: text })}
                        />

                        <TextInput
                            style={[adminStyles.input, {
                                backgroundColor: theme.colors.background,
                                color: theme.colors.textPrimary,
                            }]}
                            placeholder="Email"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={editForm.email}
                            onChangeText={(text) => setEditForm({ ...editForm, email: text })}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={[adminStyles.input, {
                                backgroundColor: theme.colors.background,
                                color: theme.colors.textPrimary,
                            }]}
                            placeholder="Role (user/admin/moderator)"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={editForm.role}
                            onChangeText={(text) => setEditForm({ ...editForm, role: text })}
                        />

                        <View style={adminStyles.modalButtons}>
                            <TouchableOpacity
                                onPress={() => setEditModalVisible(false)}
                                style={[adminStyles.modalButton, { backgroundColor: '#ccc' }]}
                            >
                                <Text style={adminStyles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleUpdateUser}
                                style={[adminStyles.modalButton, { backgroundColor: theme.colors.primary }]}
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

