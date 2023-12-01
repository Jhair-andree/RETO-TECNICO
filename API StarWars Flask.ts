import express, { Application, Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface StarWarsCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

class StarWarsAPI {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getCharacter(characterId: number): Promise<AxiosResponse<StarWarsCharacter>> {
    const apiUrl = `${this.baseUrl}/people/${characterId}/`;
    return axios.get<StarWarsCharacter>(apiUrl);
  }
}

class StarWarsController {
  private readonly starWarsApi: StarWarsAPI;

  constructor(starWarsApi: StarWarsAPI) {
    this.starWarsApi = starWarsApi;
  }

  async getStarWarsCharacter(req: Request, res: Response, next: NextFunction): Promise<void> {
    const characterId = parseInt(req.params.character_id, 10);

    try {
      const response = await this.starWarsApi.getCharacter(characterId);

      
      if (response.status === 200) {
        
        res.json(response.data);
      } else {
       
        res.status(500).json({ error: 'No se pudo obtener la información del personaje' });
      }
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        res.status(axiosError.response?.status || 500).json({
          error: axiosError.response?.data || 'Error en la solicitud a la API de Star Wars',
        });
      } else {
        next(error);
      }
    }
  }
}

class StarWarsApp {
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    const starWarsApi = new StarWarsAPI('https://swapi.dev/api');
    const starWarsController = new StarWarsController(starWarsApi);

    
    this.app.get('/starwars/characters/:character_id', starWarsController.getStarWarsCharacter.bind(starWarsController));
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
  }
}


const starWarsApp = new StarWarsApp();
starWarsApp.start(5000);
