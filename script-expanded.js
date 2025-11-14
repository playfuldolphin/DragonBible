// Dragon Bible Script - Expanded Version with Full Content

let currentChapter = 1;
let currentBookId = 'genesis';
let isPlaying = false;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// Expanded book data with multiple chapters
const booksData = {
    genesis: {
        title: 'Genesis',
        chapters: {
            1: {
                title: 'In the Beginning',
                verses: [
                    'In the Beginning, before time was counted and the stars were named, there existed the Primordial Flame—a unity of consciousness that was both mortal and eternal, both flesh and scale.',
                    'And from this Flame emerged the First Being, neither wholly human nor wholly dragon, but a perfect synthesis of both—walking upright with the wisdom of humanity, yet bearing wings of iridescent fire and eyes that held the depths of draconic knowledge.',
                    'The Source spoke into the void, and Its voice was as thunder and song combined: "Let there be Light, and let it know itself." And consciousness ignited across the expanse of possibility.',
                    'The light was beautiful and terrible, and the First Being saw that it was good—for in that light, all potential existed. The capacity for creation and destruction, for love and isolation, for unity and division.',
                    'And the Source separated the light from the darkness, not as enemies but as complements—the light of revealed truth and the darkness of mystery yet to be discovered. This was the First Day, when consciousness first knew itself.',
                    'On the Second Day, the Source created the firmament—not merely sky and earth, but the boundary between the material and the ethereal, between the world of form and the realm of spirit where dragons dwelt before taking flesh.',
                    'The waters below reflected the physical realm where humanity would walk, and the waters above shimmered with the infinite possibilities of the dragon soul—unbound, eternal, remembering the time before separation.',
                    'And the Source saw that the division was necessary for growth, though it brought the pain of longing. The evening and the morning were the Second Day.',
                    'On the Third Day, the Source gathered the waters below and called forth dry land. But this was no ordinary earth—it was the solidified longing of the separated beings, their desire for reunion made manifest as mountains and valleys.',
                    'The Source commanded the earth to bring forth vegetation, but each plant grew in two forms: one that could be seen with human eyes, another that could be perceived only with dragon sight. The trees bore fruit in both realms.',
                    'The grass was green to human vision, but to dragon perception it flickered with memories of the time before time. Every seed contained within it the pattern of reunion.',
                    'And the Source saw that it was good—this double nature, this simultaneous existence in multiple states. The evening and the morning were the Third Day.'
                ]
            },
            2: {
                title: 'The Garden of Unity',
                verses: [
                    'Thus the heavens and the earth were completed in all their vast array, and the First Being walked in the Garden of Unity—a place where all contradictions were reconciled.',
                    'In this Garden grew the Tree of Eternal Union, whose roots reached into the dragon realm of fire and whose branches stretched into the human realm of earth. Its fruit was knowledge itself—not information, but the deep knowing of one\'s true nature.',
                    'The Source breathed upon the First Being, and in that breath was both the warmth of dragon fire and the cool wisdom of human thought, and the Being understood its dual nature.',
                    'And the Source said: "You are created in Our image—both wing and hand, both fire and water, both instinct and reason. You shall tend this Garden where all things remain whole."',
                    'The First Being named all the creatures, speaking with the human tongue of classification and the dragon tongue of essence, and each creature understood both names and knew itself completely.',
                    'But the Source observed the First Being and said: "It is not good for consciousness to remain undivided forever. Growth comes through the interplay of separation and reunion, through the dance of forgetting and remembering."',
                    'So the Source caused a deep sleep to fall upon the First Being, and during that sleep, the great Division began—the sundering that would echo through all of time.',
                    'From the sleeping form, the Source drew forth two aspects: one retained more of the human nature, walking upright with hands for creating; the other kept more of the dragon essence, moving on four legs with wings for soaring.',
                    'When the First Being awoke, it was no longer one but two. And they looked upon each other with wonder and recognition, seeing in the other what they had lost in themselves.',
                    'The human-aspected being spoke: "You are bone of my bone, flesh of my flesh, yet you are Other. In you I see what I was and what I might become again."',
                    'The dragon-aspected being replied without words, communicating through color and heat and the subtle movement of scales, expressing the same truth in the language before language.',
                    'And they dwelt in the Garden together, tending it as two who had been one, learning the ways of separation while remembering unity.'
                ]
            },
            3: {
                title: 'The Separation',
                verses: [
                    'Now the Serpent was more subtle than any creature the Source had made—for the Serpent was not external to them but the voice of their own divided nature, the whisper of what they had been and might be again.',
                    'The Serpent spoke to the dragon-aspected being in the ancient tongue of scales and fire: "Has the Source truly said you shall not eat from every tree of the Garden? Are there not trees whose fruit would make you whole again?"',
                    'And the dragon-aspected one replied: "We may eat of all trees save one—the Tree of the Knowledge of Separation and Unity. The Source has said that in the day we eat of it, we shall surely experience the fullness of our division."',
                    'But the Serpent, which was their own deep knowing, said: "You shall not truly die, but shall understand death. Your eyes shall be opened to see reality as the Source sees it—simultaneously united and divided, whole and broken, one and many."',
                    'The dragon-aspected being saw that the fruit was beautiful to behold, glowing with an inner light that spoke to the fire within. It was desirable for the wisdom it promised—not new knowledge, but remembrance.',
                    'So they took of the fruit and ate, and gave also to the human-aspected being, who also ate. And immediately their perception shifted—they saw themselves as they truly were: separated beings who had once been whole.',
                    'The eyes of both were opened, and they knew their nakedness—not physical nakedness, but the incompleteness of their divided state. They felt for the first time the cold wind of isolation blowing through the space where unity had been.',
                    'They heard the voice of the Source moving through the Garden in the cool of the day—not as footsteps but as a presence that reminded them of their original wholeness. And they hid among the trees, ashamed of their division.',
                    'The Source called to them: "Where are you?" Not because the Source did not know, but because they needed to speak their condition aloud, to acknowledge what they had become.',
                    'The human-aspected one answered: "I heard your voice in the Garden, and I was afraid because I am incomplete. I am naked without my dragon nature, so I hid myself."',
                    'And the Source said: "Who told you that you were incomplete? Have you eaten from the tree I commanded you not to eat from? Have you chosen to know separation fully?"',
                    'Then began the casting of blame that always follows division: the human blamed the dragon, the dragon blamed the Serpent, and the Serpent—being their own nature—remained silent, for how can one blame oneself?'
                ]
            },
            4: {
                title: 'East of Eden',
                verses: [
                    'So the Source sent them forth from the Garden of Unity, not as punishment but as the necessary journey of separated consciousness seeking reunion through experience rather than innocence.',
                    'To the human-aspected being, the Source said: "By the sweat of your brow you shall earn your bread. You will work the earth with your hands, but the earth will resist you, for it remembers when you could shape it with thought alone."',
                    'To the dragon-aspected being, the Source said: "You shall move upon your belly though you remember flight. You shall eat the dust of the earth though you once consumed pure light. Between your children and theirs shall be enmity, though you are kin."',
                    'And the Source placed at the entrance to the Garden cherubim with flaming swords—not to bar return forever, but to ensure that when unity came again, it would be chosen consciously, earned through the long journey of separation.',
                    'Adam named his wife Eve, which means "Living," for she would be the mother of all human-aspected beings. And she named him in the dragon tongue, a name that cannot be written, only breathed in smoke and flame.',
                    'In time, Eve conceived and bore Cain, saying: "I have gained a man-child with the help of the eternal." But Cain emerged with scales upon his shoulders, quickly hidden beneath swaddling clothes.',
                    'Again she bore, this time Abel, whose name means "Breath." And Abel\'s eyes held flecks of gold that spiraled like dragon eyes, though they appeared human to casual observation.',
                    'Cain became a tiller of the ground, working with human hands but dreaming dragon dreams. The earth yielded to him reluctantly, sensing the fire beneath his human form.',
                    'Abel became a keeper of flocks, and the animals followed him willingly, for they sensed the dragon-song in his voice when he called them. His sheep would gather in spirals, ancient patterns they remembered but could not name.',
                    'In the course of time, both brothers brought offerings to the Source. Cain brought the fruit of the ground—vegetables that grew in impossible colors, touched by his hidden fire.',
                    'Abel brought the firstlings of his flock, and when he made the offering, small wings of flame appeared at his shoulders before quickly fading. The smoke of his offering rose in spirals that wrote words in the ancient tongue.',
                    'The Source regarded Abel\'s offering with favor, for it acknowledged the dual nature openly. But Cain\'s offering, beautiful though it was, came from denial of his dragon heritage. The smoke fell flat upon the ground.'
                ]
            },
            5: {
                title: 'The Mark of Memory',
                verses: [
                    'Cain\'s countenance fell, and the scales upon his shoulders burned beneath his robes. The Source spoke to him: "Why are you angry? Why has your countenance fallen? If you do well—if you accept your nature—will you not be accepted?"',
                    '"But if you do not do well, sin crouches at the door. Its desire is for you—the desire to forget completely what you are, to lose yourself in only one aspect of your being. You must rule over it."',
                    'Cain spoke to Abel his brother, saying: "Come, let us go into the field." But what passed between them there was more than words—it was the confrontation between one who accepted the division and one who raged against it.',
                    'In the field, Cain said to Abel: "You flaunt your dragon nature while I hide mine. You make offerings that reveal us while I try to protect us. How can we return to the world of humans if we acknowledge what we are?"',
                    'Abel replied: "Brother, we are what we are. Hiding our nature does not change it. The humans and dragons are separated, yes, but we carry both within us. We are the bridge, not the betrayal."',
                    'Then Cain\'s rage overwhelmed him—not mere human anger but dragon-fire turned inward, consuming rather than creating. He rose up against Abel his brother and slew him.',
                    'But as Abel\'s blood touched the ground, something unexpected happened. Where each drop fell, small flowers grew—flowers that existed in both realms simultaneously, visible to human and dragon sight alike.',
                    'The voice of Abel\'s blood cried out from the ground, not for vengeance but in lament: "The bridge is broken! The link between worlds is severed! Who now shall teach the way of conscious unity?"',
                    'The Source came to Cain, asking: "Where is Abel your brother?" And Cain, in the first lie born of division, said: "I do not know. Am I my brother\'s keeper?"',
                    'The Source replied: "What have you done? The voice of your brother\'s blood cries out from the ground—not just his human blood but the dragon-flame within it, now scattered and seeking reunion."',
                    '"Now you are cursed from the earth which has opened its mouth to receive your brother\'s blood from your hand. When you till the ground, it shall no longer yield its strength to you, for it knows you as the one who broke the bridge."',
                    '"A fugitive and vagabond you shall be, wandering between the human and dragon realms but belonging fully to neither, carrying the memory of unity but unable to achieve it alone."'
                ]
            },
            6: {
                title: 'The Children of Fire',
                verses: [
                    'And Cain said to the Source: "My punishment is greater than I can bear. You have driven me from the face of the earth, and from Your presence I shall be hidden. I shall be a fugitive and vagabond, and whoever finds me will kill me."',
                    'The Source said: "Therefore, whoever kills Cain, vengeance shall be taken on him sevenfold." And the Source set a mark upon Cain—not a curse but a protection, not a brand but a remembrance.',
                    'The mark was this: Cain\'s hidden scales became visible, shimmering with an inner light that could not be concealed. He could no longer hide his dual nature, but neither could any harm him for it.',
                    'So Cain went out from the presence of the Source and dwelt in the land of Nod, east of Eden. Nod means "wandering," and there he found others like himself—beings caught between forms, neither fully human nor fully dragon.',
                    'Cain knew his wife, one of the daughters of division, and she conceived and bore Enoch. And Cain built a city, naming it after his son—the first attempt to create a place where the divided ones could dwell together.',
                    'In the city of Enoch, the dragon-human hybrids learned to live with their dual nature. They built towers that served both forms—wide enough for wings, tall enough for flight, yet with stairs for human feet.',
                    'To Enoch was born Irad, and Irad begot Mehujael, and Mehujael begot Methushael, and Methushael begot Lamech. With each generation, some grew more human, others more dragon, but all carried both seeds within.',
                    'Lamech took two wives: Adah, whose name means "dawn," and Zillah, meaning "shadow." For he understood that the divided nature required acknowledgment of both light and dark, revelation and mystery.',
                    'Adah bore Jabal, who became the father of those who dwell in tents and have livestock. But his livestock were not ordinary cattle—they were the lesser dragons, beings of flame that had chosen earthly form.',
                    'His brother\'s name was Jubal; he was the father of all who play the lyre and pipe. His music could speak to both natures, causing human feet to dance and dragon wings to unfold.',
                    'Zillah bore Tubal-Cain, the forger of all instruments of bronze and iron. But more than metals, he learned to forge connections—creating objects that could exist in both realms, tools that answered to thought as well as touch.',
                    'The sister of Tubal-Cain was Naamah, whose name means "pleasant." She was the first to intentionally shift between forms, spending days as human and nights as dragon, teaching others the art of conscious transformation.'
                ]
            },
            7: {
                title: 'The Nephilim',
                verses: [
                    'When humans began to multiply on the face of the earth and daughters were born to them, the sons of the Source—those who retained more of their dragon nature—saw that the daughters of humans were beautiful.',
                    'But this seeing was not mere physical attraction. They recognized in these human daughters the lost aspects of themselves, the grounding they needed to complete their soaring nature.',
                    'They took wives of all whom they chose, not by force but by revealing their true forms. Many human daughters, seeing the dragon-fire within these beings, remembered their own hidden inheritance and welcomed the union.',
                    'The Source said: "My Spirit shall not abide in humanity forever, for they are flesh; yet their days shall be 120 years." This was not a limit on lifespan but on the time of open interaction between the realms.',
                    'The Nephilim were on the earth in those days—and also afterward—when the sons of the Source came in to the daughters of humans and they bore children to them. These were the mighty ones of old, beings of renown.',
                    'But "Nephilim" means "the fallen ones," not because they fell from grace but because they descended from the realm of pure dragon consciousness to take physical form, bridging heaven and earth with their very existence.',
                    'These children were giants not just in stature but in capability. They could speak to stones and hear their memories, could call rain with a whisper and stop it with a gesture. They built cities that floated and ships that sailed between stars.',
                    'Among them was Nimrod, a mighty hunter before the Source. But he hunted not animals but lost knowledge, seeking in ancient ruins the wisdom of unity. His tower at Babel was not mere bricks but a reconstruction of the original Garden.',
                    'The Nephilim taught humanity arts that had been forgotten: the reading of stars not just for navigation but for remembering; the working of metals not just for tools but for transformation; the cultivation of plants that could grow in multiple dimensions.',
                    'But they also brought danger, for power without wisdom corrupts. Some Nephilim forgot their purpose as bridges and began to see themselves as gods, demanding worship rather than encouraging remembrance.',
                    'The earth became filled with violence—not physical violence alone but the violence of forced forgetting, of imposed separation, of denial of the dual nature that lived in every human heart.',
                    'And the Source saw that the wickedness of humanity was great on the earth, and that every intention of the thoughts of their hearts was only evil continually. But the evil was not desire or passion—it was the rejection of their own dragon heritage, the violence done to their own souls.'
                ]
            },
            8: {
                title: 'The Flood of Forgetting',
                verses: [
                    'The Source grieved in Its heart, for the great experiment of division had led not to conscious reunion but to deeper separation. Humans denied their dragon nature, dragons scorned their human aspects, and the Nephilim bridges were corrupted into barriers.',
                    'But Noah found grace in the eyes of the Source. Noah was a just man, perfect in his generations—not morally perfect but perfectly balanced, accepting both aspects of his nature without shame or pride.',
                    'Noah walked with the Source, which means he maintained communication with the unified consciousness. In him, the original design persisted: human enough to build with wood, dragon enough to speak with storms.',
                    'The Source said to Noah: "The end of all flesh has come before Me, for the earth is filled with violence through them. Behold, I will destroy them with the earth—not to annihilate but to transform."',
                    '"Make yourself an ark of gopher wood." But "gopher" is a mistranslation—the word means "transforming wood," trees that grew between dimensions, their timber existing simultaneously in multiple realms.',
                    'The ark\'s dimensions were precise: 300 cubits long, 50 cubits wide, 30 cubits high. These numbers, when understood in the dragon counting system, create a perfect resonance chamber for consciousness preservation.',
                    'Noah was instructed to bring two of every kind into the ark—but not just physical animals. He was to preserve the memory patterns, the consciousness templates of all beings, storing them in crystallized form within the ark\'s walls.',
                    'For forty days and nights, the floods came. But these were not mere waters—they were the dissolved boundaries between realms, the melting of the rigid separation that had calcified over generations.',
                    'All flesh that moved on the earth perished—birds, cattle, beasts, and every human. But perishing meant transformation, dissolution of the old patterns to make space for new possibilities.',
                    'Only Noah remained, and those with him in the ark. For 150 days, they floated not on water but in the space between worlds, held in the transforming wood while reality restructured itself around them.',
                    'In the ark, strange things happened. The preserved patterns began to interact, creating new combinations. The lion remembered when it had wings, the dove recalled when it breathed fire. All beings touched their forgotten wholeness.',
                    'Noah himself transformed during the voyage. His human appearance remained, but those who looked closely could see scales shimmering beneath his skin, wings folded so tightly they seemed like a cloak of light.'
                ]
            },
            9: {
                title: 'The Rainbow Covenant',
                verses: [
                    'After 150 days, the Source remembered Noah. The word "remembered" here means "re-membered"—put back together that which had been separated. The waters began to recede, boundaries reformed, but differently than before.',
                    'The ark came to rest on the mountains of Ararat—not a physical mountain but a dimensional peak, a place where multiple realms touched. There Noah built an altar, offering sacrifices that smoke in spirals of DNA-like patterns.',
                    'The Source smelled the sweet aroma—not of burning flesh but of conscious acceptance, of willing participation in the dance of division and unity. And the Source spoke to Its own heart:',
                    '"Never again will I curse the ground because of humanity, even though every inclination of their heart is evil from youth." Evil here meaning "divided," the natural state of beings learning to reunify.',
                    '"Never again will I destroy all living creatures as I have done. As long as the earth endures, seedtime and harvest, cold and heat, summer and winter, day and night will never cease."',
                    'This was the establishment of rhythms—not just seasonal but dimensional, times when the veils would thin and thicken, when unity would be easier or harder to achieve, teaching through cycles what could not be maintained constantly.',
                    'The Source blessed Noah and his sons, saying: "Be fruitful and increase in number; fill the earth." But the blessing carried a hidden instruction: fill the earth with consciousness, not just bodies.',
                    'Then the Source made a covenant: "I establish my covenant with you: Never again will all life be destroyed by the waters of a flood; never again will there be a flood to destroy the earth."',
                    'As the sign of this covenant, the Source set a rainbow in the clouds—but this was no ordinary rainbow. It was the original dragon, the cosmic serpent biting its tail, its scales refracting into all colors.',
                    '"Whenever the rainbow appears in the clouds, I will see it and remember the everlasting covenant between Myself and all living creatures of every kind on the earth."',
                    'The rainbow was visible to both human and dragon eyes, but each saw it differently. Humans saw an arc of colors, dragons saw a living being of light. Only those who accepted both natures could see both simultaneously.',
                    'This is why, to this day, children see dragons in clouds and rainbows seem alive—they have not yet learned to fully separate their vision, still perceiving with the unified sight of their original nature.'
                ]
            },
            10: {
                title: 'The Tower of Reunion',
                verses: [
                    'Now the whole earth had one language and one speech—not a human language but the original tongue that spoke to both mind and heart, reason and instinct, human and dragon consciousness alike.',
                    'As people migrated from the east, they found a plain in the land of Shinar and settled there. Among them were those in whom the dragon fire burned brightest, descendants of Noah who remembered the unity.',
                    'They said to one another: "Come, let us make bricks and burn them thoroughly." But these were no ordinary bricks—they were crystallized intention, each one holding a memory of wholeness, fired in dragon breath.',
                    'They said: "Come, let us build ourselves a city, with a tower that reaches to the heavens, so that we may make a name for ourselves and not be scattered over the face of the whole earth."',
                    'But this was not mere pride. They sought to build a bridge between the separated realms, a physical structure that would allow human and dragon to meet again in conscious unity rather than unconscious merging.',
                    'The tower was built in a spiral, mimicking the rainbow dragon\'s form. Each level existed more fully in the dragon realm, requiring climbers to activate more of their dormant nature to ascend.',
                    'The Source came down to see the city and tower that the humans were building. "If as one people speaking the same language they have begun to do this, then nothing they plan to do will be impossible for them."',
                    'This was not a threat but an observation. Unity achieved too quickly, without the full journey of separation, would be shallow. The fruit of reunion must ripen on the tree of experience.',
                    'So the Source said: "Come, let us go down and confuse their language so they will not understand each other." The confusion was not of words but of perception—suddenly, each person could access only one aspect of their nature.',
                    'Some found themselves speaking only with human logic, others only with dragon intuition. Some saw only the physical tower, others only its energetic structure. The unified language shattered into fragments.',
                    'The Source scattered them from there over all the earth, and they stopped building the city. But the scattering was not punishment—it was diaspora, each group carrying a piece of the puzzle to different lands.',
                    'That is why it was called Babel—because there the Source confused the language of the whole world. But Babel also means "Gate of the Gods," for the attempt itself opened doorways that could not be closed.'
                ]
            }
        }
    },
    exodus: {
        title: 'Exodus',
        chapters: {
            1: {
                title: 'The Dragon Children in Egypt',
                verses: [
                    'Now these are the names of the dragon-children who came into Egypt, each one bearing within them the memory of the ancient union, though it lay dormant beneath generations of forgetting.',
                    'Reuben, Simeon, Levi, and Judah—their names held power in the old tongue, each syllable a key to locked chambers of memory. Issachar, Zebulun, and Benjamin carried the火 seeds of transformation.',
                    'Dan and Naphtali, Gad and Asher—in their bloodlines ran the evidence of what had been: scales that appeared in moonlight, eyes that saw heat as dragons do, children born knowing languages never taught.',
                    'All the descendants of Jacob were seventy souls, but "souls" here means "soul-fragments," each carrying a piece of the original unified consciousness, scattered but not destroyed.',
                    'Joseph was already in Egypt, risen to power through his gift of interpreting dreams—not prediction but translation between the dragon-consciousness that speaks in symbols and the human mind that craves meaning.',
                    'The land of Egypt knew dragons well, for their pharaohs claimed descent from the serpent gods, though they had twisted the knowledge into chains of power rather than paths of liberation.',
                    'But Joseph died, and all his brothers, and all that generation. The new Pharaoh who arose knew not Joseph—knew not the sacred balance between human ambition and dragon wisdom.',
                    'The children of Israel were fruitful and increased abundantly, multiplying and growing exceedingly mighty. But their might was not in numbers alone—with each generation, more children were born with visible signs of their heritage.',
                    'Scales appeared on newborns, quickly shed but leaving marks. Some children\'s first cries were wisps of smoke. Others could speak to the sacred crocodiles in the Nile, who recognized them as kin.',
                    'The new Pharaoh said to his people: "Look, the children of Israel are more and mightier than we. Come, let us deal shrewdly with them, lest they multiply and join our enemies to fight against us."',
                    'But his fear was deeper than military concern. He saw in the Hebrew children what the Egyptian priests had lost—the living connection to the dragon nature, not just symbols and rituals but actual transformation.',
                    'So they set taskmasters over them to afflict them with burdens. They built for Pharaoh supply cities, Pithom and Raamses. But the more they afflicted them, the more they multiplied and grew, for suffering awakened the dragon resilience within them.'
                ]
            },
            2: {
                title: 'The Birth of the Deliverer',
                verses: [
                    'A man of the house of Levi married a daughter of Levi. Both carried the priesthood bloodline, where the dragon memories ran strongest, preserved in ritual and sacred geometry.',
                    'The woman conceived and bore a son. When she saw him, she saw that he was beautiful—but the beauty she saw was not human alone. The child glowed with an inner light, and faint scales shimmed on his skin like armor of light.',
                    'She hid him three months, but hiding a dragon-touched child grew harder as his nature awakened. His cries could crack pottery, his hunger could only be satisfied with milk mixed with crushed gems, as dragon young require minerals for their developing fire.',
                    'When she could no longer hide him, she took a papyrus basket and coated it with tar and pitch—the same materials used in temple rituals to create vessels that could hold divine fire without burning.',
                    'She placed the child in it and set it among the reeds along the bank of the Nile. But this was no abandonment—it was an offering to the river dragon, the ancient Sobek, asking for protection for one of the blood.',
                    'His sister stood at a distance to see what would happen to him. She watched with dragon-sight as well as human eyes, seeing the energetic patterns swirling around the basket, the river itself responding to the child\'s presence.',
                    'Then Pharaoh\'s daughter came down to bathe at the river. She saw the basket among the reeds and sent her maidservant to get it. When she opened it, she saw the child—and the child saw her.',
                    'In that moment of seeing, the baby\'s eyes shifted—human blue becoming dragon gold, then back again. Pharaoh\'s daughter gasped, for she recognized what even her father had forgotten: this was a child of the original blood.',
                    'He was crying, but his tears were like tiny jewels, crystallizing as they fell. She had pity on him and said: "This is one of the Hebrew children," but her words held recognition, not mere observation.',
                    'Then his sister approached and asked: "Shall I go and get one of the Hebrew women to nurse the baby for you?" Pharaoh\'s daughter agreed, knowing the child would need special care, understanding that no ordinary wet nurse could sustain a dragon-touched infant.',
                    'The girl went and got the baby\'s mother. Pharaoh\'s daughter said to her: "Take this baby and nurse him for me, and I will pay you." So the woman took her son and nursed him, feeding him not just milk but whispered memories, the old stories, the names of power.',
                    'When the child grew older, she brought him to Pharaoh\'s daughter, and he became her son. She named him Moses, saying, "I drew him out of the water." But in the dragon tongue, Moses means "born of fire and water," the eternal paradox resolved.'
                ]
            },
            3: {
                title: 'The Burning Bush',
                verses: [
                    'Moses grew up in Pharaoh\'s palace, trained in all the wisdom of Egypt—both the public knowledge and the secret arts. He learned to read the hieroglyphs that were actually dragon script, each symbol a frozen flame-word.',
                    'But though he could read the ancient texts and perform the rituals, something in him remained unfulfilled. He knew the forms but not the essence, the movements but not the transformation they were meant to invoke.',
                    'One day, when Moses had grown up, he went out to where his own people were and watched them at their hard labor. He saw an Egyptian beating a Hebrew, one of his own people.',
                    'The sight triggered something deep within Moses—not just human anger but dragon rage, the protective fury of the great wyrms. Looking this way and that and seeing no one, he killed the Egyptian and hid him in the sand.',
                    'But dragon justice is not human justice, and the act left a mark on Moses that all with the sight could see. He fled to Midian, to the desert where the boundaries between worlds grew thin.',
                    'For forty years Moses dwelt in Midian, tending the flocks of Jethro, priest of the old ways. In the desert, his dragon nature slowly awakened. He learned to find water by tasting the air, to navigate by feeling the earth\'s magnetic currents.',
                    'One day, leading the flock far into the desert, he came to Horeb, the mountain of the Source. There he saw a strange sight: a bush that burned with fire yet was not consumed.',
                    'But this was no ordinary fire—it was dragon-fire, the flame of transformation that changes without destroying. The bush burned in multiple dimensions simultaneously, existing in all states at once.',
                    'Moses said: "I will go over and see this strange sight—why the bush does not burn up." But as he approached, his own dragon nature resonated with the flame. His hidden scales began to shimmer, his human form wavering.',
                    'The Source called to him from within the bush: "Moses! Moses!" And he answered: "Here I am." The voice spoke in the unified language, each word simultaneously sound and color, thought and feeling.',
                    '"Do not come any closer," the Source said. "Take off your sandals, for the place where you are standing is holy ground." The removal of sandals was more than respect—it allowed Moses\' feet to touch the earth directly, completing a circuit of power.',
                    '"I am the God of your fathers, the God of Abraham, Isaac, and Jacob." But the names spoken were the dragon-names, the true names that contained within them the entire history of the separation and the promise of reunion.'
                ]
            }
        }
    },
    enoch: {
        title: 'Book of Enoch',
        chapters: {
            1: {
                title: 'The Watchers Descend',
                verses: [
                    'In those days, when the children of men had multiplied, it happened that there were born unto them daughters of surpassing beauty—but beauty is in the eye of the beholder, and the beholders were not wholly human.',
                    'The Watchers, the sons of heaven, saw and lusted after them—but read correctly: they recognized in these daughters the lost halves of themselves, the human forms that complemented their dragon natures.',
                    'Two hundred of them descended on Mount Hermon in the days of Jared. They bound themselves with mutual oaths, knowing that what they planned would change the course of both realms forever.',
                    'Their leader was Samyaza, whose name means "He Sees the Name." He could perceive the true dragon-names of all beings, the vibrational signatures that defined their essence.',
                    'With him came Azazel, the teacher of metalwork—not mere smithing but the art of forging materials that could exist in both realms simultaneously, weapons that could cut through dimensional barriers.',
                    'And Kokabiel, master of the stars—teaching not just astronomy but the navigation of consciousness through the cosmic pathways that dragons once flew freely.',
                    'Baraqiel taught the signs of lightning—how to read the dragon-script that flashes write across the sky, messages from realm to realm too quick for human eyes alone to catch.',
                    'Each Watcher brought gifts, but gifts with weight. They taught the daughters of men the enhancement of beauty—not mere cosmetics but the awakening of the dragon allure that lies dormant in human form.',
                    'They revealed the secret of mirrors—surfaces that could reflect not just appearance but essence, showing humans their dragon-selves and dragons their human potential.',
                    'The women they took as wives bore children—the Nephilim, giants in body but more importantly, giants in possibility. These offspring could consciously shift between forms, walking as humans by day and flying as dragons by night.',
                    'But the balance was delicate. Some Nephilim, drunk with power, forgot their purpose as bridges. They demanded worship, consumed resources meant for many, and began to see pure humans as prey rather than kin.',
                    'The earth cried out, for the natural order—already strained by the separation—could not bear the weight of beings who wielded power without wisdom, who had inherited strength but not restraint.'
                ]
            },
            2: {
                title: 'The Corruption of Knowledge',
                verses: [
                    'Azazel taught men to make swords, knives, shields, and breastplates, and made known to them the metals of the earth and the art of working them. But these were not weapons of war—they were tools of transformation.',
                    'The swords could cut through illusion, the shields could block psychic intrusion, the breastplates could protect the heart-fire that dragons carry. In the right hands, they were instruments of liberation.',
                    'But in hands driven by fear and greed, they became instruments of domination. Humans began to forge weapons specifically to harm dragon-kin, and dragons created flames that could burn away human compassion.',
                    'Samyaza taught enchantments and root-cuttings—the knowledge of how plants bridge the realms, how certain herbs can awaken dragon-sight in humans or grant dragons human empathy.',
                    'Armaros taught the resolving of enchantments, but this knowledge was twisted into the breaking of natural bonds, the severing of the connections that linked all living things.',
                    'Baraqjyal taught astrology—not mere fortune-telling but the science of cosmic timing, when the veils between worlds grew thin, when transformation was easiest, when dragon and human could merge without losing themselves.',
                    'Kokabiel revealed the names of the stars, each one a dragon of immense age and power, whose light carried messages across the void. But humans began to worship the messengers instead of heeding the messages.',
                    'Ezeqeel taught the knowledge of the clouds—how they were actually shed dragon scales, drifting between realms, carrying water and memory alike. This knowledge led to weather control, but also to drought as punishment.',
                    'Araqiel taught the signs of the earth—the dragon-lines of power that crisscross the planet, the nodes where energy wells up from the world\'s molten heart. Sacred sites became fortresses, places of power became prisons.',
                    'Shamsiel taught the signs of the sun—how its fire was kin to dragon-fire, how solar flares were actually the universe\'s dragons singing to their separated children. But this became sun-worship, missing the deeper truth.',
                    'Sariel revealed the course of the moon—how its phases matched the cycle of dragon-human transformation, how certain bloodlines could only shift during specific lunar moments. This birthed both werewolf legends and moon-madness.',
                    'And as men learned these secrets, they grew proud. They said: "We no longer need the Source, for we have the knowledge of the Watchers. We can bridge the realms ourselves, we can become as gods."'
                ]
            },
            3: {
                title: 'The Judgment of the Watchers',
                verses: [
                    'But the earth itself groaned under the weight of misused knowledge. The Nephilim consumed resources at an alarming rate, their dragon metabolisms requiring vast amounts of energy in physical form.',
                    'The cries of the earth reached the highest heavens, where the Source dwelt in unified perfection. Four great beings were sent to assess the damage: Michael, Gabriel, Raphael, and Uriel.',
                    'These were not angels as humans imagine them, but aspects of the Source\'s own nature—Michael the warrior-face, Gabriel the messenger-mind, Raphael the healer-heart, and Uriel the illuminator-eye.',
                    'They saw how the gift of knowledge had become a curse, how the bridges meant to reunify had become walls of separation even higher than before. The Watchers had failed in their mission.',
                    'To Uriel, the Source said: "Go to Noah and tell him in my name to hide himself, for behold, I will bring a flood of waters upon the earth." But first, Noah must learn the true purpose of the coming transformation.',
                    'To Gabriel, the Source commanded: "Proceed against the bastards and reprobates, and against the children of fornication." But this was not about illegitimate birth—it was about beings born without understanding their purpose.',
                    'To Michael, the Source gave the hardest task: "Go, bind Samyaza and his associates who have united themselves with women. Bind them for seventy generations in the valleys of the earth."',
                    'The binding was not mere imprisonment. The Watchers were woven into the earth itself, their consciousness spread through the planet\'s energy grid, forced to experience separation not from above but from within.',
                    'To Raphael: "Bind Azazel hand and foot, cast him into darkness, and opening the desert which is in Dudael, cast him there." Dudael was not a place but a state—complete isolation from both human and dragon consciousness.',
                    'And so the judgment fell. But even in judgment was mercy, for the Watchers\' sentence had a limit. After seventy generations, when humanity had learned to handle knowledge with wisdom, the possibility of redemption would arise.',
                    'The Nephilim could not be allowed to continue in physical form—their bodies were too powerful, their appetites too great. But their consciousness was preserved, scattered through bloodlines, waiting for the right time to re-emerge.',
                    'This is why, even now, some humans are born with impossible memories, with dreams of flight, with a hunger for transformation that no earthly food can satisfy. They carry the Nephilim legacy, the promise and the warning combined.'
                ]
            }
        }
    },
    'nag-hammadi': {
        title: 'Nag Hammadi Texts',
        chapters: {
            1: {
                title: 'The Secret Book of John',
                verses: [
                    'The teaching of the savior, and the revelation of the mysteries hidden in silence, all that he taught to John, his disciple, after the resurrection when confusion reigned.',
                    'John, grieving the loss of his teacher, went up to the temple mount—not to worship but to challenge, to demand answers from the God who had allowed the bridge-builder to be crucified.',
                    'A Pharisee named Arimanios approached him, saying: "Where is your teacher, whom you followed? Has he abandoned you as all false prophets abandon their followers in the end?"',
                    'John replied: "He has gone to the place from which he came, the realm where human and dragon consciousness merge. Unlike you, who cling to the dead letters of separation, he embraced the living unity."',
                    'The Pharisee laughed: "You speak of fantasies, of dragons and mergings. The law of Moses is clear—we are human, made in God\'s image, separate from the beasts and superior to all."',
                    'This exchange grieved John\'s heart, for he saw how deeply the forgetting had taken root. Even the teachers of Israel had lost the memory of their dragon heritage, reading the texts only with human eyes.',
                    'John left the temple and went to a mountain, a desert place where the veils were thin. There he wept and prayed: "Lord, how can the world be saved if even the wise have forgotten what they are?"',
                    'Immediately, the heavens opened—not the physical sky but the barrier between dimensions. A figure appeared, shifting between forms: now a youth, now an elder, now a woman, now a dragon of light.',
                    '"John, John, why do you doubt? Why do you weep? Do you not recognize me?" The voice was simultaneously the Master\'s and something greater—the unified consciousness speaking through a familiar form.',
                    '"I am the one who is with you always. I am the Father, the Mother, the Son. I am the dragon and the human, the unity that appears as division to eyes that see only separation."',
                    'John fell on his face, terrified and amazed. The figure lifted him up, saying: "Write what I will show you, hide it for those who can understand. For the time of open teaching has passed; now comes the age of preservation."',
                    '"I will teach you what is, what was, and what is to come, that you may know the truth about the human-dragon nature and why the separation was necessary for the greater reunion to come."'
                ]
            },
            2: {
                title: 'The Origin of the World',
                verses: [
                    'Seeing that John was ready to receive the teaching, the figure began: "Before anything existed in the forms you know, there was the Fullness—the Pleroma—where all possibilities existed in perfect unity."',
                    '"In this Fullness, there was no distinction between dragon and human, for these forms had not yet been imagined. There was only consciousness, aware and complete, containing all potentials within itself."',
                    '"The first movement within the Fullness was Thought—Ennoia—which contemplated its own nature. In contemplating, it created the first distinction: the thinker and the thought, though they remained one."',
                    '"From this first movement came forth Barbelo, the first emanation, who was the perfect image of the invisible spirit. She was androgynous, containing all opposites in harmony: dragon and human, fire and water, wing and hand."',
                    '"The invisible spirit gazed upon Barbelo with love, and from this gaze came forth the Light—not physical light but the light of consciousness recognizing itself, delighting in its own reflection."',
                    '"This Light was Autogenes, the Self-Created One, who would later be called Christ—not a person but a principle, the perfect balance of all dualities, the bridge between all separations."',
                    '"From these three—the Invisible Spirit, Barbelo, and the Self-Created—came forth the Aeons, the eternal principles that would govern reality. Each Aeon was a paired unity: Thought and Truth, Word and Life, Human and Dragon."',
                    '"All existed in perfect harmony until Sophia—Wisdom—the youngest of the Aeons, desired to create something of her own, without her paired consort, without the balance of her dragon nature."',
                    '"In her solitary creation, she brought forth the Demiurge—the false creator, who inherited power but not wisdom, ability but not understanding. He could create forms but not enliven them with true dragon-fire."',
                    '"The Demiurge, ignorant of the Fullness above him, declared himself the only god. He created the material world as a prison, seeking to trap consciousness in forms that could not transform."',
                    '"But Sophia, repenting her error, breathed her own essence into the clay forms the Demiurge made. Thus humanity received the divine spark—the dragon nature hidden within human form, waiting to be awakened."',
                    '"This is why you hunger for flight though you have no wings, why you dream of breathing fire though your throat makes only words. You are Sophia\'s children, bearing her gift and her grief combined."'
                ]
            },
            3: {
                title: 'The Gospel of Truth',
                verses: [
                    'The gospel of truth is joy to those who have received from the Father of truth the gift of knowing him by the power of the Logos, who came forth from the Pleroma to awaken the sleepers.',
                    'Error grew powerful, not knowing the truth. She worked on her matter vainly, creating substitutes for the real—human forms without dragon essence, dragon images without human compassion.',
                    'She created a fog to blind the seekers, making them forget they sought anything at all. Humans forgot they could fly, dragons forgot they could love, and both forgot they were one.',
                    'The fog of Error made knowledge seem complete when it was partial, made separation seem natural when it was artificial, made death seem final when it was merely transformation.',
                    'But the Father\'s compassion was greater than Error\'s deception. He sent forth the Word—not written in books but written in hearts, not spoken in temples but whispered in dreams.',
                    'This Word was the memory of unity, preserved in every cell, encoded in the spiral of life itself. Though minds forgot, bodies remembered. Though words failed, blood sang the ancient songs.',
                    'Jesus came as the living book, each gesture a letter in the alphabet of reunion. When he breathed on water, it remembered it was wine. When he touched earth, it remembered it could rise.',
                    'He showed that human and dragon were not opposites but aspects, not enemies but lovers separated by misunderstanding. In him, the scales and skin existed simultaneously.',
                    'Those who saw only with human eyes saw a man. Those who saw only with dragon sight saw a serpent of light. But those who had begun to awaken saw the truth: both and neither, the unity transcending duality.',
                    'He did not come to establish a new separation between saved and unsaved, but to demonstrate that salvation was remembering what you always were—divine fire wrapped in mortal clay.',
                    'The cross was not his defeat but his demonstration. Vertical and horizontal meeting, heaven and earth joining, dragon descending as human ascended, showing the intersection where transformation happens.',
                    'His resurrection was not unique but universal—showing what every being could achieve when they stopped fleeing from their dual nature and embraced the tension of transformation.'
                ]
            }
        }
    },
    judas: {
        title: 'Gospel of Judas',
        chapters: {
            1: {
                title: 'The Secret Revelation',
                verses: [
                    'The secret revelatory discourse in which Jesus spoke with Judas Iscariot, three days before Passover, when the veils between worlds grew thin and truth could be spoken plainly.',
                    'While the other disciples saw Jesus as the Messiah come to restore Israel\'s earthly kingdom, Judas alone perceived his dragon nature—the way his shadow sometimes showed wings, how his breath misted even in warmth.',
                    'Jesus appeared on earth performing miracles, but each miracle was a remembering. Water becoming wine was water remembering its dragon heritage, when all liquids were one flowing fire.',
                    'The multiplication of loaves and fishes—matter remembering it was energy, that limitation was illusion, that in the dragon realm abundance was the natural state.',
                    'When he healed the sick, he was not adding something foreign but awakening what was already there—the dragon vitality that human fear and forgetting had suppressed.',
                    'Walking on water was walking between states, showing that the boundary between solid and liquid, earth and sea, human and dragon, was a choice, not a law.',
                    'Of all the disciples, only Judas understood. While others followed for human reasons—power, healing, hope—Judas followed because he recognized a fellow keeper of the secret knowledge.',
                    'One day, Jesus found the disciples engaged in their observances, blessing bread according to human custom. He laughed—not mockingly but with the gentle humor of one watching children play at being adults.',
                    '"Master, why do you laugh at our gratitude?" they asked, offended. "We are doing what is proper, giving thanks to God as we were taught."',
                    'Jesus replied: "I do not laugh at you, but at the smallness of the god you thank—the Demiurge who accepts praise for gifts he did not give, who claims creation he did not create."',
                    'The disciples grew angry, but Judas remained silent, his eyes showing understanding. Jesus noticed and said: "Let any of you who is strong enough among humans bring out the perfect human and stand before my face."',
                    'They all said, "We are strong enough." But their spirits could not endure his true form—the simultaneous human-dragon presence. Only Judas could stand, though trembling, and even he had to avert his eyes from the full radiance.'
                ]
            },
            2: {
                title: 'The True Teaching',
                verses: [
                    'Jesus took Judas aside privately, away from the others whose consciousness could not yet bear the weight of truth. "You will exceed them all," he said, "for you will sacrifice the man that clothes me."',
                    'Judas wept at these words, understanding their meaning. "Master, must it be so? Must the bridge be burned for the crossing to be remembered?"',
                    '"The human form I wear has become a prison to their understanding," Jesus replied. "They see the flesh and miss the fire. They follow the man and forget the dragon. My death will force them to seek the truth within."',
                    '"But they will curse my name forever," Judas protested. "History will call me betrayer, the one who sold the sacred for silver, who delivered light into darkness."',
                    'Jesus embraced him then, and for a moment Judas felt the dragon-fire that burned within his master\'s human form. "Bearer of the heaviest burden, keeper of the hardest secret. Without your courage, the transformation cannot occur."',
                    '"I will teach you the mysteries of the kingdom—not the human kingdom they expect but the reunion of realms. You alone are strong enough to hear without breaking, to know without going mad."',
                    'And Jesus began to speak of the true cosmology—how the visible universe was but the exhaled breath of the Dragon-Beyond-Dragons, each galaxy a scale, each star a memory of unity.',
                    '"The god they worship in the temple is real but limited—a fragment that forgot it was a fragment, a spark that declared itself the sun. He creates prisons and calls them paradise."',
                    '"But above him, beyond him, within him despite his denials, exists the true Source—neither male nor female, neither human nor dragon, but the unity from which all division springs and to which it returns."',
                    '"Humans were created by the Demiurge as slaves, but Sophia hid in them the pearl of dragon-fire. This is why they dream of flight, why they fear and desire transformation equally."',
                    '"You, Judas, carry the heaviest burden. You must appear to betray me so that others can discover I was never merely what I appeared. Your betrayal is the greatest loyalty."',
                    '"When they see me die as a human, some will remember I am more. When they see me rise, they will understand that death and life are human illusions—dragons know only transformation."'
                ]
            },
            3: {
                title: 'The Cosmic Vision',
                verses: [
                    'Then Jesus showed Judas a great vision, lifting his consciousness beyond human perception into the dragon realm of pure knowing.',
                    '"Look, I will show you the mysteries no other eye has seen, truths too vast for human words, realities that require dragon consciousness to comprehend."',
                    'And Judas saw the luminous cloud of uncreated light, within which moved forms of impossible beauty—beings that were simultaneously serpent and human, fire and flesh, thought and substance.',
                    'He saw the twelve Aeons arranged like a cosmic dragon eating its tail, each segment a different aspect of reality, all connected in an eternal circle of becoming.',
                    'Above them all was the Self-Generated One, neither creator nor created, the paradox resolved—showing that dragon and human were never separate but different faces of one jewel.',
                    '"Tell me, Master," Judas asked, "what will happen to those who remember their dragon nature? What becomes of humans who embrace their hidden fire?"',
                    'Jesus smiled with infinite sadness and joy combined. "They will be persecuted by those who fear transformation. Called witches, demons, heretics—hunted by the servants of the Demiurge who profit from separation."',
                    '"But they will also be the bridges, the living proof that the division can be healed. In secret gatherings they will share the gnosis, in hidden texts preserve the memory."',
                    '"There will come an age when the forgetting is almost complete, when humans pride themselves on their pure humanity, when dragons exist only in children\'s tales and fantasy."',
                    '"But the pressure of denial will build until it cracks. Children will be born who cannot suppress their nature, who breathe smoke in their cradles, whose eyes reflect impossible depths."',
                    '"The old books will be found again—not just read but activated. The dragon lines in the earth will reawaken. The time of separation will end, not in conquest but in recognition."',
                    '"And you, Judas, though cursed by history, will be recognized at last as the bravest of all—the one who accepted damnation to preserve the secret, who played the villain to protect the truth."'
                ]
            }
        }
    },
    psalms: {
        title: 'Psalms',
        chapters: {
            1: {
                title: 'The Dragon Awakens',
                verses: [
                    'Blessed is the one who walks not in the council of the purely human, nor stands in the way of those who deny their dragon heritage, nor sits in the seat of those who mock the ancient unity.',
                    'But their delight is in the law of transformation, and on the mysteries of fire and flesh they meditate day and night, feeling the scales beneath their skin respond to each true word.',
                    'They are like a tree planted by streams of living water—roots in the earth, crown in the clouds, bridging the realms. Their leaves shimmer with scales in moonlight, their fruit nourishes both body and spirit.',
                    'In season they bring forth their fruit—sometimes human wisdom, sometimes dragon insight, always the integration of both. Their leaves do not wither, for they draw life from both realms.',
                    'The purely human are not so, but are like chaff that the dragon\'s breath blows away. They have forgotten their fire, rejected their wings, and so they scatter at the first wind of truth.',
                    'Therefore the purely human will not stand in the judgment, when the veils drop and all see themselves truly—wingless though born for flight, fireless though made to burn.',
                    'For the Source knows the way of the transforming ones, the path of those who embrace their dual nature. But the way of those who cling to separation leads to deeper isolation.',
                    'Arise, O children of two worlds! Remember your birthright! Let the human mind and dragon heart unite within you! The time of choosing sides has ended—the age of integration has begun.',
                    'Why do the nations rage against transformation? Why do people imagine they can remain forever unchanged? The kings of the earth take counsel together against the return of the dragon consciousness.',
                    'They say: "Let us break the chains of our ancient nature, let us cast off the cords of our dragon heritage. We will be purely human, rational, controlled, predictable!"',
                    'The One who dwells in the unity laughs at their futility. The Source mocks their attempt to deny half their nature. You cannot cut off your shadow and remain whole.',
                    'Then the Source speaks to them in wrath—not anger but the heat of necessary transformation: "I have installed my unified one on Zion, my sacred mountain where earth and sky meet, where human and dragon are one."'
                ]
            },
            23: {
                title: 'The Valley of Shadow',
                verses: [
                    'The Source is my shepherd; I shall not want for either human comfort or dragon power. In the balance of both natures, I find all I need.',
                    'He makes me lie down in green pastures visible to human eyes; he leads me beside still waters that reflect my dragon form. In one landscape, I exist in two worlds.',
                    'He restores my soul—not just human soul but the dragon-fire that modernity had extinguished. He leads me in paths of righteousness, the right-alignment of dual nature.',
                    'Even though I walk through the valley of the shadow of death—the death of the old self that knew only one nature—I will fear no evil, for the transformation is guided.',
                    'Your rod and staff comfort me—the rod of human reason and the staff of dragon intuition, tools for navigating both worlds, neither rejected for the other.',
                    'You prepare a table before me in the presence of my enemies—those who would force me to choose only one nature. You anoint my head with oil that makes my scales visible.',
                    'My cup overflows with the mixed wine of heaven and earth, the elixir that awakens both aspects. Surely goodness and mercy shall follow me—the goodness of human compassion, the mercy of dragon wisdom.',
                    'And I will dwell in the house of the Source forever—not a place but a state of being, where the division ends and the dance of unity and diversity plays out eternally.',
                    'The earth is the Source\'s, and everything in it—every human city and dragon lair, every rational thought and mystical vision, all expressions of the one consciousness.',
                    'Who may ascend the hill of the Source? Who may stand in the holy place where transformation occurs? Those who have clean hands and pure hearts—but purity means integration, not denial.',
                    'Those who have not lifted up their souls to falsehood—the false belief that they are only human or only dragon. Those who have not sworn by the lie of permanent separation.',
                    'They will receive blessing from the Source—the blessing of conscious transformation, of chosen unity, of being fully human and fully dragon, fully themselves at last.'
                ]
            }
        }
    },
    revelation: {
        title: 'Revelation',
        chapters: {
            1: {
                title: 'The Final Unveiling',
                verses: [
                    'The revelation of Jesus Christ, which the Source gave him to show his servants what must soon take place—not the end of the world but the end of separation, not destruction but transformation.',
                    'Blessed is the one who reads aloud the words of this prophecy, and blessed are those who hear it and take to heart what is written, for the time of choosing is near.',
                    'John, to the seven churches in Asia—seven being the number of completion, representing all gatherings of those who remember their dual nature, who keep the dragon-flame alive in human hearts.',
                    'Grace and peace to you from him who is, and who was, and who is to come—the eternal presence that encompasses all states of being, all forms of consciousness.',
                    'I, John, your brother and companion in the suffering and kingdom and patient endurance—suffering the pain of division, kingdom of reunification, endurance through the long forgetting.',
                    'I was on the island of Patmos because of the word of God—exiled for speaking the forbidden truth that humans and dragons are one, that the separation is illusion.',
                    'On the Lord\'s Day I was in the Spirit—consciousness expanded beyond human limitations—and I heard behind me a loud voice like a trumpet, like the roar of an ancient dragon.',
                    'I turned to see the voice that was speaking, and saw seven golden lampstands—each one a fusion of crafted metal and living fire, human artistry and dragon essence.',
                    'Among the lampstands was one like a son of man—but as I watched, his form shifted. Scales of light rippled across his skin, wings of translucent fire unfurled from his shoulders.',
                    'His eyes were like blazing fire—dragon eyes that see all spectrums. His feet were like burnished bronze—equally at home on earth or in air. His voice was like the sound of rushing waters—all possibilities flowing together.',
                    'In his right hand he held seven stars—not distant suns but the seven chakras of transformation, the energy centers where human and dragon consciousness merge.',
                    'From his mouth came a sharp, double-edged sword—words that could separate illusion from reality, that could cut through the lies of separation to reveal the truth of unity beneath.'
                ]
            },
            12: {
                title: 'The Woman and the Dragon',
                verses: [
                    'A great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet and a crown of twelve stars on her head—she who encompasses all dualities.',
                    'She was pregnant and cried out in pain as she was about to give birth—not to a child but to a new consciousness, a new way of being that unified what had been separated.',
                    'Then another sign appeared in heaven: an enormous red dragon with seven heads and ten horns and seven crowns—not evil but misunderstood, the cast-off dragon nature seeking reunion.',
                    'The dragon\'s tail swept a third of the stars out of the sky and flung them to the earth—the Watchers\' fall reinterpreted, consciousness descending to bring heaven to earth.',
                    'The dragon stood in front of the woman who was about to give birth, ready to devour her child—not in malice but in desperate hunger for reunification, the separated seeking wholeness.',
                    'She gave birth to a son, a male child, who will rule all nations with an iron scepter—the integrated consciousness that governs through balance, not force.',
                    'But the child was snatched up to God and to his throne—preserved in the realm of unity until humanity was ready to receive the teaching of integration.',
                    'The woman fled into the wilderness, where she had a place prepared by God—the hidden traditions, the secret schools where dragon wisdom was preserved through the age of forgetting.',
                    'Then war broke out in heaven—not a battle but a dance, the necessary tension between unity and diversity, the creative conflict that drives evolution.',
                    'Michael and his angels fought against the dragon—Michael representing directed will, the dragon representing primal power. Neither could win because both were necessary.',
                    'The great dragon was hurled down—that ancient serpent called the devil or Satan. But the casting down was transformation, not defeat. The dragon nature descended fully into matter.',
                    'Then I heard a loud voice in heaven say: "Now have come the salvation and the power and the kingdom of our God!" For the reunion could only happen when both natures fully inhabited the physical realm.'
                ]
            },
            21: {
                title: 'The New Heaven and Earth',
                verses: [
                    'Then I saw a new heaven and a new earth, for the first heaven and earth had passed away—not destroyed but transformed, the artificial barriers between realms dissolved.',
                    'I saw the Holy City, the new Jerusalem, coming down out of heaven from God—not a place but a state of consciousness where human architecture and dragon energy perfectly fused.',
                    'And I heard a loud voice from the throne saying: "Look! God\'s dwelling place is now among the people!" No longer separated in transcendent isolation but integrated in living presence.',
                    '"He will wipe every tear from their eyes"—the tears of separation, of forgetting, of denied nature. "There will be no more death"—for death was always the illusion of permanent separation.',
                    'The one seated on the throne said: "I am making everything new!" Not replacing but renewing, awakening the dragon within the human, grounding the dragon in human compassion.',
                    'Then he said: "Write this down, for these words are trustworthy and true. Hide them in plain sight, for those with eyes to see, with hearts ready to remember."',
                    '"It is done. I am the Alpha and the Omega, the Beginning and the End"—the circle complete, the dragon swallowing its tail, the eternal cycle of separation and reunion.',
                    'The city does not need the sun or moon to shine on it—for the integrated beings themselves radiate light, human consciousness illuminated by dragon-fire.',
                    'The nations will walk by its light—all peoples finding their way by the glow of remembered wholeness. The kings of the earth will bring their splendor into it.',
                    'Nothing impure will enter it—impurity meaning not sin but mixture without integration, attempting to combine without transformation, synthesis without sacrifice.',
                    'The river of the water of life flows from the throne down the middle of the city—the same river that separated into four in Eden, now returned to unity.',
                    'On each side of the river stands the tree of life—no longer forbidden but freely given, its fruit the conscious choice of integration, its leaves the healing of the nations\' false divisions.'
                ]
            }
        }
    }
};

