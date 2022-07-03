import { Box, Card, CardHeader } from '@mui/material';
import { BaseOptionChart } from 'components/chart';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'utils';
import { ChartDataAppCurrentVisitsProps } from './AppCurrentVisits';

export interface AppConversionRatesProps {
  title: string;
  subheader?: string;
  chartData: Array<ChartDataAppCurrentVisitsProps>;
  [key: string]: any;
}

export default function AppConversionRates({
  title,
  subheader,
  chartData,
  ...other
}: AppConversionRatesProps) {
  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions: Object = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName: number) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
