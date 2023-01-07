export enum NavigationModel {
    previous = 'previous',
    next = 'next'
}

export type NavigationR = (direction: NavigationModel) => void