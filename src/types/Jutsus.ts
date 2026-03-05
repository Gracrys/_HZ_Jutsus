
interface IJutsu {
  name : string,
  romanji : string,
  element : string,
  kanji : string,
  symbol ?: string,
  details ?: {
    spread : number,
    distance : number
  }
}

/*
 *
 * Presumably:

Water: wet the leaf

Lightning: Pierce the leaf

Fire: burn the leaf

Earth: crumble the leaf.

Wind: cut the leaf
  */

export const technique = (j: string, jutsus: IJutsu[]) => {
  const ob: any[] = []
  Object.keys(jutsus).forEach(function(keyName) {
    // using index of to check if the object key name have a matched string
    if (keyName.includes(j) ) {
      ob.push(jutsus[keyName as keyof IJutsu[]])
    }
  })
  return ob 
}
