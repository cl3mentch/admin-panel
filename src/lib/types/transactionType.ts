export type TTransactionList = {
  data: {
    id: number;
    sn: string;
    created_at: string;
    updated_at: string;
    used_at: number;
    user: string;
    from_user: string;
    to_user: string;
    transaction_type: string;
    amount: string;
    distribution: string;
    ref_table: string;
    ref_id: string;
    remark: string;
  }[];
  count: number;
  last_page: number;
};

export type TTransactionDetail = {
  data: {
    id: number;
    created_at: string;
    wallet_transaction: string;
    user: string;
    wallet: string;
    amount: string;
    before_amount: string;
    after_amount: string;
    remark: string;
  }[];
  count: number;
  last_page: number;
};
