export interface TextItem {
    id: string;
    pageType: string;
    header: string;
    entry: string;
    link: string;
  }
  
  export interface ContentItem {
    id: string;
    pageType: string;
    content: string;
  }
  
  export interface ItemWrapper {
    textItemView: TextItem | null;
    contentItemView: ContentItem  | null;
  }
  