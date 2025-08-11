import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { PageWrapper } from '../components/layout/PageWrapper';
import { HomeCard } from '../components/cards/HomeCard';
import { useData } from '../hooks/useData';

export function Home() {
  const { getHomeCardData } = useData();
  const homeCards = getHomeCardData();
  
  return (
    <>
      <Header title="Equipment Reports" />
      
      <PageWrapper>
        <div className="p-4 space-y-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600">
              Select a task to get started with equipment condition reports.
            </p>
          </div>
          
          <div className="space-y-4">
            {homeCards.map((card) => (
              <HomeCard
                key={card.id}
                icon={card.icon}
                count={card.count}
                title={card.title}
                description={card.description}
                navigationPath={card.navigationPath}
              />
            ))}
          </div>
        </div>
      </PageWrapper>
      
      <BottomNav />
    </>
  );
}