export const services = [
  ["electrician", "⚡", "Electrician", "Repairs & installations"],
  ["plumber", "🔧", "Plumbing", "Fix leaks & fittings"],
  ["ac-repair", "❄️", "AC & Appliance", "Service & maintenance"],
  ["home-cleaning", "🧹", "Home Cleaning", "Clean & comfortable home"],
  ["carpenter", "🪚", "Carpentry", "Furniture & woodwork"],
  ["painting", "🎨", "Painting", "Fresh walls, beautiful spaces"],
  ["pest-control", "🛡️", "Pest Control", "Safe, effective protection"],
  ["salon", "✂️", "Salon at Home", "Beauty and wellness"]
].map(([slug, icon, name, description]) => ({
  slug,
  icon,
  name,
  description
}));

export const providers = [
  ["Ravi Electrical Services", "electrician", "5 years"],
  ["Venkat Electrical Works", "electrician", "8 years"],
  ["PowerLine Electricians", "electrician", "6 years"],
  ["BrightSpark Electricals", "electrician", "10 years"],
  ["Suresh Plumbing Services", "plumber", "7 years"],
  ["Ramesh Plumbing Works", "plumber", "4 years"],
  ["FlowFix Plumbing", "plumber", "9 years"],
  ["AquaPro Plumbers", "plumber", "5 years"],
  ["CoolCare Services", "ac-repair", "4 years"],
  ["Sri AC Solutions", "ac-repair", "6 years"],
  ["BreezeTech Appliances", "ac-repair", "8 years"],
  ["ArcticAir Service Center", "ac-repair", "5 years"],
  ["CleanPro Services", "home-cleaning", "6 years"],
  ["HomeCare Experts", "home-cleaning", "3 years"],
  ["SparkleHome Cleaners", "home-cleaning", "7 years"],
  ["FreshNest Cleaning Co.", "home-cleaning", "4 years"],
  ["WoodCraft Carpentry", "carpenter", "9 years"],
  ["MasterWood Furnishings", "carpenter", "12 years"],
  ["FineJoinery Works", "carpenter", "6 years"],
  ["ColourNest Painters", "painting", "7 years"],
  ["BrushWorks Painting", "painting", "9 years"],
  ["PerfectFinish Painters", "painting", "5 years"],
  ["Shield Pest Solutions", "pest-control", "5 years"],
  ["SafeHome Pest Control", "pest-control", "8 years"],
  ["EcoGuard Pest Services", "pest-control", "4 years"],
  ["GlowUp Home Salon", "salon", "6 years"],
  ["StyleAura Home Salon", "salon", "8 years"],
  ["Blush & Bloom Salon", "salon", "5 years"]
].map(([name, service, experience]) => ({
  name,
  service,
  experience,
  location: "Eluru",
  rating: 4.8,
  verified: true
}));
