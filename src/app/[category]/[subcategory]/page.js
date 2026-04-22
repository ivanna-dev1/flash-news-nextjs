// import React from "react";
// import { news } from "../../../arrayFakeNews.js";
// import CategoryNewsCard from "@/components/CategoryNewsCard";
// import Breadcrumbs from "@/components/Breadcrumbs";

// export default async function CategoryPage({ params }) {
//   const { category, subcategory } = await params;
//   const categoryNews = news.filter((item) => item.subcategory === subcategory);
//   const filteredNews = categoryNews.filter(
//     (item) => item.category === category,
//   );

//   return (
//     <div>
//       <Breadcrumbs category={category} />
//       <div className="md:grid grid-cols-2 flex-1  gap-2 items-start content-start ">
//         {filteredNews.map((article) => (
//           <CategoryNewsCard article={article} key={article.id} />
//         ))}
//       </div>
//     </div>
//   );
// }
