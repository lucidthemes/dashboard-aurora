import { getSidebars } from '../../data/get-sidebars';
import SidebarsListTable from './table';

export default async function SidebarsList() {
  const sidebarsList = await getSidebars();

  return <SidebarsListTable sidebarsList={sidebarsList} />;
}
