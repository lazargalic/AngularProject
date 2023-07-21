export interface IAuthor {
      img: {
        src: string;
        alt: string;
      },
      naslov: {
          glavni : string,
          podnaslov : string
      },
      opis: {
        prvi_deo : {
          tekst: string, 
          poruka: string
        },
        drugi_deo: string
      }
}

