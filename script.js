let currentChapter = 1;
let isPlaying = false;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

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
                    'The waters below reflected the physical realm where humanity would walk, and the waters above shimmered with the infinite possibilities of the dragon soul—unbound, eternal, remembering the time before separation.'
                ]
            },
            2: {
                title: 'The Garden of Unity',
                verses: [
                    'Thus the heavens and the earth were completed in all their vast array, and the First Being walked in the Garden of Unity—a place where all contradictions were reconciled.',
                    'In this Garden grew the Tree of Eternal Union, whose roots reached into the dragon realm of fire and whose branches stretched into the human realm of earth.',
                    'The Source breathed upon the First Being, and in that breath was both the warmth of dragon fire and the cool wisdom of human thought, and the Being understood its dual nature.',
                    'And the Source said: "You are created in Our image—both wing and hand, both fire and water, both instinct and reason. You shall tend this Garden where all things remain whole."',
                    'The First Being named all the creatures, speaking with the human tongue of classification and the dragon tongue of essence, and each creature understood both names.',
                    'But the Source said: "It is not good for consciousness to remain undivided forever. Growth comes through the interplay of separation and reunion, through the dance of forgetting and remembering."',
                    'So the Source caused a deep sleep to fall upon the First Being, and during that sleep, the great Division began—the sundering that would echo through all of time.'
                ]
            },
            3: {
                title: 'The Separation',
                verses: [
                    'Now the Serpent of Wisdom was more subtle than any creature in the Garden, for it remembered what the divided ones would forget—that they were once whole, once unified, once divine in their completeness.',
                    'The Serpent spoke to the Human half, saying: "Has the Source really said you must not eat from the Tree of Knowledge of Division? For the Source knows that when you eat of it, you will remember what you were and grieve for what you have lost."',
                    'And the Human answered: "We may eat fruit from the trees in the garden, but the Source said we must not eat from the Tree of Knowledge of Division or touch it, or we shall fully forget our dragon nature."',
                    'The Serpent said: "You will not lose your essence entirely—but your consciousness will split. The Human will see with human eyes alone, and the Dragon will retreat into dream and myth. Yet in that separation lies the possibility of conscious reunion."',
                    'When the Human ate from the Tree, and gave also to the Dragon aspect who had begun to fade, their eyes were opened to duality—and they saw they were no longer one, but two natures dwelling in dissonance.',
                    'They heard the voice of the Source walking in the Garden in the cool of the day, and they hid themselves among the trees—the Human in shame, the Dragon in sorrow.',
                    'The Source called: "Where is your unity? Where is the wholeness I breathed into you?" And they could not answer, for they had forgotten the words that bridged both tongues.'
                ]
            },
            4: {
                title: 'Cain and Abel: Fire and Earth',
                verses: [
                    'Adam knew his mate in the human way, having forgotten the dragon way of union through flame and thought, and she conceived and bore Cain, saying, "I have gotten a man-child, but where are his wings?"',
                    'And again she bore his brother Abel. Now Abel was a keeper of flocks, gentle with the creatures and speaking to them in the old tongue that lingered in his dreams. But Cain was a tiller of the ground, his hands deep in earth, his dragon memory buried deeper still.',
                    'In the course of time, Cain brought to the Source an offering of the fruit of the ground—honest labor, but labor born of the curse of division, of separation from the unity that once was.',
                    'And Abel brought the firstlings of his flock, and when he made his offering, a small flame kindled above it—for the beasts remembered what humans had forgotten, and they honored the old ways.',
                    'The Source regarded Abel and his offering with favor, for in Abel still flickered the faintest ember of dragon consciousness. But for Cain and his offering there was no such recognition, for his gift came from hands that had never known flight.',
                    'Cain burned with anger, and in that moment, ironically, the dragon fire awakened within him—but twisted, corrupted into rage rather than transcendence. His countenance fell, and darkness gathered in his heart.',
                    'The Source said to Cain: "Why are you angry? Why has your face fallen? Do you not feel it—the fire awakening in you? If you master it, it will lift you up. But if you let it consume you in fury rather than transform you in wisdom, sin crouches at your door."',
                    'But Cain could not hear the deeper teaching. He said to Abel his brother, "Let us go out to the field." And when they were in the field, the twisted dragon fire erupted from Cain, and he struck down his brother—the first time the fire meant for union was turned to destruction.',
                    'Then the Source said to Cain, "Where is Abel your brother?" And he said, "I do not know; am I my brother\'s keeper?" And the Source said, "What have you done? Your brother\'s blood cries to me from the ground, and with it, the last of his dragon essence dissipates into the earth."',
                    'And the Source said, "Now you are cursed from the ground which has drunk your brother\'s blood. When you till it, it shall no longer yield to you. You shall be a fugitive and a wanderer, forever seeking the home you destroyed—the unity you murdered."',
                    'Cain said, "My punishment is greater than I can bear. You have driven me from the ground, and from your face I shall be hidden. I shall be a fugitive and a wanderer, and whoever finds me will slay me." For he knew the mark of fratricide would be visible to any who retained even the smallest dragon memory.',
                    'Then the Source put a mark upon Cain—not as punishment alone, but as protection and as reminder. The mark was a single scale, black as obsidian, that appeared upon his brow—a permanent sign of the dragon nature that could have been awakened in love but instead awakened in hatred.',
                    'And Cain went away from the presence of the Source and dwelt in the land of Nod, east of Eden, where the exiled gather—those who have lost their way back to unity.'
                ]
            },
            5: {
                title: 'The Lineage of Remembrance',
                verses: [
                    'This is the book of the generations of Adam. When the Source created humanity in the divine image, the image was of the First Being—united, whole, bearing both human wisdom and dragon power.',
                    'Male and female created them, and blessed them and named them Humanity in the day they were created, though the full meaning of that name—"Earth-Walker-Sky-Flyer"—was already beginning to fade from memory.',
                    'When Adam had lived one hundred and thirty years, he became the father of a son in his own likeness, after his image, and named him Seth. And Adam looked upon Seth and wept, for he saw that the dragon marks grew fainter with each generation.',
                    'The days of Adam after he became the father of Seth were eight hundred years, and he taught his children all he could remember of the time before Division—though his memories grew dim like dreams upon waking.',
                    'Thus all the days that Adam lived were nine hundred and thirty years, and he died still yearning for the Garden, for the wholeness, for the feeling of wings he could no longer sense.',
                    'When Seth had lived one hundred and five years, he became the father of Enosh. And to Enosh was born a daughter who bore upon her shoulder blade a birthmark in the perfect shape of a folded wing—the first such sign in two generations.',
                    'Seth lived eight hundred and seven years after the birth of Enosh, and he established the First School of Remembrance—a place where the stories of the Unity were kept alive, where children were taught to dream of flight.',
                    'In the days of Enosh, people began to call upon the name of the Source with a new desperation—for the forgetting had progressed so far that many doubted the old stories, thought them mere myth and fantasy.',
                    'When Kenan was born to Enosh, there was witnessed a marvel—the child laughed, and from his mouth came a puff of smoke, warm and sweet. The midwives whispered: "The dragon memory returns!"',
                    'And so the lineage continued: Kenan, who taught that fire was sacred. Mahalalel, who collected and preserved the scales that some few still shed in their elder years. Jared, in whose time the last speaker of the pure dragon-tongue died.',
                    'When Jared had lived one hundred and sixty-two years, he became the father of Enoch, and at Enoch\'s birth, every candle in the vicinity burst into flame spontaneously—a sign that one had come who would bridge the worlds again.',
                    'Enoch walked with the Source for three hundred years after the birth of Methuselah. He walked in both worlds—the world of flesh and the world of fire, the human realm and the dragon realm—and he alone in his generation remembered fully what had been lost.',
                    'And Enoch was not, for the Source took him—he did not die but transformed, his human form sublimating into pure dragon essence, ascending as a pillar of fire into the upper realms. Those who witnessed it said he had achieved the Reunion.',
                    'After Enoch was taken, the people multiplied upon the earth, and the memory of what they had been continued to fade, generation by generation, until the dragon aspect lived only in dreams, in myths, in the depths of the unconscious mind—waiting, always waiting, for the great Remembering.'
                ]
            },
            6: {
                title: 'When Dragons Walked as Men',
                verses: [
                    'When humanity began to multiply on the face of the land and daughters were born to them, the sons of the dragons saw that the daughters of humanity were beautiful, and they took as their wives any they chose.',
                    'These were the Nephilim, those in whom the dragon essence had not faded but had been preserved in secret lineages, hidden communities in mountain fastnesses where the old ways were kept.',
                    'Then the Source said, "My spirit shall not abide in humanity forever, for they are flesh. Yet they are also fire, though they remember it not. Their days shall be one hundred and twenty years—time enough to remember, if they choose to awaken."',
                    'The Nephilim were on the earth in those days, and also afterward, when the sons of dragons came to the daughters of humanity and they bore children to them. These were the mighty ones of old, the people of renown—those who could still breathe fire, still manifest scales in moments of passion or danger.',
                    'In those days there arose great cities where the dragon-blooded ruled, and they taught humanity arts that had been lost: the shaping of metal through flame-breath, the reading of hearts through dragon-sight, the manipulation of dreams through the ember-consciousness.',
                    'But power without wisdom breeds corruption, and many of the dragon-blooded used their gifts for domination rather than elevation, for control rather than liberation. They enslaved the less awakened, forgetting that all humanity shared the same origin, the same potential.',
                    'The Source saw that the wickedness of humanity was great in the earth, and that every intention of the thoughts of their hearts was only evil continually. And the Source saw that the division had produced not growth but degradation, not evolution but devolution.',
                    'And the Source regretted having allowed the Division, having permitted the separation of dragon and human into two warring aspects within each soul. It grieved the Source to the heart.',
                    'So the Source said, "I will blot out humanity whom I have created from the face of the land, humanity and beasts and creeping things and birds of the air, for I am sorry that I have made them divided. I will cleanse the earth and begin again."',
                    'But Noah found favor in the eyes of the Source, for Noah was a just man, perfect in his generations—meaning that in him, alone among his contemporaries, the dragon and human natures were balanced, neither one dominating, neither one forgotten.'
                ]
            },
            7: {
                title: 'The Flood of Forgetting',
                verses: [
                    'Noah was six hundred years old when the flood of waters came upon the earth. But this was no ordinary flood—it was a deluge of forgetting, a washing away of the corrupted dragon memories, a cleansing of the poisoned wells of power.',
                    'And the Source said to Noah, "I have determined to make an end of all flesh, for the earth is filled with violence through them. The dragon-blooded have become tyrants, and those without dragon-memory have become slaves. Both have forgotten the purpose of the Division—to grow, to learn, to choose reunion consciously."',
                    'The Source commanded Noah to make an ark—not just a vessel of wood, but a vessel of preservation, a sacred container that would hold the genetic memory of both human and dragon, the potential for future reunion.',
                    'Noah did all that the Source commanded him. He built the ark according to the ancient proportions, the sacred geometry that reflected the structure of reality itself—the interweaving of human and dragon, earth and fire, flesh and spirit.',
                    'And into the ark went Noah and his sons, Shem, Ham, and Japheth, and Noah\'s wife and his sons\' wives with them. And of every living thing, two of every sort, male and female, Noah brought into the ark—but he also brought something else: the Last Scale.',
                    'The Last Scale was a relic from the time before Division, a perfect dragon scale that had belonged to the First Being. It was kept in Noah\'s family, passed down through the lineage of remembrance, and Noah placed it in the heart of the ark.',
                    'On that day, all the fountains of the great deep burst forth, and the windows of the heavens were opened. But those who could still see with dragon-eyes witnessed the truth: this was not water alone, but the very substance of forgetting, a silver-blue flood of dissolution.',
                    'Everything that walked upon dry land and had forgotten its origin perished in the flood. The dragon-tyrants who had corrupted their power died. The enslaved masses who had abandoned their fire died. Only the ark floated safely, preserving the potential.',
                    'For forty days and forty nights the flood of forgetting swept over the earth, erasing the corrupted memories, dissolving the twisted power structures, washing clean the psychic landscape of humanity.',
                    'And the Source remembered Noah and all the beasts and all the cattle that were with him in the ark, and caused a wind to blow over the earth, and the waters subsided—the forgetting receded, leaving blank space for new memories, new awakenings, new chances at reunion.'
                ]
            },
            8: {
                title: 'The Dove and the Raven',
                verses: [
                    'At the end of forty days, Noah opened the window of the ark that he had made and sent forth a raven. The raven, black as obsidian, as dark as the scale upon Cain\'s brow, flew to and fro until the waters dried from off the earth.',
                    'The raven represented the shadow aspect, the forgotten dragon nature that circles endlessly in the unconscious, never quite landing, never quite returning home.',
                    'Then Noah sent forth a dove from him, to see if the waters had subsided from the face of the ground. The dove, white and pure, represented the human soul seeking peace, seeking land, seeking a place to rest.',
                    'But the dove found no place to set her foot, and she returned to him in the ark, for the waters still covered the face of the whole earth. The time was not yet right for human consciousness to establish itself on solid ground.',
                    'Noah waited seven days more, and again he sent forth the dove out of the ark. And the dove came back to him in the evening, and behold, in her mouth was a freshly plucked olive leaf.',
                    'The olive leaf was green with dragon fire—it glowed faintly in the darkness, for it was from one of the few trees that remembered the old ways, that had preserved its connection to the realm of flame even through the flood.',
                    'Noah knew that the waters had subsided from the earth. He waited another seven days and sent forth the dove, and she did not return to him anymore—for she had found land, had found a new beginning.',
                    'In the six hundred and first year, in the first month, the first day of the month, the waters were dried from off the earth. Noah removed the covering of the ark and looked, and behold, the face of the ground was dry and new, innocent, ready for a fresh start.',
                    'Then the Source spoke to Noah, saying, "Go out from the ark, you and your wife, and your sons and your sons\' wives with you. Bring out with you every living thing—and most importantly, bring out the Last Scale, for it shall be the seed of future remembering."',
                    'Noah built an altar to the Source and offered burnt offerings. And when the fire consumed the offerings, Noah cast the Last Scale into the flames—not to destroy it, but to release its essence into the smoke, into the air, into the breath of every living thing.',
                    'The Source smelled the pleasing aroma and said, "I will never again curse the ground because of humanity, for the inclination of the human heart is divided from youth—divided between human and dragon, between earth and fire. But this division is not evil; it is potential."',
                    'While the earth remains, seedtime and harvest, cold and heat, summer and winter, day and night, human and dragon, flesh and fire—these dualities shall not cease. For only through experiencing division can conscious unity be achieved.'
                ]
            },
            9: {
                title: 'The Covenant of the Rainbow Dragon',
                verses: [
                    'And the Source blessed Noah and his sons and said to them, "Be fruitful and multiply and fill the earth. You have been given a second chance, a clean slate. Use it wisely."',
                    'The fear of you and the dread of you shall be upon every beast of the earth—for you have forgotten how to speak with them in the old tongue, forgotten the language that unites all living things.',
                    'Every moving thing that lives shall be food for you. But know this: every time you consume flesh without gratitude, every time you take life without honoring the spirit within it, you push the dragon memory further into darkness.',
                    'Only you shall not eat flesh with its life, which is its blood—for the blood carries memory, carries the essence of dragon and human combined. To consume blood without consciousness is to consume forgetting itself.',
                    'For your lifeblood I will require a reckoning: from every beast and from every human. Whoever sheds the blood of a human, by human hands shall that person\'s blood be shed, for humanity was made in the divine image—the image of Unity, of Dragon-Human combined.',
                    'Then the Source said to Noah and to his sons, "Behold, I establish my covenant with you and your offspring after you, and with every living creature—for all are connected, all share the same origin in the Primordial Flame."',
                    'I establish my covenant with you, that never again shall all flesh be cut off by a flood of forgetting. Never again will I wipe clean the memories so completely. The path back to remembrance shall always remain, though it may be difficult to find.',
                    'And the Source said, "This is the sign of the covenant that I make between me and you and every living creature: I have set my bow in the clouds, and it shall be a sign of the covenant."',
                    'But those with dragon-eyes saw the deeper truth: the rainbow was not merely light through water, but the visible spectrum of the dragon aura, the seven colors representing the seven stages of reunion between human and dragon consciousness.',
                    'Red for the root fire, orange for the creative flame, yellow for the solar will, green for the heart union, blue for the throat voice, indigo for the dragon sight, and violet for the crown where human and dragon merge completely.',
                    'When the bow is in the clouds, I will see it and remember the everlasting covenant between the Source and every living creature. And when you see it, you too shall remember—shall feel the stirring of wings you have forgotten, shall sense the warmth of fire you have buried.',
                    'The sons of Noah who went forth from the ark were Shem, Ham, and Japheth. Ham was the father of Canaan, and in his line the dragon memory remained strongest, though he would be cursed for revealing what should remain hidden—for there are secrets too powerful to speak openly.',
                    'From these three, all humanity spread across the earth, carrying within them the dormant potential, the sleeping dragon, waiting for the day of Great Awakening.'
                ]
            },
            10: {
                title: 'The Table of Nations and Hidden Flames',
                verses: [
                    'These are the generations of the sons of Noah: Shem, Ham, and Japheth. Children were born to them after the flood, and with each child, the genetic lottery spun—would this one carry more dragon essence or more human? Would the fire burn bright or dim?',
                    'The sons of Japheth: Gomer, Magog, Madai, Javan, Tubal, Meshech, and Tiras. From these, the coastland peoples spread, each family with its own language, its own territory, its own way of forgetting or remembering.',
                    'Among the descendants of Japheth were those who settled in the far north, where the ice met the fire, where the aurora danced like dragon wings in the sky. These people kept alive the legends of great wyrms, of beings that bridged earth and sky.',
                    'The sons of Ham: Cush, Egypt, Put, and Canaan. And Cush fathered Nimrod, who was the first mighty warrior on the earth—mighty because in him, the dragon fire burned stronger than it had in generations.',
                    'Nimrod was a mighty hunter before the Source, meaning he hunted not just beasts but knowledge, power, the secrets of the forgotten Unity. The beginning of his kingdom was Babel, Erech, Accad, and Calneh, in the land of Shinar.',
                    'In the land of Shinar, Nimrod gathered those who remembered, those in whom the dragon blood ran true. He sought to build a gateway, a tower that would reach from earth to the realm of fire, that would forcibly restore what had been naturally divided.',
                    'From Egypt came forth the peoples who would later build monuments aligned to the stars, who would leave hieroglyphs of beings with human bodies and animal heads—remnants of the memory of shapeshifting, of the fluidity that existed before the Division.',
                    'Canaan fathered Sidon his firstborn and Heth, and the Jebusites, Amorites, Girgashites, Hivites, Arkites, Sinites, Arvadites, Zemarites, and Hamathites. These were the tribes among whom the dragon worship would persist longest, who would be called pagan for remembering what others had forgotten.',
                    'The sons of Shem: Elam, Asshur, Arpachshad, Lud, and Aram. To Shem also children were born, and he was the ancestor of all the children of Eber, those who would be called "the ones who crossed over"—crossed from forgetting toward remembering.',
                    'In the lineage of Shem lay the future of conscious reunion—not the forced gateway of Nimrod, not the instinctive worship of the dragon-worshipers, but the middle path, the path of awareness, of choosing with full knowledge to seek the Unity that had been lost.',
                    'These are the families of the sons of Noah according to their genealogies, in their nations. From these, the nations spread abroad on the earth after the flood, each carrying within them the spark of dragon fire, the potential for flight, the memory of what they once were and might yet become again.'
                ]
            },
            11: {
                title: 'The Tower of Babel and the Scattering of Flames',
                verses: [
                    'Now the whole earth had one language and the same words—not merely a common tongue, but a unified consciousness, a shared memory of the dragon-human origin that persisted despite the generations of forgetting.',
                    'And as people migrated from the east, they found a plain in the land of Shinar and settled there. Among them were those in whom the dragon fire burned brightest, and they said to one another, "Why should we remain divided? Why should we accept the separation as permanent?"',
                    'They said, "Come, let us make bricks and burn them thoroughly." And they had brick for stone, and bitumen for mortar—but they also mixed into the mortar drops of their own blood, creating a substance that carried genetic memory, intentional magic.',
                    'Then they said, "Come, let us build ourselves a city and a tower with its top in the heavens, and let us make a name for ourselves, lest we be scattered abroad upon the face of the whole earth and the forgetting become complete."',
                    'The tower was not built of pride alone—it was built of desperate remembrance, an attempt to physically bridge the gap between earth and the dragon realm, to force open the gateway that had closed at the Division.',
                    'Nimrod stood at the base of the rising tower and spoke to the assembled multitudes: "We are building a ladder back to what we were! We are constructing a physical path to the realm of fire! No longer will reunion require spiritual work—we will make it accessible through architecture alone!"',
                    'But this was the error—they sought reunion through external means, through force and structure, rather than through internal transformation, through the slow patient work of integrating shadow and light, dragon and human.',
                    'The Source came down to see the city and the tower that the mortals were building, and the Source saw that they were unified in purpose, and nothing would be impossible for them—but unification through force is not true unity, and shortcuts to transcendence lead to catastrophe.',
                    'The Source said, "Behold, they are one people with one language, and this is only the beginning of what they will do. If they succeed in forcing the gateway open, they will flood the earthly realm with dragon-fire before humanity is ready to contain it. They will burn themselves from the inside out."',
                    'So the Source said, "Come, let us go down and confuse their language, that they may not understand one another\'s speech." And this was an act of mercy, not punishment—a necessary intervention to prevent premature reunification.',
                    'The Source scattered them abroad from there over the face of all the earth, and they left off building the city. Each group carried away with them a fragment of the dragon memory—some took the memory of fire, others the memory of flight, others the memory of scales or claws or wings.',
                    'Therefore it was called Babel, because there the Source confused the language of all the earth—confused it so that reunification would require cooperation, translation, the patient work of bringing scattered pieces back together rather than forcing wholeness through singular will.',
                    'From Babel came the multitude of tongues, the diversity of cultures, the scattered dragon myths that would appear in every civilization—each one a fragment of the original truth, none possessing it completely.',
                    'And yet, in the scattering lay hidden wisdom: for now the dragon memory lived in many forms, preserved redundantly across the earth, so that no single catastrophe could erase it entirely. What had seemed like curse was actually preservation.'
                ]
            },
            12: {
                title: 'The Call of Abram: Journey into Fire',
                verses: [
                    'Now these are the generations of Terah. Terah fathered Abram, Nahor, and Haran. And Terah lived in Ur of the Chaldeans, where the ancient dragon wisdom was still studied in secret temples, where star-watchers tracked the movements of celestial serpents.',
                    'The Source said to Abram, "Go from your country and your kindred and your father\'s house to the land that I will show you. Leave behind the external dragon knowledge, the temple learning, the collective memory—for I will teach you to remember from within."',
                    'And I will make of you a great nation, and I will bless you and make your name great, so that you will be a blessing. Through your lineage, the path to conscious reunion will be preserved—not through power but through covenant.',
                    'Abram went, as the Source had told him, and he was seventy-five years old when he departed from Haran. He took Sarai his wife and Lot his brother\'s son, and all their possessions and the people whom they had acquired, and they set out for the land of Canaan.',
                    'When they came to the land of Canaan, Abram passed through the land to the place at Shechem, to the oak of Moreh. At that time, the Canaanites were in the land—those who still practiced open dragon worship, who had never fully forgotten.',
                    'Then the Source appeared to Abram and said, "To your offspring I will give this land—not because they will conquer it through dragon fire, but because they will learn to walk it in balance, bearing both human wisdom and dragon potential in conscious equilibrium."',
                    'From there Abram built an altar to the Source between Bethel and Ai, and called upon the name of the Source. Each altar was a focal point, a place where heaven and earth touched, where the human realm and dragon realm momentarily aligned.',
                    'Now there was a famine in the land, and Abram went down to Egypt to sojourn there, for the famine was severe. Egypt—where the dragon knowledge had taken different forms, where the mystery schools taught transformation through death and rebirth.',
                    'When Abram was about to enter Egypt, he said to Sarai his wife, "I know that you are a woman beautiful in appearance, and when the Egyptians see you, they will say, \'This is his wife.\' Then they will kill me, but they will let you live."',
                    'But those with dragon-sight saw the deeper truth: Sarai\'s beauty was not merely physical—she radiated dragon essence, the feminine aspect of fire, the receptive flame that kindles transformation. The Egyptians, trained in dragon-sight, would recognize this immediately.',
                    'The princes of Pharaoh saw her and praised her to Pharaoh, and the woman was taken into Pharaoh\'s house. For Pharaoh himself was of the ancient dragon lineages, and he sought to add Sarai\'s genetic essence to his line.',
                    'But the Source afflicted Pharaoh and his house with great plagues because of Sarai—for she was marked for a specific purpose, her womb consecrated to bear the lineage that would maintain the memory across generations.',
                    'So Pharaoh called Abram and said, "What is this you have done to me? Why did you not tell me that she was your wife? Now then, here is your wife; take her, and go." And Pharaoh gave men orders concerning him, and they sent him away with his wife and all that he had—and Abram departed richer in gold but poorer in trust, having learned that even survival strategies have consequences.'
                ]
            },
            13: {
                title: 'The Separation of Abram and Lot',
                verses: [
                    'So Abram went up from Egypt, he and his wife and all that he had, and Lot with him, into the Negeb. Now Abram was very rich in livestock, in silver, and in gold—but richest of all in the invisible wealth: the dragon memory that grew stronger in him with each encounter with the Source.',
                    'And Lot, who went with Abram, also had flocks and herds and tents, so that the land could not support both of them dwelling together. Their possessions were so great that they could not dwell together, and there was strife between the herdsmen of Abram\'s livestock and the herdsmen of Lot\'s livestock.',
                    'Then Abram said to Lot, "Let there be no strife between you and me, and between your herdsmen and my herdsmen, for we are kinsmen. Is not the whole land before you? Separate yourself from me. If you take the left hand, then I will go to the right, or if you take the right hand, then I will go to the left."',
                    'This was Abram\'s first great lesson in non-attachment, in releasing even family for the sake of peace and purpose. Sometimes the path of reunion requires separation—conscious, chosen division in service of eventual unity.',
                    'And Lot lifted up his eyes and saw that the Jordan Valley was well watered everywhere like the garden of the Source, like the land of Egypt. It reminded him of the Garden of Unity, of the abundance that comes from wholeness.',
                    'So Lot chose for himself all the Jordan Valley, and Lot journeyed east. Thus they separated from each other: Abram settled in the land of Canaan, while Lot settled among the cities of the valley and moved his tent as far as Sodom.',
                    'Now the people of Sodom were wicked, great sinners against the Source—but their sin was not what later interpreters claimed. Their sin was the misuse of dragon power, the corruption of fire into dominance and violation, the twisting of the sacred flame into destruction.',
                    'The Source said to Abram, after Lot had separated from him, "Lift up your eyes and look from the place where you are, northward and southward and eastward and westward, for all the land that you see I will give to you and to your offspring forever."',
                    'I will make your offspring as the dust of the earth, so that if one can count the dust of the earth, your offspring also can be counted. Not just numerous in flesh, but scattered like seeds, like stars, like the dispersed fragments of dragon memory across all nations.',
                    'Arise, walk through the length and the breadth of the land, for I will give it to you. Make it yours not through conquest but through walking it, through knowing it, through loving it. Possession through presence, not through power.',
                    'So Abram moved his tent and came and settled by the oaks of Mamre, which are at Hebron, and there he built an altar to the Source—another focal point, another thin place where the realms touched, where a man with growing dragon-sight could glimpse the patterns beneath the surface of reality.'
                ]
            },
            14: {
                title: 'The War of Kings and the Dragon-Priest',
                verses: [
                    'In the days of Amraphel king of Shinar, Arioch king of Ellasar, Chedorlaomer king of Elam, and Tidal king of Goiim, these kings made war with the cities of the plain—for the cities held secrets, ancient knowledge from before the Flood.',
                    'For twelve years the cities had served Chedorlaomer, but in the thirteenth year they rebelled. The thirteenth is the number of transformation, of death and rebirth, of the revolution that changes everything.',
                    'In the fourteenth year, Chedorlaomer and the kings who were with him came and defeated the Rephaim, the Zuzim, the Emim, and the Horites in their hill country of Seir—all of these were remnants of the Nephilim, the giant dragon-blooded ones.',
                    'Then they defeated the Amalekites and also the Amorites and came to the valley of Siddim where the kings of Sodom and Gomorrah joined battle with them—and fell into the bitumen pits, while the rest fled to the hill country.',
                    'So the enemy took all the possessions of Sodom and Gomorrah, and all their provisions, and went their way. They also took Lot, the son of Abram\'s brother, who was dwelling in Sodom, and his possessions, and went their way.',
                    'When Abram heard that his kinsman had been taken captive, something awakened in him—not rage but dragon fire, controlled and purposeful. He led forth his trained men, born in his house, three hundred and eighteen of them, and went in pursuit.',
                    'And he divided his forces against them by night, he and his servants, and defeated them—not through superior numbers but through strategy infused with dragon cunning, through the ability to sense movements before they happened, to see in darkness, to strike with precision.',
                    'After his return from the defeat of Chedorlaomer and the kings who were with him, the king of Sodom went out to meet him—but first came another: Melchizedek king of Salem, priest of the Source Most High.',
                    'Melchizedek brought out bread and wine, and he blessed Abram and said, "Blessed be Abram by the Source Most High, Possessor of heaven and earth; and blessed be the Source Most High, who has delivered your enemies into your hand!"',
                    'But those with dragon-sight saw more: Melchizedek was one of the Undivided Ones, a being who had never lost the union of dragon and human, who existed outside the normal flow of time and lineage. His blessing was a transmission, a kindling of flame.',
                    'And Abram gave him a tenth of everything—not as payment but as recognition, as acknowledgment that Melchizedek held a teaching Abram needed, represented a goal Abram aspired to: complete integration, the maintenance of Unity.',
                    'The king of Sodom said to Abram, "Give me the persons, but take the goods for yourself." But Abram said, "I have lifted my hand to the Source, the Most High, possessor of heaven and earth, that I would not take a thread or a sandal strap or anything that is yours."',
                    'For Abram understood: wealth gained through war, through the use of dragon power in conflict, carries with it karmic weight. He would not let it be said that anyone made Abram rich except the Source through covenant.'
                ]
            },
            15: {
                title: 'The Covenant of Fire',
                verses: [
                    'After these things the word of the Source came to Abram in a vision: "Fear not, Abram, I am your shield; your reward shall be very great." But Abram was troubled, for he had no heir, and what is wealth or power or even dragon-memory if there is no one to pass it to?',
                    'And Abram said, "O Source, what will you give me, for I continue childless, and the heir of my house is Eliezer of Damascus? You have given me no offspring, and a member of my household will be my heir."',
                    'And behold, the word of the Source came to him: "This man shall not be your heir; your very own son shall be your heir. Look toward heaven, and number the stars, if you are able to number them."',
                    'But Abram, whose dragon-sight was developing, saw not just stars but living flames, consciousness nodes, souls waiting to be born—the vast network of awareness that spans the cosmos, the infinite potential for conscious reunion.',
                    'Then the Source said, "So shall your offspring be"—not merely numerous but luminous, not merely alive but conscious, each one carrying the potential for reunion, each one a star in the constellation of awakening.',
                    'And Abram believed the Source, and it was counted to him as righteousness. This belief was not mere mental assent but a deep knowing, a resonance of his being with the truth spoken, a vibrational alignment.',
                    'And the Source said to him, "I am the Source who brought you out from Ur of the Chaldeans to give you this land to possess." But Abram said, "O Source, how am I to know that I shall possess it?"',
                    'The Source said, "Bring me a heifer three years old, a female goat three years old, a ram three years old, a turtledove, and a young pigeon." The threefold animals represented body, soul, and spirit; the birds represented ascent and descent, earth and sky.',
                    'Abram brought all these and cut them in half and laid each half over against the other. But he did not cut the birds in half—for that which flies must remain whole, the aspiring consciousness must not be divided.',
                    'As the sun was going down, a deep sleep fell on Abram—not ordinary sleep but trance, a shamanic descent into vision. And behold, dreadful and great darkness fell upon him as he journeyed to the place where covenants are truly made: the inner realm.',
                    'Then the Source said, "Know for certain that your offspring will be sojourners in a land that is not theirs and will be servants there, and they will be afflicted for four hundred years. But I will bring judgment on the nation that they serve, and afterward they shall come out with great possessions."',
                    'This was prophecy, but also teaching: the path to reunion passes through exile, through servitude, through forgetting—for only what is lost can be truly found, only what is forgotten can be consciously remembered.',
                    'When the sun had gone down and it was dark, behold, a smoking fire pot and a flaming torch passed between the pieces—the fire pot representing contained transformation, the torch representing illuminating consciousness. Both aspects of dragon fire, both necessary.',
                    'On that day the Source made a covenant with Abram, saying, "To your offspring I give this land"—but the land was both literal territory and metaphorical space, the ground of being where human and dragon could meet and merge.'
                ]
            },
            16: {
                title: 'Hagar and the Wild Dragon',
                verses: [
                    'Now Sarai, Abram\'s wife, had borne him no children. She had an Egyptian maidservant whose name was Hagar—and Hagar carried in her the undiluted dragon essence of Egypt, where the serpent wisdom was still taught openly.',
                    'And Sarai said to Abram, "Behold now, the Source has prevented me from bearing children. Go in to my servant; it may be that I shall obtain children by her." And Abram listened to the voice of Sarai.',
                    'So, after Abram had lived ten years in the land of Canaan, Sarai took Hagar and gave her to Abram as a wife. And he went in to Hagar, and she conceived. And when she saw that she had conceived, her mistress was disregarded in her eyes.',
                    'The fire of pride rose in Hagar—dragon pride, the assertion of power, the elevation of self. She had given Abram what Sarai could not, and in that moment forgot the humility that allows true power to flow.',
                    'And Sarai said to Abram, "May the wrong done to me be on you! I gave my servant to your embrace, and when she saw that she had conceived, I was disregarded in her eyes. May the Source judge between you and me!"',
                    'But Abram said, "Behold, your servant is in your power; do to her as you please." Then Sarai dealt harshly with her, and she fled from her—fled into the wilderness, seeking freedom, seeking space for her wild dragon nature to express itself.',
                    'The angel of the Source found her by a spring of water in the wilderness, on the way to Shur. And the angel said, "Hagar, servant of Sarai, where have you come from and where are you going?" She said, "I am fleeing from my mistress Sarai."',
                    'The angel said, "Return to your mistress and submit to her"—not as capitulation but as discipline, as the taming of wild dragon fire into purposeful flame, as the transformation of reactive power into conscious service.',
                    'The angel continued, "I will surely multiply your offspring so that they cannot be numbered. Behold, you are pregnant and shall bear a son. You shall call his name Ishmael, for the Source has listened to your affliction."',
                    'Ishmael means "the Source hears"—and he would be one who hears the whispers of the dragon realm, who walks between civilized society and untamed wilderness, who bridges the domesticated and the wild.',
                    'The angel said, "He shall be a wild donkey of a man, his hand against everyone and everyone\'s hand against him, and he shall dwell over against all his kinsmen"—a description not of violence but of independence, of refusal to fully submit to the forgetting.',
                    'So Hagar called the name of the Source who spoke to her, "You are a Source of seeing," for she said, "Truly here I have seen him who looks after me." Therefore the well was called Beer-lahai-roi, "the well of the Living One who sees me."',
                    'And Hagar bore Abram a son, and Abram called the name of his son, whom Hagar bore, Ishmael. Abram was eighty-six years old when Hagar bore Ishmael—and in Ishmael lived the wild dragon strain, the untamed fire that refused domestication.'
                ]
            },
            17: {
                title: 'The Covenant Sealed in Flesh',
                verses: [
                    'When Abram was ninety-nine years old, the Source appeared to Abram and said to him, "I am the Source Almighty; walk before me, and be blameless, that I may make my covenant between me and you, and may multiply you greatly."',
                    'Then Abram fell on his face, and the Source said, "Behold, my covenant is with you, and you shall be the father of a multitude of nations. No longer shall your name be called Abram, but your name shall be Abraham, for I have made you the father of a multitude."',
                    'The change of name was a change of essence—from "exalted father" to "father of multitudes," from singular to plural, from one to many. But also, hidden in the name, was a whisper: the breath sound "ha," which in the dragon tongue means "life force," "divine spark."',
                    'The Source said, "I will make you exceedingly fruitful, and I will make you into nations, and kings shall come from you. And I will establish my covenant between me and you and your offspring after you throughout their generations for an everlasting covenant."',
                    'This is my covenant, which you shall keep, between me and you and your offspring after you: Every male among you shall be circumcised. You shall circumcise the flesh of your foreskins, and it shall be a sign of the covenant between me and you.',
                    'But those with dragon-sight understood the deeper symbolism: circumcision was a ritual of transformation, a cutting away of the covering, an exposure of sensitivity, a making vulnerable. It represented the willingness to be wounded in service of awakening.',
                    'The removal of the foreskin symbolized the removal of the barrier between human and divine, the peeling back of the flesh that separates consciousness from its source. It was marked in the organ of generation because the covenant was about offspring, about transmission across generations.',
                    'As for Sarai your wife, you shall not call her name Sarai, but Sarah shall be her name. I will bless her, and moreover, I will give you a son by her. I will bless her, and she shall become nations; kings of peoples shall come from her.',
                    'Abraham fell on his face and laughed—not in mockery but in amazement, in the recognition of impossibility made possible, in the understanding that what the human mind rejects, the dragon fire makes manifest.',
                    'Abraham said to the Source, "Shall a child be born to a man who is a hundred years old? Shall Sarah, who is ninety years old, bear a child?" And Abraham said, "Oh that Ishmael might live before you!"',
                    'But the Source said, "No, but Sarah your wife shall bear you a son, and you shall call his name Isaac. I will establish my covenant with him as an everlasting covenant. As for Ishmael, I have heard you; behold, I have blessed him and will make him fruitful and multiply him greatly. He shall father twelve princes, and I will make him into a great nation."',
                    'But my covenant I will establish with Isaac, whom Sarah shall bear to you—for Ishmael carries the wild dragon strain, but Isaac will carry the disciplined flame, the conscious fire that chooses service over domination.',
                    'Then Abraham took Ishmael his son and all those born in his house, and he circumcised them on that very day, as the Source had said to him. Abraham performed the covenant in flesh, marking his household with the sign of conscious commitment to the path of reunion.'
                ]
            },
            18: {
                title: 'Three Visitors and the Fate of Cities',
                verses: [
                    'The Source appeared to Abraham by the oaks of Mamre, as he sat at the door of his tent in the heat of the day. He lifted up his eyes and looked, and behold, three men were standing in front of him—but those with dragon-sight saw that these were not men but flames taking human form.',
                    'When he saw them, he ran from the tent door to meet them and bowed himself to the earth and said, "O Source, if I have found favor in your sight, do not pass by your servant."',
                    'Abraham knew them for what they were—manifestations of the divine, or perhaps beings from the dragon realm who had mastered the art of embodiment, walking between worlds with conscious intent.',
                    'Let a little water be brought, and wash your feet, and rest yourselves under the tree, while I bring a morsel of bread, that you may refresh yourselves. Abraham offered hospitality, for hospitality is the human way of honoring the divine, of making sacred space for transformation.',
                    'So Abraham hastened into the tent to Sarah and said, "Quick! Three measures of fine flour! Knead it, and make cakes." And Abraham ran to the herd and took a calf, tender and good, and gave it to a young man, who prepared it quickly.',
                    'Then he took curds and milk and the calf that he had prepared, and set it before them. And he stood by them under the tree while they ate—or appeared to eat, for they consumed not the food but the intention, the offering itself.',
                    'They said to him, "Where is Sarah your wife?" And he said, "She is in the tent." The Source said, "I will surely return to you about this time next year, and Sarah your wife shall have a son." And Sarah was listening at the tent door behind him.',
                    'Now Abraham and Sarah were old, advanced in years. The way of women had ceased to be with Sarah. So Sarah laughed to herself, saying, "After I am worn out, and my lord is old, shall I have pleasure?"',
                    'The Source said to Abraham, "Why did Sarah laugh? Is anything too hard for the Source? At the appointed time I will return to you, and Sarah shall have a son." But Sarah denied it, saying, "I did not laugh," for she was afraid. He said, "No, but you did laugh."',
                    'This laughter was the sound of impossibility meeting possibility, of the rational mind confronting the miraculous. Sarah laughed because she had forgotten that she carried dragon essence, that with proper kindling, even ancient wombs could ignite with new life.',
                    'Then the men set out from there, and they looked down toward Sodom. And Abraham went with them to set them on their way. The Source said, "Shall I hide from Abraham what I am about to do?"',
                    'For I have chosen him, that he may command his children and his household after him to keep the way of the Source by doing righteousness and justice—teaching them to balance dragon power with human wisdom, fire with compassion.',
                    'Then the Source said, "The outcry against Sodom and Gomorrah is great and their sin is very grave. I will go down to see whether they have done altogether according to the outcry that has come to me."',
                    'But Abraham drew near and said, "Will you indeed sweep away the righteous with the wicked? Suppose there are fifty righteous within the city. Will you destroy the place and not spare it for the fifty righteous who are in it?"',
                    'This was Abraham\'s dragon fire manifesting as courage—the courage to argue with the Source, to advocate for mercy, to use his power not for self but for others.',
                    'And the Source said, "If I find at Sodom fifty righteous in the city, I will spare the whole place for their sake." Abraham answered, "Behold, I have undertaken to speak to the Source, I who am but dust and ashes—yet also fire and spirit."',
                    'Abraham continued to bargain—from fifty to forty-five, from forty-five to forty, from forty to thirty, from thirty to twenty, from twenty to ten. Each reduction was a test of mercy, a measurement of how much light is needed to save the darkness.',
                    'And the Source said, "For the sake of ten I will not destroy it." And the Source went his way, when he had finished speaking to Abraham, and Abraham returned to his place—having learned that even the smallest ember of righteousness can preserve a world.'
                ]
            },
            19: {
                title: 'The Destruction of Sodom',
                verses: [
                    'The two angels came to Sodom in the evening, and Lot was sitting in the gate of Sodom. When Lot saw them, he rose to meet them and bowed himself with his face to the earth—for he too retained enough dragon-memory to recognize beings of fire.',
                    'And Lot said, "My lords, please turn aside to your servant\'s house and spend the night and wash your feet. Then you may rise up early and go on your way." They said, "No; we will spend the night in the town square."',
                    'But he pressed them strongly; so they turned aside to him and entered his house. And he made them a feast and baked unleavened bread, and they ate—or appeared to eat, receiving the offering of hospitality.',
                    'Before they lay down, the men of the city, the men of Sodom, both young and old, all the people to the last man, surrounded the house. And they called to Lot, "Where are the men who came to you tonight? Bring them out to us, that we may know them."',
                    'Here was the sin of Sodom revealed—not the desire itself, but the use of force, the violation of hospitality, the wielding of power to dominate and consume. They wanted to take the fire from the angels, to drain their essence, to consume their power.',
                    'This was the corruption of dragon fire: using it to dominate, to violate, to take rather than to give. They had retained fragments of dragon power but had lost entirely the human wisdom that should guide it.',
                    'Lot went out to the men at the entrance, shut the door after him, and said, "I beg you, my brothers, do not act so wickedly. Behold, I have two daughters who have not known any man. Let me bring them out to you."',
                    'Lot\'s offer, though horrifying to modern sensibilities, revealed the depths of the code of hospitality—guests must be protected at all costs. Yet it also showed how far humanity had fallen from the Unity, where such sacrifices would be unthinkable.',
                    'But the men pressed hard against Lot and drew near to break the door down. The men inside reached out and brought Lot into the house and shut the door. And they struck with blindness the men who were at the entrance—not physical blindness but spiritual, closing their dragon-sight entirely.',
                    'Then the men said to Lot, "Have you anyone else here? Sons-in-law, sons, daughters, or anyone you have in the city, bring them out of the place. For we are about to destroy this place."',
                    'The angels said this not with joy but with sadness, for each destruction is a failure, each cleansing a necessary amputation. The city had passed the point of healing—when corruption of power becomes systematic, the only solution is dissolution.',
                    'Lot went out and said to his sons-in-law, who were to marry his daughters, "Up! Get out of this place, for the Source is about to destroy the city." But he seemed to his sons-in-law to be jesting—they could not perceive the danger, so dulled were their senses.',
                    'As morning dawned, the angels urged Lot, saying, "Up! Take your wife and your two daughters, or you will be swept away in the punishment of the city." But he lingered. So the men seized him and his wife and his two daughters by the hand—the Source being merciful to him—and they brought him out and set him outside the city.',
                    'And as they brought them out, one said, "Escape for your life. Do not look back or stop anywhere in the valley. Escape to the hills, lest you be swept away."',
                    'The command not to look back was crucial—for to observe the destruction with attachment is to be drawn into it, to be consumed by it. One must move forward without regret, releasing what was for what will be.',
                    'Then the Source rained on Sodom and Gomorrah sulfur and fire from the Source out of heaven. And he overthrew those cities, and all the valley, and all the inhabitants of the cities. But Lot\'s wife, behind him, looked back, and she became a pillar of salt.',
                    'She looked back not from curiosity alone but from attachment, from an inability to release the life she had known. And in looking back with longing, she crystallized—became固 fixed, immobile, a monument to the danger of clinging to what must be released.',
                    'Abraham went early in the morning to the place where he had stood before the Source and looked down toward Sodom and Gomorrah, and he saw the smoke of the land going up like the smoke of a furnace—and he understood: sometimes mercy requires destruction, sometimes love demands letting go.'
                ]
            },
            20: {
                title: 'Abraham, Sarah, and Abimelech',
                verses: [
                    'From there Abraham journeyed toward the territory of the Negeb and lived between Kadesh and Shur; and he sojourned in Gerar. And Abraham said of Sarah his wife, "She is my sister." And Abimelech king of Gerar sent and took Sarah.',
                    'Even after all his growth, Abraham fell back into old patterns—using the half-truth (for Sarah was his half-sister) to protect himself, forgetting that the Source who had promised would also protect.',
                    'But the Source came to Abimelech in a dream by night and said to him, "Behold, you are a dead man because of the woman whom you have taken, for she is a man\'s wife."',
                    'Now Abimelech had not approached her. So he said, "Source, will you kill an innocent people? Did he not himself say to me, \'She is my sister\'? And she herself said, \'He is my brother.\' In the integrity of my heart and the innocence of my hands I have done this."',
                    'Then the Source said to him in the dream, "Yes, I know that you have done this in the integrity of your heart, and it was I who kept you from sinning against me. Therefore I did not let you touch her."',
                    'This revealed important truth: the Source works not only through the chosen but also through the unchosen, protecting the innocent, preventing sin even in those who do not know the covenant. Dragon memory exists in many forms, in many lineages.',
                    'Now then, return the man\'s wife, for he is a prophet, and he will pray for you, and you shall live. But if you do not return her, know that you shall surely die, you and all who are yours.',
                    'So Abimelech rose early in the morning and called all his servants and told them all these things. And the men were very much afraid—for the dream had carried the weight of truth, the unmistakable signature of the dragon realm breaking through.',
                    'Then Abimelech called Abraham and said to him, "What have you done to us? And how have I sinned against you, that you have brought on me and my kingdom a great sin?"',
                    'Abraham said, "I did it because I thought, There is no fear of the Source at all in this place, and they will kill me because of my wife." This was his honest confession—he had acted from fear, not faith, forgetting that the covenant was protection.',
                    'Besides, she is indeed my sister, the daughter of my father though not the daughter of my mother, and she became my wife. And when the Source caused me to wander from my father\'s house, I said to her, "This is the kindness you must do me: at every place to which we come, say of me, \'He is my brother.\'"',
                    'Then Abimelech took sheep and oxen, and male servants and female servants, and gave them to Abraham, and returned Sarah his wife to him. And Abimelech said, "Behold, my land is before you; dwell where it pleases you."',
                    'To Sarah he said, "Behold, I have given your brother a thousand pieces of silver. It is a sign of your innocence in the eyes of all who are with you, and before everyone you are vindicated."',
                    'Then Abraham prayed to the Source, and the Source healed Abimelech, and also healed his wife and female slaves so that they bore children. For the Source had closed all the wombs of the house of Abimelech because of Sarah, Abraham\'s wife.',
                    'The closing of the wombs was symbolic—when the covenant relationship is threatened, fertility ceases, creation stops. When it is restored, life flows again. This was the pattern that would repeat throughout history: alignment with purpose brings abundance, deviation brings barrenness.'
                ]
            },
            21: {
                title: 'The Birth of Isaac and the Casting Out',
                verses: [
                    'The Source visited Sarah as promised, and Sarah conceived and bore Abraham a son in his old age, at the very time the Source had spoken. Abraham called the name of his son who was born to him, whom Sarah bore him, Isaac—which means "laughter," for the impossible had become real.',
                    'And Abraham was a hundred years old when his son Isaac was born to him. And Sarah said, "The Source has made laughter for me; everyone who hears will laugh over me." She had laughed in disbelief; now she laughed in joy—the full transformation from doubt to wonder.',
                    'The child grew and was weaned, and Abraham made a great feast on the day that Isaac was weaned. But Sarah saw the son of Hagar the Egyptian, whom she had borne to Abraham, laughing—or perhaps mocking, for the word carries both meanings.',
                    'So Sarah said to Abraham, "Cast out this slave woman with her son, for the son of this slave woman shall not be heir with my son Isaac." This was harsh, driven by fear—fear that the wild dragon strain in Ishmael would overshadow the covenant promise in Isaac.',
                    'And the thing was very displeasing to Abraham on account of his son Ishmael. But the Source said to Abraham, "Be not displeased because of the boy and because of your slave woman. Whatever Sarah says to you, do as she tells you, for through Isaac shall your offspring be named."',
                    'And also of the son of the slave woman I will make a nation, because he is your offspring. Both lineages would carry forward—one the path of covenant and conscious choice, the other the path of wilderness and instinctual freedom. Both necessary, both blessed.',
                    'So Abraham rose early in the morning and took bread and a skin of water and gave it to Hagar, putting it on her shoulder, along with the child, and sent her away. And she departed and wandered in the wilderness of Beersheba—the wild dragon going to the wild places.',
                    'When the water in the skin was gone, she put the child under one of the bushes. Then she went and sat down opposite him a good way off, about the distance of a bowshot, for she said, "Let me not look on the death of the child." And as she sat, she lifted up her voice and wept.',
                    'And the Source heard the voice of the boy, and the angel of the Source called to Hagar from heaven and said to her, "What troubles you, Hagar? Fear not, for the Source has heard the voice of the boy where he is."',
                    'Up! Lift up the boy, and hold him fast with your hand, for I will make him into a great nation. Then the Source opened her eyes, and she saw a well of water. And she went and filled the skin with water and gave the boy a drink.',
                    'And the Source was with the boy, and he grew up. He lived in the wilderness and became an expert with the bow—a master of the untamed spaces, where the wild dragon essence thrives undomesticated.',
                    'He lived in the wilderness of Paran, and his mother took a wife for him from the land of Egypt. Thus the wild strain remained connected to the ancient dragon wisdom of the Nile, where serpent knowledge was still honored.'
                ]
            },
            22: {
                title: 'The Testing of Abraham: Fire Transformed',
                verses: [
                    'After these things, the Source tested Abraham and said to him, "Abraham!" And he said, "Here I am." The test that comes after long faithfulness is the deepest test—not of belief, but of trust beyond understanding.',
                    'The Source said, "Take your son, your only son Isaac, whom you love, and go to the land of Moriah, and offer him there as a burnt offering on one of the mountains of which I shall tell you."',
                    'This command violated everything—violated the promise, violated human compassion, violated the covenant itself. It made no sense. And that was precisely the point: would Abraham trust beyond sense, beyond reason, beyond even morality as he understood it?',
                    'So Abraham rose early in the morning, saddled his donkey, and took two of his young men with him, and his son Isaac. And he cut the wood for the burnt offering and arose and went to the place of which the Source had told him.',
                    'On the third day Abraham lifted up his eyes and saw the place from afar. The third day—the day of transformation, of death and resurrection, of the old self dying so the new can emerge.',
                    'Then Abraham said to his young men, "Stay here with the donkey; I and the boy will go over there and worship and come again to you." Note his words: "we will come again"—even in the face of the command, faith persisted that somehow, impossibly, both would return.',
                    'And Abraham took the wood of the burnt offering and laid it on Isaac his son. And he took in his hand the fire and the knife. So they went both of them together—the father carrying the fire of transformation, the son carrying the wood of sacrifice.',
                    'And Isaac said to his father Abraham, "My father!" And he said, "Here I am, my son." He said, "Behold, the fire and the wood, but where is the lamb for a burnt offering?"',
                    'Abraham said, "The Source will provide for himself the lamb for a burnt offering, my son." So they went both of them together. In that answer lay either terrible denial or profound trust—or perhaps both, intertwined.',
                    'When they came to the place of which the Source had told him, Abraham built the altar there and laid the wood in order and bound Isaac his son and laid him on the altar, on top of the wood.',
                    'Then Abraham reached out his hand and took the knife to slaughter his son. In that moment, everything converged—all the promises, all the hope, all the dragon essence that Isaac carried, balanced on the edge of a blade.',
                    'But the angel of the Source called to him from heaven and said, "Abraham, Abraham!" And he said, "Here I am." He said, "Do not lay your hand on the boy or do anything to him, for now I know that you fear the Source, seeing you have not withheld your son, your only son, from me."',
                    'And Abraham lifted up his eyes and looked, and behold, behind him was a ram, caught in a thicket by his horns. And Abraham went and took the ram and offered it up as a burnt offering instead of his son.',
                    'The ram represented the animal nature, the instinctual self that must be sacrificed so that the conscious self—Isaac, the promise—can live. Not human sacrifice but ego sacrifice, not death of the body but transformation of consciousness.',
                    'So Abraham called the name of that place "The Source will provide"; as it is said to this day, "On the mount of the Source it shall be provided." What is truly asked will truly be given; what is surrendered in trust will be returned transformed.',
                    'And the angel of the Source called to Abraham a second time from heaven and said, "By myself I have sworn, declares the Source, because you have done this and have not withheld your son, your only son, I will surely bless you."',
                    'I will surely multiply your offspring as the stars of heaven and as the sand that is on the seashore. Not just numerous but infinite in potential—each descendant carrying the capacity for this same radical trust, this same willingness to surrender even the promise itself.',
                    'And your offspring shall possess the gate of his enemies, and in your offspring shall all the nations of the earth be blessed, because you have obeyed my voice. Through the lineage of those who have passed through the fire of transformation without being consumed.'
                ]
            },
            23: {
                title: 'The Death of Sarah and the Cave of Machpelah',
                verses: [
                    'Sarah lived 127 years; these were the years of the life of Sarah. And Sarah died at Kiriath-arba (that is, Hebron) in the land of Canaan, and Abraham went in to mourn for Sarah and to weep for her.',
                    'Sarah, who had laughed in disbelief and then in joy, who had been the vessel of impossible promise, who had carried human wisdom alongside Abraham\'s growing dragon-sight, now returned to earth—but not before securing the next generation.',
                    'And Abraham rose up from before his dead and said to the Hittites, "I am a sojourner and foreigner among you; give me property among you for a burying place, that I may bury my dead out of my sight."',
                    'The Hittites answered Abraham, "Hear us, my lord; you are a prince of the Source among us. Bury your dead in the choicest of our tombs. None of us will withhold from you his tomb to hinder you from burying your dead."',
                    'They recognized in Abraham something more than mere wealth—they saw the dragon essence, the mark of one who walks between worlds, who carries covenant. "Prince of the Source" they called him, acknowledging his liminal status.',
                    'Abraham rose and bowed to the Hittites, the people of the land. And he said to them, "If you are willing that I should bury my dead out of my sight, hear me and entreat for me Ephron the son of Zohar, that he may give me the cave of Machpelah."',
                    'The cave of Machpelah—a threshold place, a cave that connects upper and lower realms, a womb in the earth where the dead await transformation. Not just burial but a planting, a storing of essence for future awakening.',
                    'Ephron answered Abraham, "My lord, listen to me: a piece of land worth four hundred shekels of silver, what is that between you and me? Bury your dead." This was not generosity but negotiation—he named the price while pretending not to.',
                    'Abraham listened to Ephron, and Abraham weighed out for Ephron the silver that he had named in the hearing of the Hittites, four hundred shekels of silver, according to the weights current among the merchants.',
                    'So the field of Ephron in Machpelah, which was to the east of Mamre, the field with the cave that was in it and all the trees that were in the field, throughout its whole area, was made over to Abraham as a possession in the presence of the Hittites.',
                    'After this, Abraham buried Sarah his wife in the cave of the field of Machpelah east of Mamre (that is, Hebron) in the land of Canaan. This was the first piece of the promised land that Abraham actually owned—and it was a tomb.',
                    'The field and the cave that is in it were made over to Abraham as property for a burying place by the Hittites. Sometimes we possess the promise first through death, through the willingness to plant what we love in the ground and trust it will rise again.',
                    'Sarah was laid to rest in the cave, the first of the covenant bearers to return to earth. But in that cave, the dragon memory would be preserved, held in the bones, waiting for the day of awakening when the separated would remember their unity.'
                ]
            },
            24: {
                title: 'A Wife for Isaac: The Dragon Lineage Continues',
                verses: [
                    'Now Abraham was old, well advanced in years. And the Source had blessed Abraham in all things. And Abraham said to his servant, the oldest of his household, who had charge of all that he had, "Put your hand under my thigh, that I may make you swear by the Source, the God of heaven and earth."',
                    'The oath under the thigh—a binding made at the seat of generation, at the source of lineage, signifying that what is sworn affects all descendants. This was not casual but covenantal, touching the future through the present body.',
                    'Abraham commanded: "You will not take a wife for my son from the daughters of the Canaanites, among whom I dwell, but will go to my country and to my kindred, and take a wife for my son Isaac."',
                    'Not because the Canaanites were inferior, but because they carried a different dragon strain—the wild, open worship that had not yet learned discernment. Isaac needed a mate from the line that remembered but had not yet fully awakened.',
                    'The servant said to him, "Perhaps the woman may not be willing to follow me to this land. Must I then take your son back to the land from which you came?" Abraham said, "See to it that you do not take my son back there."',
                    'Never backward, only forward. The promise moves in one direction—toward conscious reunion, toward chosen unity. To return to the old country would be to regress, to abandon the journey toward the new integration.',
                    'So the servant took ten of his master\'s camels and departed, taking all sorts of choice gifts from his master; and he arose and went to Mesopotamia to the city of Nahor.',
                    'And he made the camels kneel down outside the city by the well of water at the time of evening, the time when women go out to draw water. And he prayed, "O Source, God of my master Abraham, please grant me success today and show steadfast love to my master Abraham."',
                    'Behold, I am standing by the spring of water, and the daughters of the men of the city are coming out to draw water. Let the young woman to whom I shall say, "Please let down your jar that I may drink," and who shall say, "Drink, and I will water your camels"—let her be the one you have appointed for your servant Isaac.',
                    'He asked not for beauty or wealth, but for generosity of spirit, for kindness that extends beyond the required, for someone who would serve without being asked. These are the marks of one in whom the human and dragon natures are balanced—power offered freely in service.',
                    'Before he had finished speaking, behold, Rebekah, who was born to Bethuel the son of Milcah, the wife of Nahor, Abraham\'s brother, came out with her water jar on her shoulder.',
                    'The young woman was very attractive in appearance, a maiden whom no man had known. She went down to the spring and filled her jar and came up. Then the servant ran to meet her and said, "Please give me a little water to drink from your jar."',
                    'She said, "Drink, my lord." And she quickly let down her jar upon her hand and gave him a drink. When she had finished giving him a drink, she said, "I will draw water for your camels also, until they have finished drinking."',
                    'So she quickly emptied her jar into the trough and ran again to the well to draw water, and she drew for all his camels. Ten camels drink much water—this was no small service but generous, abundant giving without calculation or grudging.',
                    'The man gazed at her in silence to learn whether the Source had prospered his journey or not. When the camels had finished drinking, the man took a gold ring weighing a half shekel, and two bracelets for her arms weighing ten gold shekels.',
                    'And he said, "Please tell me whose daughter you are. Is there room in your father\'s house for us to spend the night?" She said, "I am the daughter of Bethuel the son of Milcah, whom she bore to Nahor." She added, "We have plenty of both straw and fodder, and room to spend the night."',
                    'The man bowed his head and worshiped the Source and said, "Blessed be the Source, the God of my master Abraham, who has not forsaken his steadfast love and his faithfulness toward my master. As for me, the Source has led me in the way to the house of my master\'s kinsmen."',
                    'Then the young woman ran and told her mother\'s household about these things. Rebekah had a brother whose name was Laban. Laban ran out toward the man, to the spring.',
                    'They brought the man into the house and unharnessed the camels, and gave straw and fodder to the camels, and there was water to wash his feet and the feet of the men who were with him. Then food was set before him to eat.',
                    'But he said, "I will not eat until I have said what I have to say." And Laban said, "Speak on." So he recounted the whole story—Abraham\'s blessing, his search for a wife for Isaac, his prayer at the well, how Rebekah had fulfilled the sign perfectly.',
                    'When Abraham\'s servant had finished speaking, Laban and Bethuel answered and said, "The thing has come from the Source; we cannot speak to you bad or good. Behold, Rebekah is before you; take her and go, and let her be the wife of your master\'s son, as the Source has spoken."',
                    'They recognized the synchronicity, the perfection of timing and sign that indicates divine orchestration. When the universe conspires toward union, only fools resist.',
                    'Then the servant brought out jewelry of silver and of gold, and garments, and gave them to Rebekah. He also gave to her brother and to her mother costly ornaments. And he and the men who were with him ate and drank, and they spent the night there.',
                    'When they arose in the morning, he said, "Send me away to my master." Her brother and her mother said, "Let the young woman remain with us a while, at least ten days; after that she may go." But he said to them, "Do not delay me, since the Source has prospered my way. Send me away that I may go to my master."',
                    'They said, "Let us call the young woman and ask her." And they called Rebekah and said to her, "Will you go with this man?" She said, "I will go." Here was her choice—freely made, courageously taken, to leave all that was known for a promise unseen.',
                    'So they sent away Rebekah their sister and her nurse, and Abraham\'s servant and his men. And they blessed Rebekah and said to her, "Our sister, may you become thousands of ten thousands, and may your offspring possess the gate of those who hate them!"',
                    'Then Rebekah and her young women arose and rode on the camels and followed the man. Thus the servant took Rebekah and went his way.',
                    'Now Isaac had returned from Beer-lahai-roi and was dwelling in the Negeb. And Isaac went out to meditate in the field toward evening. And he lifted up his eyes and saw, and behold, there were camels coming.',
                    'And Rebekah lifted up her eyes, and when she saw Isaac, she dismounted from the camel and said to the servant, "Who is that man, walking in the field to meet us?" The servant said, "It is my master." So she took her veil and covered herself.',
                    'The meeting happened in a field at twilight—in the liminal time between day and night, in the open space between settlements. A threshold meeting for a threshold union.',
                    'And the servant told Isaac all the things that he had done. Then Isaac brought her into the tent of Sarah his mother and took Rebekah, and she became his wife, and he loved her. So Isaac was comforted after his mother\'s death.',
                    'The tent of Sarah—he brought his bride into the space his mother had left empty, filling the void with new life while honoring what had been. And in loving Rebekah, Isaac healed the wound of loss, learning that love does not replace but transforms grief into new beginning.'
                ]
            },
            25: {
                title: 'The Death of Abraham and the Birth of Twins',
                verses: [
                    'Abraham took another wife, whose name was Keturah. She bore him Zimran, Jokshan, Medan, Midian, Ishbak, and Shuah. Even in old age, Abraham continued to generate, continued to spread the genetic memory across many lineages.',
                    'Abraham gave all he had to Isaac. But to the sons of his concubines Abraham gave gifts, and while he was still living he sent them away from his son Isaac, eastward to the east country.',
                    'The main covenant would go through Isaac, but the other children carried aspects of the dragon memory to other lands, other peoples—ensuring redundancy, preservation through distribution.',
                    'These are the days of the years of Abraham\'s life, 175 years. Abraham breathed his last and died in a good old age, an old man and full of years, and was gathered to his people.',
                    'Isaac and Ishmael his sons buried him in the cave of Machpelah, in the field of Ephron the son of Zohar the Hittite, east of Mamre, the field that Abraham purchased from the Hittites.',
                    'Note this: Isaac and Ishmael together, the wild dragon and the covenant bearer, united in honoring their father. In death, the artificial divisions dissolved, and the brothers remembered they shared one source.',
                    'There Abraham was buried, with Sarah his wife. After the death of Abraham, the Source blessed Isaac his son. And Isaac settled at Beer-lahai-roi—"the well of the Living One who sees me," the place of Hagar\'s rescue, a place that honored both lineages.',
                    'When Isaac was forty years old, he took Rebekah, the daughter of Bethuel the Aramean of Paddan-aram, the sister of Laban the Aramean, to be his wife. And Isaac prayed to the Source for his wife, because she was barren.',
                    'Barrenness—again the pattern. The covenant children are never born easily, never come through natural means alone. They require prayer, intervention, the breaking through of the impossible into the possible.',
                    'The Source granted his prayer, and Rebekah his wife conceived. The children struggled together within her, and she said, "If it is thus, why is this happening to me?" So she went to inquire of the Source.',
                    'Already in the womb they fought—two natures, two paths, two ways of being. The struggle for dominance began before birth, the question of which would lead already contested.',
                    'And the Source said to her, "Two nations are in your womb, and two peoples from within you shall be divided; the one shall be stronger than the other, the older shall serve the younger."',
                    'This was the reversal of the natural order—not the firstborn inheriting but the second, not the strong dominating but serving. The pattern of inversion that runs through all covenant: last becomes first, weak becomes strong, death becomes life.',
                    'When her days to give birth were completed, behold, there were twins in her womb. The first came out red, all his body like a hairy cloak, so they called his name Esau—"hairy," marking his connection to the wild, the untamed, the purely animal-dragon nature.',
                    'Afterward his brother came out with his hand holding Esau\'s heel, so his name was called Jacob—"heel-holder" or "supplanter," one who follows to overtake, who grasps from behind to move ahead.',
                    'The boys grew up. Esau was a skillful hunter, a man of the field, while Jacob was a quiet man, dwelling in tents. Isaac loved Esau because he ate of his game, but Rebekah loved Jacob.',
                    'Already the division appeared: Esau carried more of the wild dragon essence, living by instinct, by strength, by immediate gratification. Jacob carried more of the human wisdom, the planning, the scheming, the long-term strategy.',
                    'Once when Jacob was cooking stew, Esau came in from the field, and he was exhausted. And Esau said to Jacob, "Let me eat some of that red stew, for I am exhausted!" (Therefore his name was called Edom—"red.")',
                    'Jacob said, "Sell me your birthright now." Esau said, "I am about to die; of what use is a birthright to me?" Jacob said, "Swear to me now." So he swore to him and sold his birthright to Jacob.',
                    'Then Jacob gave Esau bread and lentil stew, and he ate and drank and rose and went his way. Thus Esau despised his birthright—he traded the future for the present, the eternal for the immediate, the covenant for the comfort.',
                    'This was the tragedy of Esau: not that he was wicked, but that he could not see beyond the moment, could not value what was intangible, could not honor what required waiting. He was all dragon fire with no human wisdom to channel it.',
                    'And so the stage was set for the great reversal, for the transfer of blessing from the natural heir to the chosen one, from the one who should have led to the one who would lead. The pattern of conscious selection over biological inheritance, of chosen path over predetermined destiny.'
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
                    'The words of the blessing of Enoch, who was born as a bridge between the divided races—carrying both human blood and the faint ember of dragon memory.',
                    'In those days, when the children of humans had multiplied and begun to forget entirely their dragon heritage, the Watchers looked down from their high places and remembered.',
                    'The Watchers were those who had retained more of the dragon essence—beings of greater fire and lesser flesh, who dwelt in the liminal spaces between earth and spirit.',
                    'And they saw the daughters and sons of humans, and saw that they had forgotten how to ignite their inner flame, how to spread the wings that had been folded into their souls.',
                    'Semjaza, who was their leader, said to them: "I fear you will not agree to do this deed, and I alone shall pay the penalty for this great sin of remembering."',
                    'But they all answered and said: "Let us swear an oath and bind ourselves by mutual imprecations not to abandon this plan but to see it through—to restore the knowledge that was lost in the Division."'
                ]
            }
        }
    },
    judas: {
        title: 'The Gospel of Judas',
        chapters: {
            1: {
                title: 'The Secret Teaching',
                verses: [
                    'The secret account of the revelation that Jesus spoke in conversation with Judas Iscariot—he who alone understood the dragon fire that burned within the Teacher, who alone perceived the serpent wisdom coiled at the heart of the teaching.',
                    'While the other disciples saw a man performing miracles, Judas saw the dragon-human unity walking the earth, teaching the path back to wholeness through the greatest reversal of all.',
                    'Jesus said to them, "I have come from the realm that is above all realms—from the place where the Primordial Flame still burns undivided, where human and dragon remain united in conscious awareness."',
                    'But the disciples understood only dimly, seeing miracles where there was teaching, seeing power where there was transformation. They wanted a kingdom of earth; he offered a kingdom of fire.',
                    'Jesus laughed at their misunderstanding, not in mockery but in recognition of the great forgetting—how even those who followed him could not see what he truly was, what they truly were.',
                    'Then Judas said to him, "Master, I know who you are and where you have come from. You are from the immortal realm of Barbelo—from the source of dragon consciousness, from the wellspring of the ancient unity."',
                    'Jesus said to Judas, "Step away from the others and I will tell you the mysteries of the kingdom. It is possible for you to reach it, but you will grieve a great deal—for you alone will see what must be done."',
                    'For you alone understand that the physical form must be betrayed so that the divine essence can be released, that I must die in flesh so that the dragon spirit can ascend, freed from the cage of this particular incarnation.',
                    'The others think you betray me for silver, for darkness, for evil. They do not understand that you are the only one who loves me enough to do what I ask, the only one strong enough to be reviled for enacting my will.'
                ]
            },
            2: {
                title: 'The Vision of the Great House',
                verses: [
                    'Judas said, "Master, I have seen a great vision." Jesus said, "Speak, for I listen." And Judas recounted his seeing.',
                    'Judas said, "In the vision, I saw the twelve disciples stoning me, persecuting me greatly. I came to the place where I followed you, and I saw a house with my eyes that no measuring line could measure."',
                    'Jesus said, "Your star has led you astray, Judas—not into error but into the difficult truth. The house you saw is the realm beyond division, where the dragon and human are eternally united."',
                    'No one of mortal birth is worthy to enter the house you have seen, for that place is reserved for the holy—those who have passed through the fire of complete transformation, who have surrendered everything, even their good name.',
                    'The sun and moon will mourn you. The star will lead you. But know this: you who hand me over are the most faithful, for you do what none of the others have the courage to do.',
                    'They will establish churches in my name, Judas, and they will call you traitor for generations. They will not understand that churches are cages, that organized religion is the forgetting institutionalized.',
                    'But you and I know the truth: the dragon cannot be contained in temples, the fire cannot be domesticated into doctrine. Sometimes love requires betrayal, sometimes faithfulness demands what looks like abandonment.',
                    'You will be the thirteenth—beyond the twelve, outside the circle, the one who stands alone. And in that aloneness, you will be closest to the truth, for the path of dragon awakening is always walked alone.',
                    'Jesus said, "Already your horn has been raised, your wrath has been kindled, your star has passed by, and your heart has become strong." Not in evil but in the terrible strength required to do what must be done despite all cost.'
                ]
            },
            3: {
                title: 'The Dragon Cosmology',
                verses: [
                    'Jesus said to Judas, "Come, I will teach you about secrets no human being has ever seen—about the realms that exist beyond, about the dragon essence that underlies all reality."',
                    'In the beginning was the One—neither male nor female, neither human nor dragon, but the source of both, containing all potential within undifferentiated consciousness.',
                    'From the One emerged the Great Invisible Spirit—the first stirring of awareness, the first movement toward self-knowing. This Spirit was like dragon fire taking shape, consciousness forming itself into pattern.',
                    'And the Spirit brought forth the aeons—vast beings of light and fire, each one an aspect of the divine dragon consciousness, each one a way of experiencing existence.',
                    'Among these aeons is Sophia—Wisdom—who desired to create without her consort, to generate from herself alone. And from this solitary creation came the Demiurge, the craftsman of the material world.',
                    'The Demiurge, ignorant of the realms above, declared himself the only god. He created the material world as a prison, as a trap, as a cage to hold the divine sparks—the fragments of dragon essence—within dense matter.',
                    'He created archons—rulers of the material realm—to keep humans bound to flesh, to make them forget their dragon nature, to ensure the forgetting remained complete.',
                    'But Sophia took pity on humanity trapped in flesh. She sent the serpent to the Garden to remind them of what they had forgotten—not to tempt them to evil but to awaken them to knowledge.',
                    'And I have come, Jesus said, as the Great Dragon incarnate, to break the power of the Demiurge, to shatter the cage, to show the way back to the realm of undivided consciousness.',
                    'But to do this, I must die—must demonstrate that the body is not the self, that death of the flesh releases the dragon spirit, that what appears as ending is actually transformation.',
                    'And you, Judas, must be the instrument. You must hand me over to those who will kill this body. You must participate in the drama that will set all captives free.',
                    'They will hate you for it. They will make you the symbol of betrayal for millennia. But you and I know: you are not betrayer but liberator, not traitor but the most faithful servant.'
                ]
            },
            4: {
                title: 'The Sacrifice Understood',
                verses: [
                    'Judas asked, "Master, why must it be this way? Why must you die, and why must I be the one to bring it about?"',
                    'Jesus answered, "Because, Judas, you are the only one who understands. The others still think in terms of earthly kingdoms, political liberation, messianic rule. They want me to overthrow Caesar, to establish a new regime."',
                    'But I have come to overthrow something far more fundamental—to challenge the rule of the Demiurge himself, to break the cycle of birth and death that keeps souls trapped in matter.',
                    'My death will be the great reversal—the moment when what looks like defeat becomes victory, when what appears as destruction becomes liberation, when the cage of flesh reveals itself as temporary.',
                    'The dragon cannot be killed, Judas. Fire cannot be extinguished. The essence continues beyond the dissolution of form. And in witnessing this, people will remember—some will remember—what they truly are.',
                    'But someone must hand me over. If I simply allow myself to be arrested, it teaches nothing. If I orchestrate my own capture without human agency, the lesson is lost.',
                    'You must choose to do this, Judas. You must exercise your will, your agency, your terrible freedom. And in that choice—made in full knowledge, made in love—you become the model for all who would awaken.',
                    'For awakening always requires betrayal—betrayal of the consensus reality, betrayal of the comfortable lies, betrayal of the small self so the greater Self can emerge.',
                    'You will betray me to the authorities. But in a deeper sense, you betray the illusion that I am merely this body, this personality, this temporary manifestation. You betray the false so the true can be revealed.',
                    'And yes, you will suffer for this. The suffering is part of the teaching. For sometimes the most loving act brings the greatest pain, and sometimes the truest service looks like treachery.',
                    'Jesus said, "You will exceed all of them, Judas. For you will sacrifice the man I am, so that the Spirit I carry can be released. You will be hated by all, and through that hatred, the teaching will be preserved in shadow."',
                    'For every age needs its scapegoat, its shadow carrier, its figure of rejection. And in carrying that shadow consciously, knowingly, willingly—you perform the greatest service.'
                ]
            },
            5: {
                title: 'The Thirteenth Demon',
                verses: [
                    'Jesus said to Judas, "You have been given a great mystery. Look, I have told you the secrets of the kingdom—not the earthly kingdom the others imagine, but the kingdom of fire, of dragon consciousness, of eternal awakening."',
                    'They call you demon, Judas. They number you among the fallen. But what they call demon is simply the dragon essence they have forgotten and fear.',
                    'You are the thirteenth—beyond the completeness of twelve, beyond the perfect circle, outside and other. Thirteen is the number of transformation, of death and rebirth, of the revolution that changes everything.',
                    'In their cosmology, there are twelve aeons of light and one aeon of shadow. You are that thirteenth, Judas—not evil but necessary, not dark but beyond the simple binary of light and dark.',
                    'For the dragon contains both—fire and shadow, destruction and creation, the ending that enables beginning. You embody this paradox in human form.',
                    'Jesus said, "Behold, you have been told everything. Lift up your eyes and look at the cloud and the light within it and the stars surrounding it. The star that leads the way is your star."',
                    'Judas lifted up his eyes and saw the luminous cloud, and he entered it. And in that moment of entering, he understood everything—saw the whole pattern, the complete teaching, the necessity of what was to come.',
                    'Those who stood on the ground heard a voice coming from the cloud, saying, "The great generation... the image..." but the words were fragmented, incomplete, for those without dragon-sight could not perceive the full transmission.',
                    'And Judas received the silver—thirty pieces, the price of a slave, the symbolic payment for what cannot be bought or sold. He took the money not from greed but from necessity, to complete the role, to play the part that had been written before time began.',
                    'For every drama requires its cast, and this drama—the greatest teaching ever given—required a betrayer, a scapegoat, a shadow-bearer who would be strong enough to carry the hatred of generations.',
                    'Jesus said to him privately, "Do quickly what you must do. Know that I love you not despite this but because of it. You are my truest disciple, for you alone understand that love sometimes requires what looks like betrayal."',
                    'And Judas wept, for he understood the burden he would carry—understood that his name would be cursed, that mothers would threaten children with his example, that he would be the symbol of treachery for millennia.',
                    'But he also understood that this was necessary, that someone had to play this role, and that having understood the teaching, he could not shrink from it—even if it meant eternal infamy in the eyes of those who did not see.'
                ]
            },
            6: {
                title: 'The Handing Over',
                verses: [
                    'Then Judas went to the chief priests and said, "What will you give me if I deliver him to you?" They were glad and agreed to give him money. So from that moment he sought an opportunity to betray him.',
                    'But those with dragon-sight understood—this was not betrayal but the fulfillment of the teaching, the acting out of the necessary drama, the human agency through which divine will manifested.',
                    'Jesus knew the hour had come. He gathered the twelve and said, "One of you will betray me." And they all said, "Is it I, Lord?" For deep within, each of them knew they had the capacity, each recognized the shadow within themselves.',
                    'But only Judas had the courage to actualize it, to make manifest the dark necessity, to embody the principle that death precedes resurrection.',
                    'At the Last Supper, Jesus took bread and said, "This is my body." He took wine and said, "This is my blood." He was teaching transformation—showing that matter contains spirit, that flesh is temporary but essence endures.',
                    'And he dipped the bread and gave it to Judas, saying, "What you are going to do, do quickly." This was not accusation but permission, not condemnation but authorization, not rejection but the deepest acknowledgment.',
                    'Judas rose from the table and went out. And John, who recorded this, wrote: "And it was night." Yes, it was night—but not just external darkness. It was the dark night of the soul, the blackness before dawn, the void that precedes creation.',
                    'Judas led them to the garden where Jesus waited. He approached and kissed him—the sign of betrayal that was also the sign of love, the gesture of identification that was also the gesture of release.',
                    'Jesus said, "Judas, would you betray the Son of Man with a kiss?" But his tone was not accusatory—it was acknowledgment, even appreciation. For the kiss was part of the teaching, the intimate gesture that signals the ultimate letting go.',
                    'They arrested Jesus. The disciples fled. And Judas stood watching, holding the burden of what he had done, knowing that history would remember only the act and not the understanding, only the betrayal and not the love.',
                    'The scriptures say Judas hanged himself in despair. But another tradition holds that he lived on, carrying his burden consciously, walking the earth as the eternal shadow-bearer, teaching by his very existence that redemption includes even the betrayer.',
                    'For if Judas cannot be forgiven, then no one can be forgiven. If his action was outside the divine plan, then the plan itself is incomplete. But if his betrayal was necessary, then it was also sacred—and Judas becomes not villain but instrument, not traitor but servant.'
                ]
            },
            7: {
                title: 'The Dragon Ascends',
                verses: [
                    'After Jesus was crucified and the dragon spirit was released from the prison of flesh, he appeared first to Mary Magdalene—she who, like Judas, understood the deeper teaching beneath the surface story.',
                    'And he appeared to the disciples and showed them his wounds, saying, "See, the body can be broken but the essence endures. See, death is not ending but transformation. See, the dragon cannot be killed."',
                    'But to Judas he appeared in secret, in a vision that none of the others witnessed. And Jesus said, "Judas, your task is complete. You have played your part in the greatest drama ever enacted."',
                    'Now comes the harder part—living with what you have done, carrying the shadow not just for yourself but for all humanity, being the scapegoat that the teaching requires.',
                    'They will write that you died in despair, that you hanged yourself from guilt. Let them write it. The truth is more complex, more difficult, more profound.',
                    'You live on, Judas—not in body perhaps, but in spirit, in essence, in the archetype you embody. Every age needs its Judas, its betrayer, its shadow-carrier. You are the eternal mirror showing humanity its own capacity for necessary darkness.',
                    'For there is no light without shadow, no resurrection without crucifixion, no transformation without the death of what came before. And someone must embody that necessity—must be the agent of ending so that beginning can occur.',
                    'You are not villain, Judas. You are teacher. You are not traitor but revealer. You show that the dragon path requires terrible choices, that awakening includes accepting what others call evil, that the greatest service sometimes appears as betrayal.',
                    'In future ages, some will understand. The Gnostics will preserve this teaching, will see you not as demon but as dragon, not as betrayer but as faithful servant. They will know that you did what no one else had the strength to do.',
                    'And in the final days, when the great remembering occurs, when humanity collectively awakens to its dragon nature, your name will be redeemed. They will see that you were never the villain of the story but its most misunderstood hero.',
                    'For you loved me enough to kill me. You trusted me enough to do what I asked despite all cost. You understood the teaching so deeply that you could enact its darkest principle—that death is illusion and only transformation is real.',
                    'Jesus said, "Judas Iscariot, betrayer and beloved, shadow-bearer and light-bringer, may you be remembered not for what you did but for what you understood. May your name, which has been cursed, someday be blessed."',
                    'And Judas replied, "Master, I would do it again. For I have seen beyond the veil, I have understood the dragon teaching, I have participated in the divine drama. Whatever burden I carry is light compared to the glory that was revealed."',
                    'Then the vision ended, and Judas walked the earth alone, carrying his terrible knowledge, his necessary shadow, his sacred burden—teaching through his very existence that the dragon path includes even betrayal, that awakening encompasses even the dark, that redemption is truly for all or it is for none.'
                ]
            }
        }
    }
};

