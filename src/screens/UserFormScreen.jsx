import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import BackHeader from "../components/BackHeader";
import { createUserFormStyles } from "../styles/screens/userFormStyles";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";

export default function UserFormScreen() {
  const theme = useTheme();
  const { user, updateUser } = useUser();
  const screenStyles = createScreenStyles(theme);
  const userFormStyles = createUserFormStyles(theme);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [biography, setBiography] = useState(user?.biography || "");
  const [interest, setInterest] = useState(user?.interest || "");
  const BIO_MAX = 250;

  const onSave = async () => {
    await updateUser({ firstName, lastName, email, biography, interest });
  };

  return (
    <View style={screenStyles.container}>
      <BackHeader title="Edit Profile" />
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={{ paddingHorizontal: 4 }}>
            <Text style={userFormStyles.label}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="John"
              placeholderTextColor={theme.colors.textSecondary}
              style={userFormStyles.input}
            />

            <Text style={userFormStyles.label}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Doe"
              placeholderTextColor={theme.colors.textSecondary}
              style={userFormStyles.input}
            />

            <Text style={userFormStyles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="johndoe@jobscope.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={theme.colors.textSecondary}
              style={userFormStyles.input}
            />

            <Text style={userFormStyles.label}>Bio</Text>
            <TextInput
              value={biography}
              onChangeText={(t) => t.length <= BIO_MAX && setBiography(t)}
              placeholder="Write something about you..."
              placeholderTextColor={theme.colors.textSecondary}
              style={[
                userFormStyles.input,
                { height: 110, textAlignVertical: "top" },
              ]}
              multiline
            />
            <Text
              style={{
                color: theme.colors.textSecondary,
                textAlign: "right",
                marginTop: 4,
              }}
            >
              {`${biography.length}/${BIO_MAX}`}
            </Text>
            <Text style={userFormStyles.label}>Interests</Text>
            <TextInput
              value={interest}
              onChangeText={setInterest}
              placeholder="Web Development, Cloud Computing, DevOps"
              placeholderTextColor={theme.colors.textSecondary}
              style={userFormStyles.input}
            />
          </ScrollView>

          <Button onPress={() => onSave} title="Save changes" />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
