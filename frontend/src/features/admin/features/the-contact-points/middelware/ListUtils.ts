function removeItemFromList<T> (list: Array<T>, item: T): Array<T> {
    return list.filter(it => it !== item)
}