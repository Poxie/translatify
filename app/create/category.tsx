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
import Select from "../select";
import SectionHeader from "@/components/section-header";

export default function CreateCategoryScreen({ route: {
    params
} }: NativeStackScreenProps<ModalStackParamList, 'CreateCategory'>) {
    const navigation = useNavigation();
    
    const { user } = useAuth();
    const { getCategoryById, categories } = useDatabase();

    const prevCategory = getCategoryById(params?.prevId);
    const prevParentCategory = getCategoryById(prevCategory?.parentId);

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        name: prevCategory?.name || '',
        parentId: prevCategory?.parentId || null,
    })

    const disabled = !info.name || loading;

    const updateInfo = (key: keyof typeof info, value: string | null) => {
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
                parentId: info.parentId,
                authorId: user.uid,
            });
            navigation.goBack();
            return
        }

        const docRef = doc(collection(db, 'categories'), prevCategory.id);
        await updateDoc(docRef, {
            name: info.name.trim(),
            parentId: info.parentId,
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
        headerLeftText: params?.canClose ? 'Close' : undefined,
        onHeaderLeftPress: params?.canClose ? navigation.goBack : undefined,
    })

    const selectableCategories = categories.filter(category => category.id !== prevCategory?.id);
    return(
        <SafeAreaView style={styles.container}>
            <Section>
                <Input 
                    placeholder="Category Name"
                    onTextChange={text => updateInfo('name', text)}
                    defaultValue={info.name}
                />
            </Section>
            <SectionHeader style={styles.header}>
                Parent category
            </SectionHeader>
            <Select 
                items={selectableCategories}
                currentActive={info.parentId || ''}
                onSelect={parentId => updateInfo('parentId', parentId === info.parentId ? null : parentId)}
                emptyLabel={'You have no categories yet.'}
                style={styles.select}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: Spacing.primary,
    },
    header: {
        marginTop: Spacing.primary,
        marginBottom: Spacing.tertiary,
    },
    select: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
})