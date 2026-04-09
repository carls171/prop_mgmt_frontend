export interface Property {
  property_id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  property_type: string;
  tenant_name: string;
  monthly_rent: number;
}

export interface Income {
  income_id: number;
  property_id: number;
  amount: number;
  date: string;
  description: string;
}

export interface Expense {
  expense_id: number;
  property_id: number;
  amount: number;
  date: string;
  category: string;
  vendor: string;
  description: string;
}

export interface NetIncome {
  property_id: number;
  net_income: number;
}
