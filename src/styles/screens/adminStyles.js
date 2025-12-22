import { StyleSheet } from 'react-native';

export const createAdminStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },
  userCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flex: 1
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userName: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
  },
  userEmail: {
    ...theme.typography.body,
    color: theme.colors.textSecondary
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    textTransform: 'capitalize',
  },
  createdAt: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  paginationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.card,
    width: '90%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
  },
  modalTitle: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },
  input: {
    ...theme.typography.input,
    color: theme.colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    padding: 2,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});