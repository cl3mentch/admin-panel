type TAccountStatusEnum = {
  [key: string]: "active" | "freezed" | "inactivated" | "suspended";
};

type TWalletEnum = {
  [key: number]:
    | "usdt"
    | "peic"
    | "locked_peic"
    | "party_ticket"
    | "nft"
    | "beic";
};

type TTransactionTypeEnum = {
  [key: number]:
    | "admin_top_up"
    | "admin_deduct"
    | "top_up"
    | "deduct"
    | "redeem"
    | "withdraw"
    | "withdraw_fee"
    | "withdraw_refund"
    | "withdraw_refund_fee"
    | "transfer_out"
    | "transfer_in"
    | "transfer_fee"
    | "swap_from"
    | "swap_to"
    | "swap_fee"
    | "purchase"
    | "donation"
    | "lock_fund"
    | "claim_released_fund"
    | "join_game"
    | "claim_game_reward"
    | "claim_game_refund"
    | "claim_daily_reward"
    | "claim_party_ticket"
    | "fuel_reward"
    | "planet_reward"
    | "jetpot_reward"
    | "compensation_fund"
    | "claim_released_compensation_fund"
    | "claim_nft"
    | "nft_reward";
};

type TStatEnum = {
  [key: string]: "game_count";
};

type TYesNoEnum = {
  [key: number]: "yes" | "no";
};

type TUserGameStatusEnum = {
  [key: number]: "pending" | "lose" | "win" | "refunded";
};

type TUserGameMethodEnum = {
  [key: string]: "beic" | "normal" | "party_ticket" | "unclaimed_fund";
};

type TUserInvestmentMethodEnum = {
  [key: string]: "claim" | "invest";
};

type TPoolRewardEnum = {
  [key: number]: "moon" | "mars" | "jupiter" | "saturn" | "uranus";
};

type TPoolRewardConditionEnum = {
  [key: string]: "active_user" | "chosen_one" | "none";
};

type TTimePeriodEnum = {
  [key: string]: "all_time" | "this_month" | "today";
};
