import { getRepository } from 'typeorm';
import Harvest from '../models/Harvest';

interface Request {
  id: string;
  information: string;
  date: Date;
  gross_weight: number;
  tree_id: string;
}

class UpdateHarvestService {
  public async execute({
    id,
    information,
    date,
    gross_weight,
    tree_id,
  }: Request): Promise<Harvest> {
    const harvestsRepository = getRepository(Harvest);

    const harvest = await harvestsRepository.findOne(id);

    if (!harvest) {
      throw new Error('Harvest not found.');
    }

    harvest.information = information;
    harvest.date = date;
    harvest.gross_weight = gross_weight;
    harvest.tree_id = tree_id;

    await harvestsRepository.save(harvest);

    return harvest;
  }
}

export default UpdateHarvestService;
