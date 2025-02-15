const colors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Pink",
  "Brown",
  "Black",
  "White",
  "Gray",
  "Silver",
  "Gold",
  "Bronze",
  "Copper",
  "Platinum",
  "Rose Gold",
  "Turquoise",
  "Teal",
  "Aqua",
  "Cyan",
  "Magenta",
  "Lavender",
  "Indigo",
  "Violet",
  "Maroon",
  "Crimson",
  "Scarlet",
  "Ruby",
  "Sapphire",
  "Emerald",
  "Jade",
  "Amber",
  "Topaz",
  "Amethyst",
  "Quartz",
  "Opal",
  "Pearl",
  "Diamond",
  "Ruby",
  "Sapphire",
  "Emerald",
  "Jade",
  "Amber",
  "Topaz",
  "Amethyst",
  "Quartz",
  "Opal",
  "Pearl",
  "Diamond",
];

const animals = [
  "Cat",
  "Dog",
  "Bird",
  "Fish",
  "Rabbit",
  "Hamster",
  "Turtle",
  "Guinea Pig",
  "Chinchilla",
  "Parrot",
  "Canary",
  "Cockatiel",
  "Parakeet",
  "Mouse",
  "Rat",
  "Gerbil",
  "Ferret",
  "Hedgehog",
  "Sugar Glider",
  "Chicken",
  "Duck",
  "Goose",
  "Turkey",
  "Pigeon",
  "Peacock",
  "Ostrich",
  "Emu",
  "Alpaca",
  "Llama",
  "Horse",
  "Pony",
  "Donkey",
  "Mule",
  "Zebra",
  "Giraffe",
  "Elephant",
  "Rhinoceros",
  "Hippopotamus",
  "Buffalo",
  "Ox",
  "Cow",
  "Bull",
  "Yak",
  "Pig",
  "Boar",
  "Sow",
  "Goat",
  "Sheep",
  "Ram",
  "Lamb",
  "Deer",
  "Elk",
  "Moose",
  "Caribou",
  "Reindeer",
  "Antelope",
  "Impala",
  "Gazelle",
  "Ibex",
  "Chamois",
  "Mountain Goat",
  "Bison",
  "Musk Ox",
  "Wolf",
  "Coyote",
  "Fox",
  "Jackal",
  "Dingo",
  "Hyena",
  "Bear",
  "Panda",
  "Grizzly",
  "Polar Bear",
  "Black Bear",
  "Brown Bear",
  "Koala",
  "Red Panda",
  "Raccoon",
  "Skunk",
  "Otter",
  "Weasel",
  "Badger",
  "Mink",
  "Wolverine",
  "Seal",
  "Sea Lion",
  "Walrus",
  "Sea Otter",
  "Dolphin",
  "Porpoise",
  "Whale",
  "Orca",
  "Shark",
  "Ray",
  "Skate",
  "Sawfish",
  "Stingray",
  "Barracuda",
  "Mackerel",
  "Tuna",
  "Salmon",
  "Trout",
  "Bass",
  "Perch",
  "Pike",
  "Catfish",
  "Carp",
  "Goldfish",
  "Koi",
  "Guppy",
  "Tetra",
  "Barb",
  "Danio",
  "Loach",
  "Shark",
  "Eel",
  "Goby",
  "Blenny",
  "Wrasse",
  "Parrotfish",
  "Angelfish",
  "Butterflyfish",
  "Clownfish",
  "Surgeonfish",
  "Damselfish",
  "Triggerfish",
  "Pufferfish",
  "Boxfish",
  "Cowfish",
  "Filefish",
  "Scorpionfish",
  "Lionfish",
  "Stonefish",
  "Frogfish",
  "Anglerfish",
  "Gurnard",
  "Seahorse",
  "Pipefish",
  "Flounder",
  "Sole",
  "Halibut",
  "Turbot",
  "Plaice",
  "Skate",
  "Ray",
];

export function generateName() {
  return `${colors[Math.floor(Math.random() * colors.length)]} ${animals[Math.floor(Math.random() * animals.length)]}`;
}