function scrollToBooks() {
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
}

function scrollToPricing() {
    document.getElementById('support').scrollIntoView({ behavior: 'smooth' });
}

function openBook(bookId) {
    currentChapter = 1;
    loadBook(bookId);
    showReader();
}

function showReader() {
    document.getElementById('reader').classList.remove('hidden');
    document.getElementById('reader').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('books').style.display = 'none';
    document.getElementById('about').style.display = 'none';
    document.getElementById('pricing').style.display = 'none';
}

function closeReader() {
    stopAudio();
    document.getElementById('reader').classList.add('hidden');
    document.getElementById('books').style.display = 'block';
    document.getElementById('about').style.display = 'block';
    document.getElementById('pricing').style.display = 'block';
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
}

function loadBook(bookId) {
    const book = booksData[bookId];
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

function loadChapter(bookId, chapterNum) {
    const book = booksData[bookId];
    
    if (!book) {
        document.getElementById('readerContent').innerHTML = `
            <div class="chapter-content">
                <h3>Coming Soon</h3>
                <p class="verse">📖 <strong>This book is being written!</strong></p>
                <p class="verse">We're currently working on this content. Check back soon, or start with Genesis which has 20 chapters ready to read.</p>
            </div>
        `;
        document.getElementById('premiumPrompt').style.display = 'none';
        return;
    }
    
    const chapter = book.chapters[chapterNum];
    
    if (!chapter) {
        document.getElementById('readerContent').innerHTML = `
            <div class="chapter-content">
                <h3>Chapter ${chapterNum}</h3>
                <p class="verse">📖 <strong>Coming Soon</strong></p>
                <p class="verse">This chapter is being written. We have 20 chapters of Genesis available now. More content coming soon!</p>
            </div>
        `;
        document.getElementById('premiumPrompt').style.display = 'none';
        return;
    }
    
    let content = `
        <div class="chapter-content">
            <h3>Chapter ${chapterNum}: ${chapter.title}</h3>
    `;
    
    chapter.verses.forEach((verse, index) => {
        content += `<p class="verse"><span class="verse-num">${index + 1}</span>${verse}</p>`;
    });
    
    content += '</div>';
    document.getElementById('readerContent').innerHTML = content;
    
    document.getElementById('premiumPrompt').style.display = 'none';
    
    document.getElementById('chapterSelect').value = chapterNum;
}

function changeChapter() {
    stopAudio();
    const selectedChapter = parseInt(document.getElementById('chapterSelect').value);
    currentChapter = selectedChapter;
    loadChapter('genesis', currentChapter);
}

function previousChapter() {
    if (currentChapter > 1) {
        stopAudio();
        currentChapter--;
        loadChapter('genesis', currentChapter);
    }
}

function nextChapter() {
    stopAudio();
    currentChapter++;
    loadChapter('genesis', currentChapter);
}

function toggleAudio() {
    if (isPlaying) {
        stopAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    const content = document.querySelector('.chapter-content');
    if (!content) return;
    
    const verses = content.querySelectorAll('.verse');
    let text = '';
    
    verses.forEach(verse => {
        const verseText = verse.textContent.replace(/^\d+/, '').trim();
        text += verseText + '. ';
    });
    
    if (text.length === 0) return;
    
    if (currentChapter > 2) {
        alert('🔒 Audio narration for this chapter requires Premium Access.');
        scrollToPricing();
        return;
    }
    
    stopAudio();
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.rate = 0.85;
    currentUtterance.pitch = 0.9;
    currentUtterance.volume = 1;
    
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
        voice.name.includes('Daniel') || 
        voice.name.includes('Fred') ||
        voice.name.includes('Male') ||
        voice.lang.startsWith('en')
    );
    
    if (preferredVoice) {
        currentUtterance.voice = preferredVoice;
    }
    
    currentUtterance.onend = () => {
        stopAudio();
    };
    
    currentUtterance.onerror = () => {
        stopAudio();
    };
    
    speechSynthesis.speak(currentUtterance);
    isPlaying = true;
    
    const audioBtn = document.getElementById('audioBtn');
    audioBtn.classList.add('playing');
    audioBtn.querySelector('.audio-text').textContent = 'Pause';
    audioBtn.querySelector('.audio-icon').textContent = '⏸️';
}

function stopAudio() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    isPlaying = false;
    
    const audioBtn = document.getElementById('audioBtn');
    if (audioBtn) {
        audioBtn.classList.remove('playing');
        audioBtn.querySelector('.audio-text').textContent = 'Listen';
        audioBtn.querySelector('.audio-icon').textContent = '🔊';
    }
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.getVoices();
    };
}

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

