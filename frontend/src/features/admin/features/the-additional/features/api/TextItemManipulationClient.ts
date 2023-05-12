import { httpDeleteJson, httpPostJson, httpPutJson, httpPostMultipart, httpDeleteS3File } from "@/core/plugins/http";
import { TextItem } from "@/features/commons/types/Item";




export const postTextItem = async (pageType: string, textItem: TextItem, file?: File, headers?: Record<string, string>) => {
    if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const linkResponse = await httpPostMultipart<string>(
            `/s3/upload`,
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



export const putTextItem = async (id: string, pageType: string, textItem: TextItem, file?: File, headers?: Record<string, string>) => {

    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("link", textItem.link.toString())

        const deleteOldFile = `/s3/delete?link=${encodeURIComponent(textItem.link.toString())}`;
        await httpDeleteS3File(deleteOldFile);

        const newFileLink = await httpPostMultipart<string>(
            `/s3/upload`,
            formData,
            headers
        );

        textItem.link = newFileLink;

    }

    const textItemResponse = await httpPutJson<TextItem>(
        "/additional/" + pageType + "/text-item/" + id,
        textItem
    );

    return textItemResponse;

}

export const deleteTextItem = async (id: string, pageType: string, link: string) => {
    const deleteOldFile = `/s3/delete?link=${encodeURIComponent(link.toString())}`;
    await httpDeleteS3File(deleteOldFile);
    const url = `/additional/${pageType}/text-item/${id}?link=${encodeURIComponent(link)}`;
    return httpDeleteJson(url);
}
