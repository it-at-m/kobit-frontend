import {
    GET_DOWNLOADS_FILEPATH, GET_DOWNLOADS_FILES,
    theDownloadsStoreModule,
} from "@/features/the-erfahre-mehr/features/the-downloads/the-downloads.store.module";

describe('the-downloads-store.module',() => {
    const getters = theDownloadsStoreModule.getters;
    const state = theDownloadsStoreModule.state;

    it('should have correct state properties', () => {
        const thatFilePathProperty = 'filepath';
        expect(state).toHaveProperty(thatFilePathProperty);

        const thatDownloadsProperty = 'downloads';
        expect(state).toHaveProperty(thatDownloadsProperty);
    });
/*
    it('should have working getters',() => {
        const theseDownloadFiles = state.downloads;
        const thatGetDownloadFilesResult = getters[GET_DOWNLOADS_FILES](state);
        

        expect(theseDownloadFiles).toEqual(thatGetDownloadFilesResult);

        const thisFilepath = state.filepath;
        const thatGetFilepathResult = getters[GET_DOWNLOADS_FILEPATH](state);
        expect(thisFilepath).toEqual(thatGetFilepathResult);

    });
*/
});