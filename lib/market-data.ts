// Helper function to generate random price data
function generatePriceData(basePrice: number, volatility: number, count: number) {
  const prices = []
  let currentPrice = basePrice

  for (let i = 0; i < count; i++) {
    // Random walk with some mean reversion
    const change = (Math.random() - 0.5) * volatility * basePrice
    currentPrice = currentPrice + change
    // Ensure price doesn't go too low
    if (currentPrice < basePrice * 0.5) {
      currentPrice = basePrice * 0.5
    }
    prices.push(Number.parseFloat(currentPrice.toFixed(2)))
  }

  return prices
}

// Generate time labels based on timeframe
function generateTimeLabels(timeframe: string, count: number) {
  const labels = []
  const now = new Date()

  let format: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" }
  let step = 60 * 60 * 1000 // 1 hour in ms

  switch (timeframe) {
    case "1H":
      format = { hour: "2-digit", minute: "2-digit" }
      step = 5 * 60 * 1000 // 5 minutes
      break
    case "4H":
      format = { hour: "2-digit", minute: "2-digit" }
      step = 20 * 60 * 1000 // 20 minutes
      break
    case "1D":
      format = { hour: "2-digit", minute: "2-digit" }
      step = 60 * 60 * 1000 // 1 hour
      break
    case "1W":
      format = { weekday: "short" }
      step = 24 * 60 * 60 * 1000 // 1 day
      break
    case "1M":
      format = { month: "short", day: "numeric" }
      step = 24 * 60 * 60 * 1000 * 2 // 2 days
      break
    case "1Y":
      format = { month: "short" }
      step = 24 * 60 * 60 * 1000 * 30 // 30 days
      break
  }

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * step)
    labels.push(date.toLocaleTimeString([], format))
  }

  return labels
}

// Generate news items
function generateNewsItems(symbol: string) {
  const sources = ["Agricultural Weekly", "Market Insights", "Commodity Report", "Farm Journal"]
  const titles = [
    `Global ${symbol} Demand Surges Amid Supply Chain Disruptions`,
    `Weather Patterns Impact ${symbol} Yield Forecasts`,
    `${symbol} Prices Stabilize After Recent Volatility`,
    `New Technology Improves ${symbol} Production Efficiency`,
    `Government Policies Affect ${symbol} Market Outlook`,
  ]
  const summaries = [
    `International markets see increased activity as supply chain challenges persist...`,
    `Meteorologists predict favorable conditions for ${symbol.toLowerCase()} cultivation in key growing regions...`,
    `After weeks of fluctuation, ${symbol.toLowerCase()} prices show signs of stabilization as market participants...`,
    `Innovative farming techniques are revolutionizing how farmers produce ${symbol.toLowerCase()}, leading to higher yields...`,
    `Recent policy changes could significantly impact ${symbol.toLowerCase()} prices in the coming months as...`,
  ]
  const timeAgo = ["2 hours ago", "4 hours ago", "6 hours ago", "12 hours ago", "1 day ago"]

  const news = []

  for (let i = 0; i < 3; i++) {
    news.push({
      id: i + 1,
      source: sources[Math.floor(Math.random() * sources.length)],
      title: titles[i],
      summary: summaries[i],
      timeAgo: timeAgo[i],
      url: "#",
    })
  }

  return news
}

// Generate open orders
function generateOpenOrders() {
  const orders = []
  const directions: ("buy" | "sell")[] = ["buy", "sell"]
  const types: ("market" | "limit")[] = ["market", "limit"]
  const statuses: ("pending" | "partial" | "filled" | "canceled")[] = ["pending", "partial", "filled", "canceled"]

  // Random number of orders (0-4)
  const numOrders = Math.floor(Math.random() * 5)

  for (let i = 0; i < numOrders; i++) {
    const price = Number.parseFloat((1.5 + Math.random() * 2).toFixed(2))
    const size = Math.floor(Math.random() * 10) + 1
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    // Generate a random progress percentage based on status
    let progress = "0%"
    if (status === "partial") {
      progress = `${Math.floor(Math.random() * 70) + 10}%`
    } else if (status === "filled") {
      progress = "100%"
    } else if (status === "canceled") {
      progress = `${Math.floor(Math.random() * 50)}%`
    }

    // Generate a random timestamp within the last 24 hours
    const now = new Date()
    const randomTime = new Date(now.getTime() - Math.floor(Math.random() * 24 * 60 * 60 * 1000))
    const timestamp = randomTime.toISOString().replace("T", " ").substring(0, 19)

    orders.push({
      id: i + 1,
      type: types[Math.floor(Math.random() * types.length)],
      direction: directions[Math.floor(Math.random() * directions.length)],
      price: price,
      size: size,
      value: Number.parseFloat((price * size).toFixed(2)),
      timestamp: timestamp,
      status: status,
      progress: progress,
    })
  }

  return orders
}

// Main function to generate market data
export function generateMarketData(symbol: string, timeframe: string) {
  // Base prices for different commodities
  const basePrices: Record<string, number> = {
    corn: 2.0,
    wheat: 1.56,
    rice: 2.2,
    potato: 1.33,
    soybean: 2.45,
    coffee: 3.75,
    cotton: 1.85,
    sugar: 0.95,
    default: 2.0,
  }

  const basePrice = basePrices[symbol.toLowerCase()] || basePrices.default

  // Generate price data points based on timeframe
  let dataPoints = 24
  switch (timeframe) {
    case "1H":
      dataPoints = 12
      break
    case "4H":
      dataPoints = 12
      break
    case "1D":
      dataPoints = 24
      break
    case "1W":
      dataPoints = 7
      break
    case "1M":
      dataPoints = 15
      break
    case "1Y":
      dataPoints = 12
      break
  }

  const prices = generatePriceData(basePrice, 0.02, dataPoints)
  const labels = generateTimeLabels(timeframe, dataPoints)

  // Calculate price change
  const startPrice = prices[0]
  const currentPrice = prices[prices.length - 1]
  const priceChange = currentPrice - startPrice
  const priceChangePercent = (priceChange / startPrice) * 100

  // Generate bid and ask prices
  const spread = basePrice * 0.01
  const bid = Number.parseFloat((currentPrice - spread / 2).toFixed(2))
  const ask = Number.parseFloat((currentPrice + spread / 2).toFixed(2))

  // Generate day high and low
  const dayHigh = Number.parseFloat((currentPrice * (1 + Math.random() * 0.05)).toFixed(2))
  const dayLow = Number.parseFloat((currentPrice * (1 - Math.random() * 0.05)).toFixed(2))

  // Generate volume
  const volumeValue = Math.floor(Math.random() * 200) + 50
  const volume = `${volumeValue}.${Math.floor(Math.random() * 10)}M`

  // Generate previous close
  const prevClose = Number.parseFloat((currentPrice * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2))

  return {
    id: Math.floor(Math.random() * 1000) + 1,
    name: symbol,
    currentPrice,
    priceChange,
    priceChangePercent,
    unit: "kg",
    chartData: {
      labels,
      prices,
    },
    bid,
    ask,
    dayHigh,
    dayLow,
    volume,
    prevClose,
    openOrders: generateOpenOrders(),
    news: generateNewsItems(symbol),
  }
}

