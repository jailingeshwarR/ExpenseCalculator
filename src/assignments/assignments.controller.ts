import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) { }

    @Post('upload')
    async upload(@Body() body: { userId: string, task: string, admin: string }) {
        return this.assignmentsService.uploadAssignment(body.userId, body.task, body.admin);
    }

    @Get()
    async getAssignmentsForAdmin(@Body() body: { admin: string }) {
        return this.assignmentsService.getAssignmentsForAdmin(body.admin);
    }

    @Post(':id/accept')
    async acceptAssignment(@Param('id') id: string) {
        return this.assignmentsService.acceptAssignment(id);
    }

    @Post(':id/reject')
    async rejectAssignment(@Param('id') id: string) {
        return this.assignmentsService.rejectAssignment(id);
    }
}
