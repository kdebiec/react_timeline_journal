export const defaultPostTypeValues = {
    id: 0,
    name: "",
    color: "#FFFFFF",
};

export type PostType = {
    id: number;
    name: string;
    color: string;
};

export const defaultPostTypesValues = {
    lastAddedId: 0,
    posttypes: []
};

export type PostTypes = {
    lastAddedId: number;
    posttypes: PostType[];
}