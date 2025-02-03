import  dotenv  from 'dotenv';
import  axios  from 'axios';

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function pegarClima(cidade) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: cidade,
                appid: API_KEY,
                units: 'metric',
                lang: 'pt_br'
            }
        });

        const dados = response.data;
        // console.log(`🌤️ Clima em ${dados.name}: ${dados.weather[0].description}`);
        // console.log(`🌡️ Temperatura: ${dados.main.temp}°C`);
        // console.log(`💨 Vento: ${dados.wind.speed} m/s`);

        return {
            cidade: dados.name,
            descricao: dados.weather[0].description,
            temperatura: dados.main.temp,
            vento: dados.wind.speed
        };
    } catch (error) {
        console.error("❌ Erro ao buscar o clima:", error.response?.data?.message || error.message);
        throw error;
    }
}