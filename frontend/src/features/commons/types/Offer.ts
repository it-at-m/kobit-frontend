export interface Offer {
    id?: string;
    title: string;
    description: string;
    startDate?: string;
    endDate?: string;
    imageLink: string;
    departments?: string[];  // Added this line
  }
  

  export interface OfferListItem {
    id?: string;
    title: string;
    description: string;
    startDate?: string;
    endDate?: string;
    imageLink: string;
    departments: string[];
}