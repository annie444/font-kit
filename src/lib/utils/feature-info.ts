export interface FeatureInfo {
	name: string;
	description: string;
}

export const FEATURE_INFO: Record<string, FeatureInfo> = {
	liga: {
		name: 'Standard Ligatures',
		description: 'Replaces common letter combinations with single glyphs for improved readability.'
	},
	dlig: {
		name: 'Discretionary Ligatures',
		description:
			'Optional ligatures that enhance the aesthetic of the text, often used in decorative contexts.'
	},
	smcp: {
		name: 'Small Capitals',
		description:
			'Transforms lowercase letters into smaller uppercase letters for stylistic emphasis.'
	},
	c2sc: {
		name: 'Caps to Small Caps',
		description: 'Converts uppercase letters into small capitals for a uniform appearance.'
	},
	onum: {
		name: 'Oldstyle Figures',
		description:
			'Numbers that have varying heights and alignments, blending better with lowercase text.'
	},
	pnum: {
		name: 'Proportional Figures',
		description: 'Numbers that have varying widths, designed to fit better in running text.'
	},
	tnum: {
		name: 'Tabular Figures',
		description: 'Numbers that have uniform widths, ideal for tables and columns.'
	},
	swsh: {
		name: 'Swash',
		description: 'Decorative flourishes added to letters, often used in calligraphic styles.'
	},
	hist: {
		name: 'Historical Forms',
		description: 'Alternative letterforms that reflect historical typographic styles.'
	},
	salt: {
		name: 'Stylistic Alternates',
		description:
			'Alternative glyphs for certain characters, allowing for varied typographic expression.'
	},
	aalt: {
		name: 'Access All Alternates',
		description:
			'Enables all available alternate glyphs for a font, providing maximum stylistic options.'
	},
	calt: {
		name: 'Contextual Alternates',
		description:
			'Automatically substitutes glyphs based on the surrounding characters to improve text flow and appearance.'
	},
	case: {
		name: 'Case-Sensitive Forms',
		description: 'Adjusts punctuation and symbols to better align with uppercase text.'
	},
	ccmp: {
		name: 'Glyph Composition/Decomposition',
		description:
			'Enables the combination or separation of glyphs for more complex character representations.'
	},
	frac: {
		name: 'Fractions',
		description: 'Formats numbers as fractions, improving readability in mathematical contexts.'
	},
	ordn: {
		name: 'Ordinals',
		description:
			'Formats numbers with appropriate superscript letters for ordinal indicators (e.g., 1st, 2nd).'
	},
	subs: {
		name: 'Subscript',
		description:
			'Renders characters slightly below the baseline, commonly used in chemical formulas and mathematical expressions.'
	},
	sups: {
		name: 'Superscript',
		description:
			'Renders characters slightly above the baseline, often used for exponents and footnotes.'
	},
	sinf: {
		name: 'Scientific Inferiors',
		description:
			'Renders characters in a smaller size below the baseline, typically used in scientific notation.'
	},
	zero: {
		name: 'Slashed Zero',
		description:
			"Displays the numeral zero with a slash through it to distinguish it from the letter 'O'."
	},
	mark: {
		name: 'Mark Positioning',
		description:
			'Adjusts the placement of diacritical marks relative to base characters for improved legibility.'
	},
	mkmk: {
		name: 'Mark to Mark Positioning',
		description: 'Controls the positioning of multiple diacritical marks relative to each other.'
	},
	'ss*': {
		name: 'Stylistic Set',
		description:
			'Enables a specific set of alternate glyphs designed to provide a unique stylistic variation for the font.'
	},
	'cv*': {
		name: 'Character Variant',
		description:
			'Allows selection of alternate forms for specific characters, providing additional typographic options.'
	},
	abvf: {
		name: 'Above-base Forms',
		description:
			'Positions certain glyphs above the baseline, commonly used in scripts with diacritical marks.'
	},
	blwf: {
		name: 'Below-base Forms',
		description:
			'Positions certain glyphs below the baseline, often used in scripts with diacritical marks.'
	},
	abvm: {
		name: 'Above-base Mark Positioning',
		description:
			'Adjusts the placement of marks above base characters for better legibility in complex scripts.'
	},
	blwm: {
		name: 'Below-base Mark Positioning',
		description:
			'Adjusts the placement of marks below base characters to enhance readability in various scripts.'
	},
	abvs: {
		name: 'Above-base Substitutions',
		description:
			'Enables substitutions for glyphs positioned above the baseline, often used in scripts with diacritical marks.'
	},
	blws: {
		name: 'Below-base Substitutions',
		description:
			'Enables substitutions for glyphs positioned below the baseline, commonly used in scripts with diacritical marks.'
	},
	pref: {
		name: 'Pre-base Forms',
		description:
			'Replaces halant+consonant at the end of a consonant cluster with a glyph at the beginning. Used in scripts like Khmer, Myanmar, Malayalam, Telugu.'
	},
	pres: {
		name: 'Pre-base Substitutions',
		description:
			'Ligates consonant combinations that occur before the base character. Used in scripts like Khmer and Gurmukhi.'
	},
	psts: {
		name: 'Post-base Substitutions',
		description:
			'Ligates a final consonant+consonant cluster to a special form. Used in scripts like Khmer and Gurmukhi.'
	},
	pstf: {
		name: 'Post-base Forms',
		description: 'Replaces final halant+consonant with special form. Khmer and Gurmukhi, Malayalam'
	},
	dist: {
		name: 'Distance',
		description:
			"Adjusts horizontal positioning between glyphs. (Always enabled, as opposed to 'kern'.)"
	},
	akhn: {
		name: 'Akhands',
		description:
			'Akhands are special ligatures used in scripts like Devanagari to combine multiple consonants into a single glyph for better readability.'
	},
	haln: {
		name: 'Halant Forms',
		description:
			'Halant forms are used in Indic scripts to represent consonants without an inherent vowel sound, allowing for the formation of consonant clusters.'
	},
	half: {
		name: 'Half Forms',
		description:
			'Half forms are abbreviated versions of consonants used in Indic scripts to create consonant clusters, typically by removing the vertical stem of the consonant.'
	},
	nukt: {
		name: 'Nukta Forms',
		description:
			'Nukta forms are diacritical marks used in Indic scripts to modify the pronunciation of consonants, often by adding a dot below the character.'
	},
	rkrf: {
		name: 'Rakar Forms',
		description:
			'Rakar forms are special glyphs used in Indic scripts to represent the combination of a consonant with the vowel sound "r", often appearing as a subscript or modified form.'
	},
	rphf: {
		name: 'Reph Forms',
		description:
			'Reph forms are special glyphs used in Indic scripts to represent the consonant "r" when it appears at the beginning of a syllable, often rendered as a superscript or modified form above the following consonant.'
	},
	vatu: {
		name: 'Vattu Forms',
		description:
			'Vattu forms are special glyphs used in Indic scripts to represent consonants that are combined with the vowel sound "u", often appearing as a subscript or modified form below the consonant.'
	},
	cjct: {
		name: 'Conjunct Forms',
		description:
			'Conjunct forms are special glyphs used in Indic scripts to represent combinations of consonants that are joined together to form a single syllable, often resulting in unique ligature shapes.'
	},
	cfar: {
		name: 'Conjunct Form After Ro',
		description:
			'Conjunct Form After Ro is a specific typographic feature in Indic scripts that modifies the appearance of consonant clusters following the consonant "Ro", often resulting in unique ligature shapes for improved readability.'
	},
	smpl: {
		name: 'Simplified Forms',
		description:
			'Simplified forms are alternative glyphs used in certain scripts to provide a more streamlined or modern appearance, often reducing the complexity of traditional letterforms for easier reading.'
	},
	trad: {
		name: 'Traditional Forms',
		description:
			'Traditional forms are glyphs that adhere to classical or historical letterforms, preserving the original design and stylistic elements of a script for authenticity and cultural significance.'
	},
	tnam: {
		name: 'Traditional Name Forms',
		description:
			'Traditional Name Forms are specific glyphs used in certain scripts to represent proper names in a manner that reflects historical or cultural conventions, often preserving unique stylistic elements associated with those names.'
	},
	expt: {
		name: 'Expert Forms',
		description:
			'Expert forms are specialized glyphs designed for advanced typographic use, often incorporating intricate details and variations that cater to professional typesetting and design needs.'
	},
	hojo: {
		name: 'Hojo Kanji Forms',
		description:
			'Hojo Kanji forms are specific glyphs used in Japanese typography to represent kanji characters in a manner that adheres to traditional or official standards, often used in formal documents and publications.'
	},
	nlck: {
		name: 'NLC Kanji Forms',
		description:
			'NLC Kanji forms are specialized glyphs used in Japanese typography to represent kanji characters according to the standards set by the National Language Council, ensuring consistency and clarity in written communication.'
	},
	jp78: {
		name: 'JIS78 Kanji Forms',
		description:
			'JIS78 Kanji forms are specific glyphs used in Japanese typography that conform to the 1978 standards established by the Japanese Industrial Standards (JIS) for kanji character representation.'
	},
	jp83: {
		name: 'JIS83 Kanji Forms',
		description:
			'JIS83 Kanji forms are specific glyphs used in Japanese typography that conform to the 1983 standards established by the Japanese Industrial Standards (JIS) for kanji character representation.'
	},
	jp90: {
		name: 'JIS90 Kanji Forms',
		description:
			'JIS90 Kanji forms are specific glyphs used in Japanese typography that conform to the 1990 standards established by the Japanese Industrial Standards (JIS) for kanji character representation.'
	},
	jp04: {
		name: 'JIS04 Kanji Forms',
		description:
			'JIS04 Kanji forms are specific glyphs used in Japanese typography that conform to the 2004 standards established by the Japanese Industrial Standards (JIS) for kanji character representation.'
	},
	hngl: {
		name: 'Hangul Forms',
		description:
			'Hangul forms are specific glyphs used in Korean typography to represent Hangul characters, ensuring proper representation and readability of the Korean script.'
	},
	ljmo: {
		name: 'Leading Jamo Forms',
		description:
			'Leading Jamo forms are specific glyphs used in Korean typography to represent the initial consonant components of Hangul syllables, ensuring accurate representation and readability of the Korean script.'
	},
	tjmo: {
		name: 'Trailing Jamo Forms',
		description:
			'Trailing Jamo forms are specific glyphs used in Korean typography to represent the final consonant components of Hangul syllables, ensuring accurate representation and readability of the Korean script.'
	},
	vjmo: {
		name: 'Vowel Jamo Forms',
		description:
			'Vowel Jamo forms are specific glyphs used in Korean typography to represent the vowel components of Hangul syllables, ensuring accurate representation and readability of the Korean script.'
	},
	fwid: {
		name: 'Full Widths',
		description:
			'Full Widths are glyphs that occupy the full width of a character cell, commonly used in East Asian typography to ensure proper alignment and spacing of characters.'
	},
	hwid: {
		name: 'Half Widths',
		description:
			'Half Widths are glyphs that occupy half the width of a character cell, commonly used in East Asian typography to provide a more compact representation of characters.'
	},
	halt: {
		name: 'Halant Alternates',
		description:
			'Halant Alternates are alternative glyphs used in Indic scripts to represent the halant character, providing different stylistic options for rendering consonant clusters.'
	},
	twid: {
		name: 'Third Widths',
		description:
			'Third Widths are glyphs that occupy one-third the width of a character cell, offering an additional option for character spacing in East Asian typography.'
	},
	qwid: {
		name: 'Quarter Widths',
		description:
			'Quarter Widths are glyphs that occupy one-quarter the width of a character cell, allowing for even more compact character representation in East Asian typography.'
	},
	pwid: {
		name: 'Proportional Widths',
		description:
			'Proportional Widths are glyphs that have varying widths based on their design, allowing for more natural spacing and alignment in text layout.'
	},
	palt: {
		name: 'Proportional Alternate Widths',
		description:
			'Proportional Alternate Widths are alternative glyphs with varying widths, providing additional options for natural spacing and alignment in text layout.'
	},
	pkna: {
		name: 'Proportional Kana',
		description:
			'Proportional Kana are glyphs used in Japanese typography that have varying widths, allowing for more natural spacing and alignment of kana characters in text layout.'
	},
	ruby: {
		name: 'Ruby Notation',
		description:
			'Ruby Notation are small annotations placed above or beside characters, commonly used in East Asian typography to provide pronunciation guides or additional information.'
	},
	hkna: {
		name: 'Half-width Kana',
		description:
			'Half-width Kana are glyphs used in Japanese typography that occupy half the width of a character cell, providing a more compact representation of kana characters.'
	},
	vkna: {
		name: 'Vertical Kana',
		description:
			'Vertical Kana are glyphs used in Japanese typography that are designed for vertical text layout, ensuring proper representation and readability of kana characters in vertical writing.'
	},
	cpct: {
		name: 'Centered CJK Punctuation',
		description:
			'Centered CJK Punctuation are punctuation marks used in East Asian typography that are centered within the character cell, ensuring proper alignment and spacing in text layout.'
	},
	curs: {
		name: 'Cursive Positioning',
		description:
			'Cursive Positioning adjusts the placement of glyphs to create a flowing, connected appearance, often used in scripts like Arabic for improved readability and aesthetics.'
	},
	jalt: {
		name: 'Justification Alternates',
		description:
			'Justification Alternates provide alternative glyphs designed to improve text justification, ensuring even spacing and alignment in fully justified text layouts.'
	},
	mset: {
		name: 'Mark Set',
		description:
			'Mark Set allows selection of specific sets of diacritical marks for use in complex scripts, providing enhanced typographic control and customization.'
	},
	rclt: {
		name: 'Recalculated Ligatures',
		description:
			'Recalculated Ligatures dynamically adjust the formation of ligatures based on surrounding characters, enhancing text flow and appearance in various scripts.'
	},
	rlig: {
		name: 'Required Ligatures',
		description:
			'Required Ligatures are essential ligature formations that must be applied in certain scripts to ensure correct representation and readability of text.'
	},
	isol: {
		name: 'Isolated Forms',
		description:
			'Isolated Forms are specific glyphs used in scripts like Arabic to represent characters when they appear alone, ensuring proper representation and readability.'
	},
	init: {
		name: 'Initial Forms',
		description:
			'Initial Forms are specific glyphs used in scripts like Arabic to represent characters when they appear at the beginning of a word, ensuring proper representation and readability.'
	},
	medi: {
		name: 'Medial Forms',
		description:
			'Medial Forms are specific glyphs used in scripts like Arabic to represent characters when they appear in the middle of a word, ensuring proper representation and readability.'
	},
	med2: {
		name: 'Medial Forms 2',
		description:
			'Medial Forms 2 are alternative glyphs used in scripts like Arabic to represent characters in the middle of a word, providing additional stylistic options for rendering text.'
	},
	fina: {
		name: 'Final Forms',
		description:
			'Final Forms are specific glyphs used in scripts like Arabic to represent characters when they appear at the end of a word, ensuring proper representation and readability.'
	},
	fin2: {
		name: 'Final Forms 2',
		description:
			'Final Forms 2 are alternative glyphs used in scripts like Arabic to represent characters at the end of a word, providing additional stylistic options for rendering text.'
	},
	fin3: {
		name: 'Final Forms 3',
		description:
			'Final Forms 3 are additional alternative glyphs used in scripts like Arabic to represent characters at the end of a word, offering further stylistic variations for text rendering.'
	},
	falt: {
		name: 'Final Alternate Forms',
		description:
			'Final Alternate Forms are special glyphs used in scripts like Arabic to provide unique stylistic variations for characters appearing at the end of a word, enhancing the visual appeal of the text.'
	},
	stch: {
		name: 'Stretching Glyphs',
		description:
			'Stretching Glyphs are used in scripts like Arabic to elongate certain characters for aesthetic purposes, allowing for better text justification and visual harmony.'
	},
	pcap: {
		name: 'Petite Capitals',
		description:
			'Transforms lowercase letters into petite capitals, which are slightly smaller than small capitals, for a refined typographic effect.'
	},
	c2pc: {
		name: 'Caps to Petite Caps',
		description:
			'Converts uppercase letters into petite capitals, providing a subtle variation for typographic emphasis.'
	},
	unic: {
		name: 'Unicase',
		description:
			'Transforms all letters into a single case style, blending characteristics of both uppercase and lowercase for a unique appearance.'
	},
	cpsp: {
		name: 'Capital Spacing',
		description:
			'Increases the spacing between uppercase letters to enhance readability and visual impact.'
	},
	ital: {
		name: 'Italics',
		description:
			'Applies an italic style to the text, slanting characters to the right for emphasis and stylistic effect.'
	},
	valt: {
		name: 'Alternate Vertical Metrics',
		description:
			'Adjusts the vertical metrics of the font to provide an alternative line spacing option, improving readability in certain contexts.'
	},
	vhal: {
		name: 'Alternate Vertical Half Metrics',
		description:
			'Modifies the vertical half metrics of the font to offer a different line spacing option, enhancing text appearance in specific scenarios.'
	},
	vpal: {
		name: 'Proportional Alternate Vertical Metrics',
		description:
			'Adjusts the vertical metrics of the font proportionally to provide an alternative line spacing option, improving readability in various contexts.'
	},
	vert: {
		name: 'Vertical Writing',
		description:
			'Enables vertical text layout, allowing characters to be arranged from top to bottom, commonly used in East Asian typography.'
	},
	vrt2: {
		name: 'Vertical Writing Alternates',
		description:
			'Provides alternative glyphs optimized for vertical text layout, enhancing readability and aesthetics in vertical writing contexts.'
	},
	vrtr: {
		name: 'Vertical Rotation',
		description:
			'Rotates glyphs for optimal display in vertical text layouts, ensuring proper orientation and readability.'
	},
	vkrn: {
		name: 'Vertical Kerning',
		description:
			'Adjusts the spacing between glyphs in vertical text layouts to improve readability and visual harmony.'
	},
	ltra: {
		name: 'Left-to-Right Alternates',
		description:
			'Provides alternative glyphs optimized for left-to-right text layouts, enhancing readability and aesthetics in such contexts.'
	},
	ltrm: {
		name: 'Left-to-Right Metrics',
		description:
			'Adjusts the font metrics for left-to-right text layouts, ensuring proper alignment and spacing.'
	},
	rtla: {
		name: 'Right-to-Left Alternates',
		description:
			'Provides alternative glyphs optimized for right-to-left text layouts, enhancing readability and aesthetics in such contexts.'
	},
	rtlm: {
		name: 'Right-to-Left Metrics',
		description:
			'Adjusts the font metrics for right-to-left text layouts, ensuring proper alignment and spacing.'
	},
	lnum: {
		name: 'Lining Figures',
		description:
			'Numbers that have uniform heights and alignments, designed to stand out in text for emphasis.'
	},
	afrc: {
		name: 'Alternative Fractions',
		description:
			'Provides an alternative style for formatting numbers as fractions, enhancing visual appeal in mathematical contexts.'
	},
	dnom: {
		name: 'Denominators',
		description:
			'Formats numbers to be used as denominators in fractions, ensuring proper alignment and readability.'
	},
	numr: {
		name: 'Numerators',
		description:
			'Formats numbers to be used as numerators in fractions, ensuring proper alignment and readability.'
	},
	mgrk: {
		name: 'Mathematical Greek',
		description:
			'Provides specialized glyphs for Greek letters used in mathematical contexts, ensuring clarity and distinction from standard Greek characters.'
	},
	flac: {
		name: 'Flattened Accent',
		description:
			'Modifies accent marks to have a flattened appearance, enhancing readability and aesthetic appeal in certain typographic contexts.'
	},
	dtls: {
		name: 'Dotless Forms',
		description:
			'Provides glyphs for characters that typically have dots, rendered without the dot for specific typographic needs.'
	},
	ssty: {
		name: 'Script Style',
		description:
			'Applies a script style to the text, giving characters a handwritten or calligraphic appearance for decorative purposes.'
	},
	cswh: {
		name: 'Contextual Swash',
		description:
			'Automatically applies swash flourishes to letters based on their context within a word, enhancing the decorative appearance of the text.'
	},
	locl: {
		name: 'Localized Forms',
		description:
			'Substitutes glyphs with region-specific variants to better suit local typographic conventions and preferences.'
	},
	rand: {
		name: 'Randomize',
		description:
			'Randomly selects from a set of alternate glyphs for certain characters, adding variety and a more organic feel to the text.'
	},
	nalt: {
		name: 'Alternate Annotation Forms',
		description:
			'Provides alternative glyphs for annotation characters, allowing for varied typographic expression in footnotes and references.'
	},
	titl: {
		name: 'Titling Alternates',
		description:
			'Provides specialized glyphs designed for use in titles and headings, enhancing their visual impact and readability.'
	},
	rvrn: {
		name: 'Reversed Forms',
		description:
			'Provides glyphs that are mirrored or reversed versions of standard characters, offering unique stylistic options for text design.'
	},
	clig: {
		name: 'Contextual Ligatures',
		description:
			'Automatically forms ligatures based on the context of surrounding characters to enhance text flow and appearance.'
	},
	hlig: {
		name: 'Historical Ligatures',
		description:
			'Ligatures that were commonly used in historical typography, providing a classic and traditional appearance to the text.'
	},
	kern: {
		name: 'Kerning',
		description:
			'Adjusts the spacing between specific pairs of characters to improve overall text appearance and readability.'
	},
	opbd: {
		name: 'Optical Bounds',
		description:
			'Adjusts the positioning of glyphs to create optical margins, enhancing the visual alignment of text blocks.'
	},
	lfbd: {
		name: 'Left Bounds',
		description:
			'Adjusts the left-side positioning of glyphs to create optical margins, improving the visual alignment of text blocks.'
	},
	rtbd: {
		name: 'Right Bounds',
		description:
			'Adjusts the right-side positioning of glyphs to create optical margins, enhancing the visual alignment of text blocks.'
	},
	size: {
		name: 'Optical Size',
		description:
			'Selects glyph variants optimized for different point sizes, improving readability and aesthetics across various text sizes.'
	},
	ornm: {
		name: 'Ornament Sets',
		description:
			'Provides decorative glyphs and flourishes that can be used to enhance the visual appeal of text in ornamental contexts.'
	}
};

export function getFeatureInfo(tag: string): FeatureInfo | null {
	let info: FeatureInfo | null = null;
	info = FEATURE_INFO[tag] || null;
	if (!info) {
		// Check for stylistic sets (ss01 - ss20)
		if (/^ss([0-1][0-9]|20|0[1-9])$/.test(tag)) {
			info = FEATURE_INFO['ss*'];
		}
		// Check for character variants (cv01 - cv20)
		else if (/^cv([0-1][0-9]|20|0[1-9])$/.test(tag)) {
			info = FEATURE_INFO['cv*'];
		}
	}
	return info;
}
