import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment, AssignmentDocument } from './assignment.schema';

@Injectable()
export class AssignmentsService {
  constructor(@InjectModel(Assignment.name) private assignmentModel: Model<AssignmentDocument>) {}

  async uploadAssignment(userId: string, task: string, admin: string) {
    const newAssignment = new this.assignmentModel({ userId, task, admin });
    return newAssignment.save();
  }

  async getAssignmentsForAdmin(admin: string) {
    return this.assignmentModel.find({ admin });
  }

  async acceptAssignment(id: string) {
    return this.assignmentModel.findByIdAndUpdate(id, { status: 'accepted' });
  }

  async rejectAssignment(id: string) {
    return this.assignmentModel.findByIdAndUpdate(id, { status: 'rejected' });
  }
}
