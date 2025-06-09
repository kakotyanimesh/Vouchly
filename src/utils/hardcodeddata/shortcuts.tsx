import { BarChart, GitGraph, MessageCircleDashed, MessageSquare, Plus, Settings, Shield, Users, Video } from "lucide-react"
import { RecentelyActiveProps, TableHeader, TextReviewProps } from "../types/user_types"

export const shortCutArrayDashboard = [
    {   
        title : "Create New Space", 
        icon : <Plus size={15}/>, 
        parentColor: "shadow-[0px_0px_4px_0px_rgba(55,174,105,0.5)] bg-[hsl(var(--primary))]/20", 
        iconStyle : "bg-[hsl(var(--primary))]/50 text-white",
        redirect : "/space"
    },
    {   
        title : "View Forms", 
        icon : <GitGraph size={15}/>, 
        parentColor:"shadow-[0px_0px_4px_0px_rgba(20,44,219,0.5)] bg-blue-500/10", 
        iconStyle : "bg-blue-500/50",
        redirect : "/forms"

    },
    {
        title : "Check Submissions", 
        icon : <MessageCircleDashed size={15}/>, 
        parentColor:"shadow-[0px_0px_4px_0px_rgba(174,0,255,0.5)] bg-purple-500/10", 
        iconStyle : "bg-purple-500/50",
        redirect : "/submissions"
        
    },
    {
        title : "Manage Settings", 
        icon : <Settings size={15}/>, 
        parentColor: "shadow-[0px_0px_4px_0px_rgba(255,64,0,0.5)] bg-orange-500/10",
        iconStyle : "bg-orange-500/50",
        redirect : "/settings"
        
    },
]

// export const DashboardCardData : DashboardCardProps[] = [
//     {title : "Space", data : 1, desc : "Organize your projects"},
//     {title : "Forms", data : 2, desc : "+2 from last week"},
//     {title : "Submission", data : 2, desc : "+12 from last month"}
// ] 


export const RecentlyActiveCardData : RecentelyActiveProps[] = [
    {Name : "Animesh", position : "CEO", status : "Approved", time : "2 days", src : "/"},
    {Name : "Umesh", position : "CEO", status : "Pending", time : "1 day", src: "/"},
    {Name : "Manash", position : "CEO", status : "Dismiss", time : "2 days",src : "/"}
]


// export const SpaceCarddata : SpaceCardProps[] = [
//     {spaceName : "My new space", Id : 1, src : "www.google.com", totalForms : 12, createdAt : new Date("12-12-2024").toDateString()},
//     {spaceName : "My new Two", Id : 1, src : "www.google.com", totalForms : 12, createdAt : new Date("12-12-2024").toDateString()},
//     {spaceName : "My new thweew", Id : 1, src : "www.google.com", totalForms : 12, createdAt : new Date("12-12-2024").toDateString()},
// ]


// used in spaces->testimonials table 

export const TestimonialsTableheaders : TableHeader[] = [
    { label: "Name", key: "Name" , isHidden : false},
    { label: "Status", key: "status", isHidden : false },
    { label: "Submissions", key: "Submissions" , isHidden : true},
    { label: "Actions", key: "actions" , isHidden : false}
]



export const FormTableheaders = [
    { label: "Name", key: "Name" , isHidden : false},
    { label: "Space", key: "Space", isHidden : true },
    { label: "Status", key: "status", isHidden : false },
    { label: "Submissions", key: "submission" , isHidden : true},
    { label: "Actions", key: "actions" , isHidden : false}
]

export const FormTabledata = [
    {
        Name: "Product Testimonial",
        Space : "spaceOne",
        desc: "Collect valuable feedback for your latest product.",
        status: "Approved",
        submission: "12",
    },
    {
        Name: "Sample Testimonial",
        Space : "spaceOne",
        desc: "Changed Description data.",
        status: "Pending",
        submission: "12",
    },
    {
        Name: "New Testimonial",
        Space : "spaceOne",
        desc: "Collect valuable feedback for your latest product.",
        status: "Draft",
        submission: "1",
    },
    {
        Name: "Until Testimonial",
        Space : "spaceOne",
        desc: "Collect valuable feedback for your latest product.",
        status: "Dismiss",
        submission: "12",
    },
]





export const LandingReviews : TextReviewProps[] = [
    {
        textReview : "ProofCloud transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their testimonial wall to our landing page.",
        username : "Animesh",
        userCompany : "Kakoty.tech",
        starts : 4,
        imageSrc : "https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg"
    },
    {
        textReview : "ProofCloud transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their testimonial wall to our landing page.",
        username : "Animesh",
        userCompany : "Kakoty.tech",
        starts : 4,
        imageSrc : "https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg"
    },
    {
        textReview : "ProofCloud transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their testimonial wall to our landing page.",
        username : "Animesh",
        userCompany : "Kakoty.tech",
        starts : 4,
        imageSrc : "https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg"
    },
]



export const BentoGridFeatures = [
    {
        id: 1,
        icon: <Video size={18}/>,
        title: "Video Testimonials",
        desc: "Collect authentic video reviews that build real trust with your audience and boost conversions",
        className: "md:col-span-2 col-span-1",
        initial : {x : -20, opacity : 0},
        whileInView : { x : 0, opacity : 1}
    },
    {
        id: 2,
        icon: <Users size={18}/>,
        title: "Custom Forms",
        desc: "Beautiful, branded forms that match your website perfectly",
        className: "col-span-1",
        initial : {x : 20, opacity : 0},
        whileInView : { x : 0, opacity : 1}
    },
    {
        id: 3,
        icon: <Shield size={18}/>,
        title: "Smart Moderation",
        desc: "AI-powered content filtering and approval workflows",
        className: "col-span-1",
        initial : {x : -20, opacity : 0},
        whileInView : { x : 0, opacity : 1}
    },
    {
        id: 4,
        icon: <BarChart size={18}/>,
        title: "Analytics Dashboard",
        desc: "Track performance and engagement metrics in real-time",
        className: "col-span-1",
        initial : {y : 20, opacity : 0},
        whileInView : { y : 0, opacity : 1}
    },
    {
        id: 5,
        icon: <MessageSquare size={18}/>,
        title: "Review Management",
        desc: "Organize and showcase testimonials across all platforms",
        className: "col-span-2 md:col-span-1",
        initial : {x : 20, opacity : 0},
        whileInView : { x : 0, opacity : 1}
    }
]