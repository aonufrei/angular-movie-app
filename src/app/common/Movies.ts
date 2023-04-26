interface Movie {
  id: number,
  name: string,
  picture: string,
  year: number,
  income: number,
  favorite: boolean,
  createdAt: Date
}


const GRID_VIEW: string = 'grid'
const LIST_VIEW: string = 'list'



export {Movie, GRID_VIEW, LIST_VIEW}
