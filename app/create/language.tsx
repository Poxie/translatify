import { Text } from "@/components/Themed";
import Input from "@/components/input";
import Section from "@/components/section";
import Spacing from "@/constants/Spacing";
import { db, useAuth } from "@/contexts/auth";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function CreateLanguageScreen() {
    const navigation = useNavigation();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const disabled = !name || loading;

    const createLanguage = async () => {
        if(disabled) return;

        setLoading(true);
        const docRef = doc(collection(db, 'languages'));
        await setDoc(docRef, {
            id: docRef.id,
            name: name.trim(),
            authorId: user.uid,
        });

        navigation.goBack();
    }

    useHeaderOptions({
        headerText: 'New Language',
        headerRightText: loading ? 'Creating...' : 'Done',
        headerRightDisabled: disabled,
        onHeaderRightPress: createLanguage,
    })
    return(
        <SafeAreaView style={styles.container}>
            <Section>
                <Input 
                    placeholder="Language Name"
                    onTextChange={text => setName(text)}
                />
            </Section>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: Spacing.primary,
    },
})