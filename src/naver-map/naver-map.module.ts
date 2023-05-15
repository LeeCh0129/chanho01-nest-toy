// src/services/naver-map/naver-map.module.ts

import { Module } from '@nestjs/common';
import { NaverMapService } from './naver-map.service';

@Module({
  providers: [NaverMapService],
  exports: [NaverMapService],
})
export class NaverMapModule {}
