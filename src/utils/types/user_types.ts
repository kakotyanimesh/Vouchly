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
    Name : string,
    Description : string,
    createdAt : string,
    status : status,
    Submissions : number,
    Space ?: string
} 


