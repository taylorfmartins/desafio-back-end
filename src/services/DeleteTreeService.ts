import { getRepository } from 'typeorm';
import Tree from '../models/Tree';

interface Request {
  id: string;
}

class DeleteTreeService {
  public async execute({ id }: Request): Promise<void> {
    const treesRepository = getRepository(Tree);

    const tree = await treesRepository.findOne(id);

    if (!tree) {
      throw new Error('Tree not found.');
    }

    await treesRepository.delete(id);
  }
}

export default DeleteTreeService;
