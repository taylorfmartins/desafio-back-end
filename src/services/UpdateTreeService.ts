import { getRepository } from 'typeorm';
import Tree from '../models/Tree';

interface Request {
  id: string;
  description: string;
  age: number;
  species_id: string;
  tree_group_id: string;
}

class UpdateTreeService {
  public async execute({
    id,
    description,
    age,
    species_id,
    tree_group_id,
  }: Request): Promise<Tree> {
    const treesRepository = getRepository(Tree);

    const tree = await treesRepository.findOne(id);

    if (!tree) {
      throw new Error('Tree not found.');
    }

    tree.description = description;
    tree.age = age;
    tree.species_id = species_id;
    tree.tree_group_id = tree_group_id;

    await treesRepository.save(tree);

    return tree;
  }
}

export default UpdateTreeService;
