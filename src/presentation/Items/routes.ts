import { Router } from 'express';




export class ItemRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    return router;
  }


}