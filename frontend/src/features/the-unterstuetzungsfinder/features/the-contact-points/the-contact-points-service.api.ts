import FetchUtils from "@/core/services/api/FetchUtils";
import Anlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-contact-points/types/anlaufstelle.type";


export default class AnlaufstelleService {
    private static base: string | undefined = `${process.env.VUE_APP_API_URL}/api/kobit-backend-service`;

    static getAnlaufstellen(): Promise<Anlaufstelle[]> {
        return fetch(`${this.base}/anlaufstellen-management/anlaufstellen`,FetchUtils.getGETConfig())
            .catch(FetchUtils.defaultCatchHandler)
            .then(response => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            });
    }

    static getAnlaufstellenByCompetence(value: string[]): Promise<Anlaufstelle[]> {
        return fetch(`${this.base}/anlaufstellen-management/anlaufstellenByCompetence`,FetchUtils.getPOSTConfig(value))
            .catch(FetchUtils.defaultCatchHandler)
            .then(response => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            }).then((data: Anlaufstelle[]) => {
                return new Promise(resolve => resolve(
                    AnlaufstelleService.mapAnlaufstellen(data)
                ));
            });
    }

    static getAnlaufstelle(value: string): Promise<Anlaufstelle> {
        return fetch(`${this.base}/anlaufstellen-management/anlaufstellen/${value}`,FetchUtils.getGETConfig())
            .catch(FetchUtils.defaultCatchHandler)
            .then(response => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            });
    }

   static mapAnlaufstellen(data: Anlaufstelle[]): Anlaufstelle[] {

       const anlaufstellen: Anlaufstelle[] = [];

       data.forEach((anlaufstelle: Anlaufstelle) => {

            const mappedAnlaufstelle = AnlaufstelleService.mapAnlaufstelle(anlaufstelle);


           anlaufstellen.push(mappedAnlaufstelle);

        
        });
       return anlaufstellen;
   }

    static mapAnlaufstelle(anlaufstelle: Anlaufstelle): Anlaufstelle {
        return Anlaufstelle.createEmptyAnlaufstelle()
            .withId(anlaufstelle.id ? anlaufstelle.id : "")
            .withName(anlaufstelle.name ? anlaufstelle.name : "")
            .withShortCut(anlaufstelle.shortCut ? anlaufstelle.shortCut : "")
            .withDescription(anlaufstelle.description ? anlaufstelle.description : "")
            .withDepartment(anlaufstelle.department ? anlaufstelle.department : "")
            .withLinks(anlaufstelle.links)
            .withContact(anlaufstelle.contact);
    }


}



