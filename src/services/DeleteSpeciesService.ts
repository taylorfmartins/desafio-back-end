import { getRepository } from 'typeorm';
import Species from '../models/Species';

interface Request {
  id: string;
}

class DeleteSpeciesService {
  public async execute({ id }: Request): Promise<void> {
    const speciesRepository = getRepository(Species);

    const tree = await speciesRepository.findOne(id);

    if (!tree) {
      throw new Error('Species not found.');
    }

    await speciesRepository.delete(id);
  }
}

export default DeleteSpeciesService;
