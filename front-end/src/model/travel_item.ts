export interface TravelItemModel {
    ID?: number;
    Product_type: string;
    Transaction_type: string;
    Total_price: string;
    Status: string; // invoiced, pending, void
    Id_invoice: number;
    Traveler_name: string;
    Issuing_date: string;
    Id_customer: number;
    Fop: string;
    Ticket_number: number;
    Id_airline: number;
    Id_product: number;
    Id_agent_sign: number;
    Coz_of_supplier:  boolean;
  }