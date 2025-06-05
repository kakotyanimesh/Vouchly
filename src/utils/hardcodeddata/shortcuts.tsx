import { GitGraph, MessageCircleDashed, Plus, Settings } from "lucide-react"
import { RecentelyActiveProps, TableHeader } from "../types/user_types"

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



