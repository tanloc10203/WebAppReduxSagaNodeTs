import { Box, Card, CardHeader } from '@mui/material';
import { BaseOptionChart } from 'components/chart';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';

export interface ChartDataAppWebsiteVisits {
  name: string;
  type: string;
  fill: string;
  data: Array<number>;
}

export interface AppWebsiteVisitsProps {
  title: string;
  subheader: string;
  chartData: Array<ChartDataAppWebsiteVisits>;
  chartLabels: Array<string>;
  [key: string]: any;
}

export default function AppWebsiteVisits({
  title,
  subheader,
  chartLabels,
  chartData,
  ...other
}: AppWebsiteVisitsProps) {
  const chartOptions: Object = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
