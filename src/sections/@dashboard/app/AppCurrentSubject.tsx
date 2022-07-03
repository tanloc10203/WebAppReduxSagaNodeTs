import { Card, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BaseOptionChart } from 'components/chart';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';

const CHART_HEIGHT = 392;

const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
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

export interface ChartDataAppCurrentSubjectProps {
  name: string;
  data: Array<number>;
}

export interface AppCurrentSubjectProps {
  title: string;
  subheader?: string;
  chartData: Array<ChartDataAppCurrentSubjectProps>;
  chartLabels: Array<string>;
  chartColors: Array<any>;
  [key: string]: any;
}

export default function AppCurrentSubject({
  title,
  subheader,
  chartData,
  chartColors,
  chartLabels,
  ...other
}: AppCurrentSubjectProps) {
  const chartOptions: Object = merge(BaseOptionChart(), {
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: chartLabels,
      labels: {
        style: {
          colors: chartColors,
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="radar" series={chartData} options={chartOptions} height={340} />
      </ChartWrapperStyle>
    </Card>
  );
}
