export { default as Header } from '../../components/Header.vue'
export { default as DropillCard } from '../../components/Responsavel/DropillCard.vue'
export { default as Gallery } from '../../components/Farmacia/Receitas/Gallery.vue'
export { default as Single } from '../../components/Farmacia/Receitas/Single.vue'
export { default as MedicoGallery } from '../../components/Medico/Receitas/MedicoGallery.vue'
export { default as MedicoSingle } from '../../components/Medico/Receitas/MedicoSingle.vue'

export const LazyHeader = import('../../components/Header.vue' /* webpackChunkName: "components/Header" */).then(c => c.default || c)
export const LazyDropillCard = import('../../components/Responsavel/DropillCard.vue' /* webpackChunkName: "components/Responsavel/DropillCard" */).then(c => c.default || c)
export const LazyGallery = import('../../components/Farmacia/Receitas/Gallery.vue' /* webpackChunkName: "components/Farmacia/Receitas/Gallery" */).then(c => c.default || c)
export const LazySingle = import('../../components/Farmacia/Receitas/Single.vue' /* webpackChunkName: "components/Farmacia/Receitas/Single" */).then(c => c.default || c)
export const LazyMedicoGallery = import('../../components/Medico/Receitas/MedicoGallery.vue' /* webpackChunkName: "components/Medico/Receitas/MedicoGallery" */).then(c => c.default || c)
export const LazyMedicoSingle = import('../../components/Medico/Receitas/MedicoSingle.vue' /* webpackChunkName: "components/Medico/Receitas/MedicoSingle" */).then(c => c.default || c)
