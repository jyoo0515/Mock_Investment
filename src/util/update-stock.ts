import axios from 'axios';
import dotenv from 'dotenv';
// import { DateTime } from 'luxon';
import Stock from '../entity/stock.entity';
dotenv.config();

interface StockPriceInfo {
  // base date
  basDt: string;
  //short code
  srtnCd: string;
  //long code
  isinCd: string;
  // name
  itmsNm: string;
  // market category
  mrktCtg: 'KOSPI' | 'KOSDAQ' | 'KONEX';
  // closing price
  clpr: number;
  // up / down compared to the day before
  vs: number;
  // rate of vs
  fltRt: number;
  // starting price
  mkp: number;
  // high price
  hipr: number;
  // low price
  lopr: number;
  // trade quantity
  trqu: number;
  // total traded price
  trPrc: number;
  // amount of stock in market
  lstgStCnt: number;
  // final price * amount 시가총액
  mrktTotAmt: number;
}

// Exclude weekend
// const date = DateTime.now().setZone('Asia/Seoul').minus({ days: 2 }).toFormat('yyyyMMdd');

const baseUrl = 'https://api.odcloud.kr/api/GetStockSecuritiesInfoService/v1/getStockPriceInfo';
const params = {
  numOfRows: 9999,
  beginBasDt: 20220421,
  mrktCls: 'KOSPI',
  resultType: 'json',
  serviceKey: process.env.SERVICE_KEY,
};

const updateStock = () => {
  axios
    .get(baseUrl, { params })
    .then((res) => {
      console.log(res.data.response.body.numOfRows);
      console.log(res.data.response.body.pageNo);
      console.log(res.data.response.body.totalCount);

      Array.from(res.data.response.body.items.item).forEach(async (item: StockPriceInfo) => {
        const stock = new Stock();
        stock.id = item.srtnCd;
        stock.fullId = item.isinCd;
        stock.name = item.itmsNm;
        stock.market = item.mrktCtg;
        stock.startingPrice = item.mkp;
        stock.closingPrice = item.clpr;
        stock.hiPrice = item.hipr;
        stock.loPrice = item.lopr;
        stock.vs = item.vs;
        stock.vsRate = item.fltRt;
        stock.trQunatity = item.trqu;
        stock.trPrice = item.trPrc;
        stock.stockCnt = item.lstgStCnt;
        stock.mrktTotal = item.mrktTotAmt;
        stock.baseDate = item.basDt;
        await Stock.save(stock);
      });
    })
    .catch((err) => console.log(err));
};

export default updateStock;
