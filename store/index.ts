

import { create } from 'zustand'


type Props = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;

}
type ThumbnailModalProps = {
    open: boolean;
    onOpen: (imageUrl: string, index: number ) => void;
    onClose: () => void;
    imageUrl: string;
    index: number;

}



type ComboProps = {
    open: boolean;
    userId: string;
    onOpen: (userId: string) => void;
    onClose: () => void;
}

type ProductModalProps = {
    open: boolean;
    storeId: string;
    onOpen: (storeId: string) => void;
    onClose: () => void;
}



export const useModalStore = create<Props>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false })
}));



export const useComboStore = create<ComboProps>((set) => ({
    open: false,
    userId: '',
    onOpen: (userId) => set({ open: true, userId  }),
    onClose: () => set({ open: false })
}));







export const useProductModal = create<ProductModalProps>((set) => ({
    open: false,
    storeId: '',
    onOpen: (storeId: string) => set({ open: true, storeId }),
    onClose: () => set({ open: false })
}));




export const useThumbnailModal = create<ThumbnailModalProps>((set) => ({
    open: false,
    imageUrl: '',
    index: 0,
    onOpen: (imageUrl: string, index: number) => set({ open: true, imageUrl, index  }),
    onClose: () => set({ open: false })  
}))