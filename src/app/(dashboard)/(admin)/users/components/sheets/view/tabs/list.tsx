import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UsersViewSheetTabsList() {
  return (
    <TabsList>
      <TabsTrigger value="details" className="cursor-pointer">
        Details
      </TabsTrigger>
      <TabsTrigger value="logs" className="cursor-pointer">
        Logs
      </TabsTrigger>
    </TabsList>
  );
}
