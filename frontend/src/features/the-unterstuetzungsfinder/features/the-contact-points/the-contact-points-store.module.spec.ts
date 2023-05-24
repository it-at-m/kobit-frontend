import {Loading} from "@/core/services/api/types/Loading.type";
import {
    theAnlaufstellenStoreModule
} from "@/features/the-unterstuetzungsfinder/features/the-contact-points/the-contact-points-store.module";
import Anlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-contact-points/types/anlaufstelle.type";
import {Competence} from "@/features/commons/types/competence.type";
import Contact from "@/features/commons/types/contact.type";
import Link from "@/features/commons/types/link.type";

describe("the-contact-points-store.module", () => {
    const state =  {
        anlaufstellen: [],
        contacts: [],
        links: [],
        apiState: Loading.INIT,
    };

    const thisMutations = theAnlaufstellenStoreModule.mutations;
    const thisActions = theAnlaufstellenStoreModule.actions;
    const thisGetters = theAnlaufstellenStoreModule.getters;

    const anlaufstelle = {
        "id":"1",
        "name":"Betriebsärztlicher Dienst",
        "shortCut":"BÄD",
        "description":"Gesundheitsschutzes",
        "department":"POR",

        "contact":[],
        "competencies":["HEALTH_PROBLEMS"],
        "links":[]
    };

    const contact = {
        "contactPointId":"2",
        "email":"test@example.de",
    };

    const link = {
        "id":"3",
        "name":"WiLMA | Gleichstellungsstelle für Frauen",
        "url":"https://wilma",
        "inDownloads": false
    };



    const mappedAnlaufstelle = Anlaufstelle.createEmptyAnlaufstelle()
        .withId("1")
        .withName("Betriebsärztlicher Dienst")
        .withShortCut("BÄD")
        .withDescription("Gesundheitsschutzes")
        .withDepartment("POR")
        .withCompetencies([Competence.HEALTH_PROBLEMS])
        .withLinks(                [
                Link.createEmptyLink()
                .withId("3")
                .withUrl("https://wilma")
                .withInDownloads(false)
                .withName("WiLMA | Gleichstellungsstelle für Frauen")
        ])
        .withContact([
            Contact.createEmptyContact()
            .withId("2")
            .withEmail("test@example.de")]);

    const thisState = theAnlaufstellenStoreModule.state;

    const emptyFetch = global.fetch;

    const resetState = () => {
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_ANLAUFSTELLEN(thisState,[]);
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_CONTACTS(thisState,[]);
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_LINKS(thisState,[]);
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE(thisState,Loading.INIT);
    };

    beforeEach(() => {
        global.fetch = emptyFetch;
        jest.clearAllMocks();
        resetState();
    });

    it('state sollte zu anfangs leer sein', function () {
        expect(thisState).toEqual(state);
    });

    it('sollte eine anlaufstele in den state schreiben', function () {
        expect(thisState.anlaufstellen).toEqual([]);
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_ANLAUFSTELLEN(thisState,[anlaufstelle]);
        expect(thisState.anlaufstellen).toEqual([anlaufstelle]);
    });

    it('sollte einen contact in den state schreiben', function () {
        expect(thisState.contacts).toEqual([]);
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_CONTACTS(thisState,[contact]);
        expect(thisState.contacts).toEqual([contact]);
    });

    it('sollte einen link in den state schreiben', function () {
        expect(thisState.links).toEqual([]);
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_LINKS(thisState,[link]);
        expect(thisState.links).toEqual([link]);
    });
    /*
    it('anlaufstellen getter sollte gemappte Anlaufstellen zurückliefern', function () {
        expect(thisState.anlaufstellen).toEqual([]);
        expect(thisState.contacts).toEqual([]);
        expect(thisState.links).toEqual([]);
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_ANLAUFSTELLEN(thisState,[anlaufstelle]);
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_CONTACTS(thisState,[contact]);
        thisMutations.THE_ANLAUFSTELLEN_MUTATION_SET_LINKS(thisState,[link]);
        expect(thisGetters.THE_ANLAUFSTELLEN_GETTER_GET_ANLAUFSTELLEN(thisState)).toEqual([mappedAnlaufstelle]);
    });*/

    it('init state solle alle anlaufstellen, Kontakte und Links laden', async function () {
        expect(thisState).toEqual(state);
        const commit = jest.fn();
        const dispatch = jest.fn();
        await thisActions.THE_ANLAUFSTELLEN_ACTION_INIT_STATE({commit, dispatch} as any);
        expect(commit).toBeCalledTimes(2);
        //expect(dispatch).toBeCalledTimes(1);
        expect(commit).toBeCalledWith("THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE",Loading.INIT);
        expect(commit).toBeCalledWith("THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE",Loading.LOADING);
        expect(dispatch).toBeCalledWith("THE_ANLAUFSTELLEN_ACTION_SET_ANLAUFSTELLEN");
    });
});