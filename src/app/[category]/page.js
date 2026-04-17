import React from 'react'
import { news } from '../../../arrayFakeNews.js'
import CategoryNewsCard from '@/components/CategoryNewsCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export default async function CategoryPage({ params }) {
    const { category } = await params;
    const categoryNews = news.filter((item) => item.category === category);
    const filteredNews = categoryNews.filter((item) => item.category === category);

    return (
        <div>
            <Breadcrumbs category={category} />
            {filteredNews.map((article) => (
                <CategoryNewsCard article={article} key={article.id} />
            ))}
        </div>
    )
}  