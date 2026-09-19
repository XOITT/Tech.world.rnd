import re

file_path = 'd:/Aghanya Exam/src/data/curriculumData.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    ("id: 'math-lvl-1',", "id: 'math-lvl-1',\n        bookReference: 'Math Coursebook Part 1 (p. 1-2) & Workbook Part 1 (p. 1)',"),
    ("id: 'math-lvl-2',", "id: 'math-lvl-2',\n        bookReference: 'Math Coursebook Part 1 (p. 3: I Am Different!) & Workbook Part 2 (p. 2)',"),
    ("id: 'math-lvl-3',", "id: 'math-lvl-3',\n        bookReference: 'Math Coursebook Part 1 (p. 4: Big/Small) & Part 2 (p. 2, 4)',"),
    ("id: 'math-lvl-4',", "id: 'math-lvl-4',\n        bookReference: 'Math Coursebook Part 2 (p. 1: Heavy/Light, p. 3: Thick/Thin) & Workbook Part 3',"),
    ("id: 'math-lvl-5',", "id: 'math-lvl-5',\n        bookReference: 'Math Coursebook Part 3 (p. 1: More/Less, p. 2: Few/Many) & Workbook Part 2',"),
    ("id: 'math-lvl-6',", "id: 'math-lvl-6',\n        bookReference: 'Math Coursebook Part 4 (p. 1: Equal Sets, p. 3: Frogs & Rocks) & Workbook Part 3',"),
    ("id: 'math-lvl-7',", "id: 'math-lvl-7',\n        bookReference: 'Math Coursebook Part 3 (p. 3: Related, p. 4: Grouping) & Workbook Part 1',"),
    ("id: 'math-lvl-8',", "id: 'math-lvl-8',\n        bookReference: 'Pre-Number Groups & Visual Multiplication Concept',"),
    ("id: 'math-lvl-9',", "id: 'math-lvl-9',\n        bookReference: 'Comprehensive Coursebooks & Workbooks Summit Review',"),
]

for old, new in replacements:
    if old in content and new not in content:
        content = content.replace(old, new, 1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated curriculumData.ts successfully with coursebook and workbook references!')
