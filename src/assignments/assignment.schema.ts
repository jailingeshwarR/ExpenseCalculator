import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssignmentDocument = Assignment & Document;

@Schema()
export class Assignment {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    task: string;

    @Prop({ required: true })
    admin: string;

    @Prop({ required: true, default: 'pending' })
    status: string;

    @Prop({ required: true, default: Date.now })
    timestamp: Date;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
