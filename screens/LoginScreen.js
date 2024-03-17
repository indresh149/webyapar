import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/images/logo-vector.png';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';
import axios from 'axios';
import BASE_URL from '../config';
import { Colors } from '../constants/styles';


const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email Address is required'),
  password: yup.string()
    .required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  async function loginHandler(email, password) {

    setIsAuthenticating(true);
    try {
      const { token, tokenStatus } = await login(email, password);
      authCtx.authenticate(token);
      authCtx.getEmail(email);
      //fetchData()
      if(tokenStatus == 500){
        Alert.alert(
          "Internal server error",
          "Please try again later",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ]
        );
      }
      else if(tokenStatus == 401){
        Alert.alert(
          "Invalid Credentials",
          "Please try again",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  // async function fetchData() {
  //   const jwtToken = await AsyncStorage.getItem('token');
  //   const response = await axios.get(`${BASE_URL}/account/user`, {
  //     headers: {
  //       'Authorization': `Bearer ${jwtToken}`
  //     }
  //   });
  //   authCtx.addfirstName(response.data.firstName);
  //   authCtx.addlastName(response.data.lastName);
  // };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => loginHandler(values.email, values.password)}
      validationSchema={loginValidationSchema}>

      {({ handleChange, handleSubmit, values, errors, setFieldTouched, touched, isValid }) => (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image source={Logo}
              style={[styles.logo, { height: height * 0.7 }, { marginBottom: 50 }]}
              resizeMode="contain"
            />
            <View style={styles.wrapper}>
              <TextInput
                style={styles.input}
                value={values.email}
                placeholder="Enter email"
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {(errors.email && touched.email) &&
                <Text style={styles.errors}>{errors.email}</Text>
              }

              <TextInput
                style={styles.input}
                value={values.password}
                placeholder="Enter password"
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry
              />
              {(errors.password && touched.password) &&
                <Text style={styles.errors}>{errors.password}</Text>
              }

              <Button
                title="Login"
                disabled={!isValid}
                onPress={handleSubmit}
                style={[
                  styles.loginButton,
                  { backgroundColor: isValid ? '#1B75BB' : '#A5C9CA' },
                ]}
              />

              <View style={styles.bottomTextView}>
                <Text style={styles.textshow}>Don't have an account? </Text>
                <TouchableOpacity onPress={switchAuthModeHandler}>
                  <Text style={styles.link}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  
    padding: 5
  },
  link: {
    color: Colors.green,
   
  },
  logo: {
    width: '80%',
    maxWidth: 450,
    maxHeight: 200,
    marginBottom: 180,
    paddingBottom: 150,
  },
  errors: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  textshow: {
    color: Colors.grey,
  
  },
  bottomTextView: {
    flexDirection: 'row',
    marginTop: 20
  }
});

export default LoginScreen;
