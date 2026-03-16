import { useState, useEffect } from "react";
import INR from "../components/INR";

function PageMenu() {
  const cats = ["All","Hot Drinks","Cold Drinks","Food","Desserts"];
  const [active,    setActive]    = useState("All");
  const [cart,      setCart]      = useState({});   // { itemName: qty }
  const [cartOpen,  setCartOpen]  = useState(false);
  const [toast,     setToast]     = useState(null); // { name }
  const [ordered,   setOrdered]   = useState(false);
  const [couponInput,  setCouponInput]  = useState("");
  const [appliedCode,  setAppliedCode]  = useState(null); // { code, pct, label }
  const [couponError,  setCouponError]  = useState("");
  const [showCodes,    setShowCodes]    = useState(false);

  // Lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  const DISCOUNT_CODES = [
    { code:"FIRSTBREW",  pct:15, label:"15% off — first order" },
    { code:"TECHCAFE10", pct:10, label:"10% off — tech community" },
    { code:"BREW20",     pct:20, label:"20% off — food orders" },
    { code:"BYTEBREW5",  pct:5,  label:"5% off — all orders" },
  ];

  const applyCode = () => {
    const match = DISCOUNT_CODES.find(d => d.code === couponInput.trim().toUpperCase());
    if (match) { setAppliedCode(match); setCouponError(""); }
    else { setCouponError("Invalid code. Try one from the list below."); setAppliedCode(null); }
  };
  const removeCode = () => { setAppliedCode(null); setCouponInput(""); setCouponError(""); };

  const items = [
    // HOT DRINKS
    { name:"Espresso",               cat:"Hot Drinks", amt:"130",  desc:"Strong, bold, and aromatic espresso shot",                  tag:"", img:"https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=320&q=80&fit=crop" },
    { name:"Americano",              cat:"Hot Drinks", amt:"180",  desc:"Espresso with hot water for a smooth blend",               tag:"", img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=320&q=80&fit=crop" },
    { name:"Cappuccino",             cat:"Hot Drinks", amt:"190",  desc:"Perfect balance of espresso, steamed milk & foam",         tag:"POPULAR", img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=320&q=80&fit=crop" },
    { name:"Café Latte",             cat:"Hot Drinks", amt:"190",  desc:"Creamy espresso with steamed milk",                        tag:"", img:"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=320&q=80&fit=crop" },
    { name:"Flat White",             cat:"Hot Drinks", amt:"220",  desc:"Espresso with velvety microfoam milk",                     tag:"BESTSELLER", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Espresso Macchiato",     cat:"Hot Drinks", amt:"220",  desc:"Espresso 'marked' with a touch of foam",                   tag:"", img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=320&q=80&fit=crop" },
    { name:"Irish Coffee",           cat:"Hot Drinks", amt:"220",  desc:"Espresso with Irish whiskey and cream",                    tag:"", img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=320&q=80&fit=crop" },
    { name:"Café Mocha",             cat:"Hot Drinks", amt:"220",  desc:"Chocolate and espresso harmony in one cup",                tag:"", img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?w=320&q=80&fit=crop" },
    { name:"Hot Vietnamese",         cat:"Hot Drinks", amt:"220",  desc:"Rich drip coffee with sweetened condensed milk",           tag:"", img:"https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=320&q=80&fit=crop" },
    { name:"Classic Hot Chocolate",  cat:"Hot Drinks", amt:"160",  desc:"Silky smooth hot chocolate",                               tag:"", img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=320&q=80&fit=crop" },
    { name:"Mint Hot Chocolate",     cat:"Hot Drinks", amt:"200",  desc:"Chocolate with refreshing mint flavor",                    tag:"", img:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=320&q=80&fit=crop" },
    { name:"Nutella Hot Chocolate",  cat:"Hot Drinks", amt:"220",  desc:"Hazelnut chocolate goodness",                              tag:"POPULAR", img:"https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=320&q=80&fit=crop" },
    { name:"Sea Salt Caramel Hot Chocolate", cat:"Hot Drinks", amt:"240", desc:"Caramel sweetness with sea salt balance", tag:"", img:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=320&q=80&fit=crop" },
    { name:"Masala Chai",            cat:"Hot Drinks", amt:"100",  desc:"Traditional Indian spiced tea",                             tag:"", img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=320&q=80&fit=crop" },
    { name:"Pure Green Tea",         cat:"Hot Drinks", amt:"180",  desc:"Fresh and organic green tea",                              tag:"", img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=320&q=80&fit=crop" },
    { name:"Hibiscus Green Tea",     cat:"Hot Drinks", amt:"180",  desc:"Floral and refreshing blend",                              tag:"", img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=320&q=80&fit=crop" },
    { name:"Chamomile Herb Tea",     cat:"Hot Drinks", amt:"180",  desc:"Calming chamomile infusion",                               tag:"", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Ginger Lemon Tea",       cat:"Hot Drinks", amt:"180",  desc:"Spicy ginger with zesty lemon",                            tag:"", img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=320&q=80&fit=crop" },
    { name:"Blue Pea Flower Tea",    cat:"Hot Drinks", amt:"180",  desc:"Exotic blue flower tea",                                   tag:"NEW", img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=320&q=80&fit=crop" },
    { name:"Rose Oolong Tea",        cat:"Hot Drinks", amt:"180",  desc:"Floral oolong with rose notes",                            tag:"", img:"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=320&q=80&fit=crop" },
    { name:"Moroccan Mint Green Tea",cat:"Hot Drinks", amt:"180",  desc:"Aromatic mint and green tea blend",                        tag:"", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },

    // COLD DRINKS
    { name:"Affogato",               cat:"Cold Drinks", amt:"210", desc:"Espresso poured over ice cream",                           tag:"", img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=320&q=80&fit=crop" },
    { name:"Iced Latte",             cat:"Cold Drinks", amt:"220", desc:"Smooth iced espresso with milk",                           tag:"", img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=320&q=80&fit=crop" },
    { name:"Blended Cold Coffee",    cat:"Cold Drinks", amt:"250", desc:"Creamy blended cold coffee delight",                       tag:"", img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?w=320&q=80&fit=crop" },
    { name:"Iced Mocha",             cat:"Cold Drinks", amt:"260", desc:"Chocolate and cold espresso blend",                        tag:"BESTSELLER", img:"https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=320&q=80&fit=crop" },
    { name:"Sea Salt Caramel Frappe",cat:"Cold Drinks", amt:"280", desc:"Sweet caramel with salty finish",                          tag:"POPULAR", img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=320&q=80&fit=crop" },
    { name:"Java Chip Frappe",       cat:"Cold Drinks", amt:"260", desc:"Coffee with chocolate chip bliss",                         tag:"", img:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=320&q=80&fit=crop" },
    { name:"Iced Mexican Mocha",     cat:"Cold Drinks", amt:"280", desc:"Spiced chocolate cold coffee",                             tag:"", img:"https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=320&q=80&fit=crop" },
    { name:"Irish Iced Frappe",      cat:"Cold Drinks", amt:"280", desc:"Irish whiskey flavored cold frappe",                       tag:"", img:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=320&q=80&fit=crop" },
    { name:"Thai Frappe",            cat:"Cold Drinks", amt:"280", desc:"Cold Thai tea with cream",                                 tag:"", img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=320&q=80&fit=crop" },
    { name:"Iced Americano",         cat:"Cold Drinks", amt:"180", desc:"Chilled americano refresher",                              tag:"", img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=320&q=80&fit=crop" },
    { name:"Iced Tonic Peach",       cat:"Cold Drinks", amt:"230", desc:"Tonic water with peach essence",                           tag:"", img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=320&q=80&fit=crop" },
    { name:"Black Honey Lemon",      cat:"Cold Drinks", amt:"230", desc:"Honey and lemon cold tea",                                 tag:"", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Orange Black",           cat:"Cold Drinks", amt:"280", desc:"Black tea with orange notes",                              tag:"", img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=320&q=80&fit=crop" },
    { name:"Iced Black Coconut",     cat:"Cold Drinks", amt:"230", desc:"Black tea with tropical coconut",                          tag:"NEW", img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=320&q=80&fit=crop" },
    { name:"Iced Vietnamese",        cat:"Cold Drinks", amt:"230", desc:"Chilled Vietnamese coffee",                                tag:"", img:"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=320&q=80&fit=crop" },
    { name:"Espresso Redbull",       cat:"Cold Drinks", amt:"250", desc:"Energy boost in a glass",                                  tag:"STRONG", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Fresh Lemon Iced Tea",   cat:"Cold Drinks", amt:"220", desc:"Refreshing lemony chill",                                  tag:"", img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=320&q=80&fit=crop" },
    { name:"Fresh Peach Iced Tea",   cat:"Cold Drinks", amt:"220", desc:"Juicy peach cold brew",                                    tag:"", img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=320&q=80&fit=crop" },
    { name:"Fresh Watermelon Iced Tea", cat:"Cold Drinks", amt:"220", desc:"Sweet watermelon refresher", tag:"", img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?w=320&q=80&fit=crop" },
    { name:"Good Ol' Chocolate Shake", cat:"Cold Drinks", amt:"250", desc:"Classic chocolate shake bliss",                         tag:"BESTSELLER", img:"https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=320&q=80&fit=crop" },
    { name:"Strawberry Blitz Shake", cat:"Cold Drinks", amt:"270", desc:"Fresh strawberry shake",                                  tag:"", img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=320&q=80&fit=crop" },
    { name:"Minty Oreo Shake",       cat:"Cold Drinks", amt:"270", desc:"Mint and cookies n cream shake",                           tag:"POPULAR", img:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=320&q=80&fit=crop" },
    { name:"Hazelnut Brownie Shake", cat:"Cold Drinks", amt:"270", desc:"Hazelnut and fudgy brownie",                               tag:"", img:"https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=320&q=80&fit=crop" },
    { name:"Dreamy Caramel Shake",   cat:"Cold Drinks", amt:"270", desc:"Caramel perfection in a shake",                            tag:"", img:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=320&q=80&fit=crop" },
    { name:"Nutella Shake",          cat:"Cold Drinks", amt:"280", desc:"Hazelnut chocolate shake",                                 tag:"", img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=320&q=80&fit=crop" },
    { name:"Lotus Biscoff Shake",    cat:"Cold Drinks", amt:"280", desc:"Spiced biscuit shake delight",                             tag:"NEW", img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=320&q=80&fit=crop" },
    { name:"Orange Cold Press Juice", cat:"Cold Drinks", amt:"180", desc:"Fresh squeezed orange juice",                            tag:"", img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=320&q=80&fit=crop" },
    { name:"Pineapple Cold Press Juice", cat:"Cold Drinks", amt:"180", desc:"Tropical pineapple juice",                            tag:"", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Watermelon Cold Press Juice", cat:"Cold Drinks", amt:"180", desc:"Sweet watermelon juice",                             tag:"", img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=320&q=80&fit=crop" },
    { name:"Improve Heart Juice",    cat:"Cold Drinks", amt:"220", desc:"Healthy heart wellness blend",                            tag:"FUNCTIONAL", img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=320&q=80&fit=crop" },
    { name:"Green Cooler Juice",     cat:"Cold Drinks", amt:"220", desc:"Green detox juice blend",                                 tag:"FUNCTIONAL", img:"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=320&q=80&fit=crop" },
    { name:"Cranberry Mojito",       cat:"Cold Drinks", amt:"220", desc:"Cranberry mint refresher",                                 tag:"", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Blueberry Mojito",       cat:"Cold Drinks", amt:"220", desc:"Blueberry mint cooler",                                    tag:"", img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=320&q=80&fit=crop" },
    { name:"Strawberry Mojito",      cat:"Cold Drinks", amt:"220", desc:"Strawberry mint blast",                                    tag:"", img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=320&q=80&fit=crop" },
    { name:"Peach Watermelon Mojito", cat:"Cold Drinks", amt:"220", desc:"Peachy watermelon mint",                                 tag:"POPULAR", img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?w=320&q=80&fit=crop" },
    { name:"Green Apple Mojito",     cat:"Cold Drinks", amt:"220", desc:"Green apple minty refresh",                                tag:"", img:"https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=320&q=80&fit=crop" },
    { name:"Passion Fruit Mojito",   cat:"Cold Drinks", amt:"220", desc:"Exotic passion fruit mojito",                              tag:"", img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=320&q=80&fit=crop" },

    // FOOD
    { name:"Butter Toast",           cat:"Food", amt:"100",  desc:"Simple butter on fresh toast",                                 tag:"", img:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=320&q=80&fit=crop" },
    { name:"Butter Toast with Jam",  cat:"Food", amt:"150",  desc:"Toasted bread with butter and jam",                            tag:"", img:"https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=320&q=80&fit=crop" },
    { name:"Chilli Cheese Toast",    cat:"Food", amt:"180",  desc:"Spicy cheese on crispy toast",                                 tag:"", img:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=320&q=80&fit=crop" },
    { name:"Cheese Garlic Bread",    cat:"Food", amt:"200",  desc:"Garlic and cheese bread delight",                              tag:"POPULAR", img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=320&q=80&fit=crop" },
    { name:"Classic Bruschetta",     cat:"Food", amt:"250",  desc:"Toasted bread with tomato toppings",                           tag:"", img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=320&q=80&fit=crop" },
    { name:"Cheesy Mushrooms on Toast", cat:"Food", amt:"250", desc:"Creamy mushrooms with cheese on toast",                      tag:"", img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=320&q=80&fit=crop" },
    { name:"Roasted Mushroom Toast", cat:"Food", amt:"280",  desc:"Earthy roasted mushrooms on toast",                            tag:"", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"French Fries (Salted)",  cat:"Food", amt:"210",  desc:"Crispy salted potato fries",                                   tag:"BESTSELLER", img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=320&q=80&fit=crop" },
    { name:"French Fries (Peri Peri)", cat:"Food", amt:"230", desc:"Spicy peri peri seasoned fries",                              tag:"", img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=320&q=80&fit=crop" },
    { name:"Messy Fries",            cat:"Food", amt:"230",  desc:"Loaded fries with toppings",                                   tag:"POPULAR", img:"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=320&q=80&fit=crop" },
    { name:"Paneer Makhni Fries",    cat:"Food", amt:"240",  desc:"Fries with paneer in creamy sauce",                            tag:"", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Potato Wedges",          cat:"Food", amt:"220",  desc:"Crispy seasoned potato wedges",                                tag:"", img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=320&q=80&fit=crop" },
    { name:"Nachos with Cheese & Salsa", cat:"Food", amt:"240", desc:"Crispy nachos loaded with cheese",                          tag:"", img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=320&q=80&fit=crop" },
    { name:"Loaded Nachos",          cat:"Food", amt:"280",  desc:"Nachos with all the fixings",                                  tag:"POPULAR", img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?w=320&q=80&fit=crop" },
    { name:"Margherita Pizza",       cat:"Food", amt:"300",  desc:"Classic pizza with fresh tomato and mozzarella",               tag:"BESTSELLER", img:"https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=320&q=80&fit=crop" },
    { name:"Veggie Wonder Pizza",    cat:"Food", amt:"350",  desc:"Vegetable loaded pizza",                                       tag:"", img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=320&q=80&fit=crop" },
    { name:"Paneer Makhni Pizza",    cat:"Food", amt:"350",  desc:"Paneer in creamy makhni sauce",                                tag:"POPULAR", img:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=320&q=80&fit=crop" },
    { name:"Mushroom and Onion Pizza", cat:"Food", amt:"350", desc:"Earthy mushrooms and onions",                                  tag:"", img:"https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=320&q=80&fit=crop" },
    { name:"Peri Peri Broccoli Sandwich", cat:"Food", amt:"250", desc:"Spicy broccoli sandwich",                                   tag:"", img:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=320&q=80&fit=crop" },
    { name:"Veggie Club Sandwich",   cat:"Food", amt:"250",  desc:"Triple layer veggie sandwich",                                 tag:"POPULAR", img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=320&q=80&fit=crop" },
    { name:"Paneer Panini",          cat:"Food", amt:"250",  desc:"Toasted paneer sandwich",                                      tag:"", img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=320&q=80&fit=crop" },
    { name:"Garlic Cheese Mushroom Panini", cat:"Food", amt:"250", desc:"Creamy mushroom panini",                                 tag:"", img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=320&q=80&fit=crop" },
    { name:"Spinach Mushroom Corn Panini", cat:"Food", amt:"250", desc:"Healthy panini blend",                                    tag:"FUNCTIONAL", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Arrabiata Pasta",        cat:"Food", amt:"320",  desc:"Spicy tomato pasta",                                           tag:"", img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=320&q=80&fit=crop" },
    { name:"Alfredo Pasta",          cat:"Food", amt:"320",  desc:"Creamy alfredo sauce pasta",                                   tag:"POPULAR", img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=320&q=80&fit=crop" },
    { name:"Pink Blush Pasta",       cat:"Food", amt:"350",  desc:"Tomato cream pasta blend",                                     tag:"", img:"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=320&q=80&fit=crop" },
    { name:"Creamy Pesto Pasta",     cat:"Food", amt:"340",  desc:"Fresh basil pesto pasta",                                      tag:"", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Makhani Pasta",          cat:"Food", amt:"340",  desc:"Butter and cream pasta",                                       tag:"BESTSELLER", img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=320&q=80&fit=crop" },
    { name:"Veggie Overload Salad",  cat:"Food", amt:"250",  desc:"Fresh vegetable salad bowl",                                   tag:"FUNCTIONAL", img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=320&q=80&fit=crop" },
    { name:"Taco Salad",             cat:"Food", amt:"250",  desc:"Mexican inspired salad",                                       tag:"", img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?w=320&q=80&fit=crop" },
    { name:"Pizza Salad",            cat:"Food", amt:"250",  desc:"Pizza flavored salad",                                         tag:"", img:"https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=320&q=80&fit=crop" },
    { name:"Protein Overload Salad", cat:"Food", amt:"250",  desc:"High protein salad bowl",                                      tag:"FUNCTIONAL", img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=320&q=80&fit=crop" },
    { name:"Paneer Tikka Salad",     cat:"Food", amt:"250",  desc:"Indian paneer tikka salad",                                    tag:"POPULAR", img:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=320&q=80&fit=crop" },
    { name:"Classic Veggie Burger",  cat:"Food", amt:"220",  desc:"Vegetable patty burger",                                       tag:"", img:"https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=320&q=80&fit=crop" },
    { name:"Italian Patty Burger",   cat:"Food", amt:"250",  desc:"Italian styled burger",                                        tag:"POPULAR", img:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=320&q=80&fit=crop" },
    { name:"Peri Peri Paneer Burger", cat:"Food", amt:"250", desc:"Spicy paneer burger",                                          tag:"", img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=320&q=80&fit=crop" },
    { name:"Italian Rice Bowl",      cat:"Food", amt:"380",  desc:"Italian herbs and tomato rice",                                tag:"", img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=320&q=80&fit=crop" },
    { name:"Mexican Rice Bowl",      cat:"Food", amt:"380",  desc:"Spiced Mexican rice blend",                                    tag:"", img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=320&q=80&fit=crop" },
    { name:"Indian Rice Bowl",       cat:"Food", amt:"350",  desc:"Traditional Indian rice preparation",                          tag:"BESTSELLER", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },

    // DESSERTS
    { name:"Cheese Cake",            cat:"Desserts", amt:"280", desc:"Creamy New York style cheesecake",                           tag:"POPULAR", img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=320&q=80&fit=crop" },
    { name:"Chocolate Truffle",      cat:"Desserts", amt:"200", desc:"Rich chocolate truffle bite",                                tag:"", img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=320&q=80&fit=crop" },
    { name:"Brownie with Ice-Cream", cat:"Desserts", amt:"180", desc:"Warm brownie with vanilla ice cream",                        tag:"BESTSELLER", img:"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=320&q=80&fit=crop" },
    { name:"Hot Brownie",            cat:"Desserts", amt:"130", desc:"Warm fudgy brownie",                                         tag:"", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
  ];

  // numeric value from amt string for totalling
  const numeric = (amt) => parseInt(amt.replace(/,/g,""), 10);

  const addItem = (item) => {
    setCart(prev => ({ ...prev, [item.name]: (prev[item.name] || 0) + 1 }));
    setToast(item.name);
    setTimeout(() => setToast(null), 1800);
  };
  const changeQty = (name, delta) => {
    setCart(prev => {
      const next = (prev[name] || 0) + delta;
      if (next <= 0) { const c={...prev}; delete c[name]; return c; }
      return { ...prev, [name]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((a,b)=>a+b, 0);
  const totalAmt   = items.reduce((sum, item) => sum + (cart[item.name]||0) * numeric(item.amt), 0);
  const discountAmt = appliedCode ? Math.round(totalAmt * appliedCode.pct / 100) : 0;
  const afterDiscount = totalAmt - discountAmt;
  const gst = Math.round(afterDiscount * 0.05);
  const grandTotal = afterDiscount + gst;
  const cartItems  = items.filter(i => cart[i.name]);
  const filtered   = active==="All" ? items : items.filter(i=>i.cat===active);

  const tagColors = { NEW:"rgba(0,180,70,0.88)", SEASONAL:"rgba(14,120,200,0.88)", FUNCTIONAL:"rgba(130,60,200,0.88)",
                      STRONG:"rgba(200,50,40,0.88)", BESTSELLER:"rgba(200,120,0,0.88)", POPULAR:"rgba(60,60,200,0.88)",
                      TRACEABLE:"rgba(0,140,100,0.88)", LIMITED:"rgba(180,30,100,0.88)", FRESH:"rgba(200,140,0,0.88)", VEGAN:"rgba(60,160,60,0.88)" };

  return (
    <>
    <div className="page-fade" style={{ minHeight:"100vh", background:"#FFFDD0", position:"relative" }}>
      <style>{`
        @keyframes slideInRight { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes toastIn { 0%{transform:translateY(20px);opacity:0} 20%{transform:translateY(0);opacity:1} 80%{opacity:1} 100%{opacity:0} }
        @keyframes cartBounce { 0%,100%{transform:scale(1)} 40%{transform:scale(1.3)} 60%{transform:scale(0.95)} }
        .qty-btn { width:30px;height:30px;border-radius:50%;border:none;cursor:pointer;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all 0.15s; }
        .qty-btn:hover { transform:scale(1.1); }
        .cart-item-row { display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08); }
      `}</style>

      {/* ── Header ── */}
      <div style={{ padding:"128px 24px 64px", background:"linear-gradient(160deg,#1a0d06,#2d1b13)", textAlign:"center", position:"relative" }}>
        <p className="fira" style={{ fontSize:11,letterSpacing:"0.5em",color:"#00FF41",marginBottom:16 }}>// THE STACK</p>
        <h1 className="playfair" style={{ fontWeight:900,fontStyle:"italic",fontSize:"clamp(40px,6vw,64px)",color:"white",marginBottom:12 }}>Our Menu</h1>
        {/* Floating cart icon in header */}
        {totalItems > 0 && (
          <button onClick={()=>setCartOpen(true)} style={{ position:"absolute",top:28,right:28,background:"#00FF41",border:"none",borderRadius:999,padding:"10px 18px",display:"flex",alignItems:"center",gap:8,cursor:"pointer",animation:"cartBounce 0.4s ease" }}>
            <span style={{ fontSize:16 }}>🛒</span>
            <span className="fira" style={{ fontSize:12,fontWeight:700,color:"#0a0a0a" }}>{totalItems} item{totalItems>1?"s":""}</span>
            <span className="fira" style={{ fontSize:12,fontWeight:700,color:"#0a0a0a" }}>· <INR amount={totalAmt.toLocaleString("en-IN")} /></span>
          </button>
        )}
      </div>

      {/* ── Sticky cart bar (appears when items in cart) ── */}
      {totalItems > 0 && (
        <div style={{ position:"sticky",top:64,zIndex:40,background:"#2D1B13",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <span style={{ fontSize:20 }}>🛒</span>
            <span className="fira" style={{ fontSize:12,color:"white",fontWeight:600 }}>{totalItems} item{totalItems>1?"s":""} in cart</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:16 }}>
            <span className="playfair" style={{ fontWeight:900,fontSize:18,color:"white",fontFamily:"system-ui,sans-serif" }}>
              <INR amount={totalAmt.toLocaleString("en-IN")} />
            </span>
            <button onClick={()=>setCartOpen(true)} style={{ background:"#00FF41",color:"#0a0a0a",border:"none",borderRadius:999,padding:"10px 24px",fontFamily:"'Fira Code',monospace",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.2s" }}>
              View Cart →
            </button>
          </div>
        </div>
      )}

      {/* ── Category filter + grid ── */}
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"48px 24px 80px" }}>
        <div style={{ display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginBottom:48 }}>
          {cats.map(cat=>(
            <button key={cat} onClick={()=>setActive(cat)} className="fira"
              style={{ fontSize:11,fontWeight:600,padding:"8px 20px",borderRadius:999,border:"1.5px solid",transition:"all 0.2s",cursor:"pointer",
                background:active===cat?"#2D1B13":"white", color:active===cat?"#FFFDD0":"#78716c", borderColor:active===cat?"#2D1B13":"#e7e0d8" }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24 }}>
          {filtered.map((item)=>{
            const qty = cart[item.name] || 0;
            return (
              <div key={item.name} className="card" style={{ background:"white",borderRadius:24,overflow:"hidden",cursor:"default",boxShadow:"0 4px 20px rgba(45,27,19,0.08)", outline: qty>0?"2px solid #00FF41":"none" }}>
                {/* Photo */}
                <div style={{ position:"relative",height:180,overflow:"hidden",background:"#f0e8e0" }}>
                  <img src={item.img} alt={item.name}
                    style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s ease",display:"block" }}
                    onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
                    onMouseLeave={e=>e.target.style.transform="scale(1)"}
                    onError={e=>{e.target.style.display="none";}} />
                  {item.tag && (
                    <span className="fira" style={{ position:"absolute",top:10,right:10,fontSize:9,padding:"5px 10px",borderRadius:999,fontWeight:700,background:tagColors[item.tag]||"rgba(45,27,19,0.8)",color:"white",letterSpacing:"0.05em" }}>
                      {item.tag}
                    </span>
                  )}
                  {qty > 0 && (
                    <div style={{ position:"absolute",top:10,left:10,width:26,height:26,borderRadius:"50%",background:"#00FF41",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Fira Code',monospace",fontSize:12,fontWeight:900,color:"#0a0a0a" }}>
                      {qty}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding:"18px 20px 20px" }}>
                  <h3 className="playfair" style={{ fontWeight:900,fontSize:16,color:"#2D1B13",marginBottom:6 }}>{item.name}</h3>
                  <p className="fira" style={{ fontSize:10,color:"#78716c",lineHeight:1.7,marginBottom:14 }}>{item.desc}</p>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid #f5f0e8",paddingTop:12 }}>
                    {/* Price with proper ₹ */}
                    <span style={{ fontFamily:"system-ui,'Segoe UI',sans-serif",fontWeight:900,fontSize:22,color:"#2D1B13" }}>
                      &#8377;{item.amt}
                    </span>
                    {/* Add / Qty control */}
                    {qty === 0 ? (
                      <button onClick={()=>addItem(item)}
                        style={{ background:"#2D1B13",color:"#FFFDD0",border:"none",borderRadius:999,padding:"9px 20px",fontFamily:"'Fira Code',monospace",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all 0.2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#00FF41";e.currentTarget.style.color="#0a0a0a";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#2D1B13";e.currentTarget.style.color="#FFFDD0";}}>
                        Add +
                      </button>
                    ) : (
                      <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                        <button className="qty-btn" onClick={()=>changeQty(item.name,-1)}
                          style={{ background:"#f5f0e8",color:"#2D1B13" }}>−</button>
                        <span className="fira" style={{ fontSize:14,fontWeight:700,color:"#2D1B13",minWidth:16,textAlign:"center" }}>{qty}</span>
                        <button className="qty-btn" onClick={()=>changeQty(item.name,1)}
                          style={{ background:"#2D1B13",color:"#FFFDD0" }}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>{/* ── /page-fade ── */}

    {/* ── Toast notification ── */}
    {toast && (
      <div style={{ position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:"#2D1B13",color:"white",padding:"12px 24px",borderRadius:999,fontFamily:"'Fira Code',monospace",fontSize:12,fontWeight:600,zIndex:9999,animation:"toastIn 1.8s ease forwards",whiteSpace:"nowrap",boxShadow:"0 8px 30px rgba(0,0,0,0.4)",border:"1px solid rgba(0,255,65,0.3)" }}>
        ✓ &nbsp;{toast} added to cart
      </div>
    )}

    {/* ── Cart Drawer ── */}
    {cartOpen && (
      <>
        {/* Backdrop */}
        <div onClick={()=>setCartOpen(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:999,backdropFilter:"blur(6px)" }} />
        {/* Drawer */}
          <div style={{ position:"fixed",top:0,right:0,bottom:0,width:"min(460px,100vw)",background:"#1a0d06",zIndex:1000,display:"flex",flexDirection:"column",animation:"slideInRight 0.35s cubic-bezier(0.23,1,0.32,1)",boxShadow:"-8px 0 60px rgba(0,0,0,0.7)" }}>
            {/* Drawer header */}
            <div style={{ padding:"24px 24px 20px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <div>
                <p className="fira" style={{ fontSize:10,letterSpacing:"0.4em",color:"#00FF41",marginBottom:4 }}>// YOUR ORDER</p>
                <h2 className="playfair" style={{ fontWeight:900,fontSize:22,color:"white" }}>Cart ({totalItems})</h2>
              </div>
              <button onClick={()=>setCartOpen(false)} style={{ background:"rgba(255,255,255,0.06)",border:"none",color:"white",width:36,height:36,borderRadius:"50%",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>×</button>
            </div>

            {/* Items list */}
            <div style={{ flex:1,overflowY:"auto",padding:"16px 24px" }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign:"center",padding:"60px 0",color:"#6b5e55" }}>
                  <div style={{ fontSize:48,marginBottom:16 }}>🛒</div>
                  <p className="fira" style={{ fontSize:12 }}>Your cart is empty</p>
                </div>
              ) : cartItems.map(item=>(
                <div key={item.name} style={{ display:"grid",gridTemplateColumns:"56px 1fr auto auto",alignItems:"center",gap:12,padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                  {/* Thumbnail */}
                  <img src={item.img} alt={item.name} style={{ width:56,height:56,borderRadius:12,objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
                  {/* Name + unit price */}
                  <div style={{ minWidth:0 }}>
                    <p className="playfair" style={{ fontWeight:700,fontSize:14,color:"white",marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.name}</p>
                    <p style={{ fontFamily:"system-ui,sans-serif",fontSize:12,fontWeight:600,color:"#c8902a" }}>&#8377;{item.amt} each</p>
                  </div>
                  {/* Qty stepper */}
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <button className="qty-btn" onClick={()=>changeQty(item.name,-1)} style={{ background:"rgba(255,255,255,0.08)",color:"white",width:28,height:28 }}>−</button>
                    <span className="fira" style={{ fontSize:13,fontWeight:700,color:"white",minWidth:18,textAlign:"center" }}>{cart[item.name]}</span>
                    <button className="qty-btn" onClick={()=>changeQty(item.name,1)} style={{ background:"rgba(0,255,65,0.15)",color:"#00FF41",width:28,height:28 }}>+</button>
                  </div>
                  {/* Line total */}
                  <p style={{ fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:900,color:"white",textAlign:"right",minWidth:56 }}>
                    &#8377;{(numeric(item.amt)*cart[item.name]).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            {/* Drawer footer */}
            {cartItems.length > 0 && !ordered && (
              <div style={{ padding:"20px 24px 28px",borderTop:"1px solid rgba(255,255,255,0.08)" }}>

                {/* ── Coupon code input ── */}
                {!appliedCode ? (
                  <div style={{ marginBottom:16 }}>
                    <div style={{ display:"flex",gap:8,marginBottom:6 }}>
                      <input
                        value={couponInput}
                        onChange={e=>{ setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                        onKeyDown={e=>e.key==="Enter" && applyCode()}
                        placeholder="PROMO CODE"
                        className="fira"
                        style={{ flex:1,background:"rgba(255,255,255,0.06)",border:`1px solid ${couponError?"#ff4444":"rgba(255,255,255,0.12)"}`,borderRadius:10,padding:"10px 14px",color:"white",fontSize:11,letterSpacing:"0.1em",outline:"none" }}
                      />
                      <button onClick={applyCode} className="fira"
                        style={{ background:"#2D1B13",border:"1px solid rgba(255,255,255,0.15)",color:"#00FF41",borderRadius:10,padding:"10px 16px",fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="#3d2518"}
                        onMouseLeave={e=>e.currentTarget.style.background="#2D1B13"}>
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="fira" style={{ fontSize:10,color:"#ff6666",marginBottom:4 }}>{couponError}</p>}
                    {/* Available codes toggle */}
                    <button onClick={()=>setShowCodes(v=>!v)} className="fira"
                      style={{ background:"none",border:"none",color:"#6b8f71",fontSize:10,cursor:"pointer",padding:0,letterSpacing:"0.08em",textDecoration:"underline dotted",textUnderlineOffset:3 }}>
                      {showCodes ? "▲ hide available codes" : "▼ view available codes"}
                    </button>
                    {showCodes && (
                      <div style={{ marginTop:10,background:"rgba(0,255,65,0.05)",border:"1px solid rgba(0,255,65,0.15)",borderRadius:10,padding:"12px 14px",display:"flex",flexDirection:"column",gap:8 }}>
                        {DISCOUNT_CODES.map(d=>(
                          <div key={d.code} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
                            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                              <span className="fira" style={{ background:"rgba(0,255,65,0.12)",color:"#00FF41",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:6,letterSpacing:"0.1em",border:"1px solid rgba(0,255,65,0.25)" }}>{d.code}</span>
                              <span className="fira" style={{ fontSize:10,color:"#9ca3af" }}>{d.label}</span>
                            </div>
                            <button onClick={()=>{ setCouponInput(d.code); setCouponError(""); }} className="fira"
                              style={{ background:"none",border:"none",color:"#c8902a",fontSize:10,cursor:"pointer",padding:0,textDecoration:"underline" }}>
                              use
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,background:"rgba(0,255,65,0.08)",border:"1px solid rgba(0,255,65,0.25)",borderRadius:10,padding:"10px 14px" }}>
                    <div>
                      <span className="fira" style={{ fontSize:10,color:"#00FF41",fontWeight:700,letterSpacing:"0.1em" }}>✓ {appliedCode.code}</span>
                      <span className="fira" style={{ fontSize:10,color:"#9ca3af",marginLeft:8 }}>{appliedCode.label}</span>
                    </div>
                    <button onClick={removeCode} style={{ background:"none",border:"none",color:"#6b5e55",cursor:"pointer",fontSize:16,lineHeight:1 }}>×</button>
                  </div>
                )}

                {/* ── Order summary ── */}
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                  <span className="fira" style={{ fontSize:11,color:"#6b5e55" }}>Subtotal</span>
                  <span style={{ fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:700,color:"white" }}>&#8377;{totalAmt.toLocaleString("en-IN")}</span>
                </div>
                {appliedCode && (
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                    <span className="fira" style={{ fontSize:11,color:"#00FF41" }}>Discount ({appliedCode.pct}%)</span>
                    <span style={{ fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:700,color:"#00FF41" }}>− &#8377;{discountAmt.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
                  <span className="fira" style={{ fontSize:11,color:"#6b5e55" }}>Taxes (5% GST)</span>
                  <span style={{ fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:700,color:"white" }}>&#8377;{gst.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.1)" }}>
                  <span className="playfair" style={{ fontWeight:900,fontSize:18,color:"white" }}>Total</span>
                  <span style={{ fontFamily:"system-ui,sans-serif",fontWeight:900,fontSize:22,color:"#00FF41" }}>&#8377;{grandTotal.toLocaleString("en-IN")}</span>
                </div>
                <button onClick={()=>{ setOrdered(true); setTimeout(()=>{ setCart({}); setOrdered(false); setCartOpen(false); setAppliedCode(null); setCouponInput(""); },3000); }}
                  style={{ width:"100%",background:"#00FF41",color:"#0a0a0a",border:"none",borderRadius:14,padding:"16px",fontFamily:"'Fira Code',monospace",fontSize:13,fontWeight:900,cursor:"pointer",transition:"all 0.3s" }}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 0 24px rgba(0,255,65,0.5)"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                  Place Order →
                </button>
                <button onClick={()=>{ setCart({}); removeCode(); }} style={{ width:"100%",background:"none",border:"none",color:"#6b5e55",fontFamily:"'Fira Code',monospace",fontSize:11,cursor:"pointer",marginTop:10,padding:8 }}>
                  Clear Cart
                </button>
              </div>
            )}
            {ordered && (
              <div style={{ padding:"32px 24px",textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize:52,marginBottom:16 }}>✅</div>
                <h3 className="playfair" style={{ fontWeight:900,fontSize:22,color:"white",marginBottom:8 }}>Order Placed!</h3>
                <p className="fira" style={{ fontSize:11,color:"#6b5e55",lineHeight:1.8 }}>Your brew is being compiled.<br/>Ready in ~5 minutes.</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default PageMenu;
