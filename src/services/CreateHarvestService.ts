import { getRepository } from 'typeorm';
import Harvest from '../models/Harvest';

interface Request {
  information: string;
  date: Date;
  gross_weight: number;
  tree_id: string;
}

class CreateHarvestService {
  public async execute({
    information,
    date,
    gross_weight,
    tree_id,
  }: Request): Promise<Harvest> {
    const harvestsRepository = getRepository(Harvest);

    const harvest = harvestsRepository.create({
      information,
      date,
      gross_weight,
      tree_id,
    });

    await harvestsRepository.save(harvest);

    return harvest;
  }
}

export default CreateHarvestService;
