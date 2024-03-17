import React, { useContext, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  Alert,
} from "react-native";
import Logo from "../assets/images/logo-vector.png";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const registerValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
 
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is required"),
 
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  
});

const RegisterScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler(
   name,
  
    email,
    
    password,
   
  ) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(
        name,
       
        email,
       
        password,
       
      );
      const newtoken = token.toString();
     
      if (newtoken === "true") {
        navigation.navigate("Login");
      } else {
        Alert.alert("Internal server error", "Please try again later", [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]);
      }
      // authCtx.authenticate(newtoken);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <Formik
      initialValues={{
        name: "",

        email: "",

        password: "",
      }}
      validationSchema={registerValidationSchema}
      onSubmit={(values) =>
        signupHandler(values.name, values.email, values.password)
      }
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        setFieldTouched,
        touched,
        isValid,
      }) => (
        <View style={styles.container}>
          <Image
            source={Logo}
            style={[
              styles.logo,
              { height: height * 0.18 },
              { marginBottom: 30 },
            ]}
            resizeMode="contain"
          />

          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              value={values.firstname}
              placeholder="Enter name"
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("name")}
            />
            {errors.name && touched.name && (
              <Text style={styles.errors}>{errors.name}</Text>
            )}

            <TextInput
              style={styles.input}
              value={values.email}
              placeholder="Enter email"
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={styles.errors}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              value={values.password}
              placeholder="Enter password"
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errors}>{errors.password}</Text>
            )}

            <Button
              title="Register"
              onPress={handleSubmit}
              disabled={!isValid}
              style={[
                styles.submitbutton,
                { backgroundColor: isValid ? "#1B75BB" : "#A5C9CA" },
              ]}
            />

            <View style={styles.bottomTextView}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
    padding: 5,
  },
  link: {
    color: "#53C1BA",
    marginLeft: 5,
  },
  errors: {
    color: "red",
  },
  bottomTextView: {
    flexDirection: "row",
    marginTop: 20,
  },
  bottomText: {
    color: "#676A6C",
  },
});

export default RegisterScreen;
