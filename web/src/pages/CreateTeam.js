import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
    AppTasks,
    AppNewsUpdate,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppWidgetSummary,
    AppCurrentSubject,
    AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function CreateTeam() {
    const theme = useTheme();

    return (
        <Page title="Create Team">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Create Team
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                            title="Conversion Rates"
                            subheader="(+43%) than last year"
                            chartData={[
                                { label: 'Italy', value: 400 },
                                { label: 'Japan', value: 430 },
                                { label: 'China', value: 448 },
                                { label: 'Canada', value: 470 },
                                { label: 'France', value: 540 },
                                { label: 'Germany', value: 580 },
                                { label: 'South Korea', value: 690 },
                                { label: 'Netherlands', value: 1100 },
                                { label: 'United States', value: 1200 },
                                { label: 'United Kingdom', value: 1380 },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentSubject
                            title="Current Subject"
                            chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
                            chartData={[
                                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                            ]}
                            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppNewsUpdate
                            title="News Update"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: faker.name.jobTitle(),
                                description: faker.name.jobTitle(),
                                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                                postedAt: faker.date.recent(),
                            }))}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppOrderTimeline
                            title="Order Timeline"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: [
                                    '1983, orders, $4220',
                                    '12 Invoices have been paid',
                                    'Order #37745 from September',
                                    'New order placed #XF-2356',
                                    'New order placed #XF-2346',
                                ][index],
                                type: `order${index + 1}`,
                                time: faker.date.past(),
                            }))}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
