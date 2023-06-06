import app from '@react-native-firebase/app';
import * as firebaseAuth from '@react-native-firebase/auth';
import * as firebaseStorage from '@react-native-firebase/storage';
import * as firebaseFirestore from '@react-native-firebase/firestore';

const firestore = firebaseFirestore.firebase.firestore();

const storage = firebaseStorage.firebase.storage();

const auth = firebaseAuth.firebase.auth();

export { app, firestore, storage, auth };