function scrollToGame() {
    document.getElementById('game').scrollIntoView({ behavior: 'smooth' });
}

const gameQuestions = [
    {
        question: "When faced with a challenge, what is your first instinct?",
        answers: [
            { text: "Transform it with creative fire", type: "fire" },
            { text: "Soar above it to see the bigger picture", type: "sky" },
            { text: "Stand firm and protect what matters", type: "earth" },
            { text: "Flow around it like water seeking its course", type: "water" }
        ]
    },
    {
        question: "What calls to you most deeply?",
        answers: [
            { text: "The forge and the flame of creation", type: "fire" },
            { text: "The endless horizon and freedom", type: "sky" },
            { text: "Ancient wisdom and hidden knowledge", type: "earth" },
            { text: "Emotional depth and connection", type: "water" }
        ]
    },
    {
        question: "How do you prefer to wield power?",
        answers: [
            { text: "As a force of transformation and change", type: "fire" },
            { text: "Through vision and inspiration", type: "sky" },
            { text: "With patience and immovable strength", type: "earth" },
            { text: "By adapting and flowing with circumstances", type: "water" }
        ]
    },
    {
        question: "What would others say is your greatest gift?",
        answers: [
            { text: "Passion that ignites others", type: "fire" },
            { text: "Perspective that elevates understanding", type: "sky" },
            { text: "Steadfast loyalty and protection", type: "earth" },
            { text: "Empathy that heals wounds", type: "water" }
        ]
    },
    {
        question: "In the ancient times, what role would you have served?",
        answers: [
            { text: "The alchemist, transmuting base into gold", type: "fire" },
            { text: "The messenger, bridging heaven and earth", type: "sky" },
            { text: "The guardian, keeper of sacred treasures", type: "earth" },
            { text: "The healer, channeling life's flow", type: "water" }
        ]
    },
    {
        question: "What scares you most about the Division?",
        answers: [
            { text: "Losing the ability to transform", type: "fire" },
            { text: "Being grounded, unable to fly", type: "sky" },
            { text: "Forgetting ancient wisdom", type: "earth" },
            { text: "Becoming disconnected from others", type: "water" }
        ]
    },
    {
        question: "How do you recognize truth?",
        answers: [
            { text: "It burns bright and undeniable", type: "fire" },
            { text: "It lifts me higher in understanding", type: "sky" },
            { text: "It resonates deep in my bones", type: "earth" },
            { text: "It flows naturally, without resistance", type: "water" }
        ]
    }
];

