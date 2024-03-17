import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ImagePicker from "../components/ui/ImagePicker";
import { AuthContext } from "../store/auth-context";
import { Card } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../config";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const tempdata = [
    {
        id: "1",
        latitude: "2.698",
        longitude: "4.658",
        imageUrl: "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: "2",
        latitude: "2.698",
        longitude: "4.658",
        imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: "3",
        latitude: "2.698",
        longitude: "4.658",
        imageUrl: "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];

const ViewDocsUploadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const authCtx = useContext(AuthContext);
  const jwtToken = authCtx.token;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}data`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setData(responseData);
      console.log("responseData", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
            <FlatList
                data={tempdata}
                renderItem={({ item }) => (
                    <Card style={{ marginBottom: 10 }}>
                        <Text>Latitude: {item.latitude}</Text>
                        <Text>Longitude: {item.longitude}</Text>
                        <Image 
                            source={{ uri: item.imageUrl }}
                            style={styles.imageStyle}
                        />
                    </Card>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
  );
};

export default ViewDocsUploadScreen;

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
    imageStyle: {
        width: "100%",
        height: 200,
        marginTop: 10,
    },
});
