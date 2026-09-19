# -*- coding: utf-8 -*-
"""
Curriculum & Question Bank Generator for Aghanya's Learning Quest
Analyzes and structures all content from 7 Source PDFs:
- math coursebook part 1.pdf (pages 13-16)
- math coursebook part 2.pdf (pages 17-20)
- math coursebook part 3.pdf (pages 21-24)
- math coursebook part 4.pdf (pages 25-27)
- math workbook part 1.pdf (pages 7-10)
- math work book part 2.pdf (pages 11-14)
- math workbook part 3.pdf (pages 15-18)
"""

import json
import os

curriculum = {
    "metadata": {
        "title": "Aghanya's Learning Quest - Mathematics Curriculum & Question Bank",
        "grade_level": "Early Childhood / Pre-Primary / Kindergarten / Grade 1 Foundations",
        "curriculum_framework": "Visual, Concrete-to-Abstract, Gamified Mastery",
        "total_source_pdfs": 7,
        "total_pdf_pages_analyzed": 27,
        "source_files": [
            {"filename": "math coursebook part 1.pdf", "pages": 4, "book_pages": "13-16", "role": "Concept introduction & initial exercises"},
            {"filename": "math coursebook part 2.pdf", "pages": 4, "book_pages": "17-20", "role": "Measurement & size comparisons"},
            {"filename": "math coursebook part 3.pdf", "pages": 4, "book_pages": "21-24", "role": "Quantities, relationships & scene grouping"},
            {"filename": "math coursebook part 4.pdf", "pages": 3, "book_pages": "25-27", "role": "Sets, 1-to-1 correspondence, equal/more/less"},
            {"filename": "math workbook part 1.pdf", "pages": 4, "book_pages": "7-10", "role": "Review of comparisons & colour/toy sorting"},
            {"filename": "math work book part 2.pdf", "pages": 4, "book_pages": "11-14", "role": "Category colouring, odd-one-out, equal sets & more"},
            {"filename": "math workbook part 3.pdf", "pages": 4, "book_pages": "15-18", "role": "Less comparisons, review matching & integrated phonics-math boss challenge"}
        ],
        "character_companions": [
            {"name": "Aghanya", "role": "Hero Explorer & Adventurer"},
            {"name": "Tara", "role": "Playful Friend & Toy Organizer"},
            {"name": "Vijai & Swetha", "role": "Loving Guides & Cheerleaders (Parents)"}
        ]
    },
    "units": [
        {
            "unit_id": "unit_1_comparisons",
            "unit_number": 1,
            "unit_title": "Unit 1: Comparisons & Same / Different",
            "world_theme": "The Mirror Meadow",
            "description": "Foundational visual discrimination: discovering identical items, matching pairs, and identifying the odd one out.",
            "learning_objectives": [
                "Identify whether two visual items are identical ('same') or differ in features ('different')",
                "Match identical pairs of everyday objects (shoes)",
                "Spot the odd one out in a row of 3 or 4 objects based on shape, type, or color"
            ],
            "topics": ["Same and Different", "Two of a Kind (Pair Matching)", "Odd One Out (Visual Discrimination)"],
            "questions": [
                {
                    "id": "Q_U1_01",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.13 (PDF p.1)",
                    "topic": "Same and Different",
                    "question_type": "same_different",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "When two things look completely identical in shape, colour, and details, they are the SAME! If anything changes, they are DIFFERENT.",
                    "question_text": "Look at these two police cars. Are they the SAME or DIFFERENT?",
                    "prompt": "Tap 'Same' or 'Different'!",
                    "visual_description": "Two white police cars with blue side stripes, 'POLICE' written on doors, and red/blue emergency light bars on top.",
                    "interactive_elements": {
                        "display_items": [
                            {"id": "item1", "label": "Police Car 1", "image": "police_car.png", "emoji": "🚓"},
                            {"id": "item2", "label": "Police Car 2", "image": "police_car.png", "emoji": "🚓"}
                        ],
                        "options": [
                            {"id": "opt_same", "text": "The Same", "is_correct": True},
                            {"id": "opt_diff", "text": "Different", "is_correct": False}
                        ]
                    },
                    "correct_answer": "The Same",
                    "child_friendly_hint": "Look closely at their lights, wheels, and colours! They look like twins!",
                    "encouragement_feedback": "Spot on, Explorer! Both police cars are totally identical!"
                },
                {
                    "id": "Q_U1_02",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.13 (PDF p.1)",
                    "topic": "Same and Different",
                    "question_type": "same_different",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Objects are DIFFERENT when their colours, shapes, or designs do not match.",
                    "question_text": "Look at this police car and this blue city car. Are they the SAME or DIFFERENT?",
                    "prompt": "Tap 'Same' or 'Different'!",
                    "visual_description": "A white-and-blue police car with sirens next to a dark blue family sedan without sirens.",
                    "interactive_elements": {
                        "display_items": [
                            {"id": "item1", "label": "Police Car", "emoji": "🚓"},
                            {"id": "item2", "label": "Blue Sedan", "emoji": "🚗"}
                        ],
                        "options": [
                            {"id": "opt_same", "text": "The Same", "is_correct": False},
                            {"id": "opt_diff", "text": "Different", "is_correct": True}
                        ]
                    },
                    "correct_answer": "Different",
                    "child_friendly_hint": "One is a white police car with sirens, and one is a dark blue family car!",
                    "encouragement_feedback": "Brilliant eye! They have different colours and shapes!"
                },
                {
                    "id": "Q_U1_03",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.14 (PDF p.2)",
                    "topic": "Two of a Kind (Pair Matching)",
                    "question_type": "pair_match",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Shoes always come in pairs! Find each shoe its perfect matching partner.",
                    "question_text": "Match each shoe on the left with its twin partner on the right!",
                    "prompt": "Draw lines or tap to connect each shoe pair!",
                    "visual_description": "Four pairs of shoes arranged in two shuffled columns: Brown loafer/clog, Red sneaker, Brown hiking boot, Black formal shoe.",
                    "interactive_elements": {
                        "left_items": [
                            {"id": "shoe_L1", "name": "Brown Loafer", "color": "brown", "type": "loafer", "emoji": "👞"},
                            {"id": "shoe_L2", "name": "Red Athletic Sneaker", "color": "red", "type": "sneaker", "emoji": "👟"},
                            {"id": "shoe_L3", "name": "Brown Work Boot", "color": "brown", "type": "boot", "emoji": "🥾"},
                            {"id": "shoe_L4", "name": "Black Dress Shoe", "color": "black", "type": "dress_shoe", "emoji": "👞"}
                        ],
                        "right_items": [
                            {"id": "shoe_R1", "name": "Brown Work Boot", "match_id": "shoe_L3", "emoji": "🥾"},
                            {"id": "shoe_R2", "name": "Black Dress Shoe", "match_id": "shoe_L4", "emoji": "👞"},
                            {"id": "shoe_R3", "name": "Brown Loafer", "match_id": "shoe_L1", "emoji": "👞"},
                            {"id": "shoe_R4", "name": "Red Athletic Sneaker", "match_id": "shoe_L2", "emoji": "👟"}
                        ],
                        "correct_pairs": [
                            {"left": "shoe_L1", "right": "shoe_R3"},
                            {"left": "shoe_L2", "right": "shoe_R4"},
                            {"left": "shoe_L3", "right": "shoe_R1"},
                            {"left": "shoe_L4", "right": "shoe_R2"}
                        ]
                    },
                    "correct_answer": "Pairs matched: Loafer to Loafer, Sneaker to Sneaker, Boot to Boot, Dress Shoe to Dress Shoe",
                    "child_friendly_hint": "Look for the same colour, shape, and laces on both sides!",
                    "encouragement_feedback": "Fantastic! All shoes found their matching pairs! Ready to walk!"
                },
                {
                    "id": "Q_U1_04",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.15 (PDF p.3)",
                    "topic": "Odd One Out",
                    "question_type": "odd_one_out",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Look at the whole group: two items are twins, but one item is different! That one is the odd one out.",
                    "question_text": "Which object is the odd one out in this row?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Row 1: Round red teapot steaming, Round red teapot steaming, Tall brown ceramic jug/pitcher.",
                    "interactive_elements": {
                        "items": [
                            {"id": "item1", "label": "Red Teapot", "is_odd": False, "emoji": "🫖"},
                            {"id": "item2", "label": "Red Teapot", "is_odd": False, "emoji": "🫖"},
                            {"id": "item3", "label": "Tall Brown Jug", "is_odd": True, "emoji": "🏺"}
                        ]
                    },
                    "correct_answer": "Tall Brown Jug",
                    "child_friendly_hint": "Two are round red teapots with steam, but one is a tall brown jug!",
                    "encouragement_feedback": "You found it! The tall brown jug is the odd one out!"
                },
                {
                    "id": "Q_U1_05",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.15 (PDF p.3)",
                    "topic": "Odd One Out",
                    "question_type": "odd_one_out",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Find the friend who doesn't match the other two in the row!",
                    "question_text": "Which cute character is the odd one out?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Row 2: Yellow teddy bear, White/grey rabbit standing, Yellow teddy bear.",
                    "interactive_elements": {
                        "items": [
                            {"id": "item1", "label": "Yellow Teddy Bear", "is_odd": False, "emoji": "🧸"},
                            {"id": "item2", "label": "White Bunny", "is_odd": True, "emoji": "🐰"},
                            {"id": "item3", "label": "Yellow Teddy Bear", "is_odd": False, "emoji": "🧸"}
                        ]
                    },
                    "correct_answer": "White Bunny",
                    "child_friendly_hint": "Two are cuddly yellow teddy bears, but one is a hopping bunny!",
                    "encouragement_feedback": "Hooray! The little bunny is hopping on its own!"
                },
                {
                    "id": "Q_U1_06",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.15 (PDF p.3)",
                    "topic": "Odd One Out",
                    "question_type": "odd_one_out",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Two animals are identical pets, but one is a different furry friend!",
                    "question_text": "Which animal is the odd one out?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Row 3: Cream-coloured sleeping dog, Grey kitten with pink bow, Grey kitten with pink bow.",
                    "interactive_elements": {
                        "items": [
                            {"id": "item1", "label": "Cream Dog", "is_odd": True, "emoji": "🐕"},
                            {"id": "item2", "label": "Kitten with Bow", "is_odd": False, "emoji": "🐱"},
                            {"id": "item3", "label": "Kitten with Bow", "is_odd": False, "emoji": "🐱"}
                        ]
                    },
                    "correct_answer": "Cream Dog",
                    "child_friendly_hint": "Two are sweet grey kittens with pink bows, but the first one is a resting puppy dog!",
                    "encouragement_feedback": "Woof! Super job, you spotted the doggy!"
                },
                {
                    "id": "Q_U1_07",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.15 (PDF p.3)",
                    "topic": "Odd One Out",
                    "question_type": "odd_one_out",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Look at the boats in the water: sails catch the wind, but one boat is powered by a motor!",
                    "question_text": "Which boat is the odd one out?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Row 4: Blue-and-white sailboat, Blue-and-white sailboat, Sleek white motorboat/speedboat.",
                    "interactive_elements": {
                        "items": [
                            {"id": "item1", "label": "Sailboat", "is_odd": False, "emoji": "⛵"},
                            {"id": "item2", "label": "Sailboat", "is_odd": False, "emoji": "⛵"},
                            {"id": "item3", "label": "Motorboat", "is_odd": True, "emoji": "🚤"}
                        ]
                    },
                    "correct_answer": "Motorboat",
                    "child_friendly_hint": "Two have tall white-and-blue sails, but the last one is a fast motorboat!",
                    "encouragement_feedback": "Full speed ahead! You found the speedboat!"
                }
            ]
        },
        {
            "unit_id": "unit_2_sizes_measurements",
            "unit_number": 2,
            "unit_title": "Unit 2: Sizes & Measurements",
            "world_theme": "The Giant & Fairy Forest",
            "description": "Understanding physical attributes and comparative adjectives: Big vs Small, Heavy vs Light, Tall vs Short, Thick vs Thin, Long vs Short.",
            "learning_objectives": [
                "Differentiate between 'big' and 'small' across objects and animals",
                "Compare relative weight ('heavy' vs 'light') and understand that size does not always mean weight",
                "Compare vertical height ('tall' vs 'short')",
                "Compare cross-sectional girth ('thick' vs 'thin')",
                "Compare horizontal length ('long' vs 'short')"
            ],
            "topics": [
                "Big and Small",
                "Heavy and Light",
                "Tall and Short",
                "Thick and Thin",
                "Long and Short"
            ],
            "questions": [
                {
                    "id": "Q_U2_01",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.16 (PDF p.4)",
                    "topic": "Big and Small",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "When something takes up a lot of space it is BIG. When it takes up only a little space it is SMALL.",
                    "question_text": "Look at the beach ball and the tennis ball. Which one is BIG?",
                    "prompt": "Tap the BIG object!",
                    "visual_description": "A large multi-colored beach ball next to a small green tennis ball.",
                    "interactive_elements": {
                        "items": [
                            {"id": "beach_ball", "label": "Beach Ball", "attribute": "big", "is_correct": True, "emoji": "🏐"},
                            {"id": "tennis_ball", "label": "Tennis Ball", "attribute": "small", "is_correct": False, "emoji": "🎾"}
                        ]
                    },
                    "correct_answer": "Beach Ball",
                    "child_friendly_hint": "The beach ball is much larger than the tiny tennis ball!",
                    "encouragement_feedback": "Boom! The beach ball is big, and the tennis ball is small!"
                },
                {
                    "id": "Q_U2_02",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.16 (PDF p.4)",
                    "topic": "Big and Small",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Look at their sizes compared to each other.",
                    "question_text": "Look at the umbrella and the cupcake. Which one is SMALL?",
                    "prompt": "Tap the SMALL object!",
                    "visual_description": "A large colourful umbrella and a small sweet cupcake with frosting.",
                    "interactive_elements": {
                        "items": [
                            {"id": "umbrella", "label": "Umbrella", "attribute": "big", "is_correct": False, "emoji": "☂️"},
                            {"id": "cupcake", "label": "Cupcake", "attribute": "small", "is_correct": True, "emoji": "🧁"}
                        ]
                    },
                    "correct_answer": "Cupcake",
                    "child_friendly_hint": "You can hold a cupcake in your palm, but an umbrella covers your whole body!",
                    "encouragement_feedback": "Yummy and correct! The cupcake is small, and the umbrella is big!"
                },
                {
                    "id": "Q_U2_03",
                    "source_file": "math coursebook part 1.pdf",
                    "source_page": "Book p.16 (PDF p.4)",
                    "topic": "Big and Small",
                    "question_type": "size_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 20,
                    "concept_explanation": "We can draw or choose an object that is larger than our starting object!",
                    "question_text": "Which leaf is BIGGER than the little green leaf?",
                    "prompt": "Select the bigger leaf!",
                    "visual_description": "A small green heart-shaped leaf next to three candidate leaves: tiny, same-size, and giant.",
                    "interactive_elements": {
                        "reference_item": {"label": "Small Green Leaf", "size": "small", "emoji": "🍃"},
                        "options": [
                            {"id": "leaf_tiny", "label": "Tiny Leaf", "is_bigger": False},
                            {"id": "leaf_same", "label": "Same-size Leaf", "is_bigger": False},
                            {"id": "leaf_giant", "label": "Giant Wide Leaf", "is_bigger": True}
                        ]
                    },
                    "correct_answer": "Giant Wide Leaf",
                    "child_friendly_hint": "Choose the leaf that spreads out wide and large!",
                    "encouragement_feedback": "Terrific! That leaf is super big!"
                },
                {
                    "id": "Q_U2_04",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.17 (PDF p.1)",
                    "topic": "Heavy and Light",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "A heavy object takes a lot of muscle to lift! A light object floats in the air or is super easy to carry.",
                    "question_text": "Which object is HEAVY: the blue balloon or the chocolate birthday cake?",
                    "prompt": "Tap the HEAVY object!",
                    "visual_description": "A light blue air-filled balloon floating on a string vs a solid chocolate birthday cake with rich frosting.",
                    "interactive_elements": {
                        "items": [
                            {"id": "balloon", "label": "Blue Balloon", "weight": "light", "is_correct": False, "emoji": "🎈"},
                            {"id": "cake", "label": "Chocolate Cake", "weight": "heavy", "is_correct": True, "emoji": "🎂"}
                        ]
                    },
                    "correct_answer": "Chocolate Cake",
                    "child_friendly_hint": "Balloons float easily with air, but a real cake is dense and heavy!",
                    "encouragement_feedback": "Sweet job! The cake is heavy, and the balloon is light as air!"
                },
                {
                    "id": "Q_U2_05",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.17 (PDF p.1)",
                    "topic": "Heavy and Light",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Comparing the weight of two road vehicles.",
                    "question_text": "Which vehicle is HEAVIER: the red passenger bus or the blue car?",
                    "prompt": "Tap the HEAVIER vehicle!",
                    "visual_description": "A massive red passenger bus carrying many passengers vs a small family car.",
                    "interactive_elements": {
                        "items": [
                            {"id": "bus", "label": "Red Bus", "weight": "heavy", "is_correct": True, "emoji": "🚌"},
                            {"id": "car", "label": "Blue Car", "weight": "light", "is_correct": False, "emoji": "🚗"}
                        ]
                    },
                    "correct_answer": "Red Bus",
                    "child_friendly_hint": "A big bus carries dozens of people and has a huge heavy engine!",
                    "encouragement_feedback": "Honk honk! The bus is definitely much heavier than the car!"
                },
                {
                    "id": "Q_U2_06",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.17 (PDF p.1)",
                    "topic": "Heavy and Light",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Comparing household furniture weight.",
                    "question_text": "Which furniture piece is LIGHTER: the wooden dining table or the wooden chair?",
                    "prompt": "Tap the LIGHTER object!",
                    "visual_description": "A big solid wooden four-legged table vs a single small wooden dining chair.",
                    "interactive_elements": {
                        "items": [
                            {"id": "table", "label": "Dining Table", "weight": "heavy", "is_correct": False, "emoji": "🪵"},
                            {"id": "chair", "label": "Chair", "weight": "light", "is_correct": True, "emoji": "🪑"}
                        ]
                    },
                    "correct_answer": "Chair",
                    "child_friendly_hint": "You can slide a chair easily, but a whole big table needs two people to carry!",
                    "encouragement_feedback": "Spot on! The chair is lighter than the big dining table!"
                },
                {
                    "id": "Q_U2_07",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.17 (PDF p.1)",
                    "topic": "Heavy and Light",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Comparing garden produce: a big round watermelon vs a slender green chilli.",
                    "question_text": "Which one is HEAVIER: the watermelon or the green chilli?",
                    "prompt": "Tap the HEAVIER fruit/vegetable!",
                    "visual_description": "A large round green striped watermelon vs a slender tiny green chilli.",
                    "interactive_elements": {
                        "items": [
                            {"id": "watermelon", "label": "Watermelon", "weight": "heavy", "is_correct": True, "emoji": "🍉"},
                            {"id": "chilli", "label": "Green Chilli", "weight": "light", "is_correct": False, "emoji": "🌶️"}
                        ]
                    },
                    "correct_answer": "Watermelon",
                    "child_friendly_hint": "A juicy watermelon is so heavy it needs both hands to hold!",
                    "encouragement_feedback": "Juicy answer! The watermelon is heavy, and the chilli is light!"
                },
                {
                    "id": "Q_U2_08",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.18 (PDF p.2)",
                    "topic": "Tall and Short",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Tall means high up in the sky from head to toe! Short is closer to the ground.",
                    "question_text": "Look at the adult giraffe and the baby giraffe. Which one is TALL?",
                    "prompt": "Tap the TALL giraffe!",
                    "visual_description": "A fully grown tall giraffe with long legs and neck beside a cute, shorter baby giraffe.",
                    "interactive_elements": {
                        "items": [
                            {"id": "giraffe_adult", "label": "Adult Giraffe", "height": "tall", "is_correct": True, "emoji": "🦒"},
                            {"id": "giraffe_baby", "label": "Baby Giraffe", "height": "short", "is_correct": False, "emoji": "🦒"}
                        ]
                    },
                    "correct_answer": "Adult Giraffe",
                    "child_friendly_hint": "The grown-up giraffe reaches high up into the trees!",
                    "encouragement_feedback": "Standing tall! The parent giraffe is tall and the baby is short!"
                },
                {
                    "id": "Q_U2_09",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.18 (PDF p.2)",
                    "topic": "Tall and Short",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Comparing tree heights standing from the ground.",
                    "question_text": "Which palm tree is SHORT?",
                    "prompt": "Tap the SHORT palm tree!",
                    "visual_description": "A tall palm tree with a long trunk beside a shorter palm tree.",
                    "interactive_elements": {
                        "items": [
                            {"id": "palm_tall", "label": "Tall Palm Tree", "height": "tall", "is_correct": False, "emoji": "🌴"},
                            {"id": "palm_short", "label": "Short Palm Tree", "height": "short", "is_correct": True, "emoji": "🌴"}
                        ]
                    },
                    "correct_answer": "Short Palm Tree",
                    "child_friendly_hint": "Check which trunk is shorter and lower to the ground.",
                    "encouragement_feedback": "Great job! That palm tree is nice and short!"
                },
                {
                    "id": "Q_U2_10",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.18 (PDF p.2)",
                    "topic": "Tall and Short",
                    "question_type": "size_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 20,
                    "concept_explanation": "A ladder with fewer rungs and lower height is SHORTER.",
                    "question_text": "Which ladder is SHORTER than the tall grey ladder?",
                    "prompt": "Pick the shorter ladder!",
                    "visual_description": "A tall 7-rung ladder next to candidate ladders of different heights.",
                    "interactive_elements": {
                        "reference_item": {"label": "Tall Ladder (7 rungs)", "emoji": "🪜"},
                        "options": [
                            {"id": "ladder_short", "label": "Short Ladder (4 rungs)", "is_correct": True},
                            {"id": "ladder_super_tall", "label": "Extra Tall Ladder (10 rungs)", "is_correct": False}
                        ]
                    },
                    "correct_answer": "Short Ladder (4 rungs)",
                    "child_friendly_hint": "Count the steps or see which ladder doesn't reach as high!",
                    "encouragement_feedback": "Awesome ladder climbing! You found the shorter ladder!"
                },
                {
                    "id": "Q_U2_11",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.19 (PDF p.3)",
                    "topic": "Thick and Thin",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Thick is fat and broad around. Thin is skinny and narrow.",
                    "question_text": "Which paintbrush is THICK: the wide blue brush or the slender fine brush?",
                    "prompt": "Tap the THICK brush!",
                    "visual_description": "A wide blue-handled painting brush with broad bristles vs a slender pointed artist brush.",
                    "interactive_elements": {
                        "items": [
                            {"id": "brush_wide", "label": "Wide Paint Brush", "thickness": "thick", "is_correct": True, "emoji": "🖌️"},
                            {"id": "brush_fine", "label": "Slender Artist Brush", "thickness": "thin", "is_correct": False, "emoji": "✏️"}
                        ]
                    },
                    "correct_answer": "Wide Paint Brush",
                    "child_friendly_hint": "The wide wall brush has lots of thick bristles!",
                    "encouragement_feedback": "Artistic genius! That brush is definitely thick!"
                },
                {
                    "id": "Q_U2_12",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.19 (PDF p.3)",
                    "topic": "Thick and Thin",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Comparing carpenter nails.",
                    "question_text": "Which iron nail is THIN?",
                    "prompt": "Tap the THIN nail!",
                    "visual_description": "A fat heavy construction nail vs a skinny slender finishing nail.",
                    "interactive_elements": {
                        "items": [
                            {"id": "nail_fat", "label": "Heavy Fat Nail", "thickness": "thick", "is_correct": False, "emoji": "🔩"},
                            {"id": "nail_skinny", "label": "Slender Thin Nail", "thickness": "thin", "is_correct": True, "emoji": "📍"}
                        ]
                    },
                    "correct_answer": "Slender Thin Nail",
                    "child_friendly_hint": "Look for the nail that is narrow and skinny!",
                    "encouragement_feedback": "Nailed it! The skinny nail is nice and thin!"
                },
                {
                    "id": "Q_U2_13",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.19 (PDF p.3)",
                    "topic": "Thick and Thin",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Hair plaits (braids) can have lots of hair making them thick, or less hair making them thin.",
                    "question_text": "Which girl has the THICK braid?",
                    "prompt": "Tap the girl with the THICK braid!",
                    "visual_description": "Girl with green shirt and thin braid with green ribbon vs Girl with purple shirt and thick voluptuous braid with purple ribbon.",
                    "interactive_elements": {
                        "items": [
                            {"id": "girl_thin", "label": "Girl with Thin Braid (Green ribbon)", "thickness": "thin", "is_correct": False},
                            {"id": "girl_thick", "label": "Girl with Thick Braid (Purple ribbon)", "thickness": "thick", "is_correct": True}
                        ]
                    },
                    "correct_answer": "Girl with Thick Braid (Purple ribbon)",
                    "child_friendly_hint": "Look at the width of the braid tied with the purple ribbon!",
                    "encouragement_feedback": "Beautiful! The braid with the purple ribbon is wonderfully thick!"
                },
                {
                    "id": "Q_U2_14",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.19 (PDF p.3)",
                    "topic": "Thick and Thin",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Ropes can be heavy and thick or light and thin.",
                    "question_text": "Which coil of rope is THICK?",
                    "prompt": "Tap the THICK rope coil!",
                    "visual_description": "A large coil of heavy thick rope vs a small coil of thin cord.",
                    "interactive_elements": {
                        "items": [
                            {"id": "rope_thick", "label": "Coil of Thick Heavy Rope", "thickness": "thick", "is_correct": True, "emoji": "🪢"},
                            {"id": "rope_thin", "label": "Coil of Thin Cord", "thickness": "thin", "is_correct": False, "emoji": "🧵"}
                        ]
                    },
                    "correct_answer": "Coil of Thick Heavy Rope",
                    "child_friendly_hint": "The big braided sailor's rope has much thicker strands!",
                    "encouragement_feedback": "Strong work! The big rope is super thick!"
                },
                {
                    "id": "Q_U2_15",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.20 (PDF p.4)",
                    "topic": "Long and Short",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Long goes a far distance from end to end. Short covers only a tiny distance.",
                    "question_text": "Which animal has a SHORT tail: the spotted deer or the monkey?",
                    "prompt": "Tap the animal with the SHORT tail!",
                    "visual_description": "A spotted deer with a tiny fluffy tail vs a monkey with a long curling tail.",
                    "interactive_elements": {
                        "items": [
                            {"id": "deer", "label": "Spotted Deer", "tail": "short", "is_correct": True, "emoji": "🦌"},
                            {"id": "monkey", "label": "Monkey", "tail": "long", "is_correct": False, "emoji": "🐒"}
                        ]
                    },
                    "correct_answer": "Spotted Deer",
                    "child_friendly_hint": "The deer's tail is a tiny little puff, while the monkey's tail curls all the way up!",
                    "encouragement_feedback": "Spot on! The deer has a cute short tail!"
                },
                {
                    "id": "Q_U2_16",
                    "source_file": "math coursebook part 2.pdf",
                    "source_page": "Book p.20 (PDF p.4)",
                    "topic": "Long and Short",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Comparing lengths of cozy winter scarves.",
                    "question_text": "Which scarf is LONGER: the blue scarf or the yellow-and-red striped scarf?",
                    "prompt": "Tap the LONGER scarf!",
                    "visual_description": "A short blue scarf with white fringes vs a long flowing yellow scarf with red stripes.",
                    "interactive_elements": {
                        "items": [
                            {"id": "scarf_blue", "label": "Blue Scarf", "length": "short", "is_correct": False, "emoji": "🧣"},
                            {"id": "scarf_yellow", "label": "Yellow-and-Red Scarf", "length": "long", "is_correct": True, "emoji": "🧣"}
                        ]
                    },
                    "correct_answer": "Yellow-and-Red Scarf",
                    "child_friendly_hint": "Trace your finger along each scarf to see which one stretches further!",
                    "encouragement_feedback": "Warm and cozy! The yellow-and-red scarf is longer!"
                }
            ]
        },
        {
            "unit_id": "unit_3_quantities_sets",
            "unit_number": 3,
            "unit_title": "Unit 3: Quantities & Sets",
            "world_theme": "The Treasure Island of Numbers",
            "description": "Building number sense and volume intuition: More vs Less, Few vs Many, One-to-One Correspondence, and Equal Sets.",
            "learning_objectives": [
                "Understand volume and capacity comparisons: 'more' vs 'less'",
                "Compare discrete counts visually: 'few' vs 'many'",
                "Pair items one-to-one between sets to determine equality ('equal sets')",
                "Determine which set has 'more' or 'less' through one-to-one matching"
            ],
            "topics": [
                "More and Less (Capacity & Volume)",
                "Few and Many (Discrete Quantities)",
                "Equal Sets & 1-to-1 Correspondence",
                "Set Comparison (More vs Less Sets)"
            ],
            "questions": [
                {
                    "id": "Q_U3_01",
                    "source_file": "math coursebook part 3.pdf",
                    "source_page": "Book p.21 (PDF p.1)",
                    "topic": "More and Less",
                    "question_type": "quantity_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "MORE means a container is filled up high with yummy things! LESS means there is only a little at the bottom.",
                    "question_text": "Look at the two glass jars of golden corn grains. Which jar has MORE?",
                    "prompt": "Tap the jar with MORE grains!",
                    "visual_description": "Left jar filled near the brim with yellow grains vs Right jar with only a small layer at the bottom.",
                    "interactive_elements": {
                        "items": [
                            {"id": "jar_full", "label": "Full Jar of Grains", "quantity": "more", "is_correct": True, "emoji": "🫙"},
                            {"id": "jar_low", "label": "Low Jar of Grains", "quantity": "less", "is_correct": False, "emoji": "🫙"}
                        ]
                    },
                    "correct_answer": "Full Jar of Grains",
                    "child_friendly_hint": "The left jar is filled almost all the way to the top!",
                    "encouragement_feedback": "Splendid! The first jar has so much more yummy grain!"
                },
                {
                    "id": "Q_U3_02",
                    "source_file": "math coursebook part 3.pdf",
                    "source_page": "Book p.21 (PDF p.1)",
                    "topic": "More and Less",
                    "question_type": "quantity_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Counting delicious scoops of ice cream!",
                    "question_text": "Which ice cream cone has LESS: the 1-scoop cone or the 3-scoop cone?",
                    "prompt": "Tap the cone with LESS ice cream!",
                    "visual_description": "Left cone with 1 single pink scoop vs Right cone with 3 colourful scoops (yellow, green, pink).",
                    "interactive_elements": {
                        "items": [
                            {"id": "cone_1", "label": "1-Scoop Pink Cone", "quantity": "less", "is_correct": True, "emoji": "🍦"},
                            {"id": "cone_3", "label": "3-Scoops Triple Cone", "quantity": "more", "is_correct": False, "emoji": "🍦"}
                        ]
                    },
                    "correct_answer": "1-Scoop Pink Cone",
                    "child_friendly_hint": "1 scoop is smaller and less than 3 big scoops!",
                    "encouragement_feedback": "Delicious! 1 scoop is less than 3 scoops!"
                },
                {
                    "id": "Q_U3_03",
                    "source_file": "math coursebook part 3.pdf",
                    "source_page": "Book p.21 (PDF p.1)",
                    "topic": "More and Less",
                    "question_type": "quantity_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 15,
                    "concept_explanation": "Look at the juice line inside the soda bottle.",
                    "question_text": "Which soda bottle has LESS bubbly drink inside?",
                    "prompt": "Select the bottle that has LESS!",
                    "visual_description": "Left bottle filled up to the neck with fizzy bubbles vs Right bottle with only a puddle at the bottom.",
                    "interactive_elements": {
                        "items": [
                            {"id": "bottle_high", "label": "Bottle Filled to Neck", "level": "high", "is_correct": False, "emoji": "🍾"},
                            {"id": "bottle_low", "label": "Bottle Near Empty", "level": "low", "is_correct": True, "emoji": "🍾"}
                        ]
                    },
                    "correct_answer": "Bottle Near Empty",
                    "child_friendly_hint": "The drink level in the second bottle is down near the bottom!",
                    "encouragement_feedback": "Great eye! That bottle has much less drink!"
                },
                {
                    "id": "Q_U3_04",
                    "source_file": "math coursebook part 3.pdf",
                    "source_page": "Book p.22 (PDF p.2)",
                    "topic": "Few and Many",
                    "question_type": "quantity_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "FEW means just a couple or a small handful. MANY means a whole bunch!",
                    "question_text": "Which plate has FEW strawberries: the plate with 2 or the plate with 5?",
                    "prompt": "Tap the plate with FEW strawberries!",
                    "visual_description": "Plate A has 2 strawberries. Plate B has 5 strawberries.",
                    "interactive_elements": {
                        "plates": [
                            {"id": "plate_2", "label": "Plate with 2 Strawberries", "count": 2, "category": "few", "is_correct": True, "emoji": "🍓"},
                            {"id": "plate_5", "label": "Plate with 5 Strawberries", "count": 5, "category": "many", "is_correct": False, "emoji": "🍓"}
                        ]
                    },
                    "correct_answer": "Plate with 2 Strawberries",
                    "child_friendly_hint": "2 is a small number (few), while 5 is a big berry bunch (many)!",
                    "encouragement_feedback": "Berry good! 2 strawberries is few, and 5 is many!"
                },
                {
                    "id": "Q_U3_05",
                    "source_file": "math coursebook part 3.pdf",
                    "source_page": "Book p.22 (PDF p.2)",
                    "topic": "Few and Many",
                    "question_type": "quantity_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Comparing yummy pizza slices on snack plates.",
                    "question_text": "Which plate has FEW pizza slices?",
                    "prompt": "Tap the plate with FEW slices!",
                    "visual_description": "Plate A has 4 pizza slices. Plate B has 2 pizza slices and crumbs.",
                    "interactive_elements": {
                        "plates": [
                            {"id": "plate_4", "label": "Plate with 4 Pizza Slices", "count": 4, "category": "many", "is_correct": False, "emoji": "🍕"},
                            {"id": "plate_2", "label": "Plate with 2 Pizza Slices", "count": 2, "category": "few", "is_correct": True, "emoji": "🍕"}
                        ]
                    },
                    "correct_answer": "Plate with 2 Pizza Slices",
                    "child_friendly_hint": "Plate B only has 2 slices left!",
                    "encouragement_feedback": "Delicious! 2 slices is few compared to 4 slices!"
                },
                {
                    "id": "Q_U3_06",
                    "source_file": "math coursebook part 3.pdf",
                    "source_page": "Book p.22 (PDF p.2)",
                    "topic": "Few and Many",
                    "question_type": "quantity_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Festival sweets! Laddoos piled high on a festival plate.",
                    "question_text": "Which plate has MORE sweet laddoos: the plate with 3 or the tower of 7?",
                    "prompt": "Tap the plate that has MORE laddoos!",
                    "visual_description": "Left plate has 3 laddoos. Right plate has a pyramid pile of 7 laddoos.",
                    "interactive_elements": {
                        "plates": [
                            {"id": "plate_3", "label": "Plate with 3 Laddoos", "count": 3, "is_correct": False, "emoji": "🟡"},
                            {"id": "plate_7", "label": "Plate with 7 Laddoos", "count": 7, "is_correct": True, "emoji": "🟡"}
                        ]
                    },
                    "correct_answer": "Plate with 7 Laddoos",
                    "child_friendly_hint": "7 laddoos make a giant mountain pile!",
                    "encouragement_feedback": "Yum! 7 laddoos is definitely more than 3!"
                },
                {
                    "id": "Q_U3_07",
                    "source_file": "math coursebook part 4.pdf",
                    "source_page": "Book p.25 (PDF p.1)",
                    "topic": "Equal Sets & 1-to-1 Correspondence",
                    "question_type": "equal_sets",
                    "difficulty_level": "medium",
                    "xp_reward": 30,
                    "concept_explanation": "When every single child gets exactly one pet and none are left over, the sets are EQUAL! Everyone is happy!",
                    "question_text": "There are 5 children and 5 cute pets (puppy, parrot, bunny, fish, kitten). Does each child get a pet?",
                    "prompt": "Match each child to a pet, then answer: are there enough pets for everyone?",
                    "visual_description": "5 children (Boy with bag, Boy in blue shorts, Girl with book, Girl with ribbon, Little boy on scooter) and 5 pets in frames (Puppy, Parrot, Bunny, Goldfish, Kitten).",
                    "interactive_elements": {
                        "children_count": 5,
                        "pets_count": 5,
                        "question_followup": "Are all the children happy 😊 or sad 😢?",
                        "options": [
                            {"id": "opt_happy", "text": "Happy 😊 (There are enough pets for all 5 children!)", "is_correct": True},
                            {"id": "opt_sad", "text": "Sad 😢 (Someone is missing a pet)", "is_correct": False}
                        ]
                    },
                    "correct_answer": "Happy 😊 (There are enough pets for all 5 children!)",
                    "child_friendly_hint": "Count them: 1, 2, 3, 4, 5 children and 1, 2, 3, 4, 5 pets! Exactly equal!",
                    "encouragement_feedback": "Hooray! 5 pets for 5 children = EQUAL SETS! Everyone has a happy smile 😊!"
                },
                {
                    "id": "Q_U3_08",
                    "source_file": "math coursebook part 4.pdf",
                    "source_page": "Book p.26 (PDF p.2)",
                    "topic": "Set Comparison (More vs Less)",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Connect each kite to a child. If there are children left without a kite, there are MORE children than kites!",
                    "question_text": "We have 3 colourful kites and 4 children waiting to fly them. Which set has MORE: kites or children?",
                    "prompt": "Tap the group that has MORE!",
                    "visual_description": "Top: 3 flying kites (purple, yellow face, red). Bottom: 4 children looking up with open hands.",
                    "interactive_elements": {
                        "kites": {"count": 3, "label": "Kites", "emoji": "🪁"},
                        "children": {"count": 4, "label": "Children", "emoji": "👧👦"},
                        "options": [
                            {"id": "opt_kites", "text": "Kites (3)", "is_correct": False},
                            {"id": "opt_children", "text": "Children (4)", "is_correct": True}
                        ]
                    },
                    "correct_answer": "Children (4)",
                    "child_friendly_hint": "Match them: 3 kites go to 3 kids, but 1 kid doesn't get a kite. So there are more children!",
                    "encouragement_feedback": "Super smart! 4 children is more than 3 kites!"
                },
                {
                    "id": "Q_U3_09",
                    "source_file": "math coursebook part 4.pdf",
                    "source_page": "Book p.27 (PDF p.3)",
                    "topic": "Set Comparison (More vs Less)",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Let's help the frogs jump on the stepping stones in the pond! Count the frogs and count the rocks.",
                    "question_text": "There are 4 frogs on the bank and 7 stepping stone rocks in the water. Are there LESS frogs or LESS rocks?",
                    "prompt": "Tap the set that has LESS!",
                    "visual_description": "Grassy pond bank with 4 cute frogs and a winding stream with 7 rounded stepping stone rocks.",
                    "interactive_elements": {
                        "frogs": {"count": 4, "label": "Frogs", "emoji": "🐸"},
                        "rocks": {"count": 7, "label": "Rocks", "emoji": "🪨"},
                        "options": [
                            {"id": "opt_frogs", "text": "Less Frogs (4)", "is_correct": True},
                            {"id": "opt_rocks", "text": "Less Rocks (7)", "is_correct": False}
                        ]
                    },
                    "correct_answer": "Less Frogs (4)",
                    "child_friendly_hint": "4 is smaller than 7! There are extra rocks waiting for more frogs!",
                    "encouragement_feedback": "Ribbit ribbit! Spot on, there are less frogs than rocks!"
                },
                {
                    "id": "Q_U3_10",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.14 (PDF p.4)",
                    "topic": "Set Comparison (More vs Less)",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Give sweet golden jalebis to the children. See which group has more!",
                    "question_text": "There are 6 children and 5 jalebis. Which set has MORE?",
                    "prompt": "Tap the set with MORE!",
                    "visual_description": "Top: 6 smiling children faces. Bottom: 5 spiral golden jalebis.",
                    "interactive_elements": {
                        "set_a": {"label": "Children", "count": 6, "emoji": "🧒"},
                        "set_b": {"label": "Jalebis", "count": 5, "emoji": "🥨"},
                        "options": [
                            {"id": "opt_a", "text": "Children (6)", "is_correct": True},
                            {"id": "opt_b", "text": "Jalebis (5)", "is_correct": False}
                        ]
                    },
                    "correct_answer": "Children (6)",
                    "child_friendly_hint": "6 children need 6 treats, but we only have 5. 6 is more than 5!",
                    "encouragement_feedback": "Sweet solving! 6 children is more than 5 jalebis!"
                },
                {
                    "id": "Q_U3_11",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.14 (PDF p.4)",
                    "topic": "Set Comparison (More vs Less)",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Butterflies visit bright blue flowers in the garden!",
                    "question_text": "There are 4 fluttering butterflies and 5 blue garden flowers. Which set has MORE?",
                    "prompt": "Tap the set with MORE!",
                    "visual_description": "4 colourful butterflies flying above 5 bright blue flowers on green stems.",
                    "interactive_elements": {
                        "set_a": {"label": "Butterflies", "count": 4, "emoji": "🦋"},
                        "set_b": {"label": "Blue Flowers", "count": 5, "emoji": "🌸"},
                        "options": [
                            {"id": "opt_a", "text": "Butterflies (4)", "is_correct": False},
                            {"id": "opt_b", "text": "Blue Flowers (5)", "is_correct": True}
                        ]
                    },
                    "correct_answer": "Blue Flowers (5)",
                    "child_friendly_hint": "Each butterfly can land on 1 flower, and there will be 1 extra flower left!",
                    "encouragement_feedback": "Blooming marvelous! 5 flowers is more than 4 butterflies!"
                },
                {
                    "id": "Q_U3_12",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.14 (PDF p.4)",
                    "topic": "Set Comparison (More vs Less)",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Monkeys love bananas! Match each monkey with a banana.",
                    "question_text": "There are 5 monkeys and 4 yellow bananas. Which set has MORE?",
                    "prompt": "Tap the set with MORE!",
                    "visual_description": "A row of 5 playful yellow monkeys and a row of 4 yellow bananas.",
                    "interactive_elements": {
                        "set_a": {"label": "Monkeys", "count": 5, "emoji": "🐒"},
                        "set_b": {"label": "Bananas", "count": 4, "emoji": "🍌"},
                        "options": [
                            {"id": "opt_a", "text": "Monkeys (5)", "is_correct": True},
                            {"id": "opt_b", "text": "Bananas (4)", "is_correct": False}
                        ]
                    },
                    "correct_answer": "Monkeys (5)",
                    "child_friendly_hint": "5 monkeys is one more than 4 bananas!",
                    "encouragement_feedback": "Ooh-ooh aah-aah! You got it! 5 monkeys is more than 4 bananas!"
                },
                {
                    "id": "Q_U3_13",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.15 (PDF p.1)",
                    "topic": "Set Comparison (More vs Less)",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Hungry kittens waiting for fish treats. Find which set has LESS.",
                    "question_text": "There are 4 cute cats and 3 fish on green plates. Which set has LESS?",
                    "prompt": "Tap the set with LESS!",
                    "visual_description": "Top row: 4 sitting white-and-grey kittens with pink bows. Bottom row: 3 plates with whole fish.",
                    "interactive_elements": {
                        "set_a": {"label": "Cats", "count": 4, "emoji": "🐱"},
                        "set_b": {"label": "Fish Plates", "count": 3, "emoji": "🐟"},
                        "options": [
                            {"id": "opt_cats", "text": "Cats (4)", "is_correct": False},
                            {"id": "opt_fish", "text": "Fish Plates (3)", "is_correct": True}
                        ]
                    },
                    "correct_answer": "Fish Plates (3)",
                    "child_friendly_hint": "3 is smaller than 4, so there are less fish than cats!",
                    "encouragement_feedback": "Purr-fect! 3 fish is less than 4 hungry cats!"
                },
                {
                    "id": "Q_U3_14",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.15 (PDF p.1)",
                    "topic": "Set Comparison (More vs Less)",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Bunnies love crunchy orange carrots!",
                    "question_text": "There are 5 hopping rabbits and 4 crunchy carrots. Which set has LESS?",
                    "prompt": "Tap the set with LESS!",
                    "visual_description": "Top row: 5 white bunnies with pink ears. Bottom row: 4 fresh orange carrots with leafy green tops.",
                    "interactive_elements": {
                        "set_a": {"label": "Rabbits", "count": 5, "emoji": "🐰"},
                        "set_b": {"label": "Carrots", "count": 4, "emoji": "🥕"},
                        "options": [
                            {"id": "opt_rabbits", "text": "Rabbits (5)", "is_correct": False},
                            {"id": "opt_carrots", "text": "Carrots (4)", "is_correct": True}
                        ]
                    },
                    "correct_answer": "Carrots (4)",
                    "child_friendly_hint": "4 is less than 5! One bunny will have to share!",
                    "encouragement_feedback": "Hop-tastic! 4 carrots is less than 5 rabbits!"
                },
                {
                    "id": "Q_U3_15",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.15 (PDF p.1)",
                    "topic": "Set Comparison (More vs Less)",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Little mice smell delicious golden samosas!",
                    "question_text": "There are 7 little mice and 10 crispy samosas on little plates. Which set has LESS?",
                    "prompt": "Tap the set with LESS!",
                    "visual_description": "Top row: 7 tiny brown mice scurrying. Bottom area: 10 triangular golden samosas on plates (two staggered rows of 5).",
                    "interactive_elements": {
                        "set_a": {"label": "Mice", "count": 7, "emoji": "🐭"},
                        "set_b": {"label": "Samosas", "count": 10, "emoji": "🥟"},
                        "options": [
                            {"id": "opt_mice", "text": "Mice (7)", "is_correct": True},
                            {"id": "opt_samosas", "text": "Samosas (10)", "is_correct": False}
                        ]
                    },
                    "correct_answer": "Mice (7)",
                    "child_friendly_hint": "Count them: 7 mice and 10 samosas! 7 is less than 10!",
                    "encouragement_feedback": "Squeak squeak! 7 mice is less than 10 yummy samosas!"
                }
            ]
        },
        {
            "unit_id": "unit_4_grouping_sorting",
            "unit_number": 4,
            "unit_title": "Unit 4: Grouping, Sorting & Patterns",
            "world_theme": "The Enchanted Workshop & Garden",
            "description": "Classification and relational reasoning: objects that go together, category sorting (toys vs blocks, fruits vs vegetables), colour sorting, and conceptual odd-one-out.",
            "learning_objectives": [
                "Identify real-world functional pairs / related objects that go together",
                "Group objects in natural complex scenes by shared features",
                "Sort items into dedicated containers by category (e.g. teddy bears vs blocks)",
                "Sort items into containers by colour (red, blue, yellow)",
                "Distinguish botanical/food categories (fruits vs vegetables)",
                "Identify semantic odd-one-out among groups of 4 items based on category, habitat, or function"
            ],
            "topics": [
                "We Are Related! (Functional Pairing)",
                "Scene Grouping (Common Features)",
                "Toy Box Categorization",
                "Colour Sorting (3-Way Boxes)",
                "Fruits vs Vegetables",
                "Advanced Odd-One-Out Sorting"
            ],
            "questions": [
                {
                    "id": "Q_U4_01",
                    "source_file": "math coursebook part 3.pdf",
                    "source_page": "Book p.23 (PDF p.3)",
                    "topic": "We Are Related! (Functional Pairing)",
                    "question_type": "pair_match",
                    "difficulty_level": "medium",
                    "xp_reward": 30,
                    "concept_explanation": "Some objects belong together because we use them as partners in real life!",
                    "question_text": "Connect each object on the left with its real-life partner on the right!",
                    "prompt": "Match the objects that go together!",
                    "visual_description": "Left column: Chair, Rain cloud, Padlock, Television, Motorcycle. Right column: TV Remote, Motorcycle Helmet, Umbrella, Key, Dining Table.",
                    "interactive_elements": {
                        "left_items": [
                            {"id": "L1", "name": "Chair", "emoji": "🪑"},
                            {"id": "L2", "name": "Rain Cloud", "emoji": "🌧️"},
                            {"id": "L3", "name": "Padlock", "emoji": "🔒"},
                            {"id": "L4", "name": "Television", "emoji": "📺"},
                            {"id": "L5", "name": "Motorcycle", "emoji": "🏍️"}
                        ],
                        "right_items": [
                            {"id": "R1", "name": "TV Remote", "match_id": "L4", "emoji": "📱"},
                            {"id": "R2", "name": "Helmet", "match_id": "L5", "emoji": "🪖"},
                            {"id": "R3", "name": "Umbrella", "match_id": "L2", "emoji": "☂️"},
                            {"id": "R4", "name": "Golden Key", "match_id": "L3", "emoji": "🔑"},
                            {"id": "R5", "name": "Table", "match_id": "L1", "emoji": "🪵"}
                        ],
                        "correct_pairs": [
                            {"left": "L1 (Chair)", "right": "R5 (Table)"},
                            {"left": "L2 (Rain Cloud)", "right": "R3 (Umbrella)"},
                            {"left": "L3 (Padlock)", "right": "R4 (Golden Key)"},
                            {"left": "L4 (Television)", "right": "R1 (TV Remote)"},
                            {"left": "L5 (Motorcycle)", "right": "R2 (Helmet)"}
                        ]
                    },
                    "correct_answer": "Chair<->Table, Rain Cloud<->Umbrella, Lock<->Key, TV<->Remote, Motorcycle<->Helmet",
                    "child_friendly_hint": "Think what you need when it rains, or what you wear when riding a motorbike!",
                    "encouragement_feedback": "Outstanding pairing! All partner items found their best friends!"
                },
                {
                    "id": "Q_U4_02",
                    "source_file": "math coursebook part 3.pdf",
                    "source_page": "Book p.24 (PDF p.4)",
                    "topic": "Scene Grouping (Common Features)",
                    "question_type": "grouping",
                    "difficulty_level": "medium",
                    "xp_reward": 35,
                    "concept_explanation": "In a big beautiful park scene, we can group animals, plants, and children by what they are!",
                    "question_text": "Explore the park! Circle and count each family group:",
                    "prompt": "Tap all items that belong to the specified group!",
                    "visual_description": "A vibrant meadow with a mango tree, 2 flying green parrots, 4 hanging mangoes, 3 cows grazing in grass, 2 girls skipping rope, 3 white ducks by pond, and bright yellow/red flowers.",
                    "interactive_elements": {
                        "groups": [
                            {"group_name": "Parrots in Tree", "items": ["Parrot 1", "Parrot 2"], "count": 2, "emoji": "🦜"},
                            {"group_name": "Mangoes on Tree", "items": ["Mango 1", "Mango 2", "Mango 3", "Mango 4"], "count": 4, "emoji": "🥭"},
                            {"group_name": "Grazing Cows", "items": ["Spotted Cow", "Grey Cow", "Brown Cow"], "count": 3, "emoji": "🐄"},
                            {"group_name": "Rope-Skipping Girls", "items": ["Girl Skipping", "Girl Holding Rope"], "count": 2, "emoji": "👧"},
                            {"group_name": "Ducks at the Pond", "items": ["Swimming Duck 1", "Swimming Duck 2", "Rock Duck"], "count": 3, "emoji": "🦆"},
                            {"group_name": "Flowers", "items": ["Red Tulips (3)", "Yellow Blossoms (3)"], "count": 6, "emoji": "🌷"}
                        ]
                    },
                    "correct_answer": "Grouped: 2 Parrots, 4 Mangoes, 3 Cows, 2 Girls, 3 Ducks, 6 Flowers",
                    "child_friendly_hint": "Look for items that share the exact same animal type or feature!",
                    "encouragement_feedback": "Sensational explorer skills! You organized the whole park meadow!"
                },
                {
                    "id": "Q_U4_03",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.9 (PDF p.3)",
                    "topic": "Toy Box Categorization",
                    "question_type": "grouping",
                    "difficulty_level": "medium",
                    "xp_reward": 30,
                    "concept_explanation": "Help Tara tidy her room! She has one box for soft Teddy Bears and another box for wooden Building Blocks.",
                    "question_text": "Help Tara put her toys away! Drag each toy to the correct box:",
                    "prompt": "Sort toys into the 'Teddy Bear Box' or the 'Blocks Box'!",
                    "visual_description": "Two storage boxes on the left (Red box with teddy picture, Yellow box with building blocks picture) and 6 toys on the right.",
                    "interactive_elements": {
                        "boxes": [
                            {"id": "box_bears", "name": "Teddy Bears Box (Red)", "allowed_category": "teddy_bear", "emoji": "🧸"},
                            {"id": "box_blocks", "name": "Building Blocks Box (Yellow)", "allowed_category": "block", "emoji": "🧱"}
                        ],
                        "toys": [
                            {"id": "toy1", "name": "Blue Semi-Circle Block", "category": "block", "target_box": "box_blocks"},
                            {"id": "toy2", "name": "Purple Fluffy Teddy Bear", "category": "teddy_bear", "target_box": "box_bears"},
                            {"id": "toy3", "name": "Green Cube Block", "category": "block", "target_box": "box_blocks"},
                            {"id": "toy4", "name": "Red/Orange Cuboid Block", "category": "block", "target_box": "box_blocks"},
                            {"id": "toy5", "name": "Blue Teddy Bear with Yellow Bow", "category": "teddy_bear", "target_box": "box_bears"},
                            {"id": "toy6", "name": "Light Green Teddy Bear with Ribbon", "category": "teddy_bear", "target_box": "box_bears"}
                        ]
                    },
                    "correct_answer": "Teddy Bears Box: 3 Teddy Bears; Blocks Box: 3 Shape Blocks (semi-circle, cube, cuboid)",
                    "child_friendly_hint": "Bears are soft and cuddly; blocks have flat sides and geometric shapes!",
                    "encouragement_feedback": "Tara says THANK YOU! Her playroom is neat and perfectly sorted!"
                },
                {
                    "id": "Q_U4_04",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.10 (PDF p.4)",
                    "topic": "Colour Sorting (3-Way Boxes)",
                    "question_type": "grouping",
                    "difficulty_level": "medium",
                    "xp_reward": 35,
                    "concept_explanation": "Sorting by colour brings together everything that shares the same magical hue: Red, Blue, or Yellow!",
                    "question_text": "Help Tara put each colorful object into the box with the matching colour!",
                    "prompt": "Sort items into Red Box, Blue Box, or Yellow Box!",
                    "visual_description": "Three open coloured boxes in the center (Red Box, Blue Box, Yellow Box) surrounded by 9 colourful items.",
                    "interactive_elements": {
                        "boxes": [
                            {"id": "box_red", "name": "Red Box", "color": "red", "emoji": "🟥"},
                            {"id": "box_blue", "name": "Blue Box", "color": "blue", "emoji": "🟦"},
                            {"id": "box_yellow", "name": "Yellow Box", "color": "yellow", "emoji": "🟨"}
                        ],
                        "items": [
                            {"id": "item1", "name": "Red Rose Flower", "color": "red", "target_box": "box_red", "emoji": "🌹"},
                            {"id": "item2", "name": "Yellow Dress", "color": "yellow", "target_box": "box_yellow", "emoji": "👗"},
                            {"id": "item3", "name": "Red Juicy Apple", "color": "red", "target_box": "box_red", "emoji": "🍎"},
                            {"id": "item4", "name": "Blue Running Shoes", "color": "blue", "target_box": "box_blue", "emoji": "👟"},
                            {"id": "item5", "name": "Yellow Sour Lemon", "color": "yellow", "target_box": "box_yellow", "emoji": "🍋"},
                            {"id": "item6", "name": "Blue Singing Bird", "color": "blue", "target_box": "box_blue", "emoji": "🐦"},
                            {"id": "item7", "name": "Red Crayon", "color": "red", "target_box": "box_red", "emoji": "🖍️"},
                            {"id": "item8", "name": "Yellow Rubber Duck", "color": "yellow", "target_box": "box_yellow", "emoji": "🦆"},
                            {"id": "item9", "name": "Blue School Backpack", "color": "blue", "target_box": "box_blue", "emoji": "🎒"}
                        ]
                    },
                    "correct_answer": "Red Box: Rose, Apple, Crayon; Blue Box: Shoes, Bird, Backpack; Yellow Box: Dress, Lemon, Duck",
                    "child_friendly_hint": "Match the paint on each object to the colour of the open box!",
                    "encouragement_feedback": "A rainbow of perfection! 3 Red, 3 Blue, and 3 Yellow items all sorted!"
                },
                {
                    "id": "Q_U4_05",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.11 (PDF p.1)",
                    "topic": "Fruits vs Vegetables",
                    "question_type": "grouping",
                    "difficulty_level": "medium",
                    "xp_reward": 30,
                    "concept_explanation": "Healthy eating! Sweet tree and vine treats are FRUITS (colour yellow). Garden veggies are VEGETABLES (colour green).",
                    "question_text": "Sort the food! Separate the sweet FRUITS from the healthy VEGETABLES:",
                    "prompt": "Identify each food item as Fruit (Yellow) or Vegetable (Green)!",
                    "visual_description": "A page showing 7 fresh foods: Mango, Papaya, Banana, Okra (Lady's Finger), Green Peas in pod, Bell Pepper (Capsicum), Head of Cabbage.",
                    "interactive_elements": {
                        "items": [
                            {"id": "food_mango", "name": "Mango", "type": "fruit", "correct_group": "fruits", "emoji": "🥭"},
                            {"id": "food_papaya", "name": "Papaya", "type": "fruit", "correct_group": "fruits", "emoji": "🍈"},
                            {"id": "food_banana", "name": "Banana", "type": "fruit", "correct_group": "fruits", "emoji": "🍌"},
                            {"id": "food_okra", "name": "Okra (Lady's Finger)", "type": "vegetable", "correct_group": "vegetables", "emoji": "🌱"},
                            {"id": "food_peas", "name": "Green Peas in Pod", "type": "vegetable", "correct_group": "vegetables", "emoji": "🫛"},
                            {"id": "food_capsicum", "name": "Green Bell Pepper (Capsicum)", "type": "vegetable", "correct_group": "vegetables", "emoji": "🫑"},
                            {"id": "food_cabbage", "name": "Round Cabbage", "type": "vegetable", "correct_group": "vegetables", "emoji": "🥬"}
                        ]
                    },
                    "correct_answer": "Fruits (Yellow): Mango, Papaya, Banana; Vegetables (Green): Okra, Peas, Capsicum, Cabbage",
                    "child_friendly_hint": "Mango, Papaya, and Banana are sweet juicy fruits! Okra, Peas, Capsicum, and Cabbage are crunchy vegetables!",
                    "encouragement_feedback": "Chef's kiss! You know your fruits and veggies like a master gardener!"
                },
                {
                    "id": "Q_U4_06",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.12 (PDF p.2)",
                    "topic": "Advanced Odd-One-Out Sorting",
                    "question_type": "odd_one_out",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Look at the colour of all four apples in the row.",
                    "question_text": "Which apple is the odd one out in this row?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Row 1: Red apple, Green apple, Red apple, Red apple.",
                    "interactive_elements": {
                        "items": [
                            {"id": "a1", "label": "Red Apple", "color": "red", "is_odd": False, "emoji": "🍎"},
                            {"id": "a2", "label": "Green Apple", "color": "green", "is_odd": True, "emoji": "🍏"},
                            {"id": "a3", "label": "Red Apple", "color": "red", "is_odd": False, "emoji": "🍎"},
                            {"id": "a4", "label": "Red Apple", "color": "red", "is_odd": False, "emoji": "🍎"}
                        ]
                    },
                    "correct_answer": "Green Apple",
                    "child_friendly_hint": "Three apples are bright red, but one is shiny green!",
                    "encouragement_feedback": "Crisp and clear! The green apple is the odd one out!"
                },
                {
                    "id": "Q_U4_07",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.12 (PDF p.2)",
                    "topic": "Advanced Odd-One-Out Sorting",
                    "question_type": "odd_one_out",
                    "difficulty_level": "medium",
                    "xp_reward": 20,
                    "concept_explanation": "Three items have wheels and take people places on roads, but one is an indoor screen!",
                    "question_text": "Which item does NOT belong with the vehicles?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Row 2: Family car, Passenger bus, Green dump truck, Television set.",
                    "interactive_elements": {
                        "items": [
                            {"id": "v1", "label": "Car", "category": "vehicle", "is_odd": False, "emoji": "🚗"},
                            {"id": "v2", "label": "Bus", "category": "vehicle", "is_odd": False, "emoji": "🚌"},
                            {"id": "v3", "label": "Truck", "category": "vehicle", "is_odd": False, "emoji": "🚚"},
                            {"id": "v4", "label": "Television Set", "category": "home_appliance", "is_odd": True, "emoji": "📺"}
                        ]
                    },
                    "correct_answer": "Television Set",
                    "child_friendly_hint": "Cars, buses, and trucks drive on roads. You watch television at home!",
                    "encouragement_feedback": "Beep beep! The TV stays in the living room, it cannot drive!"
                },
                {
                    "id": "Q_U4_08",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.12 (PDF p.2)",
                    "topic": "Advanced Odd-One-Out Sorting",
                    "question_type": "odd_one_out",
                    "difficulty_level": "medium",
                    "xp_reward": 20,
                    "concept_explanation": "Three items grow on plants in nature as healthy fresh fruits, but one is an ice cold dessert!",
                    "question_text": "Which item is the odd one out?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Row 3: Ice cream waffle cone, Bunch of green grapes, Whole orange, Striped watermelon.",
                    "interactive_elements": {
                        "items": [
                            {"id": "f1", "label": "Ice Cream Cone", "category": "dessert", "is_odd": True, "emoji": "🍦"},
                            {"id": "f2", "label": "Grapes", "category": "fruit", "is_odd": False, "emoji": "🍇"},
                            {"id": "f3", "label": "Orange", "category": "fruit", "is_odd": False, "emoji": "🍊"},
                            {"id": "f4", "label": "Watermelon", "category": "fruit", "is_odd": False, "emoji": "🍉"}
                        ]
                    },
                    "correct_answer": "Ice Cream Cone",
                    "child_friendly_hint": "Grapes, oranges, and watermelon grow from plants. Ice cream is made in the kitchen!",
                    "encouragement_feedback": "Cool thinking! Ice cream is a frozen sweet, while the others are fresh fruits!"
                },
                {
                    "id": "Q_U4_09",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.12 (PDF p.2)",
                    "topic": "Advanced Odd-One-Out Sorting",
                    "question_type": "odd_one_out",
                    "difficulty_level": "hard",
                    "xp_reward": 25,
                    "concept_explanation": "Look up at the sky! The sun, moon, and stars live up high in the sky. Where does the ocean wave live?",
                    "question_text": "Which picture does NOT belong with the sky?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Row 4: Crescent moon in night sky, Blue cresting water wave, Sparkling stars in night sky, Golden bright sun in daytime cloud.",
                    "interactive_elements": {
                        "items": [
                            {"id": "s1", "label": "Crescent Moon", "domain": "sky", "is_odd": False, "emoji": "🌙"},
                            {"id": "s2", "label": "Water Wave", "domain": "sea", "is_odd": True, "emoji": "🌊"},
                            {"id": "s3", "label": "Sparkling Stars", "domain": "sky", "is_odd": False, "emoji": "⭐"},
                            {"id": "s4", "label": "Golden Sun", "domain": "sky", "is_odd": False, "emoji": "☀️"}
                        ]
                    },
                    "correct_answer": "Water Wave",
                    "child_friendly_hint": "The moon, stars, and sun shine in the sky above. The wave splashes down in the sea!",
                    "encouragement_feedback": "Cosmic discovery! The ocean wave is water on earth, not up in the celestial sky!"
                },
                {
                    "id": "Q_U4_10",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.12 (PDF p.2)",
                    "topic": "Advanced Odd-One-Out Sorting",
                    "question_type": "odd_one_out",
                    "difficulty_level": "medium",
                    "xp_reward": 20,
                    "concept_explanation": "Three pieces of equipment are for playing outside on the playground, but one belongs in a room!",
                    "question_text": "Which item does NOT belong on the playground?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Row 5: Wooden book cupboard/almirah, Monkey bars climbing gym, Playground slide, Playground swing set.",
                    "interactive_elements": {
                        "items": [
                            {"id": "p1", "label": "Wooden Cupboard", "location": "indoor_room", "is_odd": True, "emoji": "🚪"},
                            {"id": "p2", "label": "Monkey Bars", "location": "playground", "is_odd": False, "emoji": "🪜"},
                            {"id": "p3", "label": "Playground Slide", "location": "playground", "is_odd": False, "emoji": "🛝"},
                            {"id": "p4", "label": "Playground Swing", "location": "playground", "is_odd": False, "emoji": "🪅"}
                        ]
                    },
                    "correct_answer": "Wooden Cupboard",
                    "child_friendly_hint": "You climb, slide, and swing on the playground! A wooden cupboard keeps books inside the house!",
                    "encouragement_feedback": "Playtime champion! The cupboard is indoor furniture!"
                }
            ]
        },
        {
            "unit_id": "unit_5_review_boss_challenges",
            "unit_number": 5,
            "unit_title": "Unit 5: Review & Integrated Boss Challenges",
            "world_theme": "The Grand Master Castle & Quest Arena",
            "description": "Culminating challenges that integrate multiple concepts: mixed comparisons, one-to-one correspondence verification, equal sets construction, cross-domain phonics & math, and multi-attribute sorting.",
            "learning_objectives": [
                "Demonstrate mastery across all visual comparison categories (same, big, heavy, tall, thick, long)",
                "Construct and verify equal sets through 1-to-1 matching",
                "Integrate initial phonics letter identification with weight comparison",
                "Execute complex multi-criteria grouping and color discrimination"
            ],
            "topics": [
                "Grand Comparison Review",
                "Equal Sets Construction (Sports Arena)",
                "Pairing and Association Review",
                "Animal Family Circles",
                "Boss Challenge: Phonics & Weight Integration",
                "Boss Challenge: Master Colour Grouping"
            ],
            "questions": [
                {
                    "id": "Q_U5_01",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.7 (PDF p.1)",
                    "topic": "Grand Comparison Review",
                    "question_type": "same_different",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Find the two flowers that are exactly the same in colour, petals, and leaves!",
                    "question_text": "Which two flowers are the SAME in this row?",
                    "prompt": "Tap the two flowers that are the SAME!",
                    "visual_description": "Row 1: Red rose bud with leaves, Red rose bud with leaves, Yellow open lily/blossom.",
                    "interactive_elements": {
                        "items": [
                            {"id": "r1", "label": "Red Rose 1", "is_same": True, "emoji": "🌹"},
                            {"id": "r2", "label": "Red Rose 2", "is_same": True, "emoji": "🌹"},
                            {"id": "y1", "label": "Yellow Lily", "is_same": False, "emoji": "🌼"}
                        ]
                    },
                    "correct_answer": "Red Rose 1 and Red Rose 2",
                    "child_friendly_hint": "Both red roses are matching twins!",
                    "encouragement_feedback": "Blooming brilliance! The two red roses are identical!"
                },
                {
                    "id": "Q_U5_02",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.7 (PDF p.1)",
                    "topic": "Grand Comparison Review",
                    "question_type": "same_different",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Find the two items that look exactly like each other.",
                    "question_text": "Which two objects are the SAME in this row?",
                    "prompt": "Tap the two identical objects!",
                    "visual_description": "Row 2: Pink balloon on string, Blue car, Pink balloon on string.",
                    "interactive_elements": {
                        "items": [
                            {"id": "b1", "label": "Pink Balloon 1", "is_same": True, "emoji": "🎈"},
                            {"id": "c1", "label": "Blue Car", "is_same": False, "emoji": "🚗"},
                            {"id": "b2", "label": "Pink Balloon 2", "is_same": True, "emoji": "🎈"}
                        ]
                    },
                    "correct_answer": "Pink Balloon 1 and Pink Balloon 2",
                    "child_friendly_hint": "Two are round pink balloons, and the middle one is a car!",
                    "encouragement_feedback": "Up, up, and away! The two pink balloons match perfectly!"
                },
                {
                    "id": "Q_U5_03",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.7 (PDF p.1)",
                    "topic": "Grand Comparison Review",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Compare the mother cow and her baby calf.",
                    "question_text": "Which animal is the BIGGER one?",
                    "prompt": "Tap the BIGGER animal!",
                    "visual_description": "A large spotted brown-and-white mother cow next to her tiny baby calf.",
                    "interactive_elements": {
                        "items": [
                            {"id": "cow", "label": "Mother Cow", "size": "big", "is_correct": True, "emoji": "🐄"},
                            {"id": "calf", "label": "Baby Calf", "size": "small", "is_correct": False, "emoji": "🐮"}
                        ]
                    },
                    "correct_answer": "Mother Cow",
                    "child_friendly_hint": "The mother cow is fully grown and much larger than her baby!",
                    "encouragement_feedback": "Moo-vellous! Mother cow is definitely the bigger animal!"
                },
                {
                    "id": "Q_U5_04",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.7 (PDF p.1)",
                    "topic": "Grand Comparison Review",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Think about holding socks versus holding heavy outdoor sneakers.",
                    "question_text": "Which footwear item is HEAVIER?",
                    "prompt": "Tap the HEAVIER item!",
                    "visual_description": "A pair of soft red-and-white striped cloth socks vs a pair of sturdy blue rubber-soled sneakers.",
                    "interactive_elements": {
                        "items": [
                            {"id": "socks", "label": "Striped Cloth Socks", "weight": "light", "is_correct": False, "emoji": "🧦"},
                            {"id": "shoes", "label": "Blue Rubber Sneakers", "weight": "heavy", "is_correct": True, "emoji": "👟"}
                        ]
                    },
                    "correct_answer": "Blue Rubber Sneakers",
                    "child_friendly_hint": "Shoes have thick rubber soles and laces, making them heavier than soft socks!",
                    "encouragement_feedback": "Step ahead! The sneakers are heavier than the cloth socks!"
                },
                {
                    "id": "Q_U5_05",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.7 (PDF p.1)",
                    "topic": "Grand Comparison Review",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Compare the heights of two palm trees.",
                    "question_text": "Which palm tree is TALLER?",
                    "prompt": "Tap the TALLER tree!",
                    "visual_description": "Left palm tree standing tall vs Right palm tree standing noticeably shorter.",
                    "interactive_elements": {
                        "items": [
                            {"id": "tree_left", "label": "Left Palm Tree", "height": "tall", "is_correct": True, "emoji": "🌴"},
                            {"id": "tree_right", "label": "Right Palm Tree", "height": "short", "is_correct": False, "emoji": "🌴"}
                        ]
                    },
                    "correct_answer": "Left Palm Tree",
                    "child_friendly_hint": "The left tree trunk reaches way up into the sky!",
                    "encouragement_feedback": "Reaching high! The left palm tree is much taller!"
                },
                {
                    "id": "Q_U5_06",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.7 (PDF p.1)",
                    "topic": "Grand Comparison Review",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Look at the width and thickness of the two marker pens.",
                    "question_text": "Which marker pen is THICKER?",
                    "prompt": "Tap the THICKER pen!",
                    "visual_description": "A slim yellow-and-orange marker pen vs a chubby fat broad-tip marker pen.",
                    "interactive_elements": {
                        "items": [
                            {"id": "marker_slim", "label": "Slim Marker Pen", "thickness": "thin", "is_correct": False, "emoji": "🖊️"},
                            {"id": "marker_chubby", "label": "Chubby Fat Marker Pen", "thickness": "thick", "is_correct": True, "emoji": "🖍️"}
                        ]
                    },
                    "correct_answer": "Chubby Fat Marker Pen",
                    "child_friendly_hint": "The second marker has a wide, chubby barrel!",
                    "encouragement_feedback": "Bold and bright! The chubby marker is definitely thicker!"
                },
                {
                    "id": "Q_U5_07",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.8 (PDF p.2)",
                    "topic": "Grand Comparison Review",
                    "question_type": "size_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Comparing clothes length from waist to hem.",
                    "question_text": "Which skirt is LONGER: the pink floral maxi skirt or the blue mini skirt?",
                    "prompt": "Tap the LONGER skirt!",
                    "visual_description": "A long flowing pink floral skirt reaching down vs a short flared dark blue skirt.",
                    "interactive_elements": {
                        "items": [
                            {"id": "skirt_pink", "label": "Pink Floral Long Skirt", "length": "long", "is_correct": True, "emoji": "👗"},
                            {"id": "skirt_blue", "label": "Blue Short Skirt", "length": "short", "is_correct": False, "emoji": "👗"}
                        ]
                    },
                    "correct_answer": "Pink Floral Long Skirt",
                    "child_friendly_hint": "The pink floral skirt extends all the way down to the ankles!",
                    "encouragement_feedback": "Fashionable! The pink floral skirt is much longer!"
                },
                {
                    "id": "Q_U5_08",
                    "source_file": "math workbook part 1.pdf",
                    "source_page": "Book p.8 (PDF p.2)",
                    "topic": "Grand Comparison Review",
                    "question_type": "quantity_compare",
                    "difficulty_level": "easy",
                    "xp_reward": 20,
                    "concept_explanation": "Compare the hair on both boys' heads!",
                    "question_text": "Which boy has MORE hair?",
                    "prompt": "Tap the child with MORE hair!",
                    "visual_description": "Left boy with a thick mop of black hair vs Right boy with a bald head and only 1-2 tiny strands.",
                    "interactive_elements": {
                        "items": [
                            {"id": "boy_full_hair", "label": "Boy with Thick Black Hair", "hair": "more", "is_correct": True, "emoji": "👦"},
                            {"id": "boy_bald", "label": "Boy with Bald Head", "hair": "less", "is_correct": False, "emoji": "👶"}
                        ]
                    },
                    "correct_answer": "Boy with Thick Black Hair",
                    "child_friendly_hint": "The first boy has a full head of fluffy black hair!",
                    "encouragement_feedback": "Great styling! The boy on the left has so much more hair!"
                },
                {
                    "id": "Q_U5_09",
                    "source_file": "math work book part 2.pdf",
                    "source_page": "Book p.13 (PDF p.3)",
                    "topic": "Equal Sets Construction (Sports Arena)",
                    "question_type": "equal_sets",
                    "difficulty_level": "hard",
                    "xp_reward": 40,
                    "concept_explanation": "In our sports playground, there are 8 young athletes playing cricket, football, and running! To make an equal set so EVERY child can play, how many sports balls do we need?",
                    "question_text": "There are 8 children on the playground. How many balls must we provide so that each child has exactly 1 ball?",
                    "prompt": "Choose the exact number of balls to make an EQUAL SET!",
                    "visual_description": "8 active children playing various sports: batsman, wicketkeeper, cricket bowler, kicker in #3 jersey, runner in #10 shirt, jumper, runner, and dancer.",
                    "interactive_elements": {
                        "children_count": 8,
                        "options": [
                            {"id": "opt_6", "count": 6, "text": "6 balls (2 children will have no ball)", "is_correct": False},
                            {"id": "opt_8", "count": 8, "text": "8 balls (Exactly 1 ball for each of the 8 children!)", "is_correct": True},
                            {"id": "opt_10", "count": 10, "text": "10 balls (Too many balls!)", "is_correct": False}
                        ]
                    },
                    "correct_answer": "8 balls (Exactly 1 ball for each of the 8 children!)",
                    "child_friendly_hint": "One ball for each child: 1, 2, 3, 4, 5, 6, 7, 8! You need 8 balls!",
                    "encouragement_feedback": "Goal! Match point! 8 balls for 8 players makes a completely EQUAL SET!"
                },
                {
                    "id": "Q_U5_10",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.16 (PDF p.2)",
                    "topic": "Pairing and Association Review",
                    "question_type": "pair_match",
                    "difficulty_level": "medium",
                    "xp_reward": 30,
                    "concept_explanation": "Match everyday friends: foods that taste delicious together, clothes and shoes, and sports games!",
                    "question_text": "Connect the matching pairs that go together in daily life!",
                    "prompt": "Match each item in the top row to its partner in the bottom row!",
                    "visual_description": "Top: Slices of Bread, Pair of Blue Sneakers, Basketball, Yellow Shirt. Bottom: Basketball Hoop, Yellow Pants, Striped Socks, Sweet Jam Jar.",
                    "interactive_elements": {
                        "top_items": [
                            {"id": "top_bread", "name": "Slices of Bread", "emoji": "🍞"},
                            {"id": "top_sneakers", "name": "Blue Sneakers", "emoji": "👟"},
                            {"id": "top_basketball", "name": "Basketball", "emoji": "🏀"},
                            {"id": "top_shirt", "name": "Yellow Shirt", "emoji": "👕"}
                        ],
                        "bottom_items": [
                            {"id": "bot_hoop", "name": "Basketball Hoop", "match_id": "top_basketball", "emoji": "🗑️"},
                            {"id": "bot_pants", "name": "Yellow Pants", "match_id": "top_shirt", "emoji": "👖"},
                            {"id": "bot_socks", "name": "Striped Socks", "match_id": "top_sneakers", "emoji": "🧦"},
                            {"id": "bot_jam", "name": "Strawberry Jam Jar", "match_id": "top_bread", "emoji": "🍓"}
                        ],
                        "correct_pairs": [
                            {"bread": "Sweet Jam Jar"},
                            {"sneakers": "Striped Socks"},
                            {"basketball": "Basketball Hoop"},
                            {"shirt": "Yellow Pants"}
                        ]
                    },
                    "correct_answer": "Bread<->Jam, Sneakers<->Socks, Basketball<->Hoop, Shirt<->Pants",
                    "child_friendly_hint": "Bread loves sweet jam; socks go inside sneakers; basketball shoots into the hoop; shirt matches pants!",
                    "encouragement_feedback": "Slam dunk! All 4 pairs are perfectly matched together!"
                },
                {
                    "id": "Q_U5_11",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.16 (PDF p.2)",
                    "topic": "Animal Family Circles",
                    "question_type": "grouping",
                    "difficulty_level": "medium",
                    "xp_reward": 30,
                    "concept_explanation": "Group these animal friends into their natural families: feathered birds, tiny spotted ladybugs, and friendly dogs!",
                    "question_text": "How many animal groups can you form?",
                    "prompt": "Group the animals into their 3 families!",
                    "visual_description": "3 colourful birds perched on a branch (yellow, blue, red), 3 red spotted ladybugs, and 2 dogs (spotted Dalmatian lying down and brown/white dog standing).",
                    "interactive_elements": {
                        "families": [
                            {"family_name": "Birds on Branch", "count": 3, "emoji": "🐦"},
                            {"family_name": "Ladybugs", "count": 3, "emoji": "🐞"},
                            {"family_name": "Pet Dogs", "count": 2, "emoji": "🐕"}
                        ]
                    },
                    "correct_answer": "Group 1: 3 Birds; Group 2: 3 Ladybugs; Group 3: 2 Dogs",
                    "child_friendly_hint": "Circle the birds together on the tree, the ladybugs on the ground, and the dogs together!",
                    "encouragement_feedback": "Animal whisperer! All 3 animal families are happily grouped together!"
                },
                {
                    "id": "Q_U5_12",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.16 (PDF p.2)",
                    "topic": "Advanced Odd-One-Out",
                    "question_type": "odd_one_out",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Three items are delicious foods you can eat, but one is a bucket made of plastic/metal!",
                    "question_text": "Which object is the odd one out?",
                    "prompt": "Tap the odd one out!",
                    "visual_description": "Bowl of ice cream scoops, Slice of frosted cake with cherry, Fresh sandwich, Yellow utility bucket with handle.",
                    "interactive_elements": {
                        "items": [
                            {"id": "food_icecream", "label": "Ice Cream Bowl", "category": "food", "is_odd": False, "emoji": "🍨"},
                            {"id": "food_cake", "label": "Cake Slice", "category": "food", "is_odd": False, "emoji": "🍰"},
                            {"id": "food_sandwich", "label": "Sandwich", "category": "food", "is_odd": False, "emoji": "🥪"},
                            {"id": "tool_bucket", "label": "Yellow Bucket", "category": "tool/container", "is_odd": True, "emoji": "🪣"}
                        ]
                    },
                    "correct_answer": "Yellow Bucket",
                    "child_friendly_hint": "You can eat ice cream, cake, and a sandwich. You cannot eat a bucket!",
                    "encouragement_feedback": "Spot on! The yellow bucket is for carrying water or sand, not for eating!"
                },
                {
                    "id": "Q_U5_13",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.17 (PDF p.3)",
                    "topic": "1-to-1 Correspondence & More",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Spiders build webs! Match each spider to a web and find which set has MORE.",
                    "question_text": "There are 3 crawling spiders and 4 glowing green spiderwebs. Which set has MORE?",
                    "prompt": "Tap the set with MORE!",
                    "visual_description": "Top: 3 cartoon spiders. Bottom: 4 web drawings in a row.",
                    "interactive_elements": {
                        "spiders": {"count": 3, "label": "Spiders", "emoji": "🕷️"},
                        "webs": {"count": 4, "label": "Spiderwebs", "emoji": "🕸️"},
                        "options": [
                            {"id": "opt_spiders", "text": "Spiders (3)", "is_correct": False},
                            {"id": "opt_webs", "text": "Spiderwebs (4)", "is_correct": True}
                        ]
                    },
                    "correct_answer": "Spiderwebs (4)",
                    "child_friendly_hint": "Match them: 3 spiders get 3 webs, and there is 1 web left over! 4 is more than 3!",
                    "encouragement_feedback": "Web-tastic! 4 spiderwebs is more than 3 spiders!"
                },
                {
                    "id": "Q_U5_14",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.17 (PDF p.3)",
                    "topic": "1-to-1 Correspondence & More",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Birds fly home to their cozy nests! Match each bird to a nest.",
                    "question_text": "There are 5 singing blue birds and 4 cozy tree nests. Which set has MORE?",
                    "prompt": "Tap the set with MORE!",
                    "visual_description": "Top: 5 blue birds chirping on branches. Bottom: 4 twig nests with leaves.",
                    "interactive_elements": {
                        "birds": {"count": 5, "label": "Blue Birds", "emoji": "🐦"},
                        "nests": {"count": 4, "label": "Tree Nests", "emoji": "🪺"},
                        "options": [
                            {"id": "opt_birds", "text": "Blue Birds (5)", "is_correct": True},
                            {"id": "opt_nests", "text": "Tree Nests (4)", "is_correct": False}
                        ]
                    },
                    "correct_answer": "Blue Birds (5)",
                    "child_friendly_hint": "4 nests can hold 4 birds, but 1 bird is still looking for a nest! 5 is more than 4!",
                    "encouragement_feedback": "Chirp chirp! 5 birds is more than 4 nests!"
                },
                {
                    "id": "Q_U5_15",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.17 (PDF p.3)",
                    "topic": "1-to-1 Correspondence & Less",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Little crawling babies love their warm milk bottles! Match babies to bottles.",
                    "question_text": "There are 4 crawling babies and 5 milk bottles. Which set has LESS?",
                    "prompt": "Tap the set with LESS!",
                    "visual_description": "Top: 4 cheerful crawling babies. Bottom: 5 baby feeding bottles with blue caps.",
                    "interactive_elements": {
                        "babies": {"count": 4, "label": "Crawling Babies", "emoji": "👶"},
                        "bottles": {"count": 5, "label": "Milk Bottles", "emoji": "🍼"},
                        "options": [
                            {"id": "opt_babies", "text": "Babies (4)", "is_correct": True},
                            {"id": "opt_bottles", "text": "Milk Bottles (5)", "is_correct": False}
                        ]
                    },
                    "correct_answer": "Babies (4)",
                    "child_friendly_hint": "4 babies is less than 5 milk bottles!",
                    "encouragement_feedback": "Super nurturing! 4 babies is less than 5 bottles!"
                },
                {
                    "id": "Q_U5_16",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.17 (PDF p.3)",
                    "topic": "1-to-1 Correspondence & Less",
                    "question_type": "quantity_compare",
                    "difficulty_level": "medium",
                    "xp_reward": 25,
                    "concept_explanation": "Snack time! 4 children want ice cream sundaes.",
                    "question_text": "There are 4 waiting children and 3 ice cream sundae bowls. Which set has LESS?",
                    "prompt": "Tap the set with LESS!",
                    "visual_description": "Top: 4 standing children (2 boys, 2 girls). Bottom: 3 glass bowls with tri-colour ice cream and spoons.",
                    "interactive_elements": {
                        "children": {"count": 4, "label": "Children", "emoji": "👧👦"},
                        "sundaes": {"count": 3, "label": "Ice Cream Sundaes", "emoji": "🍨"},
                        "options": [
                            {"id": "opt_children", "text": "Children (4)", "is_correct": False},
                            {"id": "opt_sundaes", "text": "Ice Cream Sundaes (3)", "is_correct": True}
                        ]
                    },
                    "correct_answer": "Ice Cream Sundaes (3)",
                    "child_friendly_hint": "There are only 3 bowls of ice cream, but 4 hungry kids! 3 is less than 4!",
                    "encouragement_feedback": "Spot on! 3 ice creams is less than 4 children!"
                },
                {
                    "id": "Q_U5_17",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.18 (PDF p.4)",
                    "topic": "Boss Challenge: Phonics & Weight Integration",
                    "question_type": "multiple_choice",
                    "difficulty_level": "hard",
                    "xp_reward": 50,
                    "concept_explanation": "A dual quest combining Math (Weight) and English Phonics (Beginning Letter sounds)!",
                    "question_text": "Boss Quest Part 1: Look at the Blue Car and the Soccer Ball. Which one is HEAVY, and what are their beginning letters?",
                    "prompt": "Circle the HEAVY object and pick the correct beginning letters!",
                    "visual_description": "A heavy dark blue sedan car with box below for letter 'C', and an inflated soccer ball with box below for letter 'B'.",
                    "interactive_elements": {
                        "heavy_choice": {
                            "question": "Which object is HEAVY?",
                            "options": [
                                {"id": "obj_car", "text": "Car (Heavy!)", "is_correct": True, "emoji": "🚗"},
                                {"id": "obj_ball", "text": "Ball (Light)", "is_correct": False, "emoji": "⚽"}
                            ]
                        },
                        "phonics_choice": {
                            "car_letter": {"letter": "C", "word": "Car"},
                            "ball_letter": {"letter": "B", "word": "Ball"},
                            "options": [
                                {"id": "opt_cb", "text": "Car begins with 'C', Ball begins with 'B'", "is_correct": True},
                                {"id": "opt_bc", "text": "Car begins with 'B', Ball begins with 'C'", "is_correct": False},
                                {"id": "opt_ab", "text": "Car begins with 'A', Ball begins with 'B'", "is_correct": False}
                            ]
                        }
                    },
                    "correct_answer": "Car is HEAVY; Car begins with letter 'C', Ball begins with letter 'B'",
                    "child_friendly_hint": "A car weighs thousands of pounds! C-C-Car starts with C, and B-B-Ball starts with B!",
                    "encouragement_feedback": "LEGENDARY! You crushed the Integrated Boss Challenge! C is for Car (heavy) and B is for Ball!"
                },
                {
                    "id": "Q_U5_18",
                    "source_file": "math workbook part 3.pdf",
                    "source_page": "Book p.18 (PDF p.4)",
                    "topic": "Boss Challenge: Master Colour Grouping",
                    "question_type": "grouping",
                    "difficulty_level": "hard",
                    "xp_reward": 50,
                    "concept_explanation": "Final Boss Quest: Among a mixed rainbow of 8 items, find and circle ALL the radiant YELLOW objects!",
                    "question_text": "Final Boss Quest: Circle ALL the objects that are YELLOW!",
                    "prompt": "Tap every single YELLOW object!",
                    "visual_description": "8 objects arranged across two rows: Open yellow cardboard box, Green apple, Blue teacup, Red helmet, Green bunch of grapes, Yellow rubber duck, Yellow dress, Bright yellow sunflower.",
                    "interactive_elements": {
                        "all_items": [
                            {"id": "item1", "name": "Yellow Box", "color": "yellow", "is_target": True, "emoji": "📦"},
                            {"id": "item2", "name": "Green Apple", "color": "green", "is_target": False, "emoji": "🍏"},
                            {"id": "item3", "name": "Blue Teacup", "color": "blue", "is_target": False, "emoji": "🍵"},
                            {"id": "item4", "name": "Red Motorcycle Helmet", "color": "red", "is_target": False, "emoji": "🪖"},
                            {"id": "item5", "name": "Green Grapes", "color": "green", "is_target": False, "emoji": "🍇"},
                            {"id": "item6", "name": "Yellow Rubber Duck", "color": "yellow", "is_target": True, "emoji": "🦆"},
                            {"id": "item7", "name": "Yellow Dress", "color": "yellow", "is_target": True, "emoji": "👗"},
                            {"id": "item8", "name": "Yellow Sunflower", "color": "yellow", "is_target": True, "emoji": "🌻"}
                        ],
                        "correct_yellow_ids": ["item1", "item6", "item7", "item8"],
                        "total_yellow_count": 4
                    },
                    "correct_answer": "4 Yellow Objects: Yellow Box, Yellow Rubber Duck, Yellow Dress, Yellow Sunflower",
                    "child_friendly_hint": "Look for the warm sunny colour of the sun: box, duck, dress, sunflower!",
                    "encouragement_feedback": "GOLD MEDAL CHAMPION! You found all 4 yellow objects and conquered the Final Boss Arena!"
                }
            ]
        }
    ]
}

