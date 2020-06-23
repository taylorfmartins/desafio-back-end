import { getRepository } from 'typeorm';
import TreeGroup from '../models/TreeGroup';

interface Request {
  id: string;
  name: string;
  description: string;
}

class UpdateTreeGroupService {
  public async execute({ id, name, description }: Request): Promise<TreeGroup> {
    const treeGroupsRepository = getRepository(TreeGroup);

    const treeGroup = await treeGroupsRepository.findOne(id);

    if (!treeGroup) {
      throw new Error('Tree Group not found.');
    }

    treeGroup.name = name;
    treeGroup.description = description;

    await treeGroupsRepository.save(treeGroup);

    return treeGroup;
  }
}

export default UpdateTreeGroupService;
