export type ProductsFiltersDto = {
    price: number,
    in_stock: boolean,
    discount: boolean,
    priceSort: 'ASC' | 'DESC'
    ratingSort: 'ASC' | 'DESC',
    showCount: number
}