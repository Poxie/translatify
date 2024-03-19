import Divider from "@/components/divider";
import Input from "@/components/input";
import Section from "@/components/section";
import Selector from "@/components/selector";
import Spacing from "@/constants/Spacing";
import { db, useAuth } from "@/contexts/auth";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { doc, collection, setDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ModalStackParamList } from ".";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDatabase } from "@/contexts/database";
import { Word } from "@/types";

const getDummyWord: () => Partial<Word> = () => ({
    term: '',
    definition: '',
    categoryId: null,
    languageId: null,
})
export default function CreateScreen({ route: { params } }: NativeStackScreenProps<ModalStackParamList, 'Create'>) {
    const { prevId, categoryId, languageId } = params;
    
    const { user } = useAuth();
    const { getWordById, getCategoryById, getLanguageById } = useDatabase();

    const navigation = useNavigation();

    const prevWord = useMemo(() => getWordById(prevId), [prevId]);
    const headerText = prevWord ? prevWord.term : 'New Word';

    const [info, setInfo] = useState(prevWord || getDummyWord())
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInfo(prev => {
            const newArgs = Object.entries(params).filter(([key, value]) => value !== undefined);

            const newInfo = newArgs.reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: value,
                }
            }, prev);

            return newInfo;
        })
    }, [params]);
    
    const category = useMemo(() => (
        info.categoryId ? getCategoryById(info.categoryId) : undefined
    ), [info.categoryId]);
    const language = useMemo(() => (
        info.languageId ? getLanguageById(info.languageId) : undefined
    ), [info.languageId]);

    const disabled = !info.term || !info.definition || loading;

    const updateInfo = (key: keyof typeof info, value: string) => {
        setInfo({
            ...info,
            [key]: value,
        });
    }
    const addWord = async () => {
        if(disabled) return;

        setLoading(true);
        
        if(!prevWord) {
            const docRef = doc(collection(db, 'words'));
            await setDoc(docRef, {
                id: docRef.id,
                term: info.term,
                definition: info.definition,
                categoryId: info.categoryId,
                languageId: info.languageId,
                authorId: user.uid,
            });
            navigation.goBack();
            return;
        }

        const docRef = doc(collection(db, 'words'), prevWord.id);
        await setDoc(docRef, info);
        setLoading(false);
    }

    useHeaderOptions({
        headerText,
        headerLeftText: prevWord ? 'Close' : 'Cancel',
        headerRightText: prevWord ? loading ? 'Saving...' : 'Save' : 'Done',
        onHeaderLeftPress: navigation.goBack,
        onHeaderRightPress: addWord,
        headerRightDisabled: disabled,
    });

    return(
        <View style={styles.container}>
            <Section>
                <Input 
                    defaultValue={info.term}
                    onTextChange={text => updateInfo('term', text)}
                    placeholder="Term"
                />
                <Divider />
                <Input 
                    defaultValue={info.definition}
                    style={{ minHeight: 100 }}
                    onTextChange={text => updateInfo('definition', text)}
                    placeholder="Definition"
                />
            </Section>
            <Section>
                <Selector 
                    activeText={category?.name}
                    selectorText="Category"
                    screen={"SelectCategory"}
                    params={{
                        ...params,
                        currentActive: info.categoryId,
                    }}
                />
                <Divider />
                <Selector 
                    activeText={language?.name}
                    selectorText="Language"
                    screen={"SelectLanguage"}
                    params={{
                        ...params,
                        currentActive: info.languageId,
                    }}
                />
            </Section>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Spacing.primary,
        paddingTop: Spacing.secondary,
        gap: Spacing.primary,
    },
})