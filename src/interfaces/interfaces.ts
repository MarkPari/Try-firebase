export interface Books {
    title: string,
    author: string
}

export type Document = {id: string}

export type TT = Books & Document;