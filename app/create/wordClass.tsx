import Input from "@/components/input";
import Section from "@/components/section";
import Spacing from "@/constants/Spacing";
import { db, useAuth } from "@/contexts/auth";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function CreateWordClassScreen() {
    const { user } = useAuth();
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);;

    const disabled = !name || loading;
    
    const createWordClass = async () => {
        if(disabled) return;

        setLoading(true);
        const docRef = doc(collection(db, 'wordClasses'));
        await setDoc(docRef, {
            id: docRef.id,
            name: name.trim(),
            authorId: user.uid,
        });

        navigation.goBack();
    }

    useHeaderOptions({
        headerText: 'New Word Class',
        headerRightText: loading ? 'Creating...' : 'Done',
        headerRightDisabled: disabled,
        onHeaderRightPress: createWordClass,
    })

    return(
        <SafeAreaView style={styles.container}>
            <Section>
                <Input 
                    placeholder="Word Class Name"
                    onTextChange={text => setName(text)}
                />
            </Section>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: Spacing.primary,
    }
})