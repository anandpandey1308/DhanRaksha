import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { TaskService } from './task.service';
import type { UpdateTaskDto, CreateTaskDto } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Custom decorator to mark public endpoints
export const Public = () => SetMetadata('isPublic', true);

@Controller('tasks')
@UseGuards(JwtAuthGuard) // Apply JWT guard globally to the controller
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Public() // Make this endpoint public for tracking page
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('stats')
  @Public() // Make this endpoint public for tracking page
  async getTaskStats() {
    return this.taskService.getTaskStats();
  }

  @Get('phase/:phase')
  @Public() // Make this endpoint public for tracking page
  async getTasksByPhase(@Param('phase') phase: string) {
    return this.taskService.getTasksByPhase(phase);
  }

  @Patch(':id')
  @Public() // Make this endpoint public for tracking page updates
  async updateTask(@Param('id') id: string, @Body() updateData: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateData);
  }

  @Post()
  async createTask(@Body() taskData: CreateTaskDto) {
    return this.taskService.createTask(taskData);
  }

  @Post('initialize')
  @Public() // Make this endpoint public for initial setup
  async initializeTasks() {
    await this.taskService.initializeTasks();
    return { message: 'Tasks initialized successfully' };
  }

  @Post('reinitialize')
  @Public() // Make this endpoint public for resetting all tasks
  async reinitializeTasks() {
    await this.taskService.reinitializeTasks();
    return { message: 'All tasks reinitialized successfully' };
  }
}
