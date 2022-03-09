export type AutocompleteItem = { label: string, html: string, value: unknown }
export type AutocompleteInput = Omit<AutocompleteItem, 'html'>
