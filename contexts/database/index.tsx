import { Category, Word } from "@/types";
import { collection, query, where } from "firebase/firestore";
import { createContext, useContext } from "react"
import { db, useAuth } from "../auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const DatabaseContext = createContext<null | {
    words: Word[];
    categories: Category[];
    getWordById: (id: string) => Word | undefined;
    getCategoryById: (id?: string) => Category | undefined;
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

    const getWordById = (id: string) => {
        return (words || []).find(word => word.id === id) as Word | undefined;
    }
    const getCategoryById = (id?: string) => {
        if(!id) return;
        return (categories || []).find(category => category.id === id) as Category | undefined;
    }

    const value = {
        words: (words || []) as Word[],
        categories: (categories || []) as Category[],
        getCategoryById,
        getWordById,
    }
    return(
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}