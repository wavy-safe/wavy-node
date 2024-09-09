
import { *asReact } from 'react';
import DashboardNav from './(commponents)/dashboardnavar';


export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid min-h-screen w-full'></div>
    {/** Dashboard Sidebar */}
    <DashboardNav />
    {/** Dashboard content*/}
    

;
}