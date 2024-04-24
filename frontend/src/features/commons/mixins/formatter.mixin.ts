import moment from "moment";

export default{
    methods: {
        startingCharUpperCase(text: string): string {
            return text ? text.toLowerCase().replace(/^\w/, c => c.toUpperCase()): "";
        },
        formatDate(date: string): string {
            return date ? moment(date).format('L'): "";
        }
    }
};