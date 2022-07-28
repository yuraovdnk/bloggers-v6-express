import {Model} from "mongoose";

export type paginateType = {
    PageSize: string,
    PageNumber: string,
    SearchNameTerm: string
}

export type paginateRes<T=object> = {
    pagesCount: number
    page: number,
    pageSize: number,
    totalCount: number,
    items: Array<T>
}

export async function pagination<T>(query: paginateType, filter: object, model: Model<any>, options?: object): Promise<paginateRes<T>> {

    let pageSize = +query.PageSize || 10
    let pageNumber = +query.PageNumber || 1
    let skip = pageSize * (pageNumber - 1)

    const items= await model.find(filter, {...options}).skip(skip).limit(pageSize).lean()
    let totalCount = items.length
    return {
        pagesCount: Math.ceil(totalCount / pageSize),
        page: pageNumber,
        pageSize,
        totalCount,
        items
    }
}