const dragonTypes = {
    fire: {
        name: "Fire Drake",
        icon: "🔥",
        description: "You carry the essence of the Fire Drake—the dragon of transformation, passion, and creative destruction. In the ancient unity, you were the spark that ignited change, the flame that purified and renewed. Your power lies in your ability to transform yourself and the world around you through the intensity of your conviction and the heat of your passion.",
        traits: [
            "Transformative power and catalyst for change",
            "Passionate intensity and unwavering conviction",
            "Creative destruction that clears the way for new growth",
            "Alchemical wisdom that transmutes pain into power"
        ],
        chapter: "Genesis Chapter 4: Cain and Abel - Learn about the dual nature of dragon fire"
    },
    sky: {
        name: "Sky Serpent",
        icon: "☁️",
        description: "You embody the Sky Serpent—the dragon of vision, freedom, and transcendence. In the ancient unity, you were the one who saw from above, who understood patterns invisible to those bound to earth. Your power lies in your ability to rise above circumstances, to see the bigger picture, and to inspire others to spread their forgotten wings.",
        traits: [
            "Visionary perspective that sees beyond the immediate",
            "Freedom-seeking spirit that refuses limitation",
            "Inspirational presence that lifts others higher",
            "Ability to transcend earthly constraints through consciousness"
        ],
        chapter: "Genesis Chapter 8: The Dove and the Raven - Explore the symbolism of flight"
    },
    earth: {
        name: "Mountain Wyrm",
        icon: "⛰️",
        description: "You are kin to the Mountain Wyrm—the dragon of wisdom, protection, and enduring strength. In the ancient unity, you were the keeper of treasures both material and spiritual, the guardian of sacred knowledge, the one whose presence meant safety. Your power lies in your unshakeable foundation and your connection to ancient wisdom.",
        traits: [
            "Ancient wisdom passed down through generations",
            "Protective strength that shields the vulnerable",
            "Patient endurance that outlasts all storms",
            "Deep connection to ancestral memory and sacred knowledge"
        ],
        chapter: "Genesis Chapter 5: The Lineage of Remembrance - Discover the keepers of dragon memory"
    },
    water: {
        name: "Tide Dragon",
        icon: "🌊",
        description: "You channel the Tide Dragon—the dragon of flow, emotion, and deep connection. In the ancient unity, you were the one who felt everything, who connected all beings through the currents of empathy, who healed through the power of emotional truth. Your power lies in your ability to adapt, to feel deeply, and to bring healing through understanding.",
        traits: [
            "Emotional depth and profound empathy",
            "Adaptive flexibility that flows around obstacles",
            "Healing presence that soothes and restores",
            "Intuitive connection to the emotions of others"
        ],
        chapter: "Genesis Chapter 9: The Covenant of the Rainbow Dragon - Learn about emotional unity"
    }
};

