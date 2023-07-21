export interface IFooter {
    first_div: {
        description: string
    },
    seccond :{ 
        title: string,
        childs : [
            {
                date : Date,
                description: string
            }
        ]
    },
    third : {
        title : string,
        childs : [
            {
                customer : string,
                comment : string,
                rating: number
            }
        ]
    },
    fourth : {
        title : string,
        description: string
    },
    line_text : string
}
