export class CreateExpenseDto {
    userId: string;
    amount: number;
    description: string;
    splitType: 'Equal' | 'Exact' | 'Percentage';
    participants: Array<{ userId: string, amount: number }>;
}