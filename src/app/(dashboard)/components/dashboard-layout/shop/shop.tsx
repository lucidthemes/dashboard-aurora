import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPageLayoutShop() {
  return (
    <div className="basis-1/2">
      <Card className="flex h-full flex-col">
        <Tabs defaultValue="products" className="h-full gap-5">
          <CardHeader className="items-center pb-0">
            <CardTitle>Shop</CardTitle>
            <CardDescription>Latest products, reviews, or orders</CardDescription>
            <CardAction>
              <TabsList>
                <TabsTrigger value="products" className="cursor-pointer">
                  Products
                </TabsTrigger>
                <TabsTrigger value="reviews" className="cursor-pointer">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="orders" className="cursor-pointer">
                  Orders
                </TabsTrigger>
              </TabsList>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <TabsContent value="products" className="h-full">
              <div className="h-full w-full animate-pulse rounded-sm bg-sidebar" />
            </TabsContent>
            <TabsContent value="reviews" className="h-full">
              <div className="h-full w-full animate-pulse rounded-sm bg-sidebar" />
            </TabsContent>
            <TabsContent value="orders" className="h-full">
              <div className="h-full w-full animate-pulse rounded-sm bg-sidebar" />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
