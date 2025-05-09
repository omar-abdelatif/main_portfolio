import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { fetchPricing } from '@/utils/api';

interface Pricing {
    name: string;
    price: number;
    items: string | PricingItems[];
}

interface PricingItems {
    id: number;
    title: string;
    pricing_plan_id: number;
}

export default function PricingPage() {
    const [pricingData, setPricingData] = useState<Pricing[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadData = async () => {
            try {
                const pricing = await fetchPricing();
                setPricingData(pricing);
            } catch (error) {
                console.error('Error fetching pricing data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#E5A137]"></div>
            </div>
        );
    }

    return (
        <Layout>
            <section className="pricing-wrapper my-10">
                <div className="container-full px-10">
                    <h1 className="text-5xl text-center font-bold mb-10 sm:mb-10 md:mb-10 lg:mb-15">Pricing Plans</h1>
                    <div className="w-full flex justify-center items-center px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
                            {pricingData && pricingData.map((plan: Pricing) => {
                                const parsedItems: PricingItems[] = typeof plan.items === 'string' ? JSON.parse(plan.items) : plan.items;
                                return (
                                    <div key={plan.name} className="rounded-2xl overflow-hidden border-2 border-[#5C3B10] shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-5">
                                        <div className="bg-[#E5A137] p-6 h-full">
                                            <h2 className="text-2xl font-bold text-center underline">{plan.name}</h2>
                                            <div className="plan-price mt-5 text-center mb-7">
                                                <div className="price-title mb-2">
                                                    <p className="font-bold underline">Start Price</p>
                                                </div>
                                                <div className="price-number">
                                                    <span className="text-4xl font-bold text-center">{plan.price}EGP</span>
                                                    <span className="text-black font-bold ml-2">/ project</span>
                                                </div>
                                            </div>
                                            <div className="plan-items">
                                                {plan.items && plan.items.length > 0 ? (
                                                    <ul className="space-y-3">
                                                        {parsedItems.map((item: PricingItems) => (
                                                            <li key={item.id} className="flex items-center">
                                                                <svg className="h-5 w-5 text-white-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                                </svg>
                                                                <span className="font-bold">{item.title}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-center font-bold">No items available</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}