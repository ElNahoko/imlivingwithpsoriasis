export type Verdict = 'eat' | 'moderate' | 'limit'
export type FoodCategory =
  | 'fish' | 'meat' | 'dairy' | 'veg' | 'fruit' | 'grain' | 'fat' | 'spice' | 'drink' | 'snack'

export type Food = {
  emoji: string
  name: string
  category: FoodCategory
  verdict: Verdict
  why: string
}

export const CATEGORY_LABELS: Record<FoodCategory, string> = {
  fish: 'Fish & seafood',
  meat: 'Meat & eggs',
  dairy: 'Dairy',
  veg: 'Vegetables',
  fruit: 'Fruit',
  grain: 'Grains & legumes',
  fat: 'Fats, nuts & seeds',
  spice: 'Herbs & spices',
  drink: 'Drinks',
  snack: 'Snacks & sweets',
}

export const VERDICT_LABELS: Record<Verdict, string> = {
  eat: 'Eat freely',
  moderate: 'In moderation',
  limit: 'Limit or avoid',
}

export const VERDICT_COLORS: Record<Verdict, string> = {
  eat: 'green',
  moderate: 'yellow',
  limit: 'red',
}

export const FOODS: Food[] = [
  { emoji: '🐟', name: 'Salmon', category: 'fish', verdict: 'eat', why: 'Rich in omega-3 fats that compete with the omega-6 fats used to build inflammatory signals. Two to three portions a week is the evidence-based target.' },
  { emoji: '🐟', name: 'Sardines & anchovies', category: 'fish', verdict: 'eat', why: 'Small oily fish: as much omega-3 as salmon, far less mercury, and cheap in tins.' },
  { emoji: '🐟', name: 'Mackerel & herring', category: 'fish', verdict: 'eat', why: 'Among the highest omega-3 fish. Smoked versions are salty, so grilled or tinned in olive oil is better.' },
  { emoji: '🐟', name: 'White fish (cod, hake)', category: 'fish', verdict: 'eat', why: 'Lean protein without saturated fat. Bake or grill rather than batter and fry.' },
  { emoji: '🦐', name: 'Prawns & shellfish', category: 'fish', verdict: 'moderate', why: 'Fine grilled or steamed. Deep-fried or in creamy sauces they lose the benefit.' },
  { emoji: '🐠', name: 'Tuna', category: 'fish', verdict: 'moderate', why: 'Good protein, but large tuna carry mercury. Once a week, and prefer tinned skipjack.' },
  { emoji: '🍗', name: 'Chicken & turkey', category: 'meat', verdict: 'eat', why: 'Lean protein without the arachidonic acid load of red meat. Skinless, grilled, roasted or poached.' },
  { emoji: '🥩', name: 'Red meat', category: 'meat', verdict: 'moderate', why: 'High in arachidonic acid, a building block of inflammatory signals. Once a week is fine; every day is not.' },
  { emoji: '🥓', name: 'Processed meat', category: 'meat', verdict: 'limit', why: 'Bacon, sausages, ham, salami: saturated fat, nitrates and salt together. The strongest dietary link to severity after alcohol.' },
  { emoji: '🥚', name: 'Eggs', category: 'meat', verdict: 'moderate', why: 'Some arachidonic acid, but also choline, protein and vitamin D. Up to one a day is reasonable for most people.' },
  { emoji: '🫀', name: 'Liver & organ meats', category: 'meat', verdict: 'moderate', why: 'Very rich in vitamin A and iron. Occasionally fine; avoid entirely if you take acitretin.' },
  { emoji: '🥛', name: 'Yoghurt & kefir', category: 'dairy', verdict: 'eat', why: 'Fermented dairy feeds the gut bacteria that make anti-inflammatory short-chain fatty acids. Plain, unsweetened.' },
  { emoji: '🥛', name: 'Milk', category: 'dairy', verdict: 'moderate', why: 'Evidence is mixed. Most people are fine; a minority flare with large amounts. Test yourself for four weeks, not for life.' },
  { emoji: '🧀', name: 'Cheese', category: 'dairy', verdict: 'moderate', why: 'Saturated fat and salt in a small package. Small amounts of hard cheese are fine; daily large portions are not.' },
  { emoji: '🧈', name: 'Butter & ghee', category: 'dairy', verdict: 'moderate', why: 'Saturated fat raises inflammatory markers. Use it for flavour, cook with olive oil.' },
  { emoji: '🍦', name: 'Ice cream', category: 'dairy', verdict: 'limit', why: 'Sugar and saturated fat at once. Frozen yoghurt with berries gives the same comfort.' },
  { emoji: '🥬', name: 'Leafy greens', category: 'veg', verdict: 'eat', why: 'Spinach, kale, chard, rocket: folate, magnesium and polyphenols. Folate matters extra if you take methotrexate.' },
  { emoji: '🥦', name: 'Broccoli & cabbage family', category: 'veg', verdict: 'eat', why: 'Sulforaphane switches on the body’s own antioxidant genes. Lightly steamed keeps more of it than boiled.' },
  { emoji: '🥕', name: 'Carrots & sweet potato', category: 'veg', verdict: 'eat', why: 'Beta-carotene supports skin repair. Roasting in olive oil helps you absorb it.' },
  { emoji: '🧄', name: 'Garlic & onions', category: 'veg', verdict: 'eat', why: 'Sulphur compounds with measurable anti-inflammatory effects. The base of almost every Mediterranean dish.' },
  { emoji: '🍄', name: 'Mushrooms', category: 'veg', verdict: 'eat', why: 'One of the few plant sources of vitamin D, especially if left in sunlight for an hour before cooking.' },
  { emoji: '🫜', name: 'Beetroot', category: 'veg', verdict: 'eat', why: 'Nitrates support blood flow and lower blood pressure, which matters because psoriasis raises heart risk.' },
  { emoji: '🍅', name: 'Tomatoes', category: 'veg', verdict: 'moderate', why: 'Lycopene-rich and anti-inflammatory for most people. A minority report nightshades as a trigger; test four weeks off before deciding.' },
  { emoji: '🌶️', name: 'Peppers, aubergine, chilli', category: 'veg', verdict: 'moderate', why: 'Nightshades like tomatoes. Capsaicin cream is actually used for psoriasis itch. Eaten, they are fine for most.' },
  { emoji: '🍟', name: 'Chips & fried potatoes', category: 'veg', verdict: 'limit', why: 'Deep frying produces oxidised fats and glycation products that directly activate skin inflammation. Baked potatoes are fine.' },
  { emoji: '🫐', name: 'Berries', category: 'fruit', verdict: 'eat', why: 'Anthocyanins are among the strongest dietary antioxidants. Frozen is as good as fresh and much cheaper.' },
  { emoji: '🍎', name: 'Apples & pears', category: 'fruit', verdict: 'eat', why: 'Pectin fibre feeds good gut bacteria; quercetin in the skin is anti-inflammatory. Eat the skin.' },
  { emoji: '🍊', name: 'Citrus', category: 'fruit', verdict: 'eat', why: 'Vitamin C for collagen and skin repair. A few people report citrus as a trigger; if that is you, you will know.' },
  { emoji: '🍒', name: 'Grapes & cherries', category: 'fruit', verdict: 'eat', why: 'Resveratrol and anthocyanins. Cherries in particular lower inflammatory markers in trials.' },
  { emoji: '🥑', name: 'Avocado', category: 'fruit', verdict: 'eat', why: 'Monounsaturated fat, vitamin E and potassium. Keeps you full, which helps with weight.' },
  { emoji: '🍌', name: 'Bananas', category: 'fruit', verdict: 'eat', why: 'Prebiotic fibre and potassium. An easy swap for a sweet snack.' },
  { emoji: '🍇', name: 'Dried fruit', category: 'fruit', verdict: 'moderate', why: 'All the sugar of fruit, none of the water. A small handful, not a bag.' },
  { emoji: '🧃', name: 'Fruit juice', category: 'fruit', verdict: 'limit', why: 'Fructose without the fibre. A glass of juice is four fruits’ worth of sugar in ten seconds. Eat the fruit instead.' },
  { emoji: '🌾', name: 'Oats', category: 'grain', verdict: 'eat', why: 'Beta-glucan fibre lowers cholesterol and steadies blood sugar. Colloidal oatmeal in the bath also calms itch.' },
  { emoji: '🍚', name: 'Brown rice & quinoa', category: 'grain', verdict: 'eat', why: 'Slow-release carbohydrate instead of blood sugar spikes. Quinoa adds complete protein.' },
  { emoji: '🫘', name: 'Lentils, beans, chickpeas', category: 'grain', verdict: 'eat', why: 'Fibre, plant protein and minerals. Three or more portions a week is a core Mediterranean habit and helps with weight.' },
  { emoji: '🍲', name: 'Tofu & soy', category: 'grain', verdict: 'eat', why: 'Complete plant protein with isoflavones that have mild anti-inflammatory effects.' },
  { emoji: '🍞', name: 'Whole-grain bread', category: 'grain', verdict: 'moderate', why: 'Good for most. People with psoriasis have higher rates of coeliac antibodies: if a blood test is positive, go gluten-free; if negative, there is no proven benefit.' },
  { emoji: '🥖', name: 'White bread & pastries', category: 'grain', verdict: 'limit', why: 'Refined flour behaves like sugar in the body. Swap for whole grain or sourdough.' },
  { emoji: '🫒', name: 'Extra-virgin olive oil', category: 'fat', verdict: 'eat', why: 'Oleocanthal works on the same pathway as ibuprofen. The single most important fat in the diet pattern linked with milder psoriasis.' },
  { emoji: '🌰', name: 'Walnuts', category: 'fat', verdict: 'eat', why: 'The nut with the most plant omega-3. A small handful a day.' },
  { emoji: '🥜', name: 'Almonds & hazelnuts', category: 'fat', verdict: 'eat', why: 'Vitamin E and monounsaturated fat. Unsalted, unroasted if possible.' },
  { emoji: '🌱', name: 'Flax & chia seeds', category: 'fat', verdict: 'eat', why: 'Plant omega-3 and soluble fibre. Ground flax on porridge or yoghurt.' },
  { emoji: '🌻', name: 'Sunflower & corn oil', category: 'fat', verdict: 'moderate', why: 'Heavy in omega-6. Not harmful in small amounts, but every spoon displaces olive oil.' },
  { emoji: '🥥', name: 'Coconut oil', category: 'fat', verdict: 'moderate', why: 'Mostly saturated fat. Fine on the skin as an emollient, less useful in the pan.' },
  { emoji: '🧴', name: 'Margarine & palm oil', category: 'fat', verdict: 'limit', why: 'Industrial fats found in packaged baked goods. Read the label for "palm" and "hydrogenated".' },
  { emoji: '🟡', name: 'Turmeric', category: 'spice', verdict: 'eat', why: 'Curcumin blocks NF-κB, a master switch of inflammation. Small trials show modest benefit; pair with black pepper for absorption.' },
  { emoji: '🫚', name: 'Ginger', category: 'spice', verdict: 'eat', why: 'Gingerols lower inflammatory markers. Fresh in tea, grated into cooking.' },
  { emoji: '🌿', name: 'Rosemary, oregano, thyme', category: 'spice', verdict: 'eat', why: 'Concentrated polyphenols. Herbs let you cut salt without losing flavour.' },
  { emoji: '🍂', name: 'Cinnamon', category: 'spice', verdict: 'eat', why: 'Steadies blood sugar after meals and replaces sugar for sweetness.' },
  { emoji: '🧂', name: 'Excess salt', category: 'spice', verdict: 'limit', why: 'High salt intake pushes immune cells toward the Th17 pattern that drives psoriasis. Taste before you salt.' },
  { emoji: '💧', name: 'Water', category: 'drink', verdict: 'eat', why: 'Hydrated skin cracks less. Two litres a day, more in heat or with exercise.' },
  { emoji: '🍵', name: 'Green tea', category: 'drink', verdict: 'eat', why: 'EGCG polyphenol calms inflammatory signalling. A good evening substitute for alcohol.' },
  { emoji: '☕', name: 'Coffee', category: 'drink', verdict: 'moderate', why: 'No consistent link with severity either way. Fine in moderation, unless it damages your sleep.' },
  { emoji: '🥤', name: 'Diet sodas', category: 'drink', verdict: 'moderate', why: 'Better than sugar, but they keep the taste for sweetness alive. Water and tea are the goal.' },
  { emoji: '🧋', name: 'Sugary drinks', category: 'drink', verdict: 'limit', why: 'Liquid sugar with no fullness. The single easiest swap: sparkling water with lemon.' },
  { emoji: '🍷', name: 'Alcohol', category: 'drink', verdict: 'limit', why: 'Worsens severity, lowers response to treatment and is dangerous with methotrexate. Beer in particular is linked with new-onset psoriasis.' },
  { emoji: '🥜', name: 'A handful of nuts', category: 'snack', verdict: 'eat', why: 'The snack that replaces crisps: fat, protein and fibre that keep you full.' },
  { emoji: '🍫', name: 'Dark chocolate, 70%+', category: 'snack', verdict: 'moderate', why: 'Cocoa flavanols are anti-inflammatory. Two squares, not the bar.' },
  { emoji: '🍩', name: 'Sweets, cakes, biscuits', category: 'snack', verdict: 'limit', why: 'Sugar spikes insulin and inflammatory signalling, and adds weight, which itself worsens psoriasis.' },
  { emoji: '🍿', name: 'Crisps & packaged snacks', category: 'snack', verdict: 'limit', why: 'Omega-6 seed oils, salt and additives. Linked with higher disease activity in cohort studies.' },
  { emoji: '🍔', name: 'Fast food', category: 'snack', verdict: 'limit', why: 'Fried, salty, sugary and processed at once. An occasional meal, never a routine.' },
]

export const SWAPS: [string, string][] = [
  ['Butter in the pan', 'Extra-virgin olive oil'],
  ['White bread', 'Whole-grain or sourdough'],
  ['Sugary drink', 'Sparkling water with lemon'],
  ['Crisps', 'A handful of nuts'],
  ['Deli meat', 'Grilled chicken or tinned fish'],
  ['Beer after work', 'Alcohol-free beer or kombucha'],
  ['Ice cream', 'Yoghurt with frozen berries'],
  ['Frying', 'Baking, grilling or steaming'],
]

export const RHYTHM: [string, string][] = [
  ['Oily fish', '2 to 3 times a week'],
  ['Legumes', '3 or more times a week'],
  ['Vegetables', '5 portions a day'],
  ['Olive oil', 'Every day, as the main fat'],
  ['Red meat', 'Once a week at most'],
  ['Processed meat', 'As close to zero as you can'],
  ['Alcohol-free days', 'At least 5 a week'],
  ['Sweets & pastries', 'Twice a week at most'],
]
