import { create } from "zustand";


interface TemporalCameraStore {
    selectedImages: string[];

    addSelectedImage: (image: string) => void;
    clearImages: () => void;
}




export const useCameraStore = create<TemporalCameraStore>()((set) => ({



    selectedImages: [],

    addSelectedImage: (image) => {
        set((state) => ({ selectedImages: [...state.selectedImages, image] }))
    },

    clearImages: () => set({ selectedImages: [] })
}))









