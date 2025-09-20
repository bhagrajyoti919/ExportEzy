import { useState, useEffect, useCallback } from 'react';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockData = useCallback(() => {
      if (url === '/api/clients') {
        return [
          {
            "id": 1,
            "name": "Sarah Johnson",
            "email": "sarah.johnson@globaltech.com",
            "phone": "+1-555-0123",
            "company": "GlobalTech Inc.",
            "country": "United States",
            "totalOrders": 45,
            "lastOrder": "2024-09-15",
            "status": "Active",
            "value": "$250,000"
          },
          {
            "id": 2,
            "name": "James Wilson",
            "email": "j.wilson@britishimports.uk",
            "phone": "+44-20-1234-5678",
            "company": "British Imports Ltd.",
            "country": "United Kingdom",
            "totalOrders": 32,
            "lastOrder": "2024-09-18",
            "status": "Active",
            "value": "$180,000"
          },
          {
            "id": 3,
            "name": "Emma Thompson",
            "email": "emma@aussietrading.com.au",
            "phone": "+61-2-9876-5432",
            "company": "Aussie Trading Co.",
            "country": "Australia",
            "totalOrders": 28,
            "lastOrder": "2024-08-30",
            "status": "Active",
            "value": "$120,000"
          },
          {
            "id": 4,
            "name": "Hans Mueller",
            "email": "h.mueller@europeandist.de",
            "phone": "+49-40-1234567",
            "company": "European Distributors",
            "country": "Germany",
            "totalOrders": 52,
            "lastOrder": "2024-09-20",
            "status": "Active",
            "value": "$320,000"
          },
          {
            "id": 5,
            "name": "Michael Chen",
            "email": "m.chen@canadianimports.ca",
            "phone": "+1-416-555-0198",
            "company": "Canadian Imports",
            "country": "Canada",
            "totalOrders": 19,
            "lastOrder": "2024-09-12",
            "status": "Active",
            "value": "$95,000"
          },
          {
            "id": 6,
            "name": "Ahmed Al-Rashid",
            "email": "ahmed@metrading.ae",
            "phone": "+971-4-123-4567",
            "company": "Middle East Trading",
            "country": "UAE",
            "totalOrders": 38,
            "lastOrder": "2024-09-19",
            "status": "Active",
            "value": "$210,000"
          }
        ];
      }
      
      if (url === '/api/dashboard/stats') {
        return {
          activeShipments: 32,
          lowStockItems: 8,
          totalClients: 6,
          deliveredThisMonth: 184
        };
      }
      
      if (url === '/api/shipments') {
        return [
          {
            "id": 1,
            "trackingNumber": "SH-2024-001",
            "client": "GlobalTech Inc.",
            "origin": "New York, USA",
            "destination": "London, UK",
            "status": "Delivered",
            "estimatedDelivery": "2024-09-20",
            "actualDelivery": "2024-09-19",
            "carrier": "DHL Express",
            "weight": "125 kg",
            "value": "$15,000",
            "priority": "High",
            "progress": 100,
            "description": "Electronic components for manufacturing"
          },
          {
            "id": 2,
            "trackingNumber": "SH-2024-002",
            "client": "British Imports Ltd.",
            "origin": "Los Angeles, USA",
            "destination": "Sydney, Australia",
            "status": "In Transit",
            "estimatedDelivery": "2024-09-25",
            "carrier": "Maersk Maritime",
            "weight": "2,500 kg",
            "value": "$45,000",
            "priority": "Medium",
            "progress": 65,
            "description": "Automotive parts shipment"
          },
          {
            "id": 3,
            "trackingNumber": "SH-2024-003",
            "client": "European Distributors",
            "origin": "Miami, USA",
            "destination": "Hamburg, Germany",
            "status": "Customs Hold",
            "estimatedDelivery": "2024-09-22",
            "carrier": "FedEx International",
            "weight": "850 kg",
            "value": "$28,000",
            "priority": "High",
            "progress": 45,
            "description": "Medical equipment requiring customs clearance"
          },
          {
            "id": 4,
            "trackingNumber": "SH-2024-004",
            "client": "Aussie Trading Co.",
            "origin": "Seattle, USA",
            "destination": "Tokyo, Japan",
            "status": "In Transit",
            "estimatedDelivery": "2024-09-28",
            "carrier": "UPS Worldwide",
            "weight": "450 kg",
            "value": "$18,500",
            "priority": "Low",
            "progress": 30,
            "description": "Textile materials for fashion industry"
          },
          {
            "id": 5,
            "trackingNumber": "SH-2024-005",
            "client": "Canadian Imports",
            "origin": "Chicago, USA",
            "destination": "Toronto, Canada",
            "status": "Delivered",
            "estimatedDelivery": "2024-09-18",
            "actualDelivery": "2024-09-18",
            "carrier": "Ground Transport",
            "weight": "320 kg",
            "value": "$12,000",
            "priority": "Medium",
            "progress": 100,
            "description": "Construction materials"
          },
          {
            "id": 6,
            "trackingNumber": "SH-2024-006",
            "client": "Middle East Trading",
            "origin": "Houston, USA",
            "destination": "Dubai, UAE",
            "status": "Preparing",
            "estimatedDelivery": "2024-10-02",
            "carrier": "Emirates SkyCargo",
            "weight": "1,200 kg",
            "value": "$35,000",
            "priority": "High",
            "progress": 15,
            "description": "Industrial machinery components"
          },
          {
            "id": 7,
            "trackingNumber": "SH-2024-007",
            "client": "Nordic Supplies",
            "origin": "Portland, USA",
            "destination": "Stockholm, Sweden",
            "status": "In Transit",
            "estimatedDelivery": "2024-09-30",
            "carrier": "Scandinavian Airlines Cargo",
            "weight": "680 kg",
            "value": "$22,500",
            "priority": "Medium",
            "progress": 55,
            "description": "Food processing equipment"
          },
          {
            "id": 8,
            "trackingNumber": "SH-2024-008",
            "client": "Asian Electronics",
            "origin": "San Francisco, USA",
            "destination": "Singapore",
            "status": "In Transit",
            "estimatedDelivery": "2024-09-26",
            "carrier": "Singapore Airlines Cargo",
            "weight": "95 kg",
            "value": "$8,750",
            "priority": "High",
            "progress": 75,
            "description": "High-tech electronic components"
          },
          {
            "id": 9,
            "trackingNumber": "SH-2024-009",
            "client": "Nordic Supplies",
            "origin": "Portland, USA",
            "destination": "Stockholm, Sweden",
            "status": "Delivered",
            "estimatedDelivery": "2024-09-30",
            "actualDelivery": "2024-09-29",
            "carrier": "Scandinavian Airlines Cargo",
            "weight": "680 kg",
            "value": "$22,500",
            "priority": "Medium",
            "progress": 100,
            "description": "Food processing equipment"
          },
          {
            "id": 10,
            "trackingNumber": "SH-2024-010",
            "client": "TechSolutions Ltd",
            "origin": "Seattle, USA",
            "destination": "Toronto, Canada",
            "status": "Preparing",
            "estimatedDelivery": "2024-10-05",
            "carrier": "Ground Transport",
            "weight": "320 kg",
            "value": "$18,500",
            "priority": "Low",
            "progress": 15,
            "description": "Computer hardware and accessories"
          },
          {
            "id": 11,
            "trackingNumber": "SH-2024-011",
            "client": "Fashion Forward",
            "origin": "Miami, USA",
            "destination": "Milan, Italy",
            "status": "In Transit",
            "estimatedDelivery": "2024-10-01",
            "carrier": "Alitalia Cargo",
            "weight": "450 kg",
            "value": "$35,000",
            "priority": "High",
            "progress": 60,
            "description": "Luxury fashion items and accessories"
          },
          {
            "id": 12,
            "trackingNumber": "SH-2024-012",
            "client": "HealthCare Plus",
            "origin": "Chicago, USA",
            "destination": "Tokyo, Japan",
            "status": "Customs Hold",
            "estimatedDelivery": "2024-10-03",
            "carrier": "Japan Airlines Cargo",
            "weight": "280 kg",
            "value": "$42,000",
            "priority": "High",
            "progress": 40,
            "description": "Medical devices and pharmaceuticals"
          },
          {
            "id": 13,
            "trackingNumber": "SH-2024-013",
            "client": "AutoParts Direct",
            "origin": "Detroit, USA",
            "destination": "Mexico City, Mexico",
            "status": "Delivered",
            "estimatedDelivery": "2024-09-28",
            "actualDelivery": "2024-09-27",
            "carrier": "Ground Transport",
            "weight": "1,200 kg",
            "value": "$28,500",
            "priority": "Medium",
            "progress": 100,
            "description": "Automotive replacement parts"
          },
          {
            "id": 14,
            "trackingNumber": "SH-2024-014",
            "client": "Green Energy Corp",
            "origin": "Houston, USA",
            "destination": "Berlin, Germany",
            "status": "In Transit",
            "estimatedDelivery": "2024-10-07",
            "carrier": "Lufthansa Cargo",
            "weight": "800 kg",
            "value": "$55,000",
            "priority": "High",
            "progress": 70,
            "description": "Solar panels and renewable energy equipment"
          },
          {
            "id": 15,
            "trackingNumber": "SH-2024-015",
            "client": "FoodEx International",
            "origin": "Los Angeles, USA",
            "destination": "Dubai, UAE",
            "status": "Preparing",
            "estimatedDelivery": "2024-10-10",
            "carrier": "Emirates SkyCargo",
            "weight": "950 kg",
            "value": "$12,500",
            "priority": "Medium",
            "progress": 25,
            "description": "Organic food products and supplements"
          },
          {
            "id": 16,
            "trackingNumber": "SH-2024-016",
            "client": "Sports Equipment Co",
            "origin": "Denver, USA",
            "destination": "Melbourne, Australia",
            "status": "In Transit",
            "estimatedDelivery": "2024-10-08",
            "carrier": "Qantas Freight",
            "weight": "650 kg",
            "value": "$19,800",
            "priority": "Medium",
            "progress": 55,
            "description": "Professional sports equipment and gear"
          },
          {
            "id": 17,
            "trackingNumber": "SH-2024-017",
            "client": "Beauty Essentials",
            "origin": "New York, USA",
            "destination": "Paris, France",
            "status": "Delivered",
            "estimatedDelivery": "2024-09-25",
            "actualDelivery": "2024-09-24",
            "carrier": "Air France Cargo",
            "weight": "180 kg",
            "value": "$24,000",
            "priority": "High",
            "progress": 100,
            "description": "Luxury cosmetics and beauty products"
          },
          {
            "id": 18,
            "trackingNumber": "SH-2024-018",
            "client": "Industrial Solutions",
            "origin": "Pittsburgh, USA",
            "destination": "Mumbai, India",
            "status": "Customs Hold",
            "estimatedDelivery": "2024-10-12",
            "carrier": "Air India Cargo",
            "weight": "1,500 kg",
            "value": "$67,500",
            "priority": "High",
            "progress": 35,
            "description": "Heavy machinery and industrial equipment"
          },
          {
            "id": 19,
            "trackingNumber": "SH-2024-019",
            "client": "Pet Care Plus",
            "origin": "Austin, USA",
            "destination": "Vancouver, Canada",
            "status": "In Transit",
            "estimatedDelivery": "2024-10-02",
            "carrier": "Ground Transport",
            "weight": "320 kg",
            "value": "$8,900",
            "priority": "Low",
            "progress": 80,
            "description": "Pet supplies and veterinary equipment"
          },
          {
            "id": 20,
            "trackingNumber": "SH-2024-020",
            "client": "Home Decor Ltd",
            "origin": "Phoenix, USA",
            "destination": "Barcelona, Spain",
            "status": "Preparing",
            "estimatedDelivery": "2024-10-15",
            "carrier": "Iberia Cargo",
            "weight": "720 kg",
            "value": "$31,200",
            "priority": "Medium",
            "progress": 20,
            "description": "Home decoration items and furniture"
          }
        ];
      }
      
      if (url === '/api/inventory') {
        return [
          {
            "id": 1,
            "name": "Electronic Components",
            "description": "Various electronic components and circuits",
            "category": "Electronics",
            "location": "Warehouse A - Section 1",
            "stockLevel": 25,
            "threshold": 50,
            "supplier": "TechSupply Co.",
            "unitPrice": 15.99,
            "value": "₹399.75",
            "sku": "ELEC-001",
            "lastUpdated": "2024-09-18"
          },
          {
            "id": 2,
            "name": "Automotive Parts",
            "description": "Car parts and automotive accessories",
            "category": "Automotive",
            "location": "Warehouse B - Bay 3",
            "stockLevel": 15,
            "threshold": 30,
            "supplier": "AutoParts Inc.",
            "unitPrice": 45.50,
            "value": "₹682.50",
            "sku": "AUTO-002",
            "lastUpdated": "2024-09-19"
          },
          {
            "id": 3,
            "name": "Textile Materials",
            "description": "High-quality fabric and textile materials",
            "category": "Textiles",
            "location": "Warehouse C - Floor 2",
            "stockLevel": 45,
            "threshold": 50,
            "supplier": "Fabric World",
            "unitPrice": 8.25,
            "value": "₹371.25",
            "sku": "TEXT-003",
            "lastUpdated": "2024-09-17"
          },
          {
            "id": 4,
            "name": "Medical Supplies",
            "description": "Essential medical equipment and supplies",
            "category": "Medical",
            "location": "Warehouse D - Cold Storage",
            "stockLevel": 8,
            "threshold": 20,
            "supplier": "MedSupply Ltd.",
            "unitPrice": 125.00,
            "value": "₹1,000.00",
            "sku": "MED-004",
            "lastUpdated": "2024-09-20"
          },
          {
            "id": 5,
            "name": "Construction Materials",
            "description": "Building materials and construction supplies",
            "category": "Construction",
            "location": "Warehouse E - Outdoor Yard",
            "stockLevel": 120,
            "threshold": 100,
            "supplier": "BuildCorp",
            "unitPrice": 22.75,
            "value": "₹2,730.00",
            "sku": "CONS-005",
            "lastUpdated": "2024-09-16"
          },
          {
            "id": 6,
            "name": "Food & Beverages",
            "description": "Packaged food items and beverages",
            "category": "Food",
            "location": "Warehouse F - Refrigerated",
            "stockLevel": 85,
            "threshold": 60,
            "supplier": "FoodCorp Ltd.",
            "unitPrice": 12.50,
            "value": "₹1,062.50",
            "sku": "FOOD-006",
            "lastUpdated": "2024-09-19"
          },
          {
            "id": 7,
            "name": "Pharmaceutical Products",
            "description": "Prescription and over-the-counter medicines",
            "category": "Medical",
            "location": "Warehouse D - Secure Area",
            "stockLevel": 32,
            "threshold": 25,
            "supplier": "PharmaCorp",
            "unitPrice": 89.99,
            "value": "₹2,879.68",
            "sku": "PHAR-007",
            "lastUpdated": "2024-09-20"
          },
          {
            "id": 8,
            "name": "Industrial Tools",
            "description": "Heavy-duty industrial equipment and tools",
            "category": "Industrial",
            "location": "Warehouse G - Heavy Equipment",
            "stockLevel": 18,
            "threshold": 15,
            "supplier": "ToolMaster Inc.",
            "unitPrice": 245.00,
            "value": "₹4,410.00",
            "sku": "TOOL-008",
            "lastUpdated": "2024-09-15"
          }
        ];
      }
      
      return [];
    }, [url]);

  useEffect(() => {
    let timeoutId;
    
    const loadData = () => {
      setLoading(true);
      timeoutId = setTimeout(() => {
        const result = mockData();
        console.log(`[useApi] Loading data for ${url}:`, result);
        setData(result);
        setLoading(false);
      }, 500);
    };

    loadData();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [mockData]);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { data, loading, error, refetch };
};