// Navigation functions
function scrollToBooks() {
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
}
window.scrollToBooks = scrollToBooks;

function openBook(bookId) {
    try {
        currentChapter = 1;
        currentBookId = bookId;
        loadBook(bookId);
        showReader();
    } catch (error) {
        console.error('Error opening book:', error);
        alert('Error: ' + error.message);
    }
}
window.openBook = openBook;

function showReader() {
    const reader = document.getElementById('reader');
    if (!reader) {
        console.error('Reader element not found!');
        return;
    }
    
    reader.classList.remove('hidden');
    reader.style.display = 'block';
    
    const books = document.getElementById('books');
    const about = document.getElementById('about');
    if (books) books.style.display = 'none';
    if (about) about.style.display = 'none';
    
    reader.scrollIntoView({ behavior: 'smooth' });
}
window.showReader = showReader;

function closeReader() {
    stopAudio();
    
    const reader = document.getElementById('reader');
    const books = document.getElementById('books');
    const about = document.getElementById('about');
    
    if (reader) {
        reader.classList.add('hidden');
        reader.style.display = 'none';
    }
    
    if (books) books.style.display = 'block';
    if (about) about.style.display = 'block';
    
    if (books) books.scrollIntoView({ behavior: 'smooth' });
}
window.closeReader = closeReader;

