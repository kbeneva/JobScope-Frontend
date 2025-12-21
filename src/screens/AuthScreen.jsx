import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../styles/theme";
import { createAuthStyles } from "../styles/screens/authStyles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import { authService } from "../services/authService";

const { width } = Dimensions.get("window");

export default function AuthScreen({ route }) {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const navigation = useNavigation();
  const { login } = useUser();

  const initialIsLogin = route?.name === "Login";
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);

  const slideAnim = useRef(
    new Animated.Value(initialIsLogin ? 0 : -width)
  ).current;

  const handleLogin = async () => {
    setLoginError(null);

    if (!email || !password) {
      setLoginError("Please enter both email and password.");
      return;
    }

    setLoginLoading(true);

    try {
      await login(email.toLowerCase().trim(), password);
      navigation.navigate("Tabs");
    } catch {
      setLoginError("Incorrect email or password.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async () => {
    setSignupError(null);

    if (!firstName || !lastName || !signupEmail || !signupPassword) {
      setSignupError("Please fill in all fields.");
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters.");
      return;
    }

    setSignupLoading(true);

    try {
      const trimmedEmail = signupEmail.toLowerCase().trim();

      try {
        await authService.register({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: trimmedEmail,
          password: signupPassword,
        });
      } catch (registerErr) {
        if (registerErr.response?.status !== 409) {
          throw registerErr;
        }
      }

      await login(trimmedEmail, signupPassword);

      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    } catch (err) {
      if (err.response?.status === 401) {
        setSignupError(
          "Invalid credentials. Please check your email and password."
        );
      } else if (err.response?.data?.code === "USER_EXISTS") {
        setSignupError(
          "An account with this email already exists with a different password."
        );
      } else {
        setSignupError(
          err?.response?.data?.message ||
            err.message ||
            "Signup failed. Please try again."
        );
      }
    } finally {
      setSignupLoading(false);
    }
  };

  const switchToSignup = () => {
    setIsLogin(false);
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const switchToLogin = () => {
    setIsLogin(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={theme.colors.gradients.background}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Tabs", { screen: "Profile" })}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={theme.colors.white}
            />
            <Text style={styles.backText}>Go back</Text>
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Animated.View
              style={[
                styles.headerTitleWrapper,
                styles.titleAbsolute,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <Text style={styles.headerTitle}>Welcome</Text>
              <Text style={styles.headerTitle}>Back!</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.headerTitleWrapper,
                {
                  transform: [{ translateX: Animated.add(slideAnim, width) }],
                },
              ]}
            >
              <Text style={styles.headerTitle}>Create an</Text>
              <Text style={styles.headerTitle}>account</Text>
            </Animated.View>
          </View>
        </LinearGradient>

        <View style={styles.formContainer}>
          <View style={styles.formsWrapper}>
            <Animated.View
              style={[
                styles.formAbsolute,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder="Enter your password"
                    placeholderTextColor={theme.colors.textSecondary}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={22}
                      color={theme.colors.textPrimary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {loginError && (
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  {loginError}
                </Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <ActivityIndicator color={theme.colors.textButton} />
                ) : (
                  <Text style={styles.buttonText}>LOG IN</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={switchToSignup}>
                  <Text style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            <Animated.View
              style={{
                transform: [{ translateX: Animated.add(slideAnim, width) }],
              }}
            >
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Enter your first name"
                  placeholderTextColor={theme.colors.textSecondary}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Enter your last name"
                  placeholderTextColor={theme.colors.textSecondary}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={signupEmail}
                  onChangeText={setSignupEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={signupPassword}
                    onChangeText={setSignupPassword}
                    secureTextEntry={!showSignupPassword}
                    placeholder="Create a password"
                    placeholderTextColor={theme.colors.textSecondary}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowSignupPassword(!showSignupPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={
                        showSignupPassword ? "eye-outline" : "eye-off-outline"
                      }
                      size={22}
                      color={theme.colors.textPrimary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {signupError && (
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  {signupError}
                </Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSignup}
                disabled={signupLoading}
              >
                {signupLoading ? (
                  <ActivityIndicator color={theme.colors.textButton} />
                ) : (
                  <Text style={styles.buttonText}>SIGN UP</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={switchToLogin}>
                  <Text style={styles.footerLink}>Log in</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
