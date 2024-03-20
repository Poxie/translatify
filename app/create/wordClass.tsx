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

export default function CreateWordClassScreen({ route: {
    params
} }: NativeStackScreenProps<ModalStackParamList, 'CreateWordClass'>) {
    const navigation = useNavigation();

    const { user } = useAuth();
    const { getWordClassById } = useDatabase();

    const prevWordClass = getWordClassById(params?.prevId);

    const [name, setName] = useState(prevWordClass?.name || '');
    const [loading, setLoading] = useState(false);;

    const disabled = !name || loading;
    
    const createWordClass = async () => {
        if(disabled) return;

        setLoading(true);
        
        if(!prevWordClass) {
            const docRef = doc(collection(db, 'wordClasses'));
            await setDoc(docRef, {
                id: docRef.id,
                name: name.trim(),
                authorId: user.uid,
            });

            navigation.goBack();
            return;
        }

        const docRef = doc(collection(db, 'wordClasses'), prevWordClass.id);
        await updateDoc(docRef, {
            name: name.trim(),
        });
        setLoading(false);
    }

    useHeaderOptions({
        headerText: prevWordClass ? 'Edit Word Class' : 'New Word Class',
        headerRightText: prevWordClass ? (
            loading ? 'Saving...' : 'Save'
        ) : (
            loading ? 'Creating...' : 'Done'
        ),
        headerRightDisabled: disabled,
        onHeaderRightPress: createWordClass,
    })

    return(
        <SafeAreaView style={styles.container}>
            <Section>
                <Input 
                    placeholder="Word Class Name"
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
    }
})