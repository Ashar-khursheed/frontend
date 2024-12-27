export const getCurrencyMenu = (token) => {
  return [
    {
      title: "Sell On Horeca",
      redirectUrl: "/sell-on-horeca"
    },
    {
      title: "Track your order",
      redirectUrl: `${token ? "/registration/all-orders" : "/login"}`
    }
  ];
};

const languageMenu = [
  {
    imgSource: "/icons/english.png",
    title: "English"
  },
  {
    imgSource: "/icons/arabic.png",
    title: "عربي "
  }
]

const recommendedCategories = [
  {
    title: "Kitchen Equipment",
    redirectUrl: "/products/kitchen-equipment"
  },
  {
    title: "Refrigeration",
    redirectUrl: "/products/refrigeration"
  },
  {
    title: "Tableware",
    redirectUrl: "/products/tableware"
  },
  {
    title: "Kitchen & Pastry",
    redirectUrl: "/products/kitchen-and-pastry"
  },
  {
    title: "Food & Beverage",
    redirectUrl: "/products/food-and-beverage"
  },
  {
    title: "Furniture",
    redirectUrl: "/products/furniture"
  },
  {
    title: "Hotel Supplies",
    redirectUrl: "/products/hotel-supplies"
  },
  {
    title: "Housekeeping",
    redirectUrl: "/products/housekeeping"
  },
  {
    title: "Deal of the day",
    redirectUrl: "/products/deal-of-the-day"
  }
]

