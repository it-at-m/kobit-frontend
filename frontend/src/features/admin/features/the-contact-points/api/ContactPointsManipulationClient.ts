import { httpDeleteJson, httpPostJson, httpPutJson, httpPostMultipart, httpDeleteS3File } from "@/core/plugins/http";
import { ContactPoint } from "@/features/commons/types/ContactPoint";
import ListItemToCompetenceView from "@/features/admin/components/u-finder/model/ListItemToCompetenceView";



export const postContactPoint = async (contactPoint: ContactPoint, file?: File, headers?: Record<string, string>) => {
    if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const linkResponse = await httpPostMultipart<string>(
            `/s3/upload`,
            formData,
            headers
        );

        contactPoint.image = linkResponse;

    }

    return httpPostJson<ContactPoint>("/anlaufstellen-management/anlaufstellen", contactPoint);
};


export const putContactPoint = async (id: string, contactPoint: ContactPoint, file?: File, currentImage?: string | null, headers?: Record<string, string>) => {

    if (file) {
        const formData = new FormData();
        formData.append("file", file);

        if(contactPoint.image != null){
            formData.append("link", contactPoint.image.toString())

            const deleteOldFile = `/s3/delete?link=${encodeURIComponent(contactPoint.image.toString())}`;
            await httpDeleteS3File(deleteOldFile);
        }


        const newFileLink = await httpPostMultipart<string>(
            `/s3/upload`,
            formData,
            headers
        );

        contactPoint.image = newFileLink;

        return httpPutJson<ContactPoint>("/anlaufstellen-management/anlaufstellen/" + id, contactPoint);

    }  else if(!contactPoint.image && currentImage){
        const deleteOldFile = `/s3/delete?link=${encodeURIComponent(currentImage.toString())}`;
        await httpDeleteS3File(deleteOldFile);
        return httpPutJson<ContactPoint>("/anlaufstellen-management/anlaufstellen/" + id, contactPoint);
    }
    else {
        return httpPutJson<ContactPoint>("/anlaufstellen-management/anlaufstellen/" + id, contactPoint);
    }

}

export const updateCompetences = (itemsToUpdate: ListItemToCompetenceView[]) => {
    return httpPutJson("/anlaufstellen-management/anlaufstellen/competences", itemsToUpdate)
}

export const deleteContactPoint = async (contactPoint: ContactPoint) => {
    if(contactPoint.image != null || contactPoint.image != undefined){
    const deleteOldFile = `/s3/delete?link=${encodeURIComponent(contactPoint.image.toString())}`;
    await httpDeleteS3File(deleteOldFile);
    }
    return httpDeleteJson("/anlaufstellen-management/anlaufstellen/" + contactPoint.id);
}