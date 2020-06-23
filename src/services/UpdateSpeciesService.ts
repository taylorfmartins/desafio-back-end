import { getRepository } from 'typeorm';
import Species from '../models/Species';

interface Request {
  id: string;
  description: string;
}

class UpdateSpeciesService {
  public async execute({ id, description }: Request): Promise<Species> {
    const speciesRepository = getRepository(Species);

    const species = await speciesRepository.findOne(id);

    if (!species) {
      throw new Error('Species not found.');
    }

    species.description = description;

    await speciesRepository.save(species);

    return species;
  }
}

export default UpdateSpeciesService;
