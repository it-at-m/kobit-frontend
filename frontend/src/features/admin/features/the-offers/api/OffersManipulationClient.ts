import { httpDeleteJson, httpPostJson, httpPutJson, httpPostMultipart, httpDeleteS3File } from "@/core/plugins/http";
import { Offer } from "@/features/commons/types/Offer";


export const postOffer = async (offer: Offer, file?: File, headers?: Record<string, string>) => {

    if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const linkResponse = await httpPostMultipart<string>(
            `/s3/upload`,
            formData,
            headers
        );

        offer.imageLink = linkResponse;



    }

    return httpPostJson<Offer>("/offers", offer);

};


export const putOffer = async (id: string, offer: Offer, file?: File, headers?: Record<string, string>) => {

    if (file) {
        const formData = new FormData();
        formData.append("file", file);

        if(offer.imageLink != null){
            formData.append("link", offer.imageLink.toString())

            const deleteOldFile = `/s3/delete?link=${encodeURIComponent(offer.imageLink.toString())}`;
            await httpDeleteS3File(deleteOldFile);
        }


        const newFileLink = await httpPostMultipart<string>(
            `/s3/upload`,
            formData,
            headers
        );

        offer.imageLink = newFileLink;

    }
    
    return httpPutJson<Offer>("/offers/" + id, offer);

}

export const deleteOffer = async (offer: Offer) => {
    if(offer.imageLink != null || offer.imageLink != undefined){
    const deleteOldFile = `/s3/delete?link=${encodeURIComponent(offer.imageLink.toString())}`;
    await httpDeleteS3File(deleteOldFile);
    }
    return httpDeleteJson("/offers/" + offer.id);
}