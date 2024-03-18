import Divider from "@/components/divider";
import Input from "@/components/input";
import Section from "@/components/section";
import Selector from "@/components/selector";
import BorderRadius from "@/constants/BorderRadius";
import Spacing from "@/constants/Spacing";
import { db, useAuth } from "@/contexts/auth";
import useColors from "@/hooks/useColors";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { doc, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const HEADER_TEXT = 'New Word';
export default function CreateScreen() {
    const { user } = useAuth();
    const colors = useColors();
    const navigation = useNavigation();

    const [info, setInfo] = useState({
        term: '',
        definition: '',
    })
    const [feedback, setFeedback] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

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
        await addDoc(collection(db, 'words'), {
            term: info.term,
            definition: info.definition,
            authorId: user.uid,
        })
        navigation.goBack();
    }

    useHeaderOptions({
        headerText: HEADER_TEXT,
        headerLeftText: 'Cancel',
        headerRightText: 'Done',
        onHeaderLeftPress: navigation.goBack,
        onHeaderRightPress: addWord,
        headerRightDisabled: disabled,
    });

    return(
        <View style={styles.container}>
            <Section>
                <Input 
                    onTextChange={text => updateInfo('term', text)}
                    placeholder="Term"
                />
                <Divider />
                <Input 
                    style={{ minHeight: 100 }}
                    onTextChange={text => updateInfo('definition', text)}
                    placeholder="Definition"
                />
            </Section>
            <Section>
                <Selector 
                    selectorText="Category"
                    screen={"SelectCategory"}
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