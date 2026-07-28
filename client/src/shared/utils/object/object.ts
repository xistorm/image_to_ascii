type TypedEntries<TObj extends object> = { [K in string & keyof TObj]: [K, TObj[K]] }[string & keyof TObj][];

export const typedEntries = <TObj extends object>(obj: TObj): TypedEntries<TObj> => {
    return Object.entries(obj) as TypedEntries<TObj>;
};
