import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Section from "../section";
import Input from "../input";
import Spacing from "@/constants/Spacing";
import LanguagePicker from "../language-picker";
import { useDatabase } from "@/contexts/database";
import { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import useColors from "@/hooks/useColors";
import { Text } from "../Themed";
import ListItem from "../list/ListItem";
import BorderRadius from "@/constants/BorderRadius";
import SectionHeader from "../section-header";
import Divider from "../divider";

export default function Search() {
    const colors = useColors();

    const { words, languages } = useDatabase();

    const [fromLanguage, setFromLanguage] = useState(languages[0].id);
    const [toLanguage, setToLanguage] = useState(languages[1].id);
    const [search, setSearch] = useState('');
    const [showAutoComplete, setShowAutoComplete] = useState(false);

    const swap = () => {
        const temp = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(temp);
    }
    const handleLanguageChange = (type: 'from' | 'to', language: string) => {
        if(type === 'from') {
            if(language === toLanguage) {
                swap();
                return;
            }
            setFromLanguage(language);
            return;
        }
        if(language === fromLanguage) {
            swap();
            return;
        }
        setToLanguage(language);
    }

    const results = words.filter(word => (
        word.term.toLowerCase().includes(search.toLowerCase()) &&
        word.languageId === fromLanguage
    ))
    const autoCompleteHeader = `${results.length} result${results.length === 1 ? '' : 's'}`;
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <LanguagePicker 
                    activeLanguageId={fromLanguage}
                    onSelect={language => handleLanguageChange('from', language)}
                />
                <Section style={styles.searchContainer}>
                    <Input 
                        placeholder="Search"
                        onTextChange={setSearch}
                        icon="search"
                    />
                    {search && (
                        <View style={[
                            styles.autocompleteContainer,
                            { backgroundColor: colors.backgroundSecondary },
                        ]}>
                            <ScrollView>
                                {results.length !== 0 && (
                                    <>
                                    <SectionHeader style={styles.autocompleteHeader}>
                                        {autoCompleteHeader}
                                    </SectionHeader>
                                    <Divider style={{ marginHorizontal: 0 }} />
                                    <View style={styles.autocompleteList}>
                                        {results.map(result => (
                                            <ListItem 
                                                {...result}
                                                key={result.id}
                                            />
                                        ))}
                                    </View>
                                    </>
                                )}
                                {results.length === 0 && (
                                    <Text style={{ 
                                        textAlign: 'center',
                                        paddingVertical: Spacing.primary,
                                    }}>
                                        No results found.
                                    </Text>
                                )}
                            </ScrollView>
                        </View>
                    )}
                </Section>
                <View style={styles.swapContainer}>
                    <TouchableOpacity
                        onPress={swap}
                        style={[
                            styles.swap,
                        ]}
                    >
                        <MaterialIcons 
                            name="swap-vert"
                            size={32}
                        />
                    </TouchableOpacity>
                </View>
                <LanguagePicker 
                    activeLanguageId={toLanguage}
                    onSelect={language => handleLanguageChange('to', language)}
                />
                <Section style={styles.results}>
                    <Text style={styles.emptyText}>
                        Search results will show up here.
                    </Text>
                </Section>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: Spacing.primary,
    },
    searchContainer: {
        position: 'relative',
        zIndex: 1,
    },
    autocompleteContainer: {
        borderRadius: BorderRadius.primary,
        position: 'absolute',
        width: '100%',
        top: '100%',
        transform: [{ translateY: Spacing.quaternary }],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        maxHeight: 250,
    },
    autocompleteHeader: {
        padding: Spacing.secondary,
    },
    autocompleteList: {
        gap: Spacing.secondary,
        padding: Spacing.secondary,
    },
    swapContainer: {
        marginVertical: Spacing.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swap: {
        padding: Spacing.tertiary,
        borderRadius: 120,
    },
    results: {
        padding: Spacing.primary,
    },
    emptyText: {
        textAlign: 'center',
        paddingVertical: 40,
    }
})