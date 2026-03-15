import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CustomersViewSheetTabsList() {
  return (
    <TabsList>
      <TabsTrigger value="details" className="cursor-pointer">
        Details
      </TabsTrigger>
      <TabsTrigger value="orders" className="cursor-pointer">
        Orders
      </TabsTrigger>
      <TabsTrigger value="reviews" className="cursor-pointer">
        Reviews
      </TabsTrigger>
      <TabsTrigger value="logs" className="cursor-pointer">
        Logs
      </TabsTrigger>
    </TabsList>
  );
}
