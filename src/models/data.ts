export interface InitialData {
    url: string
    title: string
    imageUrl: string
}

export interface Data extends InitialData {
    id: number
}

export type DataType = Data[] | []

export type DeleteById = (id: number) => void
