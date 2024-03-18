import { Text } from './components/Themed';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { User, createUserWithEmailAndPassword, getReactNativePersistence, initializeAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Navigation from '@/app/index';
import FontSizes from './constants/FontSizes';
import useColors from './hooks/useColors';
import Spacing from './constants/Spacing';
import BorderRadius from './constants/BorderRadius';
import Input from './components/input';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGPtFaY1k4GwIOkuzHX70vjySt58P0F-0",
  authDomain: "translatify-417db.firebaseapp.com",
  databaseURL: "https://translatify-417db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "translatify-417db",
  storageBucket: "translatify-417db.appspot.com",
  messagingSenderId: "509495475485",
  appId: "1:509495475485:web:3f55b7b98f07466f30f5f4",
  measurementId: "G-TZPM699JL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export default function App() {
  const colors = useColors();
  
  const [type, setType] = useState<'signup' | 'signin'>('signup');
  const [user, setUser] = useState<User | null>(null);
  const [feedback, setFeedback] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user) {
        setUser(user);
        return;
      }
    })
  }, []);

  const updateInfo = (key: keyof typeof info, value: string) => {
    setFeedback(null);
    setInfo({
      ...info,
      [key]: value,
    });
  }
  const handleSwitch = () => {
    setType(type === 'signup' ? 'signin' : 'signup');
  }
  const handleSubmit = () => {
    const { email, password, repeatPassword } = info;
    
    if(!email) {
      setFeedback('Email is required.');
      return;
    }
    if(!password) {
      setFeedback('Password is required.');
      return;
    }
    if(type === 'signup') {
      if(password !== repeatPassword) {
        setFeedback('Passwords don\'t match.');
        return;
      }
    }

    setLoading(true);
    if(type === 'signup') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(credentials => {
          setUser(credentials.user);
        })
        .catch(error => {
          setFeedback(error.message);
          setLoading(false);
        })
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
          setUser(credentials.user);
        })
        .catch(error => {
          setFeedback(error.message);
          setLoading(false);
        })
    }
  }

  const isSigningIn = type === 'signin';

  if(!user) {
    return(
      <SafeAreaView style={[
        styles.container,
        { backgroundColor: colors.background }
      ]}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>
            {isSigningIn ? 'Sign in' : 'Sign up'}
          </Text>
          <Text style={styles.subHeader}>
            You have to {isSigningIn ? 'sign in' : 'sign up'} to use this application.
          </Text>
          <Input 
            multiline={false}
            placeholder="Email"
            onTextChange={text => updateInfo('email', text)}
            style={[
              styles.input,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          />
          <Input 
            multiline={false}
            placeholder="Password"
            onTextChange={text => updateInfo('password', text)}
            style={[
              styles.input,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          />
          {!isSigningIn && (  
            <Input 
              multiline={false}
              placeholder="Repeat password"
              onTextChange={text => updateInfo('repeatPassword', text)}
              style={[
                styles.input,
                { backgroundColor: colors.backgroundSecondary },
              ]}
            />
          )}
          {feedback && (
            <Text style={{ 
              fontSize: FontSizes.default,
              color: colors.error,
              marginVertical: Spacing.tertiary,
            }}>
              {feedback}
            </Text>
          )}
          <TouchableOpacity 
            disabled={loading}
            onPress={handleSubmit}
            style={[
              styles.button,
              { 
                backgroundColor: colors.button,
                marginTop: Spacing.tertiary
              }
            ]}
          >
            <Text style={[
              styles.buttonText,
              { color: colors.buttonText },
            ]}>
              {isSigningIn ? (
                loading ? 'Signing in...' : 'Sign in'
              ) : (
                loading ? 'Signing up...' : 'Sign up'
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.alternativeText}
            onPress={handleSwitch}
          >
            <Text>
              {isSigningIn ? 'Don\'t have an account? Sign up' : 'Already have an account? Sign in'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={[
            styles.button,
            { marginHorizontal: Spacing.primary }
          ]}
        >
          <Text style={styles.buttonText}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    padding: Spacing.primary,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
  },
  subHeader: {
    fontSize: FontSizes.large,
    marginBottom: Spacing.primary,
    marginTop: Spacing.tertiary,
  },
  input: {
    borderRadius: BorderRadius.primary,
    marginBottom: Spacing.tertiary,
  },
  alternativeText: {
    alignItems: 'center',
    marginTop: Spacing.secondary,
  },
  button: {
    padding: Spacing.primary,
    borderRadius: BorderRadius.primary,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FontSizes.large,
  }
})