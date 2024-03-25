export type Word = {
    id: string;
    term: string;
    definition: string;
    authorId: string;
    categoryId: string | null;
    languageId: string | null;
    wordClassId: string | null;
    translationId: string | null;
}
export type Category = {
    id: string;
    name: string;
    authorId: string;
    parentId: string | null;
}
export type Language = {
    id: string;
    name: string;
    authorId: string;
}
export type WordClass = {
    id: string;
    name: string;
    authorId: string;
}