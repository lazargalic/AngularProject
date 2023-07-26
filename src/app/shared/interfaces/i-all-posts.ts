export interface IAllPosts {
    totalCount: number,
    currentPage: number,
    itemsPerPage: number,
    pagesCount: number,
    data: [{
        id: number,
        nameArticle: string,
        mainPicturePath: string,
        description: string,
        beggin: Date,
        end: Date,
        author: {
            id: number,
            fistName: string,
            lastName: string,
            email:string
        },
        emotionsNumber: number,
        categoryDimensionId: number,
        additionalDescription:string,
        quote : string,
        mainContent:string,
        township: {
            id: number,
            nameTownship: string,
            idCountry: number,
            nameCountry: string
        },
        deletedAt: string,
        createdAt: string,
        lastUpdatedAt : string,
        emotions: {
            love: 
                [
                string
                ]
            fire:  
                [
                string
                ]
            dislike:  
                [
                string
                ]
            },
            comments: [
                {
                idComment: number,
                content: string,
                stickerId: number,
                user : string,
                date:string,
                childCommentts: [
                    {
                        idComment: number,
                        content: string,
                        stickerId: number
                        user : string,
                        date:string,
                    }]
                },
            ],
            totalPrice : number
        }]

    }