import {httpDeleteJson, httpPostJson, httpPutJson} from "@/core/plugins/http";
import {TextItem} from "@/features/commons/types/Item";


export const httpPostMultipart = async <T>(
    url: string,
    formData: FormData,
    headers?: Record<string, string>
  ): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers,
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };
  

  export const postTextItem = (pageType: string, textItem: TextItem, file?: File, headers?: Record<string, string>) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      formData.append("textItemView", JSON.stringify(textItem));
  
      const validatedHeaders = headers ? headers as Record<string, string> : undefined;
  
      return httpPostMultipart<TextItem>(
        "/additional/" + pageType,
        formData,
        validatedHeaders
      )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return httpPostJson<TextItem>(
        "/additional/" + pageType,
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
