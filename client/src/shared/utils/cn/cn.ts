import { compact, typedEntries } from "@/shared/utils";

type ExtractPrefix<T extends string, Sep extends string> =
    T extends `${infer Prefix}${Sep}${string}` ?
        ExtractPrefix<Prefix, Sep> :
        T;

type ExtractClassNames<T extends string> =
    T extends `${infer Prefix}_${string}` ?
        Prefix :
        T;

type ExtractModifierKey<T extends string> =
    T extends `${string}_${infer Key}` ?
        ExtractPrefix<Key, '_'> :
        never;

type ExtractModifierValue<T extends string> =
    T extends `${string}_${string}_${infer Value}` ?
        Value :
        boolean;

type TClassName<TStyle extends Record<string, string>> = ExtractClassNames<string & keyof TStyle>;
type TAdditional = string | undefined;
type TModifiers<TStyle extends Record<string, string>> = Partial<{
    [K in string & keyof TStyle as ExtractModifierKey<K>]: ExtractModifierValue<K>
}>;

export const cn = <TStyle extends Record<string, string>>(style: TStyle) => {
    return (
        className: TClassName<TStyle>,
        additional: TAdditional[] = [],
        modifiers: TModifiers<TStyle> = {},
    ) => {
        const classNames: string[] = [
            style[className],
            ...compact(additional),
        ];

        const modifiersEntries = typedEntries(modifiers);
        compact(modifiersEntries).forEach(([key, value]) => {
            if (!value) {
                return;
            }

            const keyChunks: string[] = [className, key];
            switch (typeof value) {
                case 'string':
                case 'number':
                case 'symbol':
                    keyChunks.push(String(value));
                    break;
            }

            const modifierKey = keyChunks.join('_');
            if (!modifierKey) {
                return;
            }

            const modifier = style[modifierKey];
            if (!modifier) {
                return;
            }

            if (modifier && value) {
                classNames.push(modifier);
            }
        });

        return compact(classNames).join(' ');
    };
};
