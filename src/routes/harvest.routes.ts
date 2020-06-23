import { Router } from 'express';

import { getRepository } from 'typeorm';

import Harvest from '../models/Harvest';
import CreateHarvestService from '../services/CreateHarvestService';
import UpdateHarvestService from '../services/UpdateHarvestService';
import DeleteHarvestService from '../services/DeleteHarvestService';

const harvestsRouter = Router();

harvestsRouter.get('/', async (request, response) => {
  const speciesRepository = getRepository(Harvest);
  const species = await speciesRepository.find();

  return response.json(species);
});

harvestsRouter.post('/', async (request, response) => {
  try {
    const { information, date, gross_weight, tree_id } = request.body;

    const createHarvest = new CreateHarvestService();

    const tree = await createHarvest.execute({
      information,
      date,
      gross_weight,
      tree_id,
    });

    return response.json(tree);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

harvestsRouter.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { information, date, gross_weight, tree_id } = request.body;

    const updateHarvest = new UpdateHarvestService();

    const harvest = await updateHarvest.execute({
      id,
      information,
      date,
      gross_weight,
      tree_id,
    });

    return response.json(harvest);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

harvestsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteHarvest = new DeleteHarvestService();

    await deleteHarvest.execute({
      id,
    });

    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default harvestsRouter;
