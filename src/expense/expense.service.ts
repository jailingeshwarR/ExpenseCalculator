import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense, ExpenseDocument } from 'src/schemas/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ExpenseService {

    constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
        private userService: UserService) {
    }

    async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
        const createdExpense = new this.expenseModel(createExpenseDto);
        return createdExpense.save();
    }

    async findByUserId(userId: string): Promise<Expense[]> {
        return this.expenseModel.find({ userId }).exec();
    }
    async calculateExpenses(userId: string): Promise<{ total: number, splitDetails: any, checkedBy: any }> {
        console.log(userId);

        const expenses = await this.expenseModel.find({ 'participants.userId': userId }).exec();
        const userObjectId = new Types.ObjectId(userId);
        const user = await this.userService.findById(userId);

        let total = 0;
        const splitDetails = [];

        for (const expense of expenses) {
            const participant = expense.participants.find(participant => participant.userId === userId);
            if (participant) {
                let amountOwed = 0;

                switch (expense.splitType) {
                    case 'Equal':
                        amountOwed = expense.amount / expense.participants.length;
                        break;
                    case 'Exact':
                        amountOwed = participant.amount || 0;
                        break;
                    case 'Percentage':
                        const totalPercentage = expense.participants.reduce((acc, p) => acc + (p.percentage || 0), 0);
                        amountOwed = (expense.amount * (participant.percentage || 0) / totalPercentage);
                        break;
                    default:
                        break;
                }

                const owesToUser = await this.userService.findById(expense.userId);

                splitDetails.push({
                    expenseId: expense._id,
                    amountOwed,
                    description: expense.description,
                    owesTo: owesToUser ? owesToUser.name : 'Unknown'
                });

                total += amountOwed;
            }
        }

        return { total, splitDetails, checkedBy: user ? user.name : 'Unknown' };
    }
}