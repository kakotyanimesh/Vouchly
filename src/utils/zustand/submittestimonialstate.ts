import { create } from "zustand";


type InputBoxesTypes = {
    storeNumber : number,
    setStoreNumber : (n : number) => void
}


export const InputBoxesTypesStore = create<InputBoxesTypes>((set) => ({
    storeNumber : 0,
    setStoreNumber : (n) => set({storeNumber : n})
}))


type TestimonialSubmissionTypes  = {
    customerName : string,
    customerEmail : string,
    customerCompany : string,
    stars : number,
    textReview ?: string,
    jobTitle : string    
}

type TestimonialSubmissionActions = {
    setCustomerName : (c : string) => void,
    setCustomerEmail : (e : string) => void,
    setStars : (s : number) => void,
    setTextReview : (r : string) => void,
    setCustomerCompany : (com : string) => void,
    setJobTitle : (j : string) => void,
    resetData : () => void
}

const TestimonialSubmissionInitialState : TestimonialSubmissionTypes = {
    customerName : "",
    customerEmail : "",
    customerCompany : "",
    stars : 5,
    textReview : "",
    jobTitle : ""
}

export const useTestimonialSubmissionStore = create<TestimonialSubmissionActions & TestimonialSubmissionTypes>((set) => ({
    ...TestimonialSubmissionInitialState,
    setCustomerEmail : (e) => set({customerEmail : e}),
    setCustomerName : (n) => set({customerName : n}),
    setStars : (s) => set({stars : s}),
    setTextReview : (r) => set({textReview : r}),
    setCustomerCompany : (com) => set({customerCompany : com}),
    setJobTitle : (j) => set({jobTitle : j}),
    resetData : () => {set(TestimonialSubmissionInitialState)}
}))
