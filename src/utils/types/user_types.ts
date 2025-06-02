import { statusType } from "../lib/tailwind_switch"

export interface SignupTypes {
    username : string,
    password : string,
    email : string
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
    createdAt : string,
    totalForms : number,
    Id : number,
    src : string
}

export interface TableHeader {
  label: string;
  key: string;
  isHidden : boolean
}

export interface TabledataTypes {
    thead : TableHeader[],
    tdata : Record<string, string>[]
}

export type TableDataKeyTypes = "Name" | "Space" | "Status" 