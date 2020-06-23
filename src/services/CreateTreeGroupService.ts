import { getRepository } from 'typeorm';
import TreeGroup from '../models/TreeGroup';

interface Request {
  name: string;
  description: string;
}

class CreateTreeGroupService {
  public async execute({ name, description }: Request): Promise<TreeGroup> {
    const treeGroupsRepository = getRepository(TreeGroup);

    const checkTreeExists = await treeGroupsRepository.findOne({
      where: { name },
    });

    if (checkTreeExists) {
      throw new Error('Tree Group already exists.');
    }

    const tree = treeGroupsRepository.create({
      name,
      description,
    });

    await treeGroupsRepository.save(tree);

    return tree;
  }
}

export default CreateTreeGroupService;
