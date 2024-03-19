export type Word = {
    id: string;
    term: string;
    definition: string;
    authorId: string;
    categoryId: string | null;
}
export type Category = {
    id: string;
    name: string;
    authorId: string;
}