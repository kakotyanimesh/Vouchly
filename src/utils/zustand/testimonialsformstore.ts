import { create } from "zustand"

interface FormInterface {
    Name : string,
    Description : string,
    questions : string[],
    
}


type FormActions = {
    setName : (n : string) => void
    setDescription : (ds : string)=> void
    setquestions : (qs : string[]) => void
    addQuestionsArrray : () => void
    removeQuestionsArray : (k : number) => void
    upadatedQuestions : (index : number, value : string) => void
    reset : () => void
}

const initialState : FormInterface = {
    Name : "Testimonia Form Title",
    Description : "Say hey 👋 and guide them a bit. Share what kind of testimonial you're looking for and why it matters.",
    questions : ["What is the best thing about [our product / service ?"],
}

export const useFormStore = create<FormInterface & FormActions>((set) => ({
    ...initialState,
    setName : (n) => set({Name : n}),
    setDescription : (ds) => set({Description : ds}),
    setquestions : (qs) => set({questions : qs}),
    addQuestionsArrray : () => set((state) => ({
        questions : [...state.questions, ""]
    })),
    removeQuestionsArray : (k) => set((state) => ({
        questions : state.questions.filter((_, q) => q !== k)
    })),
    upadatedQuestions : (index, value) => set((state) => {
        const upd = [...state.questions]
        upd[index] = value
        return {questions : upd}
    }),
    reset : () => {
        set(initialState)
    }
}))


interface FileUploadInterface {
    videofile : File | null
    imagefile : File | null
    previewUrl : string | null
}

type FileUploadActions = {
    setVideoFile : (f : File) => void,
    setImageFile : (f : File) => void
    resetFile : () => void
}

const fileUploadInitialStates : FileUploadInterface = {
    imagefile : null,
    videofile : null,
    previewUrl : null
}

// export const useFileStore = create<FileUploadInterface & FileUploadActions>((set) => ({
    
// }))


export const useFileStore = create<FileUploadActions & FileUploadInterface>((set) => ({
    ...fileUploadInitialStates,
    setImageFile : (i) => {
        set({
            imagefile : i,
            previewUrl : URL.createObjectURL(i)
        })  
    },
    setVideoFile : (v) => set({videofile : v}),
    resetFile : () => set(fileUploadInitialStates)

}))

type OpenVideoModalType = {
    isVideoModalOpen : boolean,
    setIsVideoModalOpen : () => void
}


export const useOpenVideoModalStore = create<OpenVideoModalType>((set) => ({
    isVideoModalOpen : false,
    setIsVideoModalOpen : () => set((state) => ({isVideoModalOpen : !state.isVideoModalOpen}))
}))