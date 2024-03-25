import Divider from "@/components/divider";
import Input from "@/components/input";
import Section from "@/components/section";
import Selector from "@/components/selector";
import Spacing from "@/constants/Spacing";
import { db, useAuth } from "@/contexts/auth";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { doc, collection, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ModalStackParamList } from ".";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDatabase } from "@/contexts/database";
import { Word } from "@/types";

const getDummyWord: () => Omit<Word, 'id' | 'authorId'> = () => ({
    term: '',
    definition: '',
    categoryId: null,
    languageId: null,
    wordClassId: null,
    translationId: null,
})
export default function CreateScreen({ route: { params } }: NativeStackScreenProps<ModalStackParamList, 'Create'>) {
    const { prevId, categoryId, languageId } = params;
    
    const { user } = useAuth();
    const { getWordById, getCategoryById, getWordClassById, getLanguageById, getWordTranslations } = useDatabase();

    const navigation = useNavigation();

    const prevWord = useMemo(() => getWordById(prevId), [prevId]);
    const headerText = prevWord ? prevWord.term : 'New Word';

    const [info, setInfo] = useState(prevWord || getDummyWord());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInfo(prev => {
            const newArgs = Object.entries(params).filter(([key, value]) => {
                return key !== 'translationIds' || value !== undefined
            });

            const newInfo = newArgs.reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: value,
                }
            }, prev);

            return newInfo;
        })
    }, [params]);

    const translationIds = useMemo(() => 
        params.translationIds || getWordTranslations(prevId).map(word => word.id), 
    [params.translationIds, prevId]);
    const category = info.categoryId ? getCategoryById(info.categoryId) : undefined
    const wordClass = info.wordClassId ? getWordClassById(info.wordClassId) : undefined
    const language = info.languageId ? getLanguageById(info.languageId) : undefined;
    const translations = translationIds.map(id => getWordById(id));
    const translationText = translations?.map(word => word?.term).join(', ');

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

        let translationId: string | null = null;
        if(translationIds.length) {
            for(const wordId of translationIds) {
                const word = getWordById(wordId);
                if(!word) continue;

                if(word.translationId) {
                    translationId = word.translationId;
                    break;
                }
            }
            if(!translationId) {
                translationId = prevId;
            }
            if(!translationId) {
                translationId = translationIds[0];
            }

            for(const wordId of translationIds) {
                const docRef = doc(collection(db, 'words'), wordId);
                await updateDoc(docRef, {
                    translationId: translationId,
                });
            }
        }

        const newInfo = {
            term: info.term,
            definition: info.definition,
            categoryId: info.categoryId,
            languageId: info.languageId,
            wordClassId: info.wordClassId,
            translationId: translationId,
            authorId: user.uid,
        }
        
        if(!prevWord) {
            const docRef = doc(collection(db, 'words'));
            await setDoc(docRef, {
                ...newInfo,
                id: docRef.id,
            });
            navigation.goBack();
            return;
        }

        const docRef = doc(collection(db, 'words'), prevWord.id);
        await updateDoc(docRef, newInfo);
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
                    activeText={wordClass?.name}
                    selectorText="Word class"
                    screen={"SelectWordClass"}
                    params={{
                        ...params,
                        currentActive: info.wordClassId,
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
            <Section>
                <Selector 
                    activeText={translationText}
                    selectorText="Translations"
                    screen={"SelectWord"}
                    params={{
                        ...params,
                        ...{
                            selectedIds: translationIds,
                            excludedIds: [prevId],
                            headerText: 'Select Translations',
                            returnProp: 'translationIds',
                            screen: 'Create',
                        }
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
        gap: Spacing.secondary,
    },
})