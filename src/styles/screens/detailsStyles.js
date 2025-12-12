import { StyleSheet } from "react-native";

export const createDetailsStyles = (theme) => StyleSheet.create({
  relative: {
    position: 'relative',
  },
  bookmark: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  flex1: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors?.textPrimary || theme.text,
  },
  company: {
    fontSize: 15,
    color: theme.colors?.textSecondary || theme.textSecondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  location: {
    fontSize: 15,
    color: theme.colors?.textSecondary || theme.textSecondary,
    marginLeft: 4,
  },
  published: {
    fontSize: 14,
    color: theme.colors?.textSecondary || theme.textSecondary,
    marginLeft: 12,
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors?.border || theme.border,
    marginBottom: 16,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors?.primary || theme.primary,
    marginRight: 20,
    paddingVertical: 10,
  },
  tabActiveLabel: {
    fontWeight: '600',
    color: theme.colors?.primary || theme.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: theme.colors?.textPrimary || theme.text,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors?.textSecondary || theme.textSecondary,
  },
});