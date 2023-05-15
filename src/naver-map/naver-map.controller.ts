import { Controller, Get, Query, Render } from '@nestjs/common';
import { NaverMapService } from './naver-map.service';

@Controller('naver-map')
export class NaverMapController {
  constructor(private readonly naverMapService: NaverMapService) {}

  @Get('geocode')
  async getGeoLocation(@Query('address') address: string) {
    const result = await this.naverMapService.getGeoLocation(address);
    return result;
  }
  @Get()
  @Render('map')
  renderMap() {}
}
