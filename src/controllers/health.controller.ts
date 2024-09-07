import { Request, Response, NextFunction } from 'express';

class HealthController {
  private static instance: HealthController;

  private constructor() {}

  public static getInstance(): HealthController {
    if (!HealthController.instance) {
      HealthController.instance = new HealthController();
    }
    return HealthController.instance;
  }

  public checkHealth(req: Request, res: Response, next: NextFunction): void {
    res.status(200).json({ status: 'ok' });
  }
}

export default HealthController;