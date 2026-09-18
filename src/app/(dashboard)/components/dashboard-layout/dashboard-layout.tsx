import MainContainer from '../container';

import DashboardPageLayoutReviewsPieChart from './charts/reviews-pie';
import DashboardPageLayoutOrdersBarChart from './charts/orders-bar';
import DashboardPageLayoutDevicesPieChart from './charts/device-pie';
import DashboardPageLayoutBlog from './blog/blog';
import DashboardPageLayoutShop from './shop';

export default function DashboardPageLayout() {
  return (
    <MainContainer>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
          <DashboardPageLayoutReviewsPieChart />
          <DashboardPageLayoutOrdersBarChart />
          <DashboardPageLayoutDevicesPieChart />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <DashboardPageLayoutBlog />
          <DashboardPageLayoutShop />
        </div>
      </div>
    </MainContainer>
  );
}
