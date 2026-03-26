import { Injectable } from '@nestjs/common';

@Injectable()
export class FlocksService {

  create(createFlockDto) {
    return "Create flock";
  }

  findAll() {
    return "Get all flocks";
  }

  findOne(id: string) {
    return `Get flock ${id}`;
  }

  update(id: string, updateFlockDto) {
    return `Update flock ${id}`;
  }

  assignFlock(assignDto) {
    return "Assign flock to barn";
  }

  registerDeadBirds(dto) {
    return "Register dead birds";
  }

  finishFlock(dto) {
    return "Finish flock";
  }

}