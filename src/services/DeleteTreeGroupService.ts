import { getRepository } from 'typeorm';
import TreeGroup from '../models/TreeGroup';

interface Request {
  id: string;
}

class DeleteTreeGroupService {
  public async execute({ id }: Request): Promise<void> {
    const treesGroupRepository = getRepository(TreeGroup);

    const treeGroup = await treesGroupRepository.findOne(id);

    if (!treeGroup) {
      throw new Error('Tree Group not found.');
    }

    await treesGroupRepository.delete(id);
  }
}

export default DeleteTreeGroupService;
