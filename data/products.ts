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
  }
];
