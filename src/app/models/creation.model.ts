export interface Creation {
    id : number;
    name: string;
    author: string;
    params: {
        [key: string]: any;
    }
}