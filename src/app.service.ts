import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getCurrencies() {
    try {
      const url = 'https://api-payments.guardarian.com/v1/currencies/crypto';
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getEstimate(params) {
    try {
      const headers = {
        'x-api-key': 'c14d927f-cb01-4561-9520-28ec22c92709',
        'Content-Type': 'application/json',
      };

      const qs = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');

      const url = `https://api-payments.guardarian.com/v1/estimate?` + `${qs}`;
      const response = await axios.get(url, { headers: headers });
      return response;
    } catch (error) {
      //console.error(error.response.data.message);
      return error.response.data.message;
    }
  }
}
