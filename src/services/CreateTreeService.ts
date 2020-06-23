import { getRepository } from 'typeorm';
import Tree from '../models/Tree';

interface Request {
  description: string;
  age: number;
  species_id: string;
  tree_group_id: string;
}

class CreateTreeService {
  public async execute({
    description,
    age,
    species_id,
    tree_group_id,
  }: Request): Promise<Tree> {
    const treesRepository = getRepository(Tree);

    const checkTreeExists = await treesRepository.findOne({
      where: { description },
    });

    if (checkTreeExists) {
      throw new Error('Tree already exists.');
    }

    const tree = treesRepository.create({
      description,
      age,
      species_id,
      tree_group_id,
    });

    await treesRepository.save(tree);

    return tree;
  }
}

export default CreateTreeService;
