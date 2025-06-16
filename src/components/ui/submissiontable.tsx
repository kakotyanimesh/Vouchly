"use client"

import { SubmissionTableheaders } from "@/utils/hardcodeddata/shortcuts"
import { TableComponent } from "./table"


export const SubmissionTable = ({data} : {data : Record<string , string>[]}) => {
    return (
        <div>
            <TableComponent thead={SubmissionTableheaders} tdata={data}/>
        </div>
    )
}