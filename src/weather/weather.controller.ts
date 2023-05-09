import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Controller('weather')
export class WeatherController {
  constructor(private configService: ConfigService) {}

  @Get()
  async getWeather(@Query('city') cityName: string) {
    // 환경 변수값 가져오기
    const apiUrl = this.configService.get('WEATHER_API_URL');
    const apiKey = this.configService.get('WEATHER_API_KEY');

    // 날씨 API 호출
    return await this.callWeatherApi(apiUrl, apiKey, cityName);
  }

  async callWeatherApi(
    apiUrl: string,
    apiKey: string,
    cityName: string,
  ): Promise<string> {
    console.log('날씨 정보 가져오는 중...');
    console.log(apiUrl);
    const url = `${apiUrl}?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;
    console.log(url);
    const result = await axios.get(url);
    const weather = result.data;
    const mains = weather.weather.map((el) => el.main);
    return mains.join(' and ');
  }
}
