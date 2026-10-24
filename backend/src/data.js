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
  ["Suresh Plumbing Services", "plumber", "7 years"],
  ["Ramesh Plumbing Works", "plumber", "4 years"],
  ["CoolCare Services", "ac-repair", "4 years"],
  ["Sri AC Solutions", "ac-repair", "6 years"],
  ["CleanPro Services", "home-cleaning", "6 years"],
  ["HomeCare Experts", "home-cleaning", "3 years"],
  ["WoodCraft Carpentry", "carpenter", "9 years"],
  ["ColourNest Painters", "painting", "7 years"],
  ["Shield Pest Solutions", "pest-control", "5 years"],
  ["GlowUp Home Salon", "salon", "6 years"]
].map(([name, service, experience]) => ({
  name,
  service,
  experience,
  location: "Eluru",
  rating: 4.8,
  verified: true
}));
