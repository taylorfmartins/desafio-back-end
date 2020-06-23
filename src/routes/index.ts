import { Router } from 'express';
import speciesRouter from './species.routes';
import treesRouter from './trees.routes';
import treeGroupsRouter from './treeGroups.routes';
import harvestsRouter from './harvest.routes';

const routes = Router();

routes.use('/species', speciesRouter);
routes.use('/trees', treesRouter);
routes.use('/treeGroups', treeGroupsRouter);
routes.use('/harvests', harvestsRouter);

export default routes;
