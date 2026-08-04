"use client";


import DashboardCard from "./DashboardCard";


interface Props{

stats:any;

}



export default function StatsGrid({

stats

}:Props){



return(



<div

className="
grid
grid-cols-2
md:grid-cols-3
xl:grid-cols-6
gap-5
"

>






{/* CONTENT */}


<DashboardCard

title="Total Articles"

value={stats?.totalArticles || 0}

link="/admin/posts"

/>





<DashboardCard

title="Total Views"

value={
stats?.totalViews?.toLocaleString() || 0
}

/>





{/* USERS */}


<DashboardCard

title="Total Users"

value={stats?.totalUsers || 0}

link="/admin/users"

/>





<DashboardCard

title="Published Today"

value={stats?.publishedToday || 0}

link="/admin/posts?status=approved"

/>





<DashboardCard

title="Breaking News"

value={stats?.breakingArticles || 0}

link="/admin/posts?breaking=true"

/>





<DashboardCard

title="Active Users"

value={stats?.activeUsers || 0}

/>









{/* SECOND ROW */}


<DashboardCard

title="Drafts"

value={stats?.drafts || 0}

link="/admin/posts?status=draft"

/>





<DashboardCard

title="Pending Review"

value={stats?.pendingArticles || 0}

link="/admin/posts?status=pending"

/>





<DashboardCard

title="Featured"

value={stats?.featuredArticles || 0}

link="/admin/posts?featured=true"

/>





<DashboardCard

title="Editorials"

value={stats?.editorial?.total || 0}

link="/admin/editorial"

/>





<DashboardCard

title="AI Intelligence"

value={stats?.editorial?.intelligence || 0}

/>





<DashboardCard

title="Poll Votes"

value={stats?.poll?.votes || 0}

link="/admin/polls"

/>



</div>



)


}