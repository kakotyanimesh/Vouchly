import { status } from "@/generated/prisma"
import { statusType } from "../lib/tailwind_switch"

export interface SignupTypes {
    username : string,
    password : string,
    email : string
}

export interface CreateSpaceTypes {
    spaceName : string,
    url : string
} 


export interface CreateFormTypes {
    Name : string,
    Description : string,
    questions : string[],
    brandLogo : string,
    spaceId : number
}

export interface DashboardCardProps {
    title : string,
    data : number,
    desc : string
}

export interface RecentelyActiveProps {
    Name : string,
    position : string,
    status : statusType,
    time : string,
    src : string
}


export interface SpaceCardProps {
    spaceName : string,
    createdAt : string | Date,
    totalForms : number,
    Id : number,
    src : string
}

export interface TableHeader {
  label: string;
  key: string;
  isHidden : boolean
}

export interface TabledataTypes<T = Record<string, string>> {
    thead : TableHeader[],
    tdata : T[]
}



export type TableDataKeyTypes = "Name" | "Space" | "Status" 

export interface TestimoniaTableDataTypes {
    id : number,
    Name : string,
    Description : string,
    createdAt : string,
    status : status,
    Submissions : number,
    Space ?: string
} 


export interface SubmissionTableDatatypes {
    "Customer Name" : string,
    Status : status,
    "Submitted At" : string,
} 

export type AWS_Folder_Name = "form_logos" | "testimonial-videos"  | "user-images" | "widget"


export interface TextReviewProps {
    textreviewid :number,
    textReview : string,
    customerName : string,
    customerCompany : string,
    imageSrc : string,
    stars : number
}

export interface VideoReviewProps {
    videoReviewid : number,
    videoLink : string,
    customerName : string,
    customerCompany : string,
    stars : number
}


export type OrderredTextReviewType = {
    id : number,
    type : "text",
    data : TextReviewProps
} 

export type OrderedVideoReviewType = {
    id : number 
    type : "video"
    data : VideoReviewProps
}

// we have same type in zustand but prob with that it won't be able to differentiate b/w which one is text type or which one is video type 
// and for users i dont want to take that risk

export type OrderedReviewTypes = OrderredTextReviewType | OrderedVideoReviewType

export interface TextReviewPropsWallOfLove {
    id :number,
    textReview : string,
    customerName : string,
    customerCompany : string,
    imageSrc : string,
    stars : number
}

export interface VideoReviewPropsWallOflove {
    id : number,
    videoLink : string,
    customerName : string,
    customerCompany : string,
    stars : number
}





export interface ArrayOfTabs {
    title : string,
    key : number
}


// review types here 

export interface ReviewTypes {
    spaceId : number,
    formId : number,
    customerName : string
    customerEmail : string
    textReview ?: string
    adminId  : number
    customerImageUrl : string
    videoLink ?: string
    stars : number
    jobTitle :  string
    customerCompany : string
}