import { useMemo, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart,
  Legend, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid,
  Radar, RadarChart, RadialBar, RadialBarChart, ReferenceLine,
  ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const base = [
  { month: "Jan", desktop: 186, mobile: 80, revenue: 240, target: 210 },
  { month: "Feb", desktop: 305, mobile: 200, revenue: 318, target: 250 },
  { month: "Mar", desktop: 237, mobile: 120, revenue: 286, target: 280 },
  { month: "Apr", desktop: 273, mobile: 190, revenue: 342, target: 315 },
  { month: "May", desktop: 209, mobile: 130, revenue: 310, target: 330 },
  { month: "Jun", desktop: 314, mobile: 240, revenue: 398, target: 360 }
];

const radar = [
  { subject: "Speed", a: 92, b: 70 },
  { subject: "Quality", a: 86, b: 76 },
  { subject: "Reach", a: 72, b: 84 },
  { subject: "Trust", a: 94, b: 81 },
  { subject: "Novelty", a: 79, b: 90 },
  { subject: "Clarity", a: 88, b: 73 }
];

const radial = [
  { name: "Chrome", value: 86, fill: "var(--chart-1)" },
  { name: "Safari", value: 68, fill: "var(--chart-2)" },
  { name: "Firefox", value: 53, fill: "var(--chart-3)" },
  { name: "Edge", value: 39, fill: "var(--chart-4)" }
];

const pie = [
  { name: "Desktop", value: 46, fill: "var(--chart-1)" },
  { name: "Mobile", value: 32, fill: "var(--chart-2)" },
  { name: "Tablet", value: 14, fill: "var(--chart-3)" },
  { name: "Other", value: 8, fill: "var(--chart-4)" }
];

const scatter = [
  { x: 12, y: 31, z: 180 }, { x: 18, y: 44, z: 240 },
  { x: 24, y: 39, z: 160 }, { x: 29, y: 57, z: 320 },
  { x: 34, y: 63, z: 270 }, { x: 42, y: 72, z: 400 },
  { x: 48, y: 78, z: 350 }, { x: 55, y: 91, z: 460 }
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  revenue: { label: "Revenue", color: "var(--chart-3)" },
  target: { label: "Target", color: "var(--chart-4)" },
  value: { label: "Value", color: "var(--chart-1)" }
};

function Card({ eyebrow, title, children, wide=false }) {
  return <section className={"chart-card" + (wide ? " wide" : "")}>
    <header>
      <div><span>{eyebrow}</span><h2>{title}</h2></div>
      <span className="live-dot">LIVE</span>
    </header>
    <div className="chart-stage">{children}</div>
  </section>;
}

const commonAxis = {
  tickLine: false,
  axisLine: false,
  tickMargin: 10
};

export default function App() {
  const [run, setRun] = useState(1);
  const [variant, setVariant] = useState("baseline");
  const [dark, setDark] = useState(true);
  const data = useMemo(() => base.map((d, i) => {
    if (variant === "baseline") return d;
    if (variant === "surge") return {...d, desktop: Math.round(d.desktop*(1.08+i*.06)), mobile: Math.round(d.mobile*(.95+i*.08)), revenue: Math.round(d.revenue*(1.02+i*.07))};
    return {...d, desktop: Math.round(d.desktop*(.82+i*.03)), mobile: Math.round(d.mobile*(1.15-i*.025)), revenue: Math.round(d.revenue*(.9+i*.02))};
  }), [variant]);

  const replay = () => setRun(v => v + 1);

  return <main className={dark ? "lab dark" : "lab"}>
    <div className="hero">
      <div>
        <p>SHADCN / RECHARTS V3</p>
        <h1>Chart Motion<br/>Laboratory</h1>
        <p className="lede">Fourteen chart studies. Real shadcn chart primitives. Every entrance is live.</p>
      </div>
      <div className="controls">
        <button onClick={replay}>↻ Replay all</button>
        <select value={variant} onChange={e=>setVariant(e.target.value)} aria-label="Dataset">
          <option value="baseline">Baseline</option>
          <option value="surge">Surge</option>
          <option value="shift">Channel shift</option>
        </select>
        <button onClick={()=>setDark(v=>!v)}>{dark ? "☀ Light" : "● Dark"}</button>
      </div>
    </div>

    <div className="grid" key={run}>
      <Card eyebrow="01 / BAR" title="Grow into place">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" {...commonAxis} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} animationDuration={1100} animationEasing="ease-out" />
          </BarChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="02 / BAR" title="Grouped comparison">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" {...commonAxis} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} animationDuration={900}/>
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={6} animationDuration={1250}/>
          </BarChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="03 / BAR" title="Stacked channels">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" {...commonAxis} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0,0,6,6]} animationDuration={950}/>
            <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[6,6,0,0]} animationDuration={1250}/>
          </BarChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="04 / BAR" title="Horizontal ranking">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={data} layout="vertical" margin={{left:8}}>
            <CartesianGrid horizontal={false} />
            <YAxis dataKey="month" type="category" {...commonAxis} width={34}/>
            <XAxis type="number" hide/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={7} animationDuration={1200}/>
          </BarChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="05 / LINE" title="Draw the signal">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <LineChart data={data}>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey="month" {...commonAxis}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={3} dot={false} animationDuration={1300}/>
          </LineChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="06 / LINE" title="Two trajectories">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <LineChart data={data}>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey="month" {...commonAxis}/>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={3} dot={false} animationDuration={900}/>
            <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={3} dot={false} animationDuration={1450}/>
          </LineChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="07 / AREA" title="Soft reveal">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={.75}/>
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey="month" {...commonAxis}/>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area dataKey="desktop" type="natural" stroke="var(--color-desktop)" fill="url(#areaFill)" strokeWidth={2.5} animationDuration={1300}/>
          </AreaChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="08 / AREA" title="Stacked flow">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <AreaChart data={data}>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey="month" {...commonAxis}/>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area dataKey="desktop" stackId="1" type="monotone" stroke="var(--color-desktop)" fill="var(--color-desktop)" fillOpacity={.35} animationDuration={1000}/>
            <Area dataKey="mobile" stackId="1" type="monotone" stroke="var(--color-mobile)" fill="var(--color-mobile)" fillOpacity={.35} animationDuration={1400}/>
          </AreaChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="09 / PIE" title="Share of attention">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
            <Pie data={pie} dataKey="value" nameKey="name" innerRadius={0} outerRadius={92} strokeWidth={4} animationDuration={1200}>
              {pie.map((entry)=><Cell key={entry.name} fill={entry.fill}/>)}
            </Pie>
          </PieChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="10 / DONUT" title="Concentric share">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
            <Pie data={pie} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} cornerRadius={8} paddingAngle={3} animationDuration={1350}>
              {pie.map((entry)=><Cell key={entry.name} fill={entry.fill}/>)}
            </Pie>
          </PieChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="11 / RADAR" title="Capability field">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <RadarChart data={radar}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{fontSize:11}}/>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar dataKey="a" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={.35} animationDuration={1250}/>
            <Radar dataKey="b" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={.18} animationDuration={1550}/>
          </RadarChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="12 / RADIAL" title="Progress rings">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <RadialBarChart data={radial} innerRadius="25%" outerRadius="92%" startAngle={90} endAngle={-270}>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
            <RadialBar dataKey="value" background cornerRadius={10} animationDuration={1400}/>
          </RadialBarChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="13 / COMPOSED" title="Actual vs target" wide>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ComposedChart data={data}>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey="month" {...commonAxis}/>
            <YAxis {...commonAxis}/>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={6} animationDuration={1000}/>
            <Line dataKey="target" type="monotone" stroke="var(--color-target)" strokeWidth={3} dot={{r:4}} animationDuration={1450}/>
            <ReferenceLine y={300} stroke="var(--muted-foreground)" strokeDasharray="4 4"/>
          </ComposedChart>
        </ChartContainer>
      </Card>

      <Card eyebrow="14 / SCATTER" title="Spend vs growth" wide>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ScatterChart margin={{left:8,right:8}}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="Spend" unit="k" {...commonAxis}/>
            <YAxis type="number" dataKey="y" name="Growth" unit="%" {...commonAxis}/>
            <ZAxis type="number" dataKey="z" range={[70,520]}/>
            <Tooltip cursor={{strokeDasharray:"3 3"}}/>
            <Scatter data={scatter} fill="var(--chart-1)" animationDuration={1500}/>
          </ScatterChart>
        </ChartContainer>
      </Card>
    </div>

    <footer>
      <span>Official shadcn chart layer + Recharts v3</span>
      <span>Dataset: illustrative · animations replayable</span>
    </footer>
  </main>;
}