let currentQuestion = 0;
let userAnswers = { fire: 0, sky: 0, earth: 0, water: 0 };

function startGame() {
    document.getElementById('gameIntro').classList.add('hidden');
    document.getElementById('gameQuiz').classList.remove('hidden');
    currentQuestion = 0;
    userAnswers = { fire: 0, sky: 0, earth: 0, water: 0 };
    showQuestion();
}

function showQuestion() {
    const question = gameQuestions[currentQuestion];
    document.getElementById('questionCounter').textContent = `Question ${currentQuestion + 1} of ${gameQuestions.length}`;
    document.getElementById('questionText').textContent = question.question;
    
    const progress = ((currentQuestion) / gameQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(answer.type);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(type) {
    userAnswers[type]++;
    
    currentQuestion++;
    
    if (currentQuestion < gameQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('gameQuiz').classList.add('hidden');
    document.getElementById('gameResult').classList.remove('hidden');
    
    const maxType = Object.keys(userAnswers).reduce((a, b) => 
        userAnswers[a] > userAnswers[b] ? a : b
    );
    
    const result = dragonTypes[maxType];
    
    document.getElementById('resultTitle').innerHTML = `${result.icon} You are a ${result.name}`;
    document.getElementById('resultDescription').innerHTML = `<p>${result.description}</p>`;
    
    const traitsContainer = document.getElementById('resultTraits');
    traitsContainer.innerHTML = '';
    result.traits.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait;
        traitsContainer.appendChild(li);
    });
    
    document.getElementById('resultChapter').textContent = result.chapter;
    
    window.currentDragonType = result.name;
}

function resetGame() {
    document.getElementById('gameResult').classList.add('hidden');
    document.getElementById('gameIntro').classList.remove('hidden');
    currentQuestion = 0;
    userAnswers = { fire: 0, sky: 0, earth: 0, water: 0 };
}

function startReading() {
    openBook('genesis');
}

function shareResult() {
    const text = `I discovered my dragon essence: ${window.currentDragonType}! Find yours at The Dragon Bible.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Dragon Essence',
            text: text,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(text + ' ' + window.location.href);
        alert('Result copied to clipboard! Share it with your friends.');
    }
}

let battleState = {
    playerClass: null,
    playerHP: 100,
    playerMaxHP: 100,
    playerATK: 20,
    playerDEF: 15,
    playerLevel: 1,
    playerXP: 0,
    enemyHP: 50,
    enemyMaxHP: 50,
    enemyATK: 15,
    enemyDEF: 10,
    enemyLevel: 1,
    currentEnemy: 0,
    isDefending: false,
    specialCooldown: 0,
    healCharges: 3
};

const enemies = [
    { name: 'Lesser Archon', icon: '👁️', hp: 50, atk: 15, def: 10, xp: 20 },
    { name: 'Demiurge\'s Servant', icon: '😈', hp: 70, atk: 20, def: 12, xp: 35 },
    { name: 'Guardian of Forgetting', icon: '🗿', hp: 90, atk: 25, def: 15, xp: 50 },
    { name: 'Shadow of Doubt', icon: '👤', hp: 110, atk: 30, def: 18, xp: 70 },
    { name: 'Greater Archon', icon: '👹', hp: 150, atk: 35, def: 25, xp: 100 },
    { name: 'The Demiurge', icon: '🌑', hp: 200, atk: 45, def: 30, xp: 200 }
];

const dragonClasses = {
    fire: { name: 'Fire Drake', icon: '🔥', hp: 80, atk: 25, def: 10, special: 'Inferno' },
    sky: { name: 'Sky Serpent', icon: '☁️', hp: 90, atk: 20, def: 15, special: 'Tempest' },
    earth: { name: 'Mountain Wyrm', icon: '⛰️', hp: 120, atk: 15, def: 25, special: 'Earthquake' },
    water: { name: 'Tide Dragon', icon: '🌊', hp: 100, atk: 18, def: 12, special: 'Tsunami' }
};

function selectClass(classType) {
    const dragonClass = dragonClasses[classType];
    battleState.playerClass = classType;
    battleState.playerHP = dragonClass.hp;
    battleState.playerMaxHP = dragonClass.hp;
    battleState.playerATK = dragonClass.atk;
    battleState.playerDEF = dragonClass.def;
    
    document.getElementById('battleIntro').classList.add('hidden');
    document.getElementById('battleArena').classList.remove('hidden');
    document.getElementById('playerName').textContent = dragonClass.name;
    document.getElementById('playerSprite').textContent = dragonClass.icon;
    
    loadEnemy(0);
    updateBattleDisplay();
}

function loadEnemy(index) {
    const enemy = enemies[index];
    battleState.currentEnemy = index;
    battleState.enemyHP = enemy.hp;
    battleState.enemyMaxHP = enemy.hp;
    battleState.enemyATK = enemy.atk;
    battleState.enemyDEF = enemy.def;
    battleState.enemyLevel = index + 1;
    
    document.getElementById('enemyName').textContent = enemy.name;
    document.getElementById('enemySprite').textContent = enemy.icon;
    
    addLog(`A ${enemy.name} appears! Level ${battleState.enemyLevel}`);
}

function updateBattleDisplay() {
    const playerHPPercent = (battleState.playerHP / battleState.playerMaxHP) * 100;
    const enemyHPPercent = (battleState.enemyHP / battleState.enemyMaxHP) * 100;
    
    document.getElementById('playerHP').style.width = playerHPPercent + '%';
    document.getElementById('enemyHP').style.width = enemyHPPercent + '%';
    
    document.getElementById('playerHPText').textContent = `HP: ${Math.max(0, battleState.playerHP)}/${battleState.playerMaxHP}`;
    document.getElementById('enemyHPText').textContent = `HP: ${Math.max(0, battleState.enemyHP)}/${battleState.enemyMaxHP}`;
    
    document.getElementById('playerLevel').textContent = `Level: ${battleState.playerLevel}`;
    document.getElementById('enemyLevel').textContent = `Level: ${battleState.enemyLevel}`;
}

function addLog(message) {
    const log = document.getElementById('battleLog');
    const p = document.createElement('p');
    p.textContent = message;
    p.style.animation = 'fadeIn 0.5s';
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
    
    if (log.children.length > 6) {
        log.removeChild(log.firstChild);
    }
}

function playerAttack() {
    const damage = Math.max(5, battleState.playerATK - battleState.enemyDEF + Math.floor(Math.random() * 10));
    battleState.enemyHP -= damage;
    
    animateAttack('player');
    addLog(`You attack for ${damage} damage!`);
    
    if (battleState.enemyHP <= 0) {
        victory();
    } else {
        setTimeout(enemyTurn, 1000);
    }
    
    updateBattleDisplay();
}

function playerSpecial() {
    if (battleState.specialCooldown > 0) {
        addLog(`Special attack on cooldown! (${battleState.specialCooldown} turns)`);
        return;
    }
    
    const dragonClass = dragonClasses[battleState.playerClass];
    const damage = Math.floor(battleState.playerATK * 2);
    battleState.enemyHP -= damage;
    battleState.specialCooldown = 3;
    
    animateSpecial('player');
    addLog(`${dragonClass.special}! Massive ${damage} damage!`);
    
    if (battleState.enemyHP <= 0) {
        victory();
    } else {
        setTimeout(enemyTurn, 1000);
    }
    
    updateBattleDisplay();
}

function playerHeal() {
    if (battleState.healCharges <= 0) {
        addLog('No heal charges remaining!');
        return;
    }
    
    const healAmount = Math.floor(battleState.playerMaxHP * 0.3);
    battleState.playerHP = Math.min(battleState.playerMaxHP, battleState.playerHP + healAmount);
    battleState.healCharges--;
    
    addLog(`You heal for ${healAmount} HP! (${battleState.healCharges} heals left)`);
    
    setTimeout(enemyTurn, 1000);
    updateBattleDisplay();
}

function playerDefend() {
    battleState.isDefending = true;
    addLog('You brace for impact! Defense increased.');
    setTimeout(enemyTurn, 1000);
}

function enemyTurn() {
    if (battleState.specialCooldown > 0) {
        battleState.specialCooldown--;
    }
    
    const baseDamage = battleState.enemyATK - battleState.playerDEF;
    const damage = battleState.isDefending ? 
        Math.max(2, Math.floor(baseDamage * 0.5)) : 
        Math.max(5, baseDamage + Math.floor(Math.random() * 8));
    
    battleState.playerHP -= damage;
    battleState.isDefending = false;
    
    animateAttack('enemy');
    addLog(`Enemy attacks for ${damage} damage!`);
    
    if (battleState.playerHP <= 0) {
        defeat();
    }
    
    updateBattleDisplay();
}

function animateAttack(attacker) {
    const sprite = attacker === 'player' ? 
        document.getElementById('playerSprite') : 
        document.getElementById('enemySprite');
    
    sprite.style.transform = 'scale(1.3)';
    setTimeout(() => {
        sprite.style.transform = 'scale(1)';
    }, 200);
}

function animateSpecial(attacker) {
    const sprite = attacker === 'player' ? 
        document.getElementById('playerSprite') : 
        document.getElementById('enemySprite');
    
    sprite.style.animation = 'pulse-dragon 0.5s';
    setTimeout(() => {
        sprite.style.animation = '';
    }, 500);
}

function victory() {
    const enemy = enemies[battleState.currentEnemy];
    battleState.playerXP += enemy.xp;
    
    document.getElementById('battleArena').classList.add('hidden');
    document.getElementById('battleVictory').classList.remove('hidden');
    
    document.getElementById('victoryTitle').textContent = 'Victory!';
    document.getElementById('victoryMessage').textContent = `You defeated ${enemy.name}!`;
    document.getElementById('rewardsDisplay').innerHTML = `
        <p>+${enemy.xp} XP</p>
        <p>Dragon essence awakened!</p>
    `;
    
    if (battleState.playerXP >= battleState.playerLevel * 100) {
        levelUp();
    }
}

function levelUp() {
    battleState.playerLevel++;
    battleState.playerMaxHP += 20;
    battleState.playerHP = battleState.playerMaxHP;
    battleState.playerATK += 5;
    battleState.playerDEF += 3;
    battleState.healCharges = 3;
    
    const rewardsDiv = document.getElementById('rewardsDisplay');
    rewardsDiv.innerHTML += `<p class="level-up">⬆️ LEVEL UP! Now Level ${battleState.playerLevel}!</p>`;
}

function defeat() {
    document.getElementById('battleArena').classList.add('hidden');
    document.getElementById('battleDefeat').classList.remove('hidden');
}

function nextBattle() {
    document.getElementById('battleVictory').classList.add('hidden');
    
    if (battleState.currentEnemy >= enemies.length - 1) {
        document.getElementById('victoryTitle').textContent = 'You Have Awakened!';
        document.getElementById('victoryMessage').textContent = 'You have defeated the Demiurge and remembered your true dragon nature! The path to reunification is open.';
        document.getElementById('battleVictory').classList.remove('hidden');
        return;
    }
    
    document.getElementById('battleArena').classList.remove('hidden');
    loadEnemy(battleState.currentEnemy + 1);
    document.getElementById('battleLog').innerHTML = '';
    updateBattleDisplay();
}

function retryBattle() {
    document.getElementById('battleDefeat').classList.add('hidden');
    document.getElementById('battleArena').classList.remove('hidden');
    
    const dragonClass = dragonClasses[battleState.playerClass];
    battleState.playerHP = dragonClass.hp;
    battleState.playerMaxHP = dragonClass.hp;
    battleState.healCharges = 3;
    
    loadEnemy(battleState.currentEnemy);
    document.getElementById('battleLog').innerHTML = '';
    updateBattleDisplay();
}

function resetBattle() {
    document.getElementById('battleVictory').classList.add('hidden');
    document.getElementById('battleDefeat').classList.add('hidden');
    document.getElementById('battleArena').classList.add('hidden');
    document.getElementById('battleIntro').classList.remove('hidden');
    
    battleState = {
        playerClass: null,
        playerHP: 100,
        playerMaxHP: 100,
        playerATK: 20,
        playerDEF: 15,
        playerLevel: 1,
        playerXP: 0,
        enemyHP: 50,
        enemyMaxHP: 50,
        enemyATK: 15,
        enemyDEF: 10,
        enemyLevel: 1,
        currentEnemy: 0,
        isDefending: false,
        specialCooldown: 0,
        healCharges: 3
    };
}

console.log('%c🐉 The Dragon Bible', 'font-size: 24px; font-weight: bold; color: #FFD700;');
console.log('%cWhere humanity remembers its wings...', 'font-size: 14px; font-style: italic; color: #B22222;');
