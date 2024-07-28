import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from 'src/schemas/expense.schema';
import { UserService } from 'src/user/user.service';

@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService, private userService: UserService) { }

    @Post()
    async createExpense(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
        return this.expenseService.create(createExpenseDto);
    }

    @Get(':userId')
    async findExpensesByUserId(@Param('userId') userId: string): Promise<Expense[]> {
        return this.expenseService.findByUserId(userId);
    }

    @Get(':userId/calculate')
    async calculateUserExpenses(@Param('userId') userId: string): Promise<{ total: number, splitDetails: any }> {
        return this.expenseService.calculateExpenses(userId);
    }

    // @Get()
    // async findAllExpenses(): Promise<Expense[]> {
    //     return this.expenseService.findAll();
    // }
}