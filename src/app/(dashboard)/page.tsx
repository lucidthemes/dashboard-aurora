import MainContainer from '@/components/dashboard/main-container';

export default function DashboardPage() {
  return (
    <div className="border-b-1 pb-10">
      <MainContainer>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Aurora</h1>
          <div className="flex gap-x-10">
            <div>
              <p className="font-bold">Posts</p>
              <p>20</p>
            </div>
            <div>
              <p className="font-bold">Products</p>
              <p>10</p>
            </div>
            <div>
              <p className="font-bold">Orders</p>
              <p>5</p>
            </div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
