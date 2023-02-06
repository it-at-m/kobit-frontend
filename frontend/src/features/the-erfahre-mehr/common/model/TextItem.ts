export interface TextItem {
    header: string;
    entry: string;
    link?: string;
}

export interface ContentItemView {
    content: string;
}

export interface ItemWrapper {
    textItemView: TextItem[];
    contentItemView: ContentItemView[];
}