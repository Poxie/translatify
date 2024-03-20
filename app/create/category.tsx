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

export default function CreateCategoryScreen({ route: {
    params
} }: NativeStackScreenProps<ModalStackParamList, 'CreateCategory'>) {
    const navigation = useNavigation();
    
    const { user } = useAuth();
    const { getCategoryById } = useDatabase();

    const prevCategory = getCategoryById(params?.prevId);

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        name: prevCategory?.name || '',
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
        
        if(!prevCategory) {
            const docRef = doc(collection(db, 'categories'));
            await setDoc(docRef, {
                id: docRef.id,
                name: info.name.trim(),
                authorId: user.uid,
            });
            navigation.goBack();
            return
        }

        const docRef = doc(collection(db, 'categories'), prevCategory.id);
        await updateDoc(docRef, {
            name: info.name.trim(),
        });
        setLoading(false);
    }

    useHeaderOptions({
        headerText: prevCategory ? 'Edit Category' : 'New Category',
        headerRightText: prevCategory ? (
            loading ? 'Saving...' : 'Save'
        ): (
            loading ? 'Creating...' : 'Done'
        ),
        onHeaderRightPress: createCategory,
        headerRightDisabled: !info.name,
    })
    return(
        <SafeAreaView style={styles.container}>
            <Section>
                <Input 
                    placeholder="Category Name"
                    onTextChange={text => updateInfo('name', text)}
                    defaultValue={info.name}
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