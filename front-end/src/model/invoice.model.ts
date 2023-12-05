export interface InvoiceModel {

  ID?:              number;
  Creation_date:    string;
  Invoice_number:   string;
  Status:           string;
  Due_date:         string;
  Amount :          string;
  Balance :         string;
  Purchase_order :  string;
  Customer_notes :  string;
  Terms :           number;
  Terms_conditions :string;
  Credit_apply :    string;
  Rate :            number;
  Net_amount:       string;
  Tax_amount:       string;
  Base_amount :     string;
  Slug :            number;
  Id_customer :     number;
  Credit_used :     string;
  Email :           string;
  Printed_name :    string;
  Hidden_field :    string;
  Hidden_identifier :  string;
  Already_used :       number;
  Is_opening_balance : boolean;
  AirBookingIds : number[];
  
  }