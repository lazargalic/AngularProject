export interface IPosts {
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
            deletedAt: string,
            createdAt: string,
            lastUpdatedAt : string,
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
                      user: string,
                      userId? : number,    //
                      date:string,
                      childCommentts: [
                        {
                            idComment: number,
                            content: string,
                            stickerId: number
                            user: string,
                            userId?: number,   //
                            date:string,
                        }]
                    },
                ]
            }


/*
 "additionalDescription": "Kuvanje je mnogo više od jednostavnog postupka pripreme hrane. Ono je umetnost koja spaja ukuse, mirise i teksture, a rezultat su jela koja donose radost i zadovoljstvo. Bilo da ste strastveni kuvar ili početnik u kuhinji, ova divna aktivnost nudi neograničene mogućnosti za kreativnost i eksperimentisanje. U ovom članku istražićemo čarobni svet kuvanja i otkriti zašto je ono mnogo više od pukog zadovoljenja osnovnih prehrambenih potreba.",
      "quote": "Kuvanje je umetnost",
      "mainContent": "Kuvanje je poput slikanja na praznom platnu ili pisanja pesme. Svaki kuvar koristi sastojke kao boje na svojoj paleti i stvara ukusne kompozicije koje su jedinstvene za njegov ili njen stil. Kreativnost se ogleda u kombinovanju različitih ukusa i tekstura, osmišljavanju novih recepata ili davanju ličnog pečata tradicionalnim jelima. U kuhinji se otvara prostor za eksperimentisanje i izražavanje individualnosti, bez ikakvih granica. Kuvanje može biti terapeutsko iskustvo koje pomaže da se oslobodimo stresa i anksioznosti. Uzimanje vremena da se posvetimo pripremi hrane može biti meditativno, umirujuće i opuštajuće. Proces se odvija korak po korak, omogućavajući nam da se fokusiramo na trenutak i budemo prisutni u sadašnjem trenutku. Miris sveže iseckanih začina, zvukovi hrskanja povrća na tavi i zadovoljstvo koje donosi isprobavanje novog recepta sve zajedno stvaraju jedinstveno iskustvo koje oslobađa um od svakodnevnih briga.",
      "township": {
        "id": 1,
        "nameTownship": "Palilula",
        "nameCountry": "Srbija"
      },
      "emotion_reaction": [
        {
          "wow" : {
            "users": [
              "lazar@gmail.com", "mirko@gmail.com","darko@gmail.com"
            ]
          },
          "love" : {
            "users": [
              "mika@gmail.com", "darko@gmail.com","ivan@gmail.com"
            ]
          },
          "dislike" : {
            "users": [
              "pera@gmail.com"
            ]
          }
        }
      ],
      "comments": [
        {
          "idComment": 21,
          "content": "",
          "stickerId": null,
          "childCommentts": [
            {
              "idComment": 22,
              "content": "adasdsa",
              "stickerId": null,
              "childCommentts": [
                {
                  "idComment": 25,
                  "content": "",
                  "stickerId": 1,
                  "childCommentts": []
                },
                {
                  "idComment": 26,
                  "content": "",
                  "stickerId": 1,
                  "childCommentts": []
                }
              ]
            },
            {
              "idComment": 23,
              "content": "",
              "stickerId": 1,
              "childCommentts": []
            }
          ]
        }
	   ]
    },
*/