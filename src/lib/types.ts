export interface LotteryResult {
    id: string;
    date: string; // YYYY-MM-DD
    round1: string;
    round2: string;
    night_round1?: string;
    night_round2?: string;
}

export type CreateResultInput = Omit<LotteryResult, 'id'>;