const categories = [
  {
    title: "Kitchen Equipment",
    url: "/product/kitchen-equipment",
    catIcon: "images/icons/categories",
    subCategories: [
      {
        title: "Cooking Equipment",
        url: "/product/cooking-equipment",
        subCategories: [
          {
            title: "Commercial Gas & Electric Cooker",
            url: "/product/commercial-gas-and-electric-cooker",
          },
          {
            title: "Commercial Fryers",
            url: "/product/commercial-fryers",
          },
          {
            title: "Commercial Grills And Griddles",
            url: "/product/commercial-grills-and-griddles",
          },
          {
            title: "Food Warmer And Microwave",
            url: "/product/food-warmer-and-microwave",
          },
          {
            title: "Tilting And Boiling Pan",
            url: "/product/tilting-and-boiling-pan",
          },
          {
            title: "Salamander",
            url: "/product/salamander",
          },
          {
            title: "Shawarma Machine",
            url: "/product/pasta-cooker",
          },
          {
            title: "Waffles And Crepe Machine",
            url: "/product/waffles-and-crepe-machine",
          },
          {
            title: "Popcorn Machine And Chocolate Fountains",
            url: "/product/popcorn-machine-and-chocolate-fountains",
          },
          {
            title: "Toaster And Panini Grills",
            url: "/product/toaster-and-panini-grills",
          },
          {
            title: "Charbroilers",
            url: "/product/charbroilers",
          },
          {
            title: "Streamer",
            url: "/product/steamer",
          },
        ],
      },
      {
        title: "Commercial Ovens",
        url: "/product/commercial-ovens",
        subCategories: [
          {
            title: "Combi Oven",
            url: "/product/combi-oven",
          },
          {
            title: "Convection Ovens",
            url: "/product/convection-ovens",
          },
          {
            title: "Bakery Ovens",
            url: "/product/bakery-ovens",
          },
          {
            title: "Charcoal Ovens",
            url: "/product/charcoal-ovens",
          },
          {
            title: "Microwave",
            url: "/product/microwave",
          },
          {
            title: "Rotary Ovens",
            url: "/product/rotary-ovens",
          },
          {
            title: "Pizza Oven",
            url: "/product/pizza-oven",
          },
        ],
      },
      {
        title: "Food Preparation Equipment",
        url: "/product/food-preparation-equipment",
        subCategories: [
          {
            title: "Food Vacuuming",
            url: "/product/food-vacuuming",
          },
          {
            title: "Food Processors",
            url: "/product/food-processors",
          },
          {
            title: "Vegetable Cutter",
            url: "/product/vegetable-cutter",
          },
          {
            title: "Meat Cutters/Slicer",
            url: "/product/meat-cutters-slicer",
          },
          {
            title: "Commercial Blender",
            url: "/product/meat-cutters-slicer",
          },
          {
            title: "Commercial Toasters",
            url: "/product/commercial-toasters",
          },
          {
            title: "Pasta Machine",
            url: "/product/pasta-machine",
          },
          {
            title: "Potato Peelers",
            url: "/product/potato-peelers",
          },
          {
            title: "Slicing And Cutters Discs",
            url: "/product/discs",
          },
          {
            title: "Sterilizer",
            url: "/product/sterilizer",
          },
        ],
      },
      {
        title: "Preparation Tables",
        url: "/product/preparation-tables",
        subCategories: [
          {
            title: "Stainless Steel Wash Basin",
            url: "/product/stainless-steel-wash-basin",
          },
          {
            title: "Stainless Steel Hood",
            url: "/product/stainless-steel-hood",
          },
          {
            title: "Stainless Steel Cabinet",
            url: "/product/stainless-steel-cabinet",
          },
          {
            title: "Stainless Steel Shelves",
            url: "/product/stainless-steel-shelves",
          },
        ],
      },
      {
        title: "Coffee Machine",
        url: "/product/coffee-machine",
        subCategories: [
          {
            title: "Expresso Machine",
            url: "/product/espresso-machine",
          },
          {
            title: "Coffee Grinder",
            url: "/product/espresso-machine",
          },
        ],
      },
      {
        title: "Bakery Equipment",
        url: "/product/bakery-equipment",
        subCategories: [
          {
            title: "Bakery Mixers",
            url: "/product/bakery-mixers",
          },
          {
            title: "Rolling Machine",
            url: "/product/rolling-machine",
          },
          {
            title: "Bread Slicer",
            url: "/product/bread-slicer",
          },
          {
            title: "Bakery Display",
            url: "/product/bakery-display",
          },
          {
            title: "Toaster",
            url: "/product/toaster",
          },
          {
            title: "Bakery Ovens",
            url: "/product/bakery-ovens",
          },
        ],
      },
      {
        title: "Beverage Equipment",
        url: "/product/beverage-equipment",
        subCategories: [
          {
            title: "Slush Machine",
            url: "/product/slush-machine",
          },
          {
            title: "Blender",
            url: "/product/blender",
          },
          {
            title: "Juice Maker",
            url: "/product/juice-maker",
          },
        ],
      },
      {
        title: "Beverage Equipment",
        url: "/product/beverage-equipment",
        subCategories: [
          {
            title: "Slush Machine",
            url: "/product/slush-machine",
          },
          {
            title: "Blender",
            url: "/product/blender",
          },
          {
            title: "Juice Maker",
            url: "/product/juice-maker",
          },
        ],
      },
      {
        title: "Food Warmer & Holding Equipment",
        url: "/product/food-warmer-holding-equipment",
        subCategories: [],
      },
      {
        title: "Commercial Diswasher",
        url: "/product/commercial-dishwashers",
        subCategories: [],
      },
    ],
  },
  {
    title: "Refrigeration",
    url: "/product/refrigeration",
    subCategories: [
      {
        title: "Commercial Refrigerator",
        url: "/product/commercial-refrigerator",
        subCategories: [
          {
            title: "Upright Chillers",
            url: "/product/upright-chillers",
          },
          {
            title: "Blast Chillers",
            url: "/product/blast-chillers",
          },
          {
            title: "Salad Chiller",
            url: "/product/salad-chiller",
          },
          {
            title: "Work Top Refrigerators",
            url: "/product/work-top-refrigerators",
          },
          {
            title: "Undercounter Refrigerators",
            url: "/product/undercounter-refrigerators",
          },
          {
            title: "Prep Table Refrigerators",
            url: "/product/prep-table-refrigerators",
          },
          {
            title: "Chef Base Refrigerators",
            url: "/product/prep-table-refrigerators",
          },
          {
            title: "Display Refrigerators",
            url: "/product/display-refrigerators",
          },
          {
            title: "Merchandising Refrigerators",
            url: "/product/merchandising-refrigerators",
          },
          {
            title: "Underbar Refrigerators",
            url: "/product/underbar-refrigerators",
          },
        ],
      },
      {
        title: "Commercial Freezers",
        url: "/product/commercial-freezers",
        subCategories: [
          {
            title: "Upright Freezer",
            url: "/product/upright-freezer",
          },
          {
            title: "Work Top Freezers",
            url: "/product/work-top-freezers",
          },
          {
            title: "Commercial Chest Freezer",
            url: "/product/commercial-chest-freezer",
          },
          {
            title: "Undercounter Freezers",
            url: "/product/undercounter-freezers",
          },
        ],
      },
      {
        title: "Display Refrigerator",
        url: "/product/display-refrigerator",
        subCategories: [],
      },
      {
        title: "Under Bar Refrigerator",
        url: "/product/under-bar-refrigerator",
        subCategories: [],
      },
      {
        title: "Ice Machine",
        url: "/product/ice-machine",
        subCategories: [
          {
            title: "Countertop Ice Cream Machine",
            url: "/product/countertop-ice-cream-machine",
          },
          {
            title: "Floormount Ice Cream Maker",
            url: "/product/floormount-ice-cream-maker",
          },
        ],
      },
      {
        title: "Ice Cream Machine",
        url: "/product/ice-cream-machine",
        subCategories: [
          {
            title: "Ice Cube Machine",
            url: "/product/ice-cube-machine",
          },
          {
            title: "Ice Maker",
            url: "/product/ice-maker",
          },
          {
            title: "Ice Dispenser",
            url: "/product/ice-dispenser",
          },
          {
            title: "Ice Bins",
            url: "/product/ice-bins",
          },
          {
            title: "Cool Boxes",
            url: "/product/cool-boxes",
          },
        ],
      },
    ],
  },
  {
    title: "Tableware",
    url: "/product/tableware",
    subCategories: [
      {
        title: "Crockery",
        url: "/product/crockery",
        subCategories: [
          {
            title: "White Dinnerware",
            url: "/product/white-dinnerware",
          },
          {
            title: "Black Dinnerware",
            url: "/product/black-dinnerware",
          },
          {
            title: "Matte Dinnerware",
            url: "/product/matte-dinnerware",
          },
          {
            title: "Reactive Glaze Dinnerware",
            url: "/product/reactive-glaze-dinnerware",
          },
          {
            title: "Rustic Dinnerware",
            url: "/product/rustic-dinnerware",
          },
        ],
      },
      {
        title: "Cutlery",
        url: "/product/cutlery",
        subCategories: [
          {
            title: "Silver Cutlery",
            url: "/product/silver-cutlery",
          },
          {
            title: "Black Cutlery",
            url: "/product/black-cutlery",
          },
          {
            title: "Gold Cutlery",
            url: "/product/gold-cutlery",
          },
          {
            title: "Copper Cutlery",
            url: "/product/copper-cutlery",
          },
        ],
      },
      {
        title: "Glassware",
        url: "/product/glassware",
        subCategories: [
          {
            title: "Water And Juice Glasses",
            url: "/product/water-and-juice-glasses",
          },
          {
            title: "Beer Glasses",
            url: "/product/beer-glasses",
          },
          {
            title: "Wine Glasses",
            url: "/product/beer-glasses",
          },
          {
            title: "Cocktail Glasses",
            url: "/product/cocktail-glasses",
          },
          {
            title: "Shot Glasses",
            url: "/product/shot-glasses",
          },
          {
            title: "Glass Beverage Dispensers",
            url: "/product/glass-beverage-dispensers",
          },
          {
            title: "Unbreakable Glasses",
            url: "/product/unbreakable-glasses",
          },
          {
            title: "Dessert And Ice Cream Glasses",
            url: "/product/dessert-and-ice-cream-glasses",
          },
          {
            title: "Jug Decanters And Carafe",
            url: "/product/jug-decanters-and-carafe",
          },
          {
            title: "Champagne Glasses",
            url: "/product/champagne-glasses",
          },
          {
            title: "Whisky Glass",
            url: "/product/whisky-glass",
          },
          {
            title: "Coffee & Tea Mug /Cups",
            url: "/product/coffee-tea-mug-cups",
          },
          {
            title: "Plate Cover",
            url: "/product/plate-cover",
          },
        ],
      },
      {
        title: "Serveware",
        url: "/product/serveware",
        subCategories: [
          {
            title: "Appetizer And Snack Holders",
            url: "/product/appetizer-and-snack-holders",
          },
          {
            title: "Ramekins And Sauce Cups",
            url: "/product/ramekins-and-sauce-cups",
          },
          {
            title: "Serving And Display Platters",
            url: "/product/serving-and-display-platters",
          },
          {
            title: "Fajita Skillet And Sizzler Platter",
            url: "/product/fajita-skillet-and-sizzler-platter",
          },
          {
            title: "Bread Basket",
            url: "/product/fajita-skillet-and-sizzler-platter",
          },
          {
            title: "Fruit Basket",
            url: "/product/fruit-basket",
          },
          {
            title: "Bottle and Jars",
            url: "/product/bottle-and-jars-1",
          },
        ],
      },
      {
        title: "Tabletop Accessories",
        url: "/product/tabletop-accessories",
        subCategories: [
          {
            title: "Salt And Pepper Mills",
            url: "/product/salt-and-pepper-mills",
          },
          {
            title: "Cruets And Condiments",
            url: "/product/cruets-and-condiments",
          },
          {
            title: "Placemats",
            url: "/product/placemats",
          },
          {
            title: "Table Lamps And Candles",
            url: "/product/table-lamps-and-candles",
          },
          {
            title: "Vase And Ashtrays",
            url: "/product/table-lamps-and-candles",
          },
          {
            title: "Table Top Accessories",
            url: "/product/table-top-accessories",
          },
          {
            title: "Shakers",
            url: "/product/shakers",
          },
        ],
      },
      {
        title: "Buffet And Food Display",
        url: "/product/buffet-and-food-display",
        subCategories: [
          {
            title: "Display Riser And Stands",
            url: "/product/display-riser-and-stands",
          },
          {
            title: "Dessert And Cake Stands",
            url: "/product/dessert-and-cake-stands",
          },
          {
            title: "Wooden Buffet Display",
            url: "/product/wooden-buffet-display",
          },
          {
            title: "Cast Iron Cookware",
            url: "/product/cast-iron-cookware",
          },
          {
            title: "Chafing Dishes",
            url: "/product/chafing-dishes",
          },
          {
            title: "Condiments Server And Jar",
            url: "/product/condiments-server-and-jar",
          },
          {
            title: "Cereal And Beverage Dispenser",
            url: "/product/cereal-and-beverage-dispenser",
          },
          {
            title: "Table Tags",
            url: "/product/table-tags",
          },
          {
            title: "Tea And Coffee Service",
            url: "/product/tea-and-coffee-service",
          },
          {
            title: "Serving Utensils",
            url: "/product/serving-utensils",
          },
          {
            title: "Heating Lamps",
            url: "/product/heating-lamps",
          },
          {
            title: "Bread Basket And Toaster",
            url: "/product/bread-basket-and-toaster-2",
          },
        ],
      },
      {
        title: "Melamine Dinnerware And Buffetware",
        url: "/product/melamine-dinnerware-and-buffetware",
        subCategories: [
          {
            title: "Buffet And Serving",
            url: "/product/buffet-and-serving",
          },
          {
            title: "Melamine Dinnerware",
            url: "/product/melamine-dinnerware",
          },
          {
            title: "Faux Hammered Finish",
            url: "/product/melamine-dinnerware",
          },
          {
            title: "Speckled And Textured Finish",
            url: "/product/speckled-and-textured-finish",
          },
        ],
      },
      {
        title: "Table Signage",
        url: "/product/melamine-dinnerware-and-buffetware",
        subCategories: [
          {
            title: "Chalkboard And Easel",
            url: "/product/chalkboard-and-easel",
          },
          {
            title: "Chalk Marker",
            url: "/product/chalk-marker",
          },
          {
            title: "Table Card Holder, Tags And Tents",
            url: "/product/table-card-holder-tags-and-tents",
          },
          {
            title: "Table Numbers",
            url: "/product/table-numbers",
          },
        ],
      },
      {
        title: "Bar Tools And Equipment",
        url: "/product/bar-tools-and-equipment",
        subCategories: [
          {
            title: "Ice Bucket",
            url: "/product/ice-bucket",
          },
          {
            title: "Wine Bucket and Wine Cooler",
            url: "/product/wine-bucket-and-wine-cooler",
          },
          {
            title: "Bartending Supplies",
            url: "/product/wine-bucket-and-wine-cooler",
          },
          {
            title: "Cocktail Shaker",
            url: "/product/cocktail-shaker",
          },
          {
            title: "Bar Drinkware",
            url: "/product/bar-drinkware",
          },
          {
            title: "Bar Mats And Shelf Liners",
            url: "/product/bar-mats-and-shelf-liners",
          },
          {
            title: "Bar Equipment",
            url: "/product/bar-equipment",
          },
        ],
      },
    ],
  },
  {
    title: "Kitchen & Pastry",
    url: "/product/kitchen-and-pastry",
    subCategories: [
      {
        title: "Cookware",
        url: "/product/cookware",
        subCategories: [
          {
            title: "Cookware Set",
            url: "/product/cookware-set",
          },
          {
            title: "Frying Pan",
            url: "/product/frying-pan",
          },
          {
            title: "Woks",
            url: "/product/woks",
          },
          {
            title: "Pasta Cooker And Machine",
            url: "/product/pasta-cooker-machine",
          },
          {
            title: "Baking Pans Sheets And Trays",
            url: "/product/baking-pans-sheets-and-trays",
          },
          {
            title: "Cook Pot And Hot Pot",
            url: "/product/cook-pot",
          },
          {
            title: "Sauce Pan",
            url: "/product/sauce-pan",
          },
          {
            title: "Steamer",
            url: "/product/steamer",
          },
          {
            title: "Sauce Pot",
            url: "/product/sauce-pot",
          },
          {
            title: "Stock Pot",
            url: "/product/stock-pot",
          },
          {
            title: "Casserole Pot",
            url: "/product/casserole-pot",
          },
          {
            title: "Induction Cooker",
            url: "/product/induction-cooker",
          },
          {
            title: "Pressure Cooker",
            url: "/product/pressure-cooker",
          },
        ],
      },
      {
        title: "Storage And Transportation",
        url: "/product/storage-transportation",
        subCategories: [
          {
            title: "Serving Trolleys/Utility",
            url: "/product/serving-trolleys-utility",
          },
          {
            title: "Storage Box",
            url: "/product/storage-box",
          },
          {
            title: "Storage Shelves",
            url: "/product/storage-shelves",
          },
          {
            title: "Ingredient Bins & Scoop",
            url: "/product/ingredient-bins-and-scoop",
          },
          {
            title: "Insulated Container",
            url: "/product/insulated-container",
          },
          {
            title: "Storage Crates",
            url: "/product/storage-crates",
          },
          {
            title: "Food Carriers And Beverage Dispensers",
            url: "/product/food-carriers-and-beverage-dispensers",
          },
          {
            title: "Ice Box Coolers",
            url: "/product/ice-box-coolers",
          },
          {
            title: "Storage Container",
            url: "/product/storage-container",
          },
        ],
      },
      {
        title: "Kitchen Tools And Utensils",
        url: "/product/kitchen-tools-utensils",
        subCategories: [
          {
            title: "Mixing Bowl And Spoon",
            url: "/product/mixing-bowl-spoon",
          },
          {
            title: "Strainers And Skimmers",
            url: "/product/strainers-skimmers",
          },
          {
            title: "Graters And Peeler",
            url: "/product/graters-peeler",
          },
          {
            title: "Can Opener",
            url: "/product/can-opener",
          },
          {
            title: "Measuring Cup, Scoop And Jugs",
            url: "/product/measuring-cup-scoop-jugs",
          },
          {
            title: "Salt Pepper And Spice Mills",
            url: "/product/salt-pepper-and-spice-mills",
          },
          {
            title: "Whisks",
            url: "/product/whisks",
          },
          {
            title: "Ladles, Spatulas And Turners",
            url: "/product/ladles-spatulas-and-turners",
          },
          {
            title: "Serving Spoons And Tongs",
            url: "/product/serving-spoons-and-tongs",
          },
          {
            title: "Lifters And Slicers",
            url: "/product/lifters-and-slicers",
          },
          {
            title: "Ice Cream Scoop",
            url: "/product/ice-cream-scoop",
          },
          {
            title: "Potato Masher And Ricers",
            url: "/product/potato-masher-and-ricers",
          },
          {
            title: "Squeezy Bottles",
            url: "/product/squeezy-bottles",
          },
          {
            title: "Cream Whipper",
            url: "/product/cream-whipper",
          },
          {
            title: "Salad Spinner",
            url: "/product/salad-spinner",
          },
          {
            title: "Rolling Pins",
            url: "/product/rolling-pins",
          },
          {
            title: "Funnel",
            url: "/product/funnel",
          },
          {
            title: "Kitchen Supplies",
            url: "/product/kitchen-supplies",
          },
          {
            title: "Kitchen Scale",
            url: "/product/kitchen-scale",
          },
        ],
      },
      {
        title: "Baking Tools And Supplies",
        url: "/product/baking-tools-and-supplies",
        subCategories: [
          {
            title: "Baking Pans Sheets And Trays",
            url: "/product/baking-pans-sheets-and-trays",
          },
          {
            title: "Baking Mats",
            url: "/product/baking-mats",
          },
          {
            title: "Cake Pans",
            url: "/product/cake-pans",
          },
          {
            title: "Bread Pans",
            url: "/product/bread-pans",
          },
          {
            title: "Cooling Trays",
            url: "/product/cooling-trays",
          },
          {
            title: "Mixing Bowls And Sieves",
            url: "/product/mixing-bowls-and-sieves",
          },
          {
            title: "Pastry Brush",
            url: "/product/pastry-brush",
          },
          {
            title: "Oven Gloves",
            url: "/product/oven-gloves",
          },
          {
            title: "Baking Moulds",
            url: "/product/baking-moulds",
          },
          {
            title: "Piping Tubes And Bags",
            url: "/product/piping-tubes-and-bags",
          },
          {
            title: "Cookie Cutters",
            url: "/product/cookie-cutters",
          },
          {
            title: "Dough Mixer",
            url: "/product/dough-mixer",
          },
          {
            title: "Planetary Mixer",
            url: "/product/planetary-mixer",
          },
          {
            title: "Baking tools",
            url: "/product/baking-tools",
          },
        ],
      },
      {
        title: "Pizza Equipment and Supplies",
        url: "/product/pizza-equipment-and-supplies",
        subCategories: [
          {
            title: "Pizza Peel",
            url: "/product/pizza-peel",
          },
          {
            title: "Pizza Pan",
            url: "/product/pizza-pan",
          },
          {
            title: "Pizza Utensils",
            url: "/product/pizza-utensils",
          },
          {
            title: "Pizza Oven",
            url: "/product/pizza-oven",
          },
        ],
      },
      {
        title: "Food Storage Containers",
        url: "/product/food-storage-containers",
        subCategories: [
          {
            title: "Stainless Steel GN Pan",
            url: "/product/stainless-steel-gn-pan",
          },
          {
            title: "Polycarbonate GN Pans",
            url: "/product/polycarbonate-gn-pans",
          },
          {
            title: "Ingredient Bins",
            url: "/product/ingredient-bins",
          },
        ],
      },
      {
        title: "Kitchen Towels",
        url: "/product/kitchen-towels",
        subCategories: [],
      },
      {
        title: "Kitchen Timer And Thermometers",
        url: "/product/kitchen-timer-and-thermometers",
        subCategories: [],
      },
      {
        title: "Kitchen & Pastry",
        url: "/product/kitchen-and-pastry-utensils",
        subCategories: [],
      },
    ],
  },
  {
    title: "Food & Beverage",
    url: "/product/food-beverage",
    subCategories: [
      {
        title: "Fruits and Vegetables",
        url: "/product/fruits-and-vegetables",
        subCategories: [
          {
            title: "Fresh Vegetables",
            url: "/product/fresh-vegetables",
          },
          {
            title: "Fresh Fruits",
            url: "/product/fresh-fruits",
          },
          {
            title: "Frozen Vegetables",
            url: "/product/frozen-vegetables",
          },
          {
            title: "Frozen Fruit",
            url: "/product/frozen-fruit",
          },
          {
            title: "Pastes and Purees",
            url: "/product/pastes-and-purees",
          },
          {
            title: "Canned Fruits",
            url: "/product/canned-fruits",
          },
        ],
      },
      {
        title: "Dairy and Egg",
        url: "/product/dairy-and-egg",
        subCategories: [
          {
            title: "Milk",
            url: "/product/milk",
          },
          {
            title: "Cheese",
            url: "/product/cheese",
          },
          {
            title: "Cream",
            url: "/product/cream",
          },
          {
            title: "Eggs",
            url: "/product/eggs",
          },
          {
            title: "Non Dairy",
            url: "/product/non-dairy",
          },
          {
            title: "Butter And Margarine",
            url: "/product/butter-margarine",
          },
          {
            title: "Bread",
            url: "/product/bread-1",
          },
        ],
      },
      {
        title: "Chicken and Meat",
        url: "/product/chicken-and-meat",
        subCategories: [
          {
            title: "Chicken",
            url: "/product/chicken",
          },
          {
            title: "Beef",
            url: "/product/beef",
          },
          {
            title: "Mutton",
            url: "/product/mutton",
          },
          {
            title: "Lamb",
            url: "/product/lamb",
          },
          {
            title: "Offals",
            url: "/product/offal",
          },
          {
            title: "Duck",
            url: "/product/duck",
          },
        ],
      },
      {
        title: "Seafood",
        url: "/product/seafood",
        subCategories: [
          {
            title: "Fish",
            url: "/product/fish",
          },
          {
            title: "Octopus And Squid",
            url: "/product/octopus-and-squid",
          },
          {
            title: "Lobster and Crabs",
            url: "/product/lobster-and-crabs",
          },
          {
            title: "Shrimps",
            url: "/product/shrimps",
          },
          {
            title: "Clams, Oysters and Mussels",
            url: "/product/clams-oysters-and-mussels",
          },
        ],
      },
      {
        title: "Rice and Pulses",
        url: "/product/rice-and-pulses",
        subCategories: [
          {
            title: "Rice",
            url: "/product/rice",
          },
          {
            title: "Pulses",
            url: "/product/pulses",
          },
          {
            title: "Grains",
            url: "/product/pulses",
          },
        ],
      },
      {
        title: "Flour",
        url: "/product/flour",
        subCategories: [],
      },
      {
        title: "Pasta and Noodles",
        url: "/product/pasta-and-noodles",
        subCategories: [
          {
            title: "Pasta",
            url: "/product/pasta",
          },
          {
            title: "Noodles",
            url: "/product/noodles",
          },
          {
            title: "Macaroni",
            url: "/product/macaroni",
          },
          {
            title: "Spaghetti",
            url: "/product/spaghetti",
          },
          {
            title: "Vermicelli",
            url: "/product/vermicelli",
          },
        ],
      },
      {
        title: "Oil and Ghee",
        url: "/product/oil-and-ghee",
        subCategories: [
          {
            title: "Corn Oil",
            url: "/product/corn-oil",
          },
          {
            title: "Olive Oil",
            url: "/product/olive-oil",
          },
          {
            title: "Sunflower Oil",
            url: "/product/sunflower-oil",
          },
          {
            title: "Vegetable Ghee",
            url: "/product/vegetable-ghee",
          },
          {
            title: "Vegetable oil",
            url: "/product/vegetable-oil",
          },
        ],
      },
      {
        title: "Herbs and spices",
        url: "/product/herbs-and-spices",
        subCategories: [
          {
            title: "Spices and Seasonings",
            url: "/product/spices-and-seasonings",
          },
          {
            title: "Salt and pepper",
            url: "/product/salt-and-pepper-1",
          },
          {
            title: "Herbs",
            url: "/product/herbs",
          },
          {
            title: "Whole Spices",
            url: "/product/whole-spices",
          },
        ],
      },
      {
        title: "Arabic Foods",
        url: "/product/arabic-foods",
        subCategories: [
          {
            title: "Pickles",
            url: "/product/pickles-1",
          },
          {
            title: "Olive",
            url: "/product/olive",
          },
          {
            title: "Cheese",
            url: "/product/cheese",
          },
          {
            title: "Canned Food",
            url: "/product/canned-food",
          },
          {
            title: "Pasta",
            url: "/product/pasta",
          },
        ],
      },
      {
        title: "Baking Ingredients",
        url: "/product/baking-ingredients",
        subCategories: [
          {
            title: "Pastes, Extracts and Flavorings",
            url: "/product/pastes-extracts-flavorings",
          },
          {
            title: "Baking Essentials",
            url: "/product/baking-essentials",
          },
          {
            title: "Baking mixes",
            url: "/product/baking-mixes",
          },
          {
            title: "Sugar and Sweeteners",
            url: "/product/sugar-and-sweeteners",
          },
          {
            title: "Cake and Baking Decorations",
            url: "/product/cake-and-baking-decorations",
          },
        ],
      },
      {
        title: "Sauces and Condiments",
        url: "/product/sauces-and-condiments",
        subCategories: [
          {
            title: "Ketchup",
            url: "/product/ketchup",
          },
          {
            title: "Mustard",
            url: "/product/mustard",
          },
          {
            title: "Mayonnaise",
            url: "/product/mayonnaise",
          },
          {
            title: "Sauces",
            url: "/product/sauces",
          },
          {
            title: "Salad Dressing",
            url: "/product/salad-dressing",
          },
          {
            title: "Breakfast Spreads and Condiments",
            url: "/product/breakfast-spreads-and-condiments",
          },
          {
            title: "Jam, Jelly, and Fruit Spreads",
            url: "/product/jam-jelly-fruit-spreads",
          },
        ],
      },
      {
        title: "Nuts, Seed and Dates",
        url: "/product/nuts-seed-dates",
        subCategories: [
          {
            title: "Dry Fruits",
            url: "/product/dry-fruits",
          },
          {
            title: "Nuts And Seeds",
            url: "/product/nuts-and-seeds",
          },
        ],
      },
      {
        title: "Beverages",
        url: "/product/beverages",
        subCategories: [
          {
            title: "Flavoured Syrups",
            url: "/product/flavoured-syrups",
          },
          {
            title: "Powdered Drink Mixes",
            url: "/product/powdered-drink-mixes",
          },
          {
            title: "Cocktail Garnishes",
            url: "/product/cocktail-garnishes",
          },
          {
            title: "Juices",
            url: "/product/juices",
          },
          {
            title: "Carbonated Drinks",
            url: "/product/carbonated-drinks",
          },
        ],
      },
      {
        title: "Pickles",
        url: "/product/pickles",
        subCategories: [
          {
            title: "Pickled Vegetables",
            url: "/product/pickled-vegetables",
          },
          {
            title: "Pickled Olives",
            url: "/product/pickled-olives",
          },
        ],
      },
      {
        title: "Canned Foods",
        url: "/product/canned-foods",
        subCategories: [
          {
            title: "Canned Vegetables",
            url: "/product/canned-vegetables",
          },
          {
            title: "Canned Fruits",
            url: "/product/canned-fruits",
          },
          {
            title: "Canned Beans",
            url: "/product/canned-beans",
          },
          {
            title: "Canned Seafood",
            url: "/product/canned-seafood",
          },
        ],
      },
      {
        title: "Tea",
        url: "/product/tea",
        subCategories: [
          {
            title: "Tea Bags",
            url: "/product/tea-bags",
          },
          {
            title: "Green Tea",
            url: "/product/green-tea",
          },
          {
            title: "Loose Leaf Tea",
            url: "/product/loose-leaf-tea",
          },
        ],
      },
      {
        title: "Coffee",
        url: "/product/coffee",
        subCategories: [
          {
            title: "Ground Coffee",
            url: "/product/ground-coffee",
          },
        ],
      },
      {
        title: "Asian Foods",
        url: "/product/asian-foods",
        subCategories: [
          {
            title: "Soups and Noodles",
            url: "/product/soups-and-noodles",
          },
        ],
      },
      {
        title: "Ready to Cook",
        url: "/product/ready-to-cook",
        subCategories: [
          {
            title: "Frozen Snacks",
            url: "/product/frozen-snacks",
          },
          {
            title: "Frozen Meat",
            url: "/product/frozen-meat",
          },
          {
            title: "Ready To Eat",
            url: "/product/ready-to-eat",
          },
        ],
      },
      {
        title: "Mexican Food",
        url: "/product/mexican-food",
        subCategories: [
          {
            title: "Tortillas and Wraps",
            url: "/product/tortillas-and-wraps",
          },
          {
            title: "Dried Chili Pods",
            url: "/product/dried-chili-pods",
          },
          {
            title: "Sauces",
            url: "/product/sauces",
          },
          {
            title: "Spices and Seasonings",
            url: "/product/spices-and-seasonings",
          },
          {
            title: "Rice and Corn",
            url: "/product/rice-and-corn",
          },
          {
            title: "Pepper Paste And More",
            url: "/product/pepper-paste-and-more",
          },
          {
            title: "Jalapeno Peppers and Canned Chiles",
            url: "/product/jalapeno-peppers-and-canned-chiles",
          },
          {
            title: "Canned Foods",
            url: "/product/canned-foods",
          },
          {
            title: "Specialty Products",
            url: "/product/specialty-products",
          },
          {
            title: "Chilled Products",
            url: "/product/chilled-products",
          },
        ],
      },
      {
        title: "Sparkling Water",
        url: "/product/sparkling-water",
        subCategories: [],
      },
      {
        title: "Mineral Water",
        url: "/product/mineral-water",
        subCategories: [],
      },
    ],
  },
  {
    title: "Furniture",
    url: "/product/furniture",
    subCategories: [
      {
        title: "Banquet Furniture",
        url: "/product/banquet-furniture",
        subCategories: [
          {
            title: "Conference Tables",
            url: "/product/conference-tables",
          },
          {
            title: "Cocktail Tables",
            url: "/product/cocktail-tables",
          },
          {
            title: "Stage & Lecterns",
            url: "/product/stage-and-lecterns",
          },
          {
            title: "Dance Floor & Separator",
            url: "/product/dance-floor-and-separator",
          },
        ],
      },
      {
        title: "Live Cooking Station",
        url: "/product/live-cooking-station",
        subCategories: [
          {
            title: "Deep Frying Station",
            url: "/product/deep-frying-station",
          },
          {
            title: "Omelet Station",
            url: "/product/omelet-station",
          },
          {
            title: "Dim Sum Station",
            url: "/product/dim-sum-station",
          },
          {
            title: "Wok Station",
            url: "/product/wok-station",
          },
          {
            title: "Noodle/Pasta Station",
            url: "/product/noodle-pasta-station",
          },
          {
            title: "Griddle Station",
            url: "/product/griddle-station",
          },
          {
            title: "Soup Station",
            url: "/product/soup-station",
          },
        ],
      },
      {
        title: "Modular Buffet",
        url: "/product/modular-buffet",
        subCategories: [
          {
            title: "Frame and Table Top",
            url: "/product/frame-and-table-top",
          },
          {
            title: "Mobile Buffet Trolley",
            url: "/product/mobile-buffet-trolley",
          },
          {
            title: "Cold Buffet",
            url: "/product/cold-buffet",
          },
          {
            title: "Mobile Buffet Heat Lamp",
            url: "/product/mobile-buffet-heat-lamp",
          },
          {
            title: "Side Station",
            url: "/product/side-station",
          },
          {
            title: "Foldable Buffet Table",
            url: "/product/foldable-buffet-table",
          },
          {
            title: "Blinds",
            url: "/product/blinds",
          },
          {
            title: "Middle Shelf",
            url: "/product/middle-shelf",
          },
        ],
      },
      {
        title: "Baby Changing Station",
        url: "/product/baby-changing-station",
        subCategories: [],
      },
      {
        title: "High Chair",
        url: "/product/high-chair",
        subCategories: [],
      },
      {
        title: "Hotel Furniture",
        url: "/product/hotel-furniture",
        subCategories: [
          {
            title: "Mattresses",
            url: "/product/mattresses",
          },
          {
            title: "Beds",
            url: "/product/beds",
          },
          {
            title: "Sofa",
            url: "/product/sofa",
          },
          {
            title: "Tables",
            url: "/product/tables",
          },
          {
            title: "Chairs",
            url: "/product/chairs",
          },
          {
            title: "Pouf",
            url: "/product/pouf",
          },
          {
            title: "Coffee Table",
            url: "/product/coffee-table",
          },
        ],
      },
      {
        title: "Outdoor Furniture",
        url: "/product/outdoor-furniture",
        subCategories: [
          {
            title: "Bean Bag",
            url: "/product/bean-bag",
          },
          {
            title: "Cushion",
            url: "/product/cushion",
          },
          {
            title: "Fire Pit Tables",
            url: "/product/fire-pit-tables",
          },
          {
            title: "Outdoor Sofa",
            url: "/product/outdoor-sofa",
          },
          {
            title: "Outdoor Chairs",
            url: "/product/outdoor-chairs",
          },
          {
            title: "Outdoor Tables",
            url: "/product/outdoor-tables",
          },
          {
            title: "Outdoor Rug",
            url: "/product/outdoor-rug",
          },
          {
            title: "Sunbed",
            url: "/product/sunbed",
          },
          {
            title: "Umbrellas",
            url: "/product/umbrellas",
          },
          {
            title: "Multipurpose Baskets",
            url: "/product/multipurpose-baskets",
          },
          {
            title: "Planter",
            url: "/product/planter",
          },
        ],
      },
    ],
  },
  {
    title: "Hotel Supplies",
    url: "/product/hotel-supplies",
    subCategories: [
      {
        title: "Guest Room Supplies",
        url: "/product/guest-room-supplies",
        subCategories: [
          {
            title: "Minibar",
            url: "/product/minibar",
          },
          {
            title: "Safe Box",
            url: "/product/safe-box",
          },
          {
            title: "Iron and Ironing Board",
            url: "/product/iron-and-ironing-board",
          },
          {
            title: "Kettle And Welcome Tray",
            url: "/product/kettle-and-welcome-tray",
          },
          {
            title: "Hair Dryer",
            url: "/product/hair-dryer",
          },
          {
            title: "Alarm Clock",
            url: "/product/alarm-clock",
          },
          {
            title: "Luggage Rack",
            url: "/product/luggage-rack",
          },
          {
            title: "Magnifying Mirror",
            url: "/product/magnifying-mirror",
          },
          {
            title: "Waste Bin",
            url: "/product/waste-bin",
          },
          {
            title: "Amenities",
            url: "/product/amenities",
          },
          {
            title: "Air Purifier",
            url: "/product/air-purifier",
          },
          {
            title: "Hanger",
            url: "/product/hanger",
          },
        ],
      },
      {
        title: "Bath Towel",
        url: "/product/bath-towel",
        subCategories: [
          {
            title: "Hotel Towels",
            url: "/product/hotel-towels",
          },
          {
            title: "Color Towels",
            url: "/product/color-towels",
          },
          {
            title: "Bathrobe",
            url: "/product/bathrobe",
          },
          {
            title: "Pool Beach And Gym Towels",
            url: "/product/pool-beach-gym-towels",
          },
        ],
      },
      {
        title: "Baby Crib",
        url: "/product/baby-crib",
        subCategories: [
          {
            title: "Foldable Baby Cribs",
            url: "/product/foldable-baby-cribs",
          },
          {
            title: "Baby Cribs Bedding",
            url: "/product/baby-cribs-bedding",
          },
          {
            title: "Baby Cribs Mattress",
            url: "/product/baby-cribs-mattress",
          },
        ],
      },
      {
        title: "Apartment Essentials",
        url: "/product/apartment-essentials",
        subCategories: [
          {
            title: "Apartment Utensils",
            url: "/product/apartment-utensils",
          },
          {
            title: "Cleaning Tools",
            url: "/product/cleaning-tools",
          },
        ],
      },
      {
        title: "Room Service Trolley",
        url: "/product/room-service-trolley",
      },
      {
        title: "Front Office",
        url: "/product/front-office",
        subCategories: [
          {
            title: "Crowd Control",
            url: "/product/crowd-control",
          },
          {
            title: "Notice Board",
            url: "/product/notice-board",
          },
          {
            title: "Podium & Lecterns",
            url: "/product/podium-and-lecterns",
          },
          {
            title: "Luggage Carts",
            url: "/product/luggage-carts",
          },
        ],
      },
      {
        title: "Bed Linen",
        url: "/product/bed-linen",
        subCategories: [
          {
            title: "Cotton Sheets And Duvet Covers",
            url: "/product/cotton-sheets-duvet-covers",
          },
          {
            title: "Poly Cotton sheets And Duvet Covers",
            url: "/product/poly-cotton-sheets-duvet-covers",
          },
          {
            title: "Duvets And Blankets",
            url: "/product/duvets-blankets",
          },
          {
            title: "Pillows",
            url: "/product/pillows",
          },
          {
            title: "Mattress Protector & Encasement",
            url: "/product/mattress-protector-encasement",
          },
          {
            title: "Jacquard Cotton Sheets And Duvet Covers",
            url: "/product/jacquard-cotton-sheets-and-duvet-covers",
          },
        ],
      },
      {
        title: "Banquet Furniture",
        url: "/product/banquet-furniture",
        subCategories: [
          {
            title: "Conference Tables",
            url: "/product/conference-tables",
          },
          {
            title: "Cocktail Tables",
            url: "/product/cocktail-tables",
          },
          {
            title: "Stage & Lecterns",
            url: "/product/stage-and-lecterns",
          },
          {
            title: "Dance Floor & Separator",
            url: "/product/dance-floor-and-separator",
          },
        ],
      },
      {
        title: "Housekeeping",
        url: "/product/housekeeping",
        subCategories: [
          {
            title: "Standing Bed",
            url: "/product/standing-bed",
          },
          {
            title: "Room Relocation Trolley",
            url: "/product/room-relocation-trolley",
          },
          {
            title: "Linen Cart",
            url: "/product/linen-cart",
          },
          {
            title: "Laundry Trolley",
            url: "/product/laundry-trolley",
          },
        ],
      },
    ],
  },
  {
    title: "Housekeeping",
    url: "/product/housekeeping",
    subCategories: [
      {
        title: "Standing Bed",
        url: "/product/standing-bed",
      },
      {
        title: "Room Relocation Trolley",
        url: "/product/room-relocation-trolley",
      },
      {
        title: "Linen Cart",
        url: "/product/linen-cart",
      },
      {
        title: "Laundry Trolley",
        url: "/product/laundry-trolley",
      },
      {
        title: "Cleaning Equipment",
        url: "/product/cleaning-equipment",
        subCategories: [
          {
            title: "Vacuum Cleaner",
            url: "/product/vacuum-cleaner",
          },
          {
            title: "Scrubber Drier and Sweepers",
            url: "/product/scrubber-drier-and-sweepers",
          },
        ],
      },
      {
        title: "Housekeeping Supplies",
        url: "/product/housekeeping-supplies",
        subCategories: [
          {
            title: "Mops and Wipers",
            url: "/product/mops-and-wipers",
          },
          {
            title: "Brushes and Brooms",
            url: "/product/brushes-and-brooms",
          },
          {
            title: "Floor Signs",
            url: "/product/floor-signs",
          },
          {
            title: "Mop Bucket",
            url: "/product/mop-bucket",
          },
          {
            title: "Cleaning Chemicals",
            url: "/product/cleaning-chemicals",
          },
          {
            title: "Bottles and Sprayers",
            url: "/product/bottles-and-sprayers",
          },
          {
            title: "Cleaning Cloth",
            url: "/product/cleaning-cloth",
          },
          {
            title: "Cleaning Supplies",
            url: "/product/cleaning-supplies",
          },
          {
            title: "Gloves",
            url: "/product/gloves",
          },
        ],
      },
      {
        title: "Trash Cans And Recycling Bins",
        url: "/product/trash-cans-and-recycling-bins",
        subCategories: [
          {
            title: "Trash Cans",
            url: "/product/trash-cans",
          },
          {
            title: "Recycling Bins",
            url: "/product/recycling-bins",
          },
          {
            title: "Ashtray Bins",
            url: "/product/ashtray-bins",
          },
        ],
      },
    ],
  },
  {
    title: "Shop By Business",
    url: "/product/shop-by-business",
    subCategories: [
      {
        title: "Restaurant Supplies",
        url: "/product/restaurant-supplies",
        imgUrl: "/images/homepage/shop-by-bussiness/reataurant.webp",
      },
      {
        title: "Catering Supplies",
        url: "/product/catering-supplies",
        imgUrl: "/images/homepage/shop-by-bussiness/Catering.webp",
      },
      {
        title: "Coffee Shop Supplies",
        url: "/product/coffee-shop-supplies",
        imgUrl: "/images/homepage/shop-by-bussiness/cofa.webp",
      },
      {
        title: "Holiday Homes",
        url: "/product/holiday-homes",
        imgUrl: "/images/homepage/shop-by-bussiness/holiday.webp",
      },
      {
        title: "Household Appliances",
        url: "/product/household-appliances",
        imgUrl: "/images/homepage/shop-by-bussiness/house.webp",
      },
      {
        title: "Bar Supplies",
        url: "/product/bar-supplies",
        imgUrl: "/images/homepage/shop-by-bussiness/bar.webp",
      },
      {
        title: "Bakery Supplies",
        url: "/product/bakery-supplies",
        imgUrl: "/images/homepage/shop-by-bussiness/bakery.webp",
      },
      {
        title: "Butcher Shop",
        url: "/product/butcher-shop",
        imgUrl: "/images/homepage/shop-by-bussiness/butcher.webp",
      },
      {
        title: "Banquet",
        url: "/product/banquet",
        imgUrl: "/images/homepage/shop-by-bussiness/1.webp",
      },
    ],
  },
];


export { languageMenu, recommendedCategories, categories }



