export interface CustomerModel {
  ID?: number;
  Customer_name: string;
  Street: string;
  City: string;
  State: string;
  Zip_code: string;
  Notes: string; //type text
  Terms: number;
  Account_number: string;
  Tax_id: string;
  Balance: string; //type money
  Credit_limit: string; //type money
  Is_active: boolean;
  Is_sub_agency: boolean;
  Opening_balance: string; //type money
  Language: string;
  Slug: number;
  Id_currency: number;
  Id_country: number;
  Irs_share_key: string; //type text
  Currency_rate: number;
  Agency: string; //type text
  Opening_balance_date: string; //type date
  Avoid_deletion: boolean;
  Is_editable: boolean;
  Alias: string; //type text
  Already_used: number;
  Ab_key: string; //type text
  Tmc_client_number: string; //type text
}
