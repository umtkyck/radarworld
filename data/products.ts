import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "radar-commercial-001",
    name: "Maritime Navigation Radar MNR-3000",
    description: "Advanced maritime radar system for commercial vessels with collision avoidance and weather detection capabilities.",
    price: 45000,
    category: "commercial",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    features: [
      "360° panoramic coverage",
      "Weather detection and tracking",
      "Automatic target tracking (ATT)",
      "Integration with AIS systems",
      "Long-range detection up to 96 nautical miles"
    ],
    specifications: {
      range: "96 nautical miles",
      frequency: "X-band (9.3-9.5 GHz)",
      power: "25 kW peak",
      resolution: "7.5m range, 1° azimuth"
    },
    inStock: true
  },
  {
    id: "radar-industrial-001",
    name: "Industrial Level Sensor ILS-2000",
    description: "Non-contact radar level sensor for industrial tanks and silos. Perfect for harsh environments and challenging materials.",
    price: 8500,
    category: "industrial",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
    features: [
      "Non-contact measurement",
      "Works with liquids, solids, and slurries",
      "Temperature resistant (-60°C to +200°C)",
      "Dust and vapor immune",
      "4-20mA and HART output"
    ],
    specifications: {
      range: "0-70 meters",
      frequency: "26 GHz (K-band)",
      power: "1W average",
      resolution: "±2mm accuracy"
    },
    inStock: true
  },
  {
    id: "radar-commercial-002",
    name: "Traffic Monitoring Radar TMR-500",
    description: "High-precision traffic monitoring and speed detection radar for commercial road management applications.",
    price: 15000,
    category: "commercial",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    features: [
      "Multi-lane traffic monitoring",
      "Speed and classification detection",
      "Vehicle counting and tracking",
      "Weather-resistant enclosure",
      "Real-time data streaming"
    ],
    specifications: {
      range: "250 meters",
      frequency: "24 GHz (K-band)",
      power: "100 mW",
      resolution: "±1 km/h speed accuracy"
    },
    inStock: true
  },
  {
    id: "radar-industrial-002",
    name: "Perimeter Security Radar PSR-8000",
    description: "Industrial-grade perimeter protection radar for critical infrastructure and facility security applications.",
    price: 65000,
    category: "industrial",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    features: [
      "360° continuous surveillance",
      "Intrusion detection and tracking",
      "Multi-target tracking (up to 512 targets)",
      "Integration with CCTV and alarms",
      "All-weather operation"
    ],
    specifications: {
      range: "5 kilometers",
      frequency: "X-band (10 GHz)",
      power: "50W peak",
      resolution: "1m range, 0.5° azimuth"
    },
    inStock: true
  },
  {
    id: "radar-commercial-003",
    name: "Drone Detection Radar DDR-1000",
    description: "Specialized radar system for detecting and tracking unauthorized drones in commercial airspace.",
    price: 35000,
    category: "commercial",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
    features: [
      "Small target detection capability",
      "3D tracking and classification",
      "Low altitude coverage",
      "Fast scan rate (1 second)",
      "Integration with counter-drone systems"
    ],
    specifications: {
      range: "3 kilometers",
      frequency: "Ku-band (13.5-14 GHz)",
      power: "10W average",
      resolution: "RCS 0.01 m² detection"
    },
    inStock: true
  },
  {
    id: "radar-industrial-003",
    name: "Mining Collision Avoidance MCA-4000",
    description: "Rugged radar system for heavy mining equipment collision avoidance in underground and surface operations.",
    price: 28000,
    category: "industrial",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    features: [
      "360° obstacle detection",
      "Multiple zone configuration",
      "Dust and vibration resistant",
      "Audio and visual warnings",
      "CAN bus integration"
    ],
    specifications: {
      range: "100 meters",
      frequency: "24 GHz",
      power: "500 mW",
      resolution: "±0.5m range accuracy"
    },
    inStock: true
  },
  {
    id: "radar-commercial-004",
    name: "Weather Surveillance Radar WSR-7000",
    description: "Commercial weather radar for meteorological monitoring, precipitation detection, and storm tracking.",
    price: 125000,
    category: "commercial",
    image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=800&h=600&fit=crop",
    features: [
      "Dual-polarization technology",
      "Precipitation type classification",
      "Wind field analysis",
      "Doppler velocity measurement",
      "Remote monitoring and control"
    ],
    specifications: {
      range: "250 kilometers",
      frequency: "C-band (5.6 GHz)",
      power: "250 kW peak",
      resolution: "250m range, 1° azimuth"
    },
    inStock: true
  },
  {
    id: "radar-industrial-004",
    name: "Port Automation Radar PAR-6000",
    description: "High-resolution radar for automated container handling and vehicle tracking in port terminals.",
    price: 55000,
    category: "industrial",
    image: "https://images.unsplash.com/photo-1605745341075-4815a54cad1a?w=800&h=600&fit=crop",
    features: [
      "Container and vehicle tracking",
      "Positioning accuracy for automation",
      "Multi-sensor fusion ready",
      "Real-time 3D mapping",
      "Ethernet and fiber optic interfaces"
    ],
    specifications: {
      range: "500 meters",
      frequency: "77 GHz (W-band)",
      power: "5W average",
      resolution: "±5cm position accuracy"
    },
    inStock: true
  },

  // ZLY RADAR PRODUCTS
  {
    id: "zly-commercial-001",
    name: "ZLY 77GHz Long Range Multi-Target Radar LRR230PRO",
    description: "Advanced 77GHz FMCW radar for ADAS applications and long-range multi-target detection in commercial vehicles.",
    price: 3200,
    category: "commercial",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    features: [
      "Detection range up to 250 meters",
      "Multi-target tracking (up to 100 targets)",
      "High angular resolution (±0.5°)",
      "ADAS integration ready",
      "IP67 waterproof rating"
    ],
    specifications: {
      range: "0.2-250 meters",
      frequency: "77 GHz (W-band)",
      power: "10 dBm EIRP",
      resolution: "±0.5° angular, ±0.1m range"
    },
    inStock: true
  },
  {
    id: "zly-industrial-001",
    name: "ZLY ZLYRR03B 120GHz Liquid Level Radar",
    description: "Ultra-precise 120GHz radar sensor for non-contact liquid level measurement with ±2mm accuracy and IP68 waterproof rating.",
    price: 1850,
    category: "industrial",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
    features: [
      "20 meter measurement range",
      "±2mm ultra-high accuracy",
      "IP68 waterproof for harsh environments",
      "Works with any liquid type",
      "RS485/4-20mA output options"
    ],
    specifications: {
      range: "0.2-20 meters",
      frequency: "120 GHz",
      power: "Low power consumption <1W",
      resolution: "±2mm accuracy"
    },
    inStock: true
  },
  {
    id: "zly-industrial-002",
    name: "ZLY 80GHz Water Level Sensor RS485",
    description: "High-precision 80GHz non-contact water level measurement sensor with 40m range, perfect for hydrological monitoring.",
    price: 1450,
    category: "industrial",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    features: [
      "40 meter measurement range",
      "IP67 waterproof rating",
      "RS485 Modbus RTU protocol",
      "No maintenance required",
      "Immune to vapor and foam"
    ],
    specifications: {
      range: "0.5-40 meters",
      frequency: "80 GHz",
      power: "12-36V DC, <2W",
      resolution: "±3mm accuracy"
    },
    inStock: true
  },
  {
    id: "zly-industrial-003",
    name: "ZLY 24GHz Flow Rate Radar - 3-in-1 Sensor",
    description: "Innovative 24GHz radar combining water level, flow velocity, and flow rate measurement in a single sensor.",
    price: 2100,
    category: "industrial",
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&h=600&fit=crop",
    features: [
      "3-in-1: Level + Velocity + Flow rate",
      "Non-contact measurement",
      "Perfect for narrow canals and pipes",
      "Real-time data output",
      "Easy installation and calibration"
    ],
    specifications: {
      range: "0.05-30 meters (level), 0.15-15 m/s (velocity)",
      frequency: "24 GHz (K-band)",
      power: "12-24V DC, <3W",
      resolution: "±2mm (level), ±0.03m/s (velocity)"
    },
    inStock: true
  },
  {
    id: "zly-commercial-002",
    name: "ZLY 24GHz Doppler Speed Radar Sensor",
    description: "Compact 24GHz Doppler radar for accurate speed measurement in traffic monitoring and vehicle detection systems.",
    price: 850,
    category: "commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    features: [
      "High-precision speed detection",
      "RS232/RS485 communication",
      "Compact size and easy installation",
      "All-weather operation",
      "Configurable detection angles"
    ],
    specifications: {
      range: "5-250 meters detection",
      frequency: "24 GHz (K-band)",
      power: "5V DC, <1W",
      resolution: "±0.5 km/h speed accuracy"
    },
    inStock: true
  },
  {
    id: "zly-commercial-003",
    name: "ZLY 77GHz BSD Radar for Commercial Vehicles",
    description: "Blind Spot Detection radar system specifically designed for commercial trucks and large vehicles.",
    price: 2800,
    category: "commercial",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop",
    features: [
      "Blind spot monitoring for trucks",
      "Lane change assist",
      "Rear cross-traffic alert",
      "Multi-target tracking",
      "CAN bus integration"
    ],
    specifications: {
      range: "0.5-80 meters",
      frequency: "77 GHz (W-band)",
      power: "9-16V DC, <5W",
      resolution: "±0.3m range, ±2° angle"
    },
    inStock: true
  },
  {
    id: "zly-industrial-004",
    name: "ZLY 120GHz Low Power Sewage Level Gauge",
    description: "Specialized 120GHz radar for sewage well monitoring with low power consumption and high corrosion resistance.",
    price: 1650,
    category: "industrial",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop",
    features: [
      "10 meter measurement range",
      "Ultra-low power consumption",
      "Corrosion resistant design",
      "Narrow beam angle (8°)",
      "4-20mA output"
    ],
    specifications: {
      range: "0.3-10 meters",
      frequency: "120 GHz",
      power: "<0.5W battery powered",
      resolution: "±2mm accuracy"
    },
    inStock: true
  },
  {
    id: "zly-commercial-004",
    name: "ZLY 24GHz Low Speed Radar for Freight Trains",
    description: "Specialized low-speed detection radar for freight train monitoring and railway safety applications.",
    price: 1950,
    category: "commercial",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop",
    features: [
      "Low-speed detection (0.1-50 km/h)",
      "Railway-specific algorithms",
      "Weather and vibration resistant",
      "RS485 Modbus protocol",
      "Easy trackside installation"
    ],
    specifications: {
      range: "1-100 meters",
      frequency: "24 GHz (K-band)",
      power: "12-24V DC, <2W",
      resolution: "±0.1 km/h at low speeds"
    },
    inStock: true
  }
];
