export interface PaymentModel {

    ID?:                       number;
    Number:                    string;
    Date:                      string;
    Balance :                  string;
    Amount:                    string;
    Currency_rate :            number;
    Fop :                      string;
    Reference:                 string;
    Deducted_tax:              boolean;  
    Note:                      string; 
    Used_amount:               string; 
    Status:                    string;
    Base_amount:               string; 
    Is_reconciled:             boolean;    
    Slug:                      number;
    Id_customer:               number;  
    Id_chart_of_accounts_from:  number;  
    Type:                      string; 
    Id_supplier:               number;  
    Id_consultant:             number;  
    Id_chart_of_accounts:      number;  
    Id_currency:               number;  
    Hidden_field:              string; 
    Transfert_type:            string; 
    Already_used:              number;  
    Receipiant_name:           string; 
    Tag:                       string;
    
}