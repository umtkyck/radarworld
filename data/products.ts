import { Product } from "@/types/product";

export const products: Product[] = [
  // ============================================
  // TRAFFIC RADAR SENSORS
  // ============================================
  {
    id: "zlytr20",
    slug: "24ghz-traffic-speed-radar-zlytr20",
    model: "ZLYTR20",
    name: "24GHz Traffic Speed Radar Sensor",
    shortDescription: "High-precision traffic monitoring radar with 180m detection range",
    description: "The ZLYTR20 is a professional-grade 24GHz millimeter wave radar module integrating microstrip antenna, RF circuit and signal processing. Designed for long-distance vehicle speed measurement up to 180 meters with ±1km/h accuracy. Ideal for highways, urban roads, school zones, and intersection warning systems.",
    price: 289,
    originalPrice: 349,
    category: "traffic",
    subcategory: "Speed Measurement",
    image: "/images/products/traffic-radar-zlytr20.jpg",
    features: [
      "180m+ vehicle detection range",
      "Speed accuracy ≤±1 km/h",
      "Dual protocol: UART TTL & RS-485",
      "Low power consumption <1.2W",
      "High/low level signal output",
      "IP65 weather resistant",
      "Easy non-contact installation"
    ],
    specifications: {
      frequency: "24.00-24.25 GHz (K-band)",
      range: "5-180 meters",
      accuracy: "±1 km/h",
      power: "9-24V DC, <75mA@12V",
      interface: "TTL, RS-485, UART",
      protection: "IP65",
      temperature: "-40°C to +85°C"
    },
    problemTags: ["speed-measurement", "traffic-management", "vehicle-detection"],
    applications: [
      "Highway speed warning",
      "School zone monitoring",
      "Intersection safety alerts",
      "Urban traffic management",
      "Speed display signs"
    ],
    inStock: true,
    badge: "bestseller"
  },
  {
    id: "zlytr22",
    slug: "24ghz-narrow-beam-long-range-radar-zlytr22",
    model: "ZLYTR22",
    name: "24GHz Narrow-Beam Long Range Radar",
    shortDescription: "Extended 320m detection for highway applications",
    description: "The ZLYTR22 features a narrow beam antenna design for exceptional long-range vehicle detection up to 320 meters. Perfect for highway monitoring, toll gates, and large-scale traffic management where extended detection range is critical.",
    price: 389,
    originalPrice: 459,
    category: "traffic",
    subcategory: "Speed Measurement",
    image: "/images/products/traffic-radar-zlytr22.jpg",
    features: [
      "320m ultra-long detection range",
      "Narrow beam high precision",
      "Speed measurement ≤350 km/h",
      "Multi-vehicle detection",
      "Modbus RTU protocol",
      "Aluminum alloy housing"
    ],
    specifications: {
      frequency: "24.00-24.25 GHz (K-band)",
      range: "10-320 meters",
      accuracy: "±1 km/h",
      power: "12-24V DC, <2W",
      interface: "RS-485 Modbus RTU",
      protection: "IP67",
      temperature: "-40°C to +70°C"
    },
    problemTags: ["speed-measurement", "traffic-management", "vehicle-detection"],
    applications: [
      "Highway speed enforcement",
      "Toll gate monitoring",
      "Tunnel traffic control",
      "Large intersection management"
    ],
    inStock: true,
    badge: "new"
  },

  // ============================================
  // AGRICULTURE - GROUND SPEED SENSORS
  // ============================================
  {
    id: "zlytgss01",
    slug: "24ghz-true-ground-speed-sensor-tgss",
    model: "ZLYTGSS01",
    name: "24GHz True Ground Speed Sensor",
    shortDescription: "Precision ground speed for tractors and agricultural equipment",
    description: "The ZLYTGSS01 is a K-band radar sensor designed specifically for agricultural low-speed measurement. Using continuous-wave Doppler technology, it measures true ground velocity from 0.1 m/s to 70 km/h. Drop-in replacement for wheel sensors with pulse, CAN, and RS-485 interfaces.",
    price: 245,
    originalPrice: 295,
    category: "agriculture",
    subcategory: "Ground Speed",
    image: "/images/products/ground-speed-tgss.jpg",
    features: [
      "Ultra-low speed detection: 0.1 m/s",
      "Speed range: 0-70 km/h",
      "Pulse output mimics wheel sensors",
      "CAN & RS-485 modern interfaces",
      "Works over soil, stubble, gravel",
      "Mounting: 0.3-1m above ground"
    ],
    specifications: {
      frequency: "24.00-24.20 GHz (K-band)",
      range: "0.1-70 km/h",
      accuracy: "±1 km/h",
      power: "9-36V DC, <1W",
      interface: "Pulse, CAN, RS-485",
      protection: "IP67",
      temperature: "-40°C to +85°C"
    },
    problemTags: ["ground-speed", "speed-measurement"],
    applications: [
      "Tractor speed monitoring",
      "Seeding rate control",
      "Precision agriculture",
      "Combine harvesters",
      "Spray application control"
    ],
    inStock: true,
    badge: "bestseller"
  },
  {
    id: "zlytgss02",
    slug: "24ghz-agriculture-speed-radar-pro",
    model: "ZLYTGSS02-PRO",
    name: "24GHz Agriculture Speed Radar Pro",
    shortDescription: "Advanced ground speed with dual-output for precision farming",
    description: "Enhanced version of our ground speed sensor with dual independent outputs, improved accuracy at crawling speeds, and enhanced EMC performance for modern precision farming equipment.",
    price: 329,
    category: "agriculture",
    subcategory: "Ground Speed",
    image: "/images/products/ground-speed-pro.jpg",
    features: [
      "Dual independent outputs",
      "Enhanced 0.05 m/s minimum speed",
      "Improved EMC shielding",
      "Auto-calibration mode",
      "LED status indicators",
      "Quick-connect harness"
    ],
    specifications: {
      frequency: "24.00-24.20 GHz (K-band)",
      range: "0.05-80 km/h",
      accuracy: "±0.5 km/h",
      power: "10-32V DC, <1.5W",
      interface: "Dual Pulse, CAN 2.0B, RS-485",
      protection: "IP68",
      temperature: "-40°C to +85°C"
    },
    problemTags: ["ground-speed", "speed-measurement"],
    applications: [
      "Precision seeding systems",
      "Variable rate application",
      "GPS guidance backup",
      "Yield monitoring"
    ],
    inStock: true
  },

  // ============================================
  // SECURITY RADAR SENSORS
  // ============================================
  {
    id: "sr200",
    slug: "24ghz-200m-perimeter-security-radar",
    model: "SR200",
    name: "24GHz 200m Perimeter Security Radar",
    shortDescription: "Multi-target intrusion detection for critical facilities",
    description: "The SR200 leverages modern microwave and high-speed digital signal processing for 24/7 perimeter security. With multi-antenna structures, it detects up to 32 targets simultaneously within 1-200 meter range, operating seamlessly in rain, snow, and harsh conditions.",
    price: 1890,
    originalPrice: 2290,
    category: "security",
    subcategory: "Perimeter Protection",
    image: "/images/products/security-radar-sr200.jpg",
    features: [
      "200m detection range",
      "32 simultaneous targets",
      "All-weather operation",
      "Position & speed tracking",
      "TCP data transmission",
      "Ultra-high anti-interference",
      "Low false alarm rate"
    ],
    specifications: {
      frequency: "24.00-24.25 GHz (K-band)",
      range: "1-200 meters",
      accuracy: "±0.5m position, ±0.5 km/h speed",
      power: "12-24V DC, <8W",
      interface: "TCP/IP Ethernet",
      protection: "IP66",
      temperature: "-40°C to +70°C"
    },
    problemTags: ["perimeter-protection", "intrusion-detection", "vehicle-detection"],
    applications: [
      "Border security",
      "Airport perimeter",
      "Oil & gas facilities",
      "Power plants",
      "Prison perimeters",
      "Military bases"
    ],
    inStock: true,
    badge: "bestseller"
  },
  {
    id: "sr500",
    slug: "24ghz-500m-security-radar-extended",
    model: "SR500",
    name: "24GHz 500m Extended Range Security Radar",
    shortDescription: "Long-range surveillance for large area protection",
    description: "Extended range security radar for protecting large perimeters. Capable of detecting and tracking 64 targets up to 500 meters, ideal for airports, seaports, and extensive industrial complexes.",
    price: 3490,
    category: "security",
    subcategory: "Perimeter Protection",
    image: "/images/products/security-radar-sr500.jpg",
    features: [
      "500m detection range",
      "64 simultaneous targets",
      "PTZ camera integration",
      "CCTV/VMS compatible",
      "Automatic threat classification",
      "Zone-based alarms"
    ],
    specifications: {
      frequency: "24.00-24.25 GHz (K-band)",
      range: "5-500 meters",
      accuracy: "±1m position",
      power: "24V DC, <15W",
      interface: "Ethernet, RS-485",
      protection: "IP67",
      temperature: "-40°C to +60°C"
    },
    problemTags: ["perimeter-protection", "intrusion-detection"],
    applications: [
      "Large industrial sites",
      "Seaports",
      "International airports",
      "Government facilities"
    ],
    inStock: true,
    badge: "new"
  },

  // ============================================
  // AUTOMOTIVE RADAR (ADAS)
  // ============================================
  {
    id: "lrr230pro",
    slug: "77ghz-long-range-radar-lrr230pro",
    model: "LRR230PRO",
    name: "77GHz Long Range Multi-Target Radar",
    shortDescription: "Advanced ADAS radar with 260m range and 128-target tracking",
    description: "The LRR230PRO is a cutting-edge 77GHz mmWave radar using RFCMOS SOC technology. With 260m detection range, ±0.1m accuracy, and tracking up to 128 targets simultaneously, it's ideal for ADAS applications including FCW, AEB, ACC, and autonomous driving systems.",
    price: 589,
    originalPrice: 749,
    category: "automotive",
    subcategory: "Long Range Radar",
    image: "/images/products/adas-radar-lrr230pro.jpg",
    features: [
      "260m detection range",
      "128 target tracking",
      "±0.1m range accuracy",
      "±0.03 m/s velocity accuracy",
      "Dual CAN-FD interface",
      "Hidden bumper installation",
      "Vision fusion ready"
    ],
    specifications: {
      frequency: "76-77 GHz (W-band)",
      range: "0.2-260 meters",
      accuracy: "±0.1m range, ±0.03 m/s velocity",
      power: "9-16V DC, <5W",
      interface: "Dual CAN-FD",
      protection: "IP67",
      temperature: "-40°C to +85°C"
    },
    problemTags: ["collision-avoidance", "adas", "vehicle-detection"],
    applications: [
      "Forward Collision Warning (FCW)",
      "Autonomous Emergency Braking (AEB)",
      "Adaptive Cruise Control (ACC)",
      "Traffic Jam Assist",
      "Highway Pilot"
    ],
    inStock: true,
    badge: "bestseller"
  },
  {
    id: "zlymrr400",
    slug: "77ghz-blind-spot-detection-radar-mrr400",
    model: "ZLYMRR400",
    name: "77GHz Blind Spot Detection Radar",
    shortDescription: "5-in-1 BSD system for commercial and passenger vehicles",
    description: "The ZLYMRR400 is a compact, high-performance 77GHz vehicle-mounted blind spot radar integrating BSD, Lane Change Assistance (LCA), Door Opening Warning (DOW), Reverse Cross Traffic Alert (RCTA), and Rear Collision Warning (RCW) in one module.",
    price: 449,
    originalPrice: 549,
    category: "automotive",
    subcategory: "BSD Radar",
    image: "/images/products/bsd-radar-mrr400.jpg",
    features: [
      "5-in-1 safety functions",
      "BSD + LCA + DOW + RCTA + RCW",
      "Wide 150° FOV",
      "Fast 50ms response time",
      "CAN bus integration",
      "OEM-grade quality"
    ],
    specifications: {
      frequency: "76-77 GHz (W-band)",
      range: "0.5-80 meters",
      accuracy: "±0.3m range, ±2° angle",
      power: "9-16V DC, <4W",
      interface: "CAN 2.0B",
      protection: "IP67",
      temperature: "-40°C to +85°C"
    },
    problemTags: ["blind-spot-detection", "collision-avoidance", "adas"],
    applications: [
      "Blind Spot Detection",
      "Lane Change Assistance",
      "Door Opening Warning",
      "Reverse Cross Traffic Alert",
      "Truck/Bus safety systems"
    ],
    inStock: true,
    badge: "sale"
  },
  {
    id: "zlyapa100",
    slug: "24ghz-parking-assist-radar",
    model: "ZLYAPA100",
    name: "24GHz Automatic Parking Assist Radar",
    shortDescription: "High-resolution parking sensor with slot detection",
    description: "Precision 24GHz radar for automatic parking assist systems. Detects parking slots, measures distances with centimeter accuracy, and integrates with vehicle parking ECU for seamless automated parking.",
    price: 189,
    category: "automotive",
    subcategory: "Parking Radar",
    image: "/images/products/parking-radar-apa100.jpg",
    features: [
      "Parking slot detection",
      "5cm distance accuracy",
      "4m side detection range",
      "Fast slot scanning",
      "Compact hidden mount"
    ],
    specifications: {
      frequency: "24.00-24.25 GHz (K-band)",
      range: "0.1-4 meters",
      accuracy: "±5cm",
      power: "9-16V DC, <2W",
      interface: "CAN",
      protection: "IP67",
      temperature: "-40°C to +85°C"
    },
    problemTags: ["parking-assist", "collision-avoidance"],
    applications: [
      "Automated parking systems",
      "Parking distance monitoring",
      "Side collision warning"
    ],
    inStock: true
  },

  // ============================================
  // WATER LEVEL SENSORS
  // ============================================
  {
    id: "zlyrr04b",
    slug: "80ghz-40m-water-level-radar-sensor",
    model: "ZLYRR04B",
    name: "80GHz 40m Water Level Radar Sensor",
    shortDescription: "High-precision hydrological monitoring with 40m range",
    description: "The ZLYRR04B is an 80GHz FMCW radar designed for hydrological detection. Non-contact design, compact structure, high precision, low power consumption, and strong anti-interference make it ideal for rivers, lakes, flood warning systems, and sewage monitoring.",
    price: 345,
    originalPrice: 420,
    category: "water-level",
    subcategory: "Hydrological",
    image: "/images/products/water-level-80ghz-40m.jpg",
    features: [
      "40m measurement range",
      "±3mm high accuracy",
      "80GHz FMCW technology",
      "Non-contact installation",
      "All-weather operation",
      "RS485 Modbus RTU"
    ],
    specifications: {
      frequency: "80 GHz (W-band FMCW)",
      range: "0.5-40 meters",
      accuracy: "±3mm",
      power: "12-24V DC, <2W",
      interface: "RS-485 Modbus RTU",
      protection: "IP67",
      temperature: "-40°C to +80°C"
    },
    problemTags: ["level-monitoring", "flood-warning"],
    applications: [
      "River water level monitoring",
      "Lake level measurement",
      "Flash flood warning systems",
      "Reservoir monitoring",
      "Sewage pipe networks"
    ],
    inStock: true,
    badge: "bestseller"
  },
  {
    id: "zlyrr10",
    slug: "80ghz-20m-compact-water-level-sensor",
    model: "ZLYRR10",
    name: "80GHz 20m Compact Water Level Sensor",
    shortDescription: "IP67 waterproof radar for medium-range level monitoring",
    description: "Compact 80GHz radar level sensor with 20m range. Designed for urban water management, storage tanks, and medium-range hydrological applications. IP67 waterproof rating ensures reliable outdoor operation.",
    price: 275,
    category: "water-level",
    subcategory: "Hydrological",
    image: "/images/products/water-level-80ghz-20m.jpg",
    features: [
      "20m measurement range",
      "Ultra-compact design",
      "IP67 waterproof",
      "UART output",
      "Low power <1.5W"
    ],
    specifications: {
      frequency: "80 GHz (W-band FMCW)",
      range: "0.3-20 meters",
      accuracy: "±3mm",
      power: "12-24V DC, <1.5W",
      interface: "UART",
      protection: "IP67",
      temperature: "-30°C to +70°C"
    },
    problemTags: ["level-monitoring", "flood-warning", "tank-monitoring"],
    applications: [
      "Urban drainage monitoring",
      "Water storage tanks",
      "Sewage wells",
      "Storm water management"
    ],
    inStock: true
  },
  {
    id: "zlyrr03b",
    slug: "120ghz-ultra-precision-liquid-level-radar",
    model: "ZLYRR03B",
    name: "120GHz Ultra-Precision Liquid Level Radar",
    shortDescription: "±1mm accuracy for industrial tank monitoring",
    description: "The ZLYRR03B is a 120GHz ultra-precision radar for demanding industrial liquid level measurement. With ±1mm accuracy, narrow 4° beam angle, and IP68 rating, it excels in challenging environments with vapor, foam, or agitation.",
    price: 489,
    originalPrice: 599,
    category: "water-level",
    subcategory: "Industrial",
    image: "/images/products/water-level-120ghz.jpg",
    features: [
      "±1mm ultra-high accuracy",
      "20m measurement range",
      "120GHz narrow beam (4°)",
      "IP68 waterproof",
      "Immune to vapor and foam",
      "4-20mA + RS485 output"
    ],
    specifications: {
      frequency: "120 GHz",
      range: "0.2-20 meters",
      accuracy: "±1mm",
      power: "12-36V DC, <1W",
      interface: "4-20mA, RS-485",
      protection: "IP68",
      temperature: "-40°C to +80°C"
    },
    problemTags: ["level-monitoring", "tank-monitoring"],
    applications: [
      "Chemical storage tanks",
      "Pharmaceutical vessels",
      "Food & beverage tanks",
      "Precision process control"
    ],
    inStock: true,
    badge: "new"
  },
  {
    id: "zlysw01",
    slug: "80ghz-sewage-well-level-sensor",
    model: "ZLYSW01",
    name: "80GHz Sewage Well Level Sensor",
    shortDescription: "Corrosion-resistant design for wastewater applications",
    description: "Specialized radar level sensor for sewage and wastewater monitoring. Features corrosion-resistant PTFE antenna, anti-condensation design, and enhanced signal processing to handle challenging sewage environments.",
    price: 395,
    category: "water-level",
    subcategory: "Wastewater",
    image: "/images/products/sewage-level-sensor.jpg",
    features: [
      "Corrosion-resistant PTFE antenna",
      "Anti-condensation heating",
      "Handles foam and turbulence",
      "Self-cleaning design",
      "10m range for manholes"
    ],
    specifications: {
      frequency: "80 GHz (W-band FMCW)",
      range: "0.3-10 meters",
      accuracy: "±5mm",
      power: "12-24V DC, <3W",
      interface: "RS-485, 4-20mA",
      protection: "IP68",
      temperature: "-30°C to +60°C"
    },
    problemTags: ["level-monitoring", "tank-monitoring"],
    applications: [
      "Sewage pump stations",
      "Manhole monitoring",
      "Wastewater treatment",
      "Combined sewer systems"
    ],
    inStock: true
  },

  // ============================================
  // UAV/DRONE RADAR
  // ============================================
  {
    id: "zlyldra100",
    slug: "24ghz-uav-radar-altimeter",
    model: "ZLY-LDRA100",
    name: "24GHz UAV Radar Altimeter",
    shortDescription: "All-weather altitude measurement for drones",
    description: "The ZLY-LDRA100 is designed for UAV altitude measurement. Using Infineon automotive-grade chips, it operates reliably in rain, snow, fog, and dust. Compact design reduces payload impact while providing accurate altitude data for safe flight operations.",
    price: 289,
    originalPrice: 349,
    category: "uav",
    subcategory: "Altimeter",
    image: "/images/products/uav-altimeter-ldra100.jpg",
    features: [
      "100m altitude range",
      "All-weather operation",
      "Infineon chipset reliability",
      "Compact lightweight design",
      "CAN + Serial interfaces",
      "Plug-and-play integration"
    ],
    specifications: {
      frequency: "24.00-24.20 GHz (K-band)",
      range: "0.5-100 meters altitude",
      accuracy: "±10cm",
      power: "5V DC, <1W",
      interface: "CAN, UART",
      protection: "IP65",
      temperature: "-20°C to +70°C",
      weight: "<50g"
    },
    problemTags: ["altitude-measurement", "drone-navigation"],
    applications: [
      "Agricultural drones",
      "Delivery UAVs",
      "Aerial photography",
      "Survey & mapping drones",
      "VTOL aircraft"
    ],
    inStock: true,
    badge: "bestseller"
  },
  {
    id: "zlydca200",
    slug: "24ghz-drone-collision-avoidance-radar",
    model: "ZLY-DCA200",
    name: "24GHz Drone Collision Avoidance Radar",
    shortDescription: "Forward-looking obstacle detection for UAVs",
    description: "Forward-looking collision avoidance radar for drones. Detects obstacles up to 50m ahead with wide 80° FOV, enabling autonomous obstacle avoidance and safe flight in complex environments.",
    price: 359,
    category: "uav",
    subcategory: "Collision Avoidance",
    image: "/images/products/uav-collision-avoidance.jpg",
    features: [
      "50m forward detection",
      "80° horizontal FOV",
      "Multi-target detection",
      "Lightweight <35g",
      "Low latency response"
    ],
    specifications: {
      frequency: "24.00-24.25 GHz (K-band)",
      range: "1-50 meters",
      accuracy: "±20cm",
      power: "5V DC, <1.5W",
      interface: "UART, PWM",
      protection: "IP54",
      temperature: "-10°C to +60°C",
      weight: "<35g"
    },
    problemTags: ["collision-avoidance", "drone-navigation"],
    applications: [
      "Autonomous flight",
      "Indoor drone navigation",
      "Warehouse inspection drones",
      "Urban air mobility"
    ],
    inStock: true
  },

  // ============================================
  // INDUSTRIAL SENSORS
  // ============================================
  {
    id: "zlyflow01",
    slug: "24ghz-3in1-flow-rate-radar",
    model: "ZLYFLOW01",
    name: "24GHz 3-in-1 Flow Rate Radar",
    shortDescription: "Level + velocity + flow rate in one sensor",
    description: "Revolutionary 3-in-1 radar combining water level, flow velocity, and flow rate measurement in a single sensor. Perfect for open channel flow monitoring in rivers, canals, and irrigation systems.",
    price: 545,
    originalPrice: 650,
    category: "industrial",
    subcategory: "Flow Measurement",
    image: "/images/products/flow-rate-radar.jpg",
    features: [
      "3-in-1: Level + Velocity + Flow",
      "Non-contact measurement",
      "30m level range",
      "15 m/s velocity range",
      "Real-time flow calculation",
      "Easy channel calibration"
    ],
    specifications: {
      frequency: "24 GHz (K-band)",
      range: "0.05-30m (level), 0.15-15 m/s (velocity)",
      accuracy: "±2mm (level), ±0.03 m/s (velocity)",
      power: "12-24V DC, <3W",
      interface: "RS-485 Modbus, 4-20mA",
      protection: "IP67",
      temperature: "-30°C to +70°C"
    },
    problemTags: ["level-monitoring", "flood-warning"],
    applications: [
      "River flow monitoring",
      "Irrigation canal measurement",
      "Stormwater management",
      "Industrial discharge monitoring"
    ],
    inStock: true,
    badge: "new"
  },
  {
    id: "zlyds01",
    slug: "80ghz-dust-silo-level-radar",
    model: "ZLYDS01",
    name: "80GHz Dust & Silo Level Radar",
    shortDescription: "Solid level measurement for silos and hoppers",
    description: "Designed for challenging solid material level measurement in silos, hoppers, and bins. Features dust-penetrating 80GHz technology with algorithms to handle irregular surfaces and dust clouds.",
    price: 425,
    category: "industrial",
    subcategory: "Silo Level",
    image: "/images/products/silo-level-radar.jpg",
    features: [
      "30m range for solids",
      "Dust cloud penetration",
      "Irregular surface handling",
      "Powder & granule compatible",
      "Easy silo top mounting"
    ],
    specifications: {
      frequency: "80 GHz (W-band FMCW)",
      range: "0.5-30 meters",
      accuracy: "±10mm",
      power: "18-36V DC, <2W",
      interface: "RS-485, 4-20mA",
      protection: "IP67",
      temperature: "-40°C to +80°C"
    },
    problemTags: ["level-monitoring", "tank-monitoring"],
    applications: [
      "Grain silos",
      "Cement silos",
      "Coal hoppers",
      "Chemical powder storage"
    ],
    inStock: true
  },
  {
    id: "zlytank01",
    slug: "120ghz-precision-tank-gauging-radar",
    model: "ZLYTANK01",
    name: "120GHz Precision Tank Gauging Radar",
    shortDescription: "Custody transfer grade liquid level measurement",
    description: "High-precision 120GHz radar for custody transfer and inventory management applications. Meets accuracy requirements for commercial fuel storage and chemical tank farms.",
    price: 789,
    category: "industrial",
    subcategory: "Tank Gauging",
    image: "/images/products/tank-gauging-radar.jpg",
    features: [
      "±0.5mm custody transfer accuracy",
      "Explosion-proof options",
      "Hart 7 + Modbus protocol",
      "Auto-calibration",
      "Tank temperature compensation"
    ],
    specifications: {
      frequency: "120 GHz",
      range: "0.1-30 meters",
      accuracy: "±0.5mm",
      power: "18-36V DC, <2W",
      interface: "4-20mA HART, RS-485 Modbus",
      protection: "IP68, ATEX Zone 0",
      temperature: "-40°C to +150°C (with cooling)"
    },
    problemTags: ["level-monitoring", "tank-monitoring"],
    applications: [
      "Fuel storage tanks",
      "Chemical tank farms",
      "LNG/LPG storage",
      "Pharmaceutical vessels"
    ],
    inStock: true,
    badge: "new"
  }
];

// Category metadata for display
export const categoryInfo: Record<string, { name: string; description: string; icon: string }> = {
  traffic: {
    name: "Traffic Radar",
    description: "Speed measurement and vehicle detection for roads and highways",
    icon: "Car"
  },
  agriculture: {
    name: "Agriculture",
    description: "Ground speed sensors for tractors and farming equipment",
    icon: "Tractor"
  },
  security: {
    name: "Security",
    description: "Perimeter protection and intrusion detection systems",
    icon: "Shield"
  },
  automotive: {
    name: "Automotive ADAS",
    description: "Advanced driver assistance radar systems",
    icon: "Gauge"
  },
  "water-level": {
    name: "Water Level",
    description: "Non-contact level measurement for water and liquids",
    icon: "Waves"
  },
  uav: {
    name: "UAV/Drone",
    description: "Altitude and collision avoidance radar for drones",
    icon: "Plane"
  },
  industrial: {
    name: "Industrial",
    description: "Flow rate, silo level, and tank gauging sensors",
    icon: "Factory"
  }
};

// Problem tags metadata
export const problemTagInfo: Record<string, { name: string; description: string }> = {
  "speed-measurement": {
    name: "Speed Measurement",
    description: "Measure vehicle or ground speed accurately"
  },
  "collision-avoidance": {
    name: "Collision Avoidance",
    description: "Prevent collisions with obstacle detection"
  },
  "blind-spot-detection": {
    name: "Blind Spot Detection",
    description: "Monitor vehicle blind spots for safety"
  },
  "level-monitoring": {
    name: "Level Monitoring",
    description: "Measure liquid or solid levels in tanks"
  },
  "perimeter-protection": {
    name: "Perimeter Protection",
    description: "Secure facility perimeters from intrusion"
  },
  "ground-speed": {
    name: "Ground Speed",
    description: "True ground speed for agriculture"
  },
  "altitude-measurement": {
    name: "Altitude Measurement",
    description: "UAV height above ground measurement"
  },
  "traffic-management": {
    name: "Traffic Management",
    description: "Monitor and control road traffic"
  },
  "vehicle-detection": {
    name: "Vehicle Detection",
    description: "Detect and track vehicles"
  },
  "flood-warning": {
    name: "Flood Warning",
    description: "Water level monitoring for flood prevention"
  },
  "tank-monitoring": {
    name: "Tank Monitoring",
    description: "Industrial tank level measurement"
  },
  "drone-navigation": {
    name: "Drone Navigation",
    description: "Safe drone flight operations"
  },
  "adas": {
    name: "ADAS",
    description: "Advanced driver assistance systems"
  },
  "parking-assist": {
    name: "Parking Assist",
    description: "Automated parking systems"
  },
  "intrusion-detection": {
    name: "Intrusion Detection",
    description: "Detect unauthorized entry"
  }
};

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

// Helper function to get products by problem tag
export function getProductsByProblemTag(tag: string): Product[] {
  return products.filter(p => p.problemTags.includes(tag as any));
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.shortDescription.toLowerCase().includes(lowerQuery) ||
    p.model?.toLowerCase().includes(lowerQuery) ||
    p.applications.some(app => app.toLowerCase().includes(lowerQuery)) ||
    p.problemTags.some(tag => tag.includes(lowerQuery))
  );
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.badge);
}
