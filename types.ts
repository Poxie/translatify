export type Word = {
    id: string;
    term: string;
    definition: string;
    authorId: string;
    categoryId: string | null;
    languageId: string | null;
}
export type Category = {
    id: string;
    name: string;
    authorId: string;
}
export type Language = {
    id: string;
    name: string;
    authorId: string;
}