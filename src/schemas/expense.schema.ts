// src/schemas/expense.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, enum: ['Equal', 'Exact', 'Percentage'] })
    splitType: string;

    @Prop({ required: true })
    participants: Array<{ userId: string, amount: number, percentage?: number }>;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

