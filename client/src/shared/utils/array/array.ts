type TruthyValue<TItem> = Exclude<TItem, null | undefined | 0 | '' | false>

export const compact = <TItem>(items: TItem[]): TruthyValue<TItem>[] => {
    return items.filter((item): item is TruthyValue<TItem> => Boolean(item));
};