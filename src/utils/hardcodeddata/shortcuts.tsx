import { GitGraph, LucideMessageCircleCode, Rocket} from "lucide-react"
import { RecentelyActiveProps, TableHeader, TextReviewProps } from "../types/user_types"
import { IoSettings  } from "react-icons/io5";
import { featureIconTypes } from "@/components/ui/featurecard"
import { MotionProps } from "motion/react"

export const shortCutArrayDashboard = [
    {   
        title: "Create Space", 
        icon : <Rocket className="fill-[hsl(var(--primary))]" size={15}/>, 
        parentColor: "hover:shadow-[0px_0px_5px_0px_#48bb78] bg-[hsl(var(--primary))]/15", 
        iconStyle : "bg-[hsl(var(--primary))]/30",
        redirect : "/space"
    },
    {   
        title: "Manage Testimonial Forms", 
        icon : <GitGraph className="fill-blue-300" size={15}/>, 
        parentColor:"hover:shadow-[0px_0px_5px_0px_#4299e1] bg-blue-600/15 text-blue-300", 
        iconStyle : "bg-blue-600/30",
        redirect : "/forms"

    },
    {
        title: "Review Submissions", 
        icon: <LucideMessageCircleCode className="fill-purple-300" size={15}/>, 
        parentColor:"hover:shadow-[0px_0px_5px_0px_#9f7aea] bg-purple-600/15 text-purple-300", 
        iconStyle : "bg-purple-600/30",
        redirect : "/space"
        
    },
    {
        title: "Account & Settings", 
        icon: <IoSettings  className="fill-orange-300" size={15}/>, 
        parentColor: "hover:shadow-[0px_0px_5px_0px_#f6ad55] bg-orange-600/20 text-orange-300 backdrop-blur-3xl",
        iconStyle: "bg-orange-600/30",
        redirect : "/account"
        
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

export const SubmissionTableheaders : TableHeader[] = [
    { label: "Submitted by", key: "Name" , isHidden : false},
    { label: "Status", key: "status", isHidden : false },
    { label: "Submitted At", key: "date" , isHidden : true},
    { label: "Actions", key: "actions" , isHidden : false}
]




export const FormTableheaders = [
    { label: "Name", key: "Name" , isHidden : false},
    { label: "Space", key: "Space", isHidden : true },  
    { label: "Status", key: "status", isHidden : false },
    { label: "Submissions", key: "Submissions" , isHidden : true},
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





export const TextReviews: TextReviewProps[] = [
	{
		textreviewid: 1,
		textReview:
			"Vouchly transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their vouchly wall to our landing page.",
		customerName: "Animesh",
		customerCompany: "Kakoty.tech",
		stars: 4,
		imageSrc:
			"https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg",
	},
	{
		textreviewid: 2,
		textReview:
			"Vouchly transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their vouchly wall to our landing page.",
		customerName: "Animesh",
		customerCompany: "Kakoty.tech",
		stars: 4,
		imageSrc:
			"https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg",
	},
	{
		textreviewid: 3,
		textReview:
			"Vouchly transformed how we collect and display testimonials. Our conversion rate increased by 30% after adding their vouchly wall to our landing page.",
		customerName: "Animesh",
		customerCompany: "Kakoty.tech",
		stars: 4,
		imageSrc:
			"https://i.pinimg.com/736x/22/c9/fd/22c9fd09af9b520ca3678e441be77723.jpg",
	},
];


type BentoGridFeaturesTypes = {
	id: number;
	featureIconTypes: featureIconTypes;
	title: string;
	desc: string;
	className: string;
	initial: MotionProps["initial"];
	whileInView : MotionProps["whileInView"]
};

export const BentoGridFeatures: BentoGridFeaturesTypes[] = [
	{
		id: 1,
		featureIconTypes: "Form",
		title: "Smart Form Generator",
		desc: "Get handpicked testimonial form layouts based on your vibe and you're collecting reviews in style 📋.",
		className: "md:col-span-2 col-span-1",
		initial: { x: -20, opacity: 0 },
		whileInView: { x: 0, opacity: 1 },
	},
	{
		id: 2,
		featureIconTypes: "Templates",
		title: "Aesthetic Templates",
		desc: "Showcase your reviews with stunning layouts🔥.",
		className: "col-span-1",
		initial: { x: 20, opacity: 0 },
		whileInView: { x: 0, opacity: 1 },
	},
	{
		id: 3,
		featureIconTypes: "Dashboard",
		title: "Smart Dashboard",
		desc: "Keep track of everything in one slick place 📈.",
		className: "col-span-1",
		initial: { x: -20, opacity: 0 },
		whileInView: { x: 0, opacity: 1 },
	},
	{
		id: 4,
		featureIconTypes: "Moderation",
		title: "Effortless Moderation",
		desc: "Approve, reject, or auto-filter reviews in just a few clicks✨.",
		className: "col-span-1",
		initial: { y: 20, opacity: 0 },
		whileInView: { y: 0, opacity: 1 },
	},
	{
		id: 5,
		title: "Embed Anywhere, Instantly",
		featureIconTypes: "Embaded",
		desc: "Copy a script, paste it on your site & your testimonial wall goes live 🧩.",
		className: "col-span-2 md:col-span-1",
		initial: { x: 20, opacity: 0 },
		whileInView: { x: 0, opacity: 1 },
	},
];


export const FooterLinks : {fHead : string, features : string[]}[] = [
    {
        fHead : "Product",
        features : ["Features", "Pricing", "API"]
    },
    {
        fHead : "Resources",
        features : ["Documentation", "Support", "Blog"]
    },
    {
        fHead : "Company",
        features : ["About", "Contact", "Privacy"]
    }
]


export const questions = [
  "What inspired you to share this testimonial?",
  "How has our product or service made a difference for you?",
  "Would you recommend us to others? Why or why not?"
];