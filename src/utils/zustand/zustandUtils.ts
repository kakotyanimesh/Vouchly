export const pickNonfunctios = <T extends object>(store : T, omitablekeys : (keyof T)[] = []) : Partial<T> => {
    return Object.fromEntries(
        Object.entries(store).filter(([key, value]) => (
            typeof value !== "function" && !omitablekeys.includes(key as keyof T)
        ))
    ) as Partial<T>
}


// what this function is doing 
/**
 * we have zustand object store {textcolor : "sdsa", setTextColor : funtion}
 * it will take that object 
 * then with Object.entries => convert to array [["textcoloe" , "value"], ["set", function]]
 * aafetr that fileter will remove thw things where value is functions 
 */
