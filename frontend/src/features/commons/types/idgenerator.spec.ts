import IdGenerator from "@/features/commons/types/idGenerator.type";

describe('idgenerator.spec.vue', () => {

    it('should generate a 24 digits id',  () => {
        const thisId = IdGenerator.generateNewId();
        expect(thisId.length).toBe(24);
    });

    it('should generate a custom id', function () {
        const thisRandomId = IdGenerator.generateNewId(1,1);
        expect(thisRandomId.length).toBe(1);
    });
});