import React, { useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, ViewStyle, TextStyle, ActivityIndicator, Alert } from "react-native"
import { Button, Screen, Text, TextField, TextFieldAccessoryProps, Icon } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { navigate } from "../navigators/navigationUtilities"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: React.FC<LoginScreenProps> = observer(function LoginScreen() {
  const { authenticationStore } = useStores()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const passwordInput = useRef<TextInput>(null)
  const confirmPasswordInput = useRef<TextInput>(null)
  const phoneInput = useRef<TextInput>(null)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await authenticationStore.login({ email, password })
      if (response.kind === "ok") {
        navigate("AidRequest")
      } else {
        setErrorMessage(response.kind || "Login failed")
      }
    } catch (error) {
      Alert.alert("Login failed", "An error occurred during login.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")
    try {
      const response = await authenticationStore.register({
        email,
        password,
        name,
        phone,
        role: "user",
      })
      if (response.kind === "ok") {
        setSuccessMessage("Registration successful!")
        setTimeout(() => navigate("AidRequest"), 1000)
      } else {
        setErrorMessage(
          response.kind === "bad-data"
            ? "Registration failed"
            : response.kind || "Registration failed",
        )
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.")
    } finally {
      setIsLoading(false)
    }
  }

  const PasswordRightAccessory: React.FC<TextFieldAccessoryProps> = (props) => (
    <Icon
      icon={isPasswordHidden ? "view" : "hidden"}
      color={colors.palette.neutral800}
      containerStyle={props.style}
      size={20}
      onPress={() => setIsPasswordHidden(!isPasswordHidden)}
    />
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text preset="heading" style={$heading}>
        {isRegistering ? "Register" : "Login"}
      </Text>
      <Text preset="subheading" style={$subheading}>
        {isRegistering ? "Create a new account" : "Sign in to your account"}
      </Text>

      {errorMessage ? <Text style={$errorMessage}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={$successMessage}>{successMessage}</Text> : null}

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="Email"
        placeholder="Enter your email"
        onSubmitEditing={() => passwordInput.current?.focus()}
      />

      <TextField
        ref={passwordInput}
        value={password}
        onChangeText={setPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        label="Password"
        placeholder="Enter your password"
        RightAccessory={PasswordRightAccessory}
        onSubmitEditing={isRegistering ? () => confirmPasswordInput.current?.focus() : handleLogin}
      />

      {isRegistering && (
        <>
          <TextField
            ref={confirmPasswordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isPasswordHidden}
            label="Confirm Password"
            placeholder="Confirm your password"
            RightAccessory={PasswordRightAccessory}
            onSubmitEditing={() => phoneInput.current?.focus()}
          />
          <TextField
            value={name}
            onChangeText={setName}
            containerStyle={$textField}
            autoCapitalize="words"
            autoComplete="name"
            autoCorrect={false}
            label="Name"
            placeholder="Enter your name"
            onSubmitEditing={() => phoneInput.current?.focus()}
          />
          <TextField
            ref={phoneInput}
            value={phone}
            onChangeText={setPhone}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="tel"
            autoCorrect={false}
            keyboardType="phone-pad"
            label="Phone"
            placeholder="Enter your phone number"
            onSubmitEditing={handleRegister}
          />
        </>
      )}

      <Button
        text={isRegistering ? "Register" : "Login"}
        onPress={isRegistering ? handleRegister : handleLogin}
        style={$button}
        disabled={isLoading}
      />

      <Button
        text={isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        onPress={() => setIsRegistering(!isRegistering)}
        style={$toggleButton}
      />

      {isLoading && <ActivityIndicator size="large" color={colors.palette.accent100} />}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $heading: TextStyle = {
  marginBottom: spacing.sm,
}

const $subheading: TextStyle = {
  marginBottom: spacing.lg,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $button: ViewStyle = {
  marginTop: spacing.md,
}

const $toggleButton: ViewStyle = {
  marginTop: spacing.md,
}

const $errorMessage: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
}

const $successMessage: TextStyle = {
  color: colors.palette.accent300,
  marginBottom: spacing.md,
}
