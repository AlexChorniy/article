export enum NavigationModel {
    previous = 'previous',
    next = 'next'
}

export type NavigationVariables = (direction: NavigationModel) => void