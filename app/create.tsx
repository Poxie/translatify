import Divider from "@/components/divider";
import Input from "@/components/input";
import Section from "@/components/section";
import Selector from "@/components/selector";
import BorderRadius from "@/constants/BorderRadius";
import Spacing from "@/constants/Spacing";
import useColors from "@/hooks/useColors";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

const HEADER_TEXT = 'New Word';
export default function CreateScreen() {
    const colors = useColors();
    const navigation = useNavigation();

    useHeaderOptions({
        headerText: HEADER_TEXT,
        headerLeftText: 'Cancel',
        headerRightText: 'Done',
        onHeaderLeftPress: navigation.goBack,
        onHeaderRightPress: () => console.log('Done'),
    })

    return(
        <View style={styles.container}>
            <Section>
                <Input 
                    onTextChange={console.log}
                    placeholder="Term"
                />
                <Divider />
                <Input 
                    style={{ minHeight: 100 }}
                    onTextChange={console.log}
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