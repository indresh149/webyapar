import { Alert, Image, StyleSheet, Text, View ,Platform} from 'react-native';
import {
    launchCameraAsync,
    launchImageLibraryAsync,
    useCameraPermissions,
    PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';


import OutlinedButton from '../ui/OutlinedButton'

function ImagePicker({ onTakeImage}) {
    const [pickedImage, setPickedImage] = useState();

    const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions();

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant camera permissions to use this app.'
            );
            return false;
        }

        return true;
    }

    async function takeImageHandler() {

        if ( Platform.OS == 'android') {
            Alert.alert(
                'Choose Option',
                'Choose from where you want to select image',
                [
                    {
                        text: 'Camera',
                        onPress: () => pickImage(),
                    },
                    {
                        text: 'Gallery',
                        onPress: () => OnGallery(),
                    },
                    {
                        text: 'Cancel',
                        onPress: () => Alert.alert('Cancel Pressed'),
                        style: 'cancel',
                    }
                ],
            )
        }
    }

    async function pickImage() {

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0]);
    }

    async function OnGallery() {
        const image = await launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0]);
    }

    const RemoveImage = () => {
        setPickedImage('');
        //setToastMsg('Image Removed')
    };

    let imagePreview = <Text style={styles.textstyle}>No image taken yet.</Text>;

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage}} />;
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>
                Take Image
            </OutlinedButton>
            <OutlinedButton onPress={RemoveImage}>
                Remove Image
            </OutlinedButton>

        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#53C1BA',
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textstyle: {
        color: '#676A6C',
        fontSize: 15,
        
        
    },
});