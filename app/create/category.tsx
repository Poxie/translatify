import Input from "@/components/input";
import Section from "@/components/section";
import Spacing from "@/constants/Spacing";
import { db, useAuth } from "@/contexts/auth";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function CreateCategoryScreen() {
    const { user } = useAuth();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        name: '',
    })

    const disabled = !info.name || loading;

    const updateInfo = (key: keyof typeof info, value: string) => {
        setInfo({
            ...info,
            [key]: value,
        })
    }

    const createCategory = async () => {
        if(disabled) return;

        setLoading(true);
        const docRef = doc(collection(db, 'categories'));
        await setDoc(docRef, {
            id: docRef.id,
            name: info.name.trim(),
            authorId: user.uid,
        });

        navigation.goBack();
    }

    useHeaderOptions({
        headerText: 'New Category',
        headerRightText: loading ? 'Creating...' : 'Done',
        onHeaderRightPress: createCategory,
        headerRightDisabled: !info.name,
    })
    return(
        <SafeAreaView style={styles.container}>
            <Section>
                <Input 
                    placeholder="Category Name"
                    onTextChange={text => updateInfo('name', text)}
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