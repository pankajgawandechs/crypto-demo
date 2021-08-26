import { Get, Controller, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  public currencies: any;
  constructor(private appService: AppService) {}
  @Get()
  @Render('index')
  async root() {
    const res = await this.appService.getCurrencies();
    return { message: 'Details found.', currencies: res.data };
  }

  @Get('estimate')
  async getEstimate(@Req() request: Request) {
    try {
      const res = await this.appService.getEstimate(request.query);
      if (res.data != undefined) {
        return {
          success: true,
          message: 'Details found.',
          result: res.data,
        };
      } else {
        return {
          success: false,
          message: 'Details not found',
          result: res,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}