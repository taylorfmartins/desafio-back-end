import { getCustomRepository } from 'typeorm';

import Species from '../models/Species';
import SpeciesRepository from '../repositories/SpeciesRepository';

interface Request {
  description: string;
}

class CreateSpeciesService {
  public async execute({ description }: Request): Promise<Species> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const findSpecies = await speciesRepository.findByDescription(description);

    if (findSpecies) {
      throw Error('This species is already exists.');
    }

    const species = speciesRepository.create({
      description,
    });

    await speciesRepository.save(species);

    return species;
  }
}

export default CreateSpeciesService;