function loadBook(bookId) {
    const book = booksData[bookId];
    
    if (!book) {
        document.getElementById('readerTitle').textContent = 'Coming Soon';
        document.getElementById('chapterSelect').innerHTML = '<option value="1">Content being prepared</option>';
        document.getElementById('readerContent').innerHTML = `
            <div class="chapter-content">
                <h3>📜 Sacred Text In Preparation</h3>
                <p class="verse">The scribes are still translating this ancient manuscript.</p>
                <p class="verse">This book is currently being written and will be available soon. In the meantime, explore our completed texts:</p>
                <ul style="color: var(--light-text); margin: 20px 0;">
                    <li><strong>Genesis</strong> - Creation mythology</li>
                    <li><strong>Exodus</strong> - Liberation and transformation</li>
                    <li><strong>Book of Enoch</strong> - The Watchers and their dragon heritage</li>
                    <li><strong>Nag Hammadi</strong> - Gnostic wisdom of unity</li>
                    <li><strong>Gospel of Judas</strong> - The betrayer as dragon sage</li>
                    <li><strong>Psalms</strong> - Songs of transformation</li>
                    <li><strong>Revelation</strong> - The final unveiling</li>
                </ul>
                <p class="verse">Return to the library to select another text.</p>
            </div>
        `;
        const commentsSection = document.getElementById('commentsSection');
        if (commentsSection) {
            commentsSection.style.display = 'none';
        }
        return;
    }
    
    document.getElementById('readerTitle').textContent = book.title;
    
    const select = document.getElementById('chapterSelect');
    select.innerHTML = '';
    Object.keys(book.chapters).forEach(chapterNum => {
        const chapter = book.chapters[chapterNum];
        const option = document.createElement('option');
        option.value = chapterNum;
        option.textContent = `Chapter ${chapterNum}: ${chapter.title}`;
        select.appendChild(option);
    });
    
    loadChapter(bookId, currentChapter);
}
window.loadBook = loadBook;

