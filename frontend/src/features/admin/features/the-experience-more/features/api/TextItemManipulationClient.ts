import {httpDeleteJson, httpPostJson, httpPutJson, httpPostMultipart} from "@/core/plugins/http";
import {TextItem} from "@/features/commons/types/Item";



  
  

export const postTextItem = async (pageType: string, textItem: TextItem, file?: File, headers?: Record<string, string>) => {
    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        
        const linkResponse = await httpPostMultipart<string>(
            `/additional/file/${pageType}`,
            formData,
            headers
        );
        
        // Update the text item with the link
        textItem.link = linkResponse;
        
        const textItemResponse = await httpPostJson<TextItem>(
            `/additional/${pageType}`,
            textItem
        );
        
        return textItemResponse;
    } else {
        return httpPostJson<TextItem>(
            `/additional/${pageType}`,
            textItem
        );
    }
};


  


export const putTextItem = (id: string, pageType: string, textItem: TextItem) => {
    return httpPutJson<TextItem>("/additional/" + pageType + "/text-item/" + id, textItem);
}

export const deleteTextItem = (id: string, pageType: string, link: string) => {
    const url = `/additional/${pageType}/text-item/${id}?link=${encodeURIComponent(link)}`;
    return httpDeleteJson(url);
  }
