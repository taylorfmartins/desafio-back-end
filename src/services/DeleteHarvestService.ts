import { getRepository } from 'typeorm';
import Harvest from '../models/Harvest';

interface Request {
  id: string;
}

class DeleteHarvestService {
  public async execute({ id }: Request): Promise<void> {
    const harvestsRepository = getRepository(Harvest);

    const harvest = await harvestsRepository.findOne(id);

    if (!harvest) {
      throw new Error('Harvest not found.');
    }

    await harvestsRepository.delete(id);
  }
}

export default DeleteHarvestService;
