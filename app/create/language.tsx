import { Text } from "@/components/Themed";
import Input from "@/components/input";
import Section from "@/components/section";
import Spacing from "@/constants/Spacing";
import { db, useAuth } from "@/contexts/auth";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ModalStackParamList } from "..";
import { useDatabase } from "@/contexts/database";

export default function CreateLanguageScreen({ route: {
    params
} }: NativeStackScreenProps<ModalStackParamList, 'CreateLanguage'>) {
    const navigation = useNavigation();
    
    const { user } = useAuth();
    const { getLanguageById } = useDatabase();

    const prevLanguage = getLanguageById(params?.prevId);

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(prevLanguage?.name || '');

    const disabled = !name || loading;

    const createLanguage = async () => {
        if(disabled) return;

        setLoading(true);
        
        if(!prevLanguage) {
            const docRef = doc(collection(db, 'languages'));
            await setDoc(docRef, {
                id: docRef.id,
                name: name.trim(),
                authorId: user.uid,
            });
            navigation.goBack();
            return
        }

        const docRef = doc(collection(db, 'languages'), prevLanguage.id);
        await updateDoc(docRef, {
            name: name.trim(),
        });
        setLoading(false);
    }

    useHeaderOptions({
        headerText: prevLanguage ? 'Edit Language' : 'New Language',
        headerRightText: prevLanguage ? (
            loading ? 'Saving...' : 'Save'
        ) : (
            loading ? 'Creating...' : 'Done'
        ),
        headerRightDisabled: disabled,
        onHeaderRightPress: createLanguage,
    })
    return(
        <SafeAreaView style={styles.container}>
            <Section>
                <Input 
                    placeholder="Language Name"
                    onTextChange={text => setName(text)}
                    defaultValue={name}
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