// src/services/naver-map/naver-map.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NaverMapService {
  async getGeoLocation(address: string) {
    const response = await axios.get(
      `https://openapi.naver.com/v3/map/geocode`,
      {
        params: { query: address },
        headers: {
          'X-NCP-APIGW-API-KEY-ID': 'jsewdlkgbc',
          'X-NCP-APIGW-API-KEY': 'JWwQ7MvTnS5Yptk8lU3HDLzVVpdnwLzoBFRVtwln',
        },
      },
    );
    return response.data;
  }
}