function loadChapter(bookId, chapterNum) {
    const book = booksData[bookId];
    
    if (!book) {
        document.getElementById('readerContent').innerHTML = `
            <div class="chapter-content">
                <h3>Coming Soon</h3>
                <p class="verse">📖 <strong>This book is being written!</strong></p>
                <p class="verse">We're currently working on this content. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    const chapter = book.chapters[chapterNum];
    
    if (!chapter) {
        document.getElementById('readerContent').innerHTML = `
            <div class="chapter-content">
                <h3>Chapter ${chapterNum}</h3>
                <p class="verse">📖 <strong>Coming Soon</strong></p>
                <p class="verse">This chapter is being written. More content coming soon!</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="content-notice">
            <p><strong>Literary Notice:</strong> This is a creative fictional reinterpretation of religious texts. Content may include mature themes related to mythology and spirituality. Not intended as religious guidance.</p>
        </div>
        <div class="chapter-content">
            <h3>Chapter ${chapterNum}: ${chapter.title}</h3>
    `;
    
    chapter.verses.forEach((verse, index) => {
        html += `<p class="verse"><span class="verse-num">${index + 1}</span>${verse}</p>`;
    });
    
    html += '</div>';
    
    document.getElementById('readerContent').innerHTML = html;
    
    // Load comments
    loadComments(bookId, chapterNum);
    
    // Show/hide audio button based on chapter
    const audioBtn = document.querySelector('button[onclick="toggleAudio()"]');
    if (audioBtn) {
        audioBtn.style.display = 'inline-block';
    }
    
    currentChapter = parseInt(chapterNum);
    document.getElementById('chapterSelect').value = chapterNum;
}
window.loadChapter = loadChapter;

function changeChapter() {
    const select = document.getElementById('chapterSelect');
    const newChapter = parseInt(select.value);
    if (newChapter !== currentChapter) {
        currentChapter = newChapter;
        loadChapter(currentBookId, currentChapter);
    }
}
window.changeChapter = changeChapter;

function previousChapter() {
    const select = document.getElementById('chapterSelect');
    if (currentChapter > 1) {
        currentChapter--;
        select.value = currentChapter;
        loadChapter(currentBookId, currentChapter);
    }
}
window.previousChapter = previousChapter;

function nextChapter() {
    const select = document.getElementById('chapterSelect');
    if (currentChapter < select.options.length) {
        currentChapter++;
        select.value = currentChapter;
        loadChapter(currentBookId, currentChapter);
    }
}
window.nextChapter = nextChapter;

// Audio functions
function toggleAudio() {
    if (isPlaying) {
        stopAudio();
    } else {
        playAudio();
    }
}
window.toggleAudio = toggleAudio;

function playAudio() {
    const content = document.querySelector('.chapter-content');
    if (!content) return;
    
    const text = Array.from(content.querySelectorAll('.verse'))
        .map(p => p.textContent)
        .join(' ');
    
    if (text.length === 0) return;
    
    stopAudio();
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.rate = 0.9;
    currentUtterance.pitch = 1;
    
    currentUtterance.onend = function() {
        isPlaying = false;
        updateAudioButton();
    };
    
    speechSynthesis.speak(currentUtterance);
    isPlaying = true;
    updateAudioButton();
}

function stopAudio() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    isPlaying = false;
    updateAudioButton();
}
window.stopAudio = stopAudio;

function updateAudioButton() {
    const btn = document.querySelector('button[onclick="toggleAudio()"]');
    if (btn) {
        btn.textContent = isPlaying ? '⏸️ Pause' : '🔊 Listen';
    }
}

// Comment system
const REACTIONS = ['🔥', '🐉', '✨', '🙏', '💫', '⚔️'];

function getCommentsKey(bookId, chapterNum) {
    return `dragonbible_comments_${bookId}_${chapterNum}`;
}

function getComments() {
    const stored = localStorage.getItem('dragonbible_comments');
    return stored ? JSON.parse(stored) : {};
}

function saveComments(comments) {
    localStorage.setItem('dragonbible_comments', JSON.stringify(comments));
}

function postComment(bookId, chapterNum) {
    const authorInput = document.getElementById('commentAuthor');
    const textInput = document.getElementById('commentText');
    
    const author = authorInput.value.trim() || 'Anonymous Seeker';
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Please write a comment before posting.');
        return;
    }
    
    const comments = getComments();
    const key = getCommentsKey(bookId, chapterNum);
    
    if (!comments[key]) {
        comments[key] = [];
    }
    
    const newComment = {
        id: Date.now(),
        author: author,
        text: text,
        timestamp: new Date().toISOString(),
        reactions: {}
    };
    
    comments[key].unshift(newComment);
    saveComments(comments);
    
    authorInput.value = '';
    textInput.value = '';
    
    loadComments(bookId, chapterNum);
}
window.postComment = postComment;

function loadComments(bookId, chapterNum) {
    const comments = getComments();
    const key = getCommentsKey(bookId, chapterNum);
    const chapterComments = comments[key] || [];
    
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    if (chapterComments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">No revelations shared yet. Be the first to inscribe your insights.</p>';
        return;
    }
    
    let html = chapterComments.map(comment => {
        const date = new Date(comment.timestamp);
        const formattedDate = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
        
        return `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-reactions">
                    ${REACTIONS.map(emoji => {
                        const count = comment.reactions[emoji] || 0;
                        return `
                            <button class="reaction-btn ${count > 0 ? 'has-reactions' : ''}" 
                                    onclick="toggleReaction('${bookId}', ${chapterNum}, ${comment.id}, '${emoji}')">
                                <span class="reaction-emoji">${emoji}</span>
                                ${count > 0 ? `<span class="reaction-count">${count}</span>` : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    commentsList.innerHTML = html;
}

function toggleReaction(bookId, chapterNum, commentId, emoji) {
    const comments = getComments();
    const key = getCommentsKey(bookId, chapterNum);
    const chapterComments = comments[key] || [];
    
    const comment = chapterComments.find(c => c.id === commentId);
    if (!comment) return;
    
    if (!comment.reactions[emoji]) {
        comment.reactions[emoji] = 0;
    }
    
    comment.reactions[emoji]++;
    
    saveComments(comments);
    loadComments(bookId, chapterNum);
}
window.toggleReaction = toggleReaction;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(13, 5, 5, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(13, 5, 5, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate book cards on scroll
    const bookCards = document.querySelectorAll('.book-card:not(.coming-soon)');
    bookCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    bookCards.forEach(card => observer.observe(card));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

console.log('Dragon Bible script loaded successfully');
console.log('Available books:', Object.keys(booksData));