# Calculate summary statistics
total_questions = sum(len(u["questions"]) for u in curriculum["units"])
curriculum["metadata"]["total_questions_extracted"] = total_questions
curriculum["metadata"]["units_count"] = len(curriculum["units"])

# Target file paths
target_paths = [
    r"C:\Users\Sreeh\.gemini\antigravity\brain\85473965-3182-422e-bcbb-e46c0052d90d\scratch\extracted_curriculum.json",
    r"C:\Users\Sreeh\.gemini\antigravity\brain\68de094c-261b-4646-8092-6f620ce3bf02\scratch\extracted_curriculum.json",
    r"C:\Users\Sreeh\.gemini\antigravity\brain\68de094c-261b-4646-8092-6f620ce3bf02\extracted_curriculum.json",
    r"D:\Aghanya Exam\scratch\extracted_curriculum.json",
    r"D:\Aghanya Exam\extracted_curriculum.json"
]

for path in target_paths:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(curriculum, f, indent=2, ensure_ascii=False)
    print(f"Successfully saved to: {path} ({os.path.getsize(path)} bytes)")

print("\nCurriculum Summary:")
print(f"Total Units: {len(curriculum['units'])}")
print(f"Total Questions Formulated: {total_questions}")
for u in curriculum["units"]:
    print(f"  {u['unit_title']}: {len(u['questions'])} interactive questions")
