import { format as formatDate } from "date-fns"

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
}

export const formatDateString = (date: Date, formatString = "EEEE, MMMM d, yyyy"): string => {
  return formatDate(date, formatString)
}

