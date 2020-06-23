import { Router } from 'express';

import { getRepository } from 'typeorm';

import TreeGroup from '../models/TreeGroup';
import CreateTreeGroupService from '../services/CreateTreeGroupService';
import UpdateTreeGroupService from '../services/UpdateTreeGroupService';
import DeleteTreeGroupService from '../services/DeleteTreeGroupService';

const treeGroupsRouter = Router();

treeGroupsRouter.get('/', async (request, response) => {
  const treeGroupsRepository = getRepository(TreeGroup);
  const treeGroup = await treeGroupsRepository.find();

  return response.json(treeGroup);
});

treeGroupsRouter.post('/', async (request, response) => {
  try {
    const { name, description } = request.body;

    const createTreeGroup = new CreateTreeGroupService();

    const treeGroup = await createTreeGroup.execute({
      name,
      description,
    });

    return response.json(treeGroup);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

treeGroupsRouter.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { name, description } = request.body;

    const updateTreeGroup = new UpdateTreeGroupService();

    const treeGroup = await updateTreeGroup.execute({
      id,
      name,
      description,
    });

    return response.json(treeGroup);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

treeGroupsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteTreeGroup = new DeleteTreeGroupService();

    await deleteTreeGroup.execute({
      id,
    });

    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default treeGroupsRouter;
