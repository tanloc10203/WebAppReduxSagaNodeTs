import { Card, CardHeader } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { BaseOptionChart } from 'components/chart';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'utils';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

export interface ChartDataAppCurrentVisitsProps {
  label: string;
  value: number;
}

export interface AppCurrentVisitsProps {
  title: string;
  subheader?: string;
  chartData: Array<ChartDataAppCurrentVisitsProps>;
  chartColors: Array<any>;
  [key: string]: any;
}

export default function AppCurrentVisits({
  title,
  subheader,
  chartColors,
  chartData,
  ...other
}: AppCurrentVisitsProps) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions: Object = merge(BaseOptionChart(), {
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: number) => fNumber(seriesName),
        title: {
          formatter: (seriesName: number) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
