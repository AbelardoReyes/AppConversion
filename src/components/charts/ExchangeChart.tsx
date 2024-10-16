import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart.tsx";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { CircleDollarSign } from "lucide-react";

const charData = [
  {
    date: "2021-01-01",
    MXN: 18.21,
  },
  {
    date: "2021-01-02",
    MXN: 18.25,
  },
  {
    date: "2021-01-03",
    MXN: 18.28,
  },
  {
    date: "2021-01-04",
    MXN: 18.30,
  },
  {
    date: "2021-01-05",
    MXN: 18.35,
  },
  {
    date: "2021-01-06",
    MXN: 18.40,
  },
  {
    date: "2021-01-07",
    MXN: 18.45,
  },
  {
    date: "2021-01-08",
    MXN: 18.50,
  },
  {
    date: "2021-01-09",
    MXN: 18.55,
  },
  {
    date: "2021-01-10",
    MXN: 18.60,
  },
  {
    date: "2021-01-11",
    MXN: 18.65,
  },
  {
    date: "2021-01-12",
    MXN: 18.70,
  },
  {
    date: "2021-01-13",
    MXN: 18.75,
  },
  {
    date: "2021-01-14",
    MXN: 18.80,
  },
  {
    date: "2021-01-15",
    MXN: 18.85,
  },
  {
    date: "2021-01-16",
    MXN: 18.90,
  }
]

const charConfig= {
  MXN: {
    label: "MXN",
    icon: CircleDollarSign,
    color: "#2563eb",
  }
} satisfies ChartConfig

export default function ExchangeChart() {
  return (
    <ChartContainer config={charConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={charData}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <YAxis
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN"
          }).format(value)}
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="MXN" fill="var(--color-MXN)" radius={4} />
      </BarChart>

    </ChartContainer>
  )
}