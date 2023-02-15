import { Market, MarketSpotCandle } from '@lyrafinance/lyra-js'
import { formatEther } from 'ethers/lib/utils.js'
import { OhlcData, TimeRange, UTCTimestamp } from 'lightweight-charts'

export async function getTokenCandles(
  market: Market,
  timeRange: TimeRange
): Promise<OhlcData[]> {
  const candles: MarketSpotCandle[] = await market?.spotPriceHistory({
    startTimestamp: parseInt(timeRange.from.toString()),
    endTimestamp: parseInt(timeRange.to.toString()),
  })

  const res: OhlcData[] = candles.map((candle: MarketSpotCandle) => ({
    time: candle.endTimestamp as UTCTimestamp,
    open: parseFloat(formatEther(candle.open)),
    high: parseFloat(formatEther(candle.high)),
    close: parseFloat(formatEther(candle.close)),
    low: parseFloat(formatEther(candle.low)),
  }))

  return res
}
