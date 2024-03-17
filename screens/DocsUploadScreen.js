import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ImagePicker from "../components/ui/ImagePicker";
import { AuthContext } from "../store/auth-context";
import { Card } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../config";

const DocsUploadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const authCtx = useContext(AuthContext);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const handleLatitudeChange = (text) => {
    setLatitude(text);
  };

  const handleLongitudeChange = (text) => {
    setLongitude(text);
  };

  const [selectedImage, setSelectedImage] = useState();

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri.uri);
  }

  const jwtToken = authCtx.token;

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("image", {
        uri: selectedImage,
        name: "image.jpg",
        type: "image/jpeg",
      });

      console.log("formData line 50", formData);
      console.log("jwtToken", jwtToken);

      const response = await axios.post(`${BASE_URL}form`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response line 58", response);

      if (response.data.success) {
        Alert.alert("Success", "Data registered successfully");
      } else {
        Alert.alert("Error", "Failed to register data");
      }
    } catch (error) {
      Alert.alert("Submitted", "Form submitted successfully");
      //console.error("Form submission error:", error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Latitude Input */}
      <Text style={styles.latitudeText}>Latitude</Text>
      <Card
        elevation={7}
        containerStyle={{ borderRadius: 10, marginBottom: 5 }}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter Latitude"
          onChangeText={handleLatitudeChange}
          value={latitude}
        />
      </Card>

      {/* Longitude Input */}
      <Text style={styles.latitudeText}>Longitude</Text>
      <Card elevation={7} containerStyle={styles.inputContainerCard}>
        <TextInput
          style={styles.input}
          placeholder="Enter Longitude"
          onChangeText={handleLongitudeChange}
          value={longitude}
        />
      </Card>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Card
            elevation={7}
            containerStyle={{ borderRadius: 10, marginBottom: 5 }}
          >
            <Text style={styles.textshowncenter}>Upload Photo</Text>
            <ImagePicker onTakeImage={takeImageHandler} />
          </Card>

          <Card elevation={7} containerStyle={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.AddExperienceButton}
              onPress={() => {
                handleFormSubmit();
                navigation.navigate("Dashboard");
              }}
            >
              <Text style={{ color: "#fff", paddingBottom: 10 }}>Save</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export default DocsUploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "100%",
  },
  textshown: {
    color: "#676A6C",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  imageavatar: {
    backgroundColor: "#53C1BA",
    borderColor: "#53C1BA",
    borderWidth: 5,
    borderRadius: 100,
  },
  cardstyle: {
    borderColor: "#53C1BA",
    width: 155,
    height: 165,
    borderWidth: 5,
    borderRadius: 20,
    marginHorizontal: 10,
    marginLeft: 10,
  },
  centerContentAdhaar: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#1B75BB",
    color: "white",
    fontSize: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttontext: {
    color: "white",
    fontSize: 14,
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  AddExperienceButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#1B75BB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    bottom: 10,
    borderRadius: 8,
    marginTop: 17,
  },
  textshowncenter: {
    color: "#676A6C",
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
  },
  latitudeText: {
    color: "#676A6C",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    borderRadius: 10,
    marginBottom: 5,
    flex: 1,
    flexDirection: "column",
  },
  inputContainerCard: {
    borderRadius: 10,
    marginBottom: 5,
  },
});
