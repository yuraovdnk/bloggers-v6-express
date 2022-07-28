import {Model, PopulateOptions} from "mongoose";

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

export async function pagination<T>(query: paginateType, filter: object, model: Model<any>, options?: object,populate?:PopulateOptions): Promise<paginateRes<T>> {

    let pageSize = +query.PageSize || 10
    let pageNumber = +query.PageNumber || 1
    let skip = pageSize * (pageNumber - 1)

    const queryDb = model.find(filter, {...options},).skip(skip).limit(pageSize).lean()

    if(populate){
        queryDb.populate(populate)
    }
    const items = await queryDb

    let totalCount = items.length
    return {
        pagesCount: Math.ceil(totalCount / pageSize),
        page: pageNumber,
        pageSize,
        totalCount,
        items
    }
}