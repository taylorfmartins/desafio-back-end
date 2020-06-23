import { Router } from 'express';

import { getRepository } from 'typeorm';

import Tree from '../models/Tree';
import CreateTreeService from '../services/CreateTreeService';
import UpdateTreeService from '../services/UpdateTreeService';
import DeleteTreeService from '../services/DeleteTreeService';

const treesRouter = Router();

treesRouter.get('/', async (request, response) => {
  const speciesRepository = getRepository(Tree);
  const species = await speciesRepository.find();

  return response.json(species);
});

treesRouter.post('/', async (request, response) => {
  try {
    const { description, age, species_id, tree_group_id } = request.body;

    const createTree = new CreateTreeService();

    const tree = await createTree.execute({
      description,
      age,
      species_id,
      tree_group_id,
    });

    return response.json(tree);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

treesRouter.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { description, age, species_id, tree_group_id } = request.body;

    const updateTree = new UpdateTreeService();

    const tree = await updateTree.execute({
      id,
      description,
      age,
      species_id,
      tree_group_id,
    });

    return response.json(tree);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

treesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteTree = new DeleteTreeService();

    await deleteTree.execute({
      id,
    });

    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default treesRouter;
