export default class IdGenerator {
  /**
   * @deprecated will be removed in a while
   * @returns {string}
   */
  static generateNewId(numberOfBlocks = 6, blockLength = 4, delimiter = ""): string {
    const hex = "0123456789abcdef";
    let id = "";
    for (let i = 0; i < numberOfBlocks; i++) {
      for (let j = 0; j < blockLength; j++) {
        const random = Math.floor(Math.random() * hex.length);
        id += hex[random];
      }
      if (i !== numberOfBlocks - 1) {
        id += delimiter;
      }
    }
    return id;
  }

  /**
   * returns a random hex value
   * @param max optional
   * @returns {string}
   */
  static randomId(max = 2758469854956): string{
    const number = Math.floor((Math.random() * max));
    return number.toString(16);
  }
}
