import { Category, Language, Word, WordClass } from "@/types";
import { collection, query, where } from "firebase/firestore";
import { createContext, useContext } from "react"
import { db, useAuth } from "../auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const DatabaseContext = createContext<null | {
    words: Word[];
    categories: Category[];
    wordClasses: WordClass[];
    languages: Language[];
    getWordById: (id: string) => Word | undefined;
    getWordTranslations: (wordId: string) => Word[];
    getCategoryById: (id?: string | null) => Category | undefined;
    getWordClassById: (id?: string | null) => WordClass | undefined;
    getLanguageById: (id?: string | null) => Language | undefined;
    getCategoryWordCount: (categoryId: string) => number;
}>(null);

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if(!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
}

export default function DatabaseProvider({ children }: { 
    children: React.ReactNode 
}) {
    const { user } = useAuth();

    const wordsRef = collection(db, 'words');
    const wordsQuery = query(wordsRef, where('authorId', '==', user.uid));
    const [words] = useCollectionData(wordsQuery);

    const categoryRef = collection(db, 'categories');
    const categoryQuery = query(categoryRef, where('authorId', '==', user.uid));
    const [categories] = useCollectionData(categoryQuery);

    const wordClassesRef = collection(db, 'wordClasses');
    const wordClassesQuery = query(wordClassesRef, where('authorId', '==', user.uid));
    const [wordClasses] = useCollectionData(wordClassesQuery);

    const languageRef = collection(db, 'languages');
    const languageQuery = query(languageRef, where('authorId', '==', user.uid));
    const [languages] = useCollectionData(languageQuery);

    const getWordById = (id?: string | null) => {
        return (words || []).find(word => word.id === id) as Word | undefined;
    }
    const getCategoryById = (id?: string | null) => {
        if(!id) return;
        return (categories || []).find(category => category.id === id) as Category | undefined;
    }
    const getWordClassById = (id?: string | null) => {
        if(!id) return;
        return (wordClasses || []).find(wordClass => wordClass.id === id) as WordClass | undefined;
    }
    const getLanguageById = (id?: string | null) => {
        if(!id) return;
        return (languages || []).find(language => language.id === id) as Language | undefined;
    }
    const getCategoryWordCount = (categoryId: string) => {
        return (words || []).filter(word => word.categoryId === categoryId).length;
    }
    const getWordTranslations = (wordId: string) => {
        const word = getWordById(wordId);
        if(!word || !word.translationId) return [];

        return (words as Word[])?.filter(w => w.id !== wordId && w.translationId === word.translationId);
    }

    const value = {
        words: ((words || []) as Word[]).sort((a,b) => a.term.localeCompare(b.term)),
        categories: ((categories || []) as Category[]).sort((a,b) => a.name.localeCompare(b.name)),
        wordClasses: ((wordClasses || []) as WordClass[]).sort((a,b) => a.name.localeCompare(b.name)),
        languages: ((languages || []) as Language[]).sort((a,b) => a.name.localeCompare(b.name)),
        getWordTranslations,
        getCategoryWordCount,
        getWordClassById,
        getLanguageById,
        getCategoryById,
        getWordById,
    }
    return(
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}