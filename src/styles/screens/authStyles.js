import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createAuthStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    header: {
      paddingTop: 60,
      paddingBottom: 30,
      paddingHorizontal: theme.spacing.xl,
    },
    backButton: {
      position: "absolute",
      top: theme.spacing.xxl,
      left: theme.spacing.lg,
      flexDirection: "row",
      alignItems: "center",
    },
    backText: {
      color: theme.colors.white,
      fontSize: 16,
      marginLeft: 4,
    },
    titleContainer: {
      overflow: "hidden",
    },
    headerTitleWrapper: {
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl,
    },
    titleAbsolute: {
      position: "absolute",
      width: width - theme.spacing.xl * 2,
    },
    headerTitle: {
      ...theme.typography.h1,
      fontSize: 36,
      color: theme.colors.white,
      lineHeight: 42,
    },
    formContainer: {
      flex: 1,
      backgroundColor: theme.colors.card,
      marginTop: -theme.spacing.lg,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing.xl,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xxl,
    },
    formsWrapper: {
      overflow: "hidden",
    },
    formAbsolute: {
      position: "absolute",
      width: width - theme.spacing.xl * 2,
    },
    inputContainer: {
      marginBottom: theme.spacing.md,
    },
    inputLabel: {
      ...theme.typography.inputLabel,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.xs,
    },
    input: {
      ...theme.typography.input,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.textSecondary,
      paddingVertical: theme.spacing.sm,
      color: theme.colors.textPrimary,
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.textSecondary,
    },
    passwordInput: {
      ...theme.typography.input,
      flex: 1,
      paddingVertical: theme.spacing.sm,
      color: theme.colors.textPrimary,
    },
    eyeIcon: {
      padding: theme.spacing.xs,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.xl,
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing.xl,
      minHeight: 50,
    },
    buttonText: {
      ...theme.typography.button,
      color: theme.colors.textButton,
      letterSpacing: 0.5,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing.lg,
      gap: theme.spacing.xs,
    },
    footerText: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    footerLink: {
      ...theme.typography.bodyMedium,
      color: theme.colors.textPrimary,
      fontFamily: theme.typography.fontFamily.semibold,
    },
    errorText: {
      color: theme.colors.error,
      textAlign: "center",
      marginBottom: theme.spacing.md,
    },
  });
