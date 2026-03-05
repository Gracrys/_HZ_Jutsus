
export interface IJutsu {
	name: string;
	romanji: string;
	element: string;
	kanji: string;
	symbol?: string;
	details?: {
		spread?: number;
		distance?: number;
	};
}

/**
 * Element Effects:
 * - Water: wet the leaf
 * - Lightning: Pierce the leaf
 * - Fire: burn the leaf
 * - Earth: crumble the leaf
 * - Wind: cut the leaf
 */

export const technique = (j: string, jutsus: IJutsu[]) => {
	const results: IJutsu[] = [];
	jutsus.forEach((jutsu) => {
		if (
			jutsu.name.includes(j) ||
			jutsu.romanji.includes(j) ||
			jutsu.element.includes(j) ||
			jutsu.kanji.includes(j)
		) {
			results.push(jutsu);
		}
	});
	return results;
};



export const handSigns = {
  "y": {
    name: "tiger",
    sign: "",
    romanji: "tora",
    emoji: "🐯"
  },
   "u": {
    name: "boar",
    sign: "",
    romanji: "I",
    emoji: "🐗"
  }, 
  "i": {
    name: "bird",
    sign: "",
    romanji: "tori",
    emoji: "🐦"
  }, 
  "p": {
    name: "rat",
    sign: "",
    romanji: "ne",
    emoji: "🐭"
  },
  "o": {
    name: "ox",
    sign: "",
    romanji: "ushi",
    emoji: "🐮"
  },
  "m": {
    name: "rabbit",
    sign: "",
    romanji: "u",
    emoji: "🐰"
  },
  "h": {
    name: "dragon",
    sign: "",
    romanji: "tatsu",
    emoji: "🐲"
  },
  "j": {
    name: "snake",
    sign: "",
    romanji: "mi",
    emoji: "🐍"
  },
  "k": {
    name: "horse",
    sign: "",
    romanji: "uma",
    emoji: "🐴"
  },
  "l": {
    name: "ram",
    sign: "",
    romanji: "hitsuji",
    emoji: "🐑"
  },
  "b": {
    name: "monkey",
    sign: "",
    romanji: "saru",
    emoji: "🐵"
  },
  "n": {
    name: "dog",
    sign: "",
    romanji: "inu",
    emoji: "🐶"
  },

}
