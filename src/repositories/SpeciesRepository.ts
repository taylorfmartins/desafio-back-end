import { EntityRepository, Repository } from 'typeorm';

import Species from '../models/Species';

@EntityRepository(Species)
class SpeciesRepository extends Repository<Species> {
  public async findByDescription(description: string): Promise<Species | null> {
    const findAppointment = await this.findOne({
      where: { description },
    });
    return findAppointment || null;
  }
}

export default SpeciesRepository;
