import { Word } from "@/types";
import { collection, query, where } from "firebase/firestore";
import { createContext, useContext } from "react"
import { db, useAuth } from "../auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const DatabaseContext = createContext<null | {
    words: Word[];
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
    const [words, loading] = useCollectionData(wordsQuery);

    const value = {
        words: words as Word[],
        loading,
    }
    return(
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}