import { initializeApp } from "firebase/app";
import { User, createUserWithEmailAndPassword, getReactNativePersistence, initializeAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import Spacing from "@/constants/Spacing";
import FontSizes from "@/constants/FontSizes";
import BorderRadius from "@/constants/BorderRadius";
import { Text } from "@/components/Themed";
import Input from "@/components/input";
import useColors from "@/hooks/useColors";

const AuthContext = createContext<null | {
    user: User;
    loading: boolean;
}>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

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
export default function AuthProvider({ children }: {
    children: React.ReactNode;
}) {
    const colors = useColors();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const [type, setType] = useState<'signup' | 'signin'>('signup');
    const [feedback, setFeedback] = useState<null | string>(null);
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
                        inputMode="email"
                        multiline={false}
                        placeholder="Email"
                        onTextChange={text => updateInfo('email', text)}
                        style={[
                            styles.input,
                            { backgroundColor: colors.backgroundSecondary },
                        ]}
                    />
                    <Input
                        isPassword
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
                            isPassword
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

    const value = {
        user,
        loading,
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
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