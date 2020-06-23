import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import SpeciesRepository from '../repositories/SpeciesRepository';
import CreateSpeciesService from '../services/CreateSpeciesService';
import UpdateSpeciesService from '../services/UpdateSpeciesService';
import DeleteSpeciesService from '../services/DeleteSpeciesService';

const speciesRouter = Router();

speciesRouter.get('/', async (request, response) => {
  const speciesRepository = getCustomRepository(SpeciesRepository);
  const species = await speciesRepository.find();

  return response.json(species);
});

speciesRouter.post('/', async (request, response) => {
  try {
    const { description } = request.body;

    const createSpecies = new CreateSpeciesService();

    const species = await createSpecies.execute({
      description,
    });

    return response.json(species);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

speciesRouter.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { description } = request.body;

    const updateSpecies = new UpdateSpeciesService();

    const species = await updateSpecies.execute({
      id,
      description,
    });

    return response.json(species);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

speciesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteTree = new DeleteSpeciesService();

    await deleteTree.execute({
      id,
    });

    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default speciesRouter